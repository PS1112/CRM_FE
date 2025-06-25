import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Tooltip,
  Checkbox,
  Pagination,
  Select as MuiSelect, // Rename this to avoid conflict
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import { getApi, postApi, putApi, deleteApi } from "../../services/axiosInstance.js";
import { API_PATH } from "../../services/apipath";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";
import Moment from "react-moment";

// Import ResizableTable component
import ResizableTable from "../../components/ResizeableTable/ResizableTable.jsx";

import moment from "moment";
import MultiStepModal from "../../components/Modals/MultiStepModal.jsx";
import { cellStyle, headerStyle } from "../../utils/helper.js";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalOpen, setModalOpen] = useState(false);
  const [freshQuery, setFreshQuery] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("all");
  const [loading, setLoading] = useState(false);
  const [websiteOptions, setWebsiteOptions] = useState([
    { value: "all", label: "All Websites" }
  ]);

  // Add these new state variables after your existing useState declarations
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // New state for checkbox selection
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Filter data based on search query and selected website
  const filteredDataResults = React.useMemo(() => {
    let filtered = processedData;

    // Apply search filter
    if (searchQuery) {
      const searchStr = searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        return (
          (item.name && item.name.toLowerCase().includes(searchStr)) ||
          (item.email && item.email.toLowerCase().includes(searchStr)) ||
          (item.mobile && item.mobile.toLowerCase().includes(searchStr)) ||
          (item.website && item.website.toLowerCase().includes(searchStr))
        );
      });
    }

    // Apply website filter
    if (selectedWebsite !== "all") {
      filtered = filtered.filter(item => item.website === selectedWebsite);
    }

    return filtered; // Remove the .map() that was adding serialNo
  }, [processedData, searchQuery, selectedWebsite]);

  // Paginated data with serial numbers
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredDataResults.slice(startIndex, endIndex);

    return pageData.map((item, index) => ({
      ...item,
      serialNo: startIndex + index + 1,
      isSelected: selectedRows.has(item.id)
    }));
  }, [filteredDataResults, currentPage, itemsPerPage, selectedRows]);

  // Add these new handler functions
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const totalPages = Math.ceil(filteredDataResults.length / itemsPerPage);

  // Fetch fresh inquiries from API
  const fetchFreshInquiry = async () => {
    setLoading(true);
    try {
      const res = await getApi(API_PATH.SUPER_ADMIN.GET_FRESH_ENQUIRY);
      if (res.status === 200) {
        console.log(res.data, "fresh inquiry");

        // Map API data to the format expected by the table
        const mappedData = res.data.map(item => ({
          ...item,
          id: item._id || Math.random().toString(36).substring(2, 9), // Ensure each item has a unique ID
          mobile: item.phone, // Map the phone field to mobile for the table
          // Properly format the date from API response
          submitDate: item.submitted_date ? moment(new Date(item.submitted_date)).format("DD/MM/YYYY hh:mm A") : "-",
          submitDateTime: item.submitted_date ? new Date(item.submitted_date) : new Date(), // Keep original date for sorting
          // Add found_count property (use actual count from API)
          found_count: item.found_count || 0
        }));

        // Sort by submitDateTime to show fresh leads first (most recent first)
        const sortedData = mappedData.sort((a, b) => new Date(b.submitDateTime) - new Date(a.submitDateTime));

        setFreshQuery(sortedData);
        processDataForDisplay(sortedData);

        // Extract unique website names for the dropdown
        generateWebsiteOptions(sortedData);
      }
    } catch (error) {
      console.error("Error fetching fresh inquiries:", error);
      toast.error("Failed to load inquiry data");
    } finally {
      setLoading(false);
    }
  }

  // Generate website options for the dropdown
  const generateWebsiteOptions = (data) => {
    // Extract unique website names
    const websiteSet = new Set();

    // Add all websites to the set
    data.forEach(item => {
      if (item.website && item.website.trim() !== '') {
        websiteSet.add(item.website);
      }
    });

    // Convert set to array of option objects
    const options = [
      { value: "all", label: "All Websites" },
      ...Array.from(websiteSet).sort().map(website => ({
        value: website,
        label: website
      }))
    ];

    setWebsiteOptions(options);
  };

  // Process data to remove duplicates and properly show counts
  const processDataForDisplay = (data) => {
    // Create maps to track duplicate entries by email and phone
    const uniqueEntries = new Map();
    const emailMap = new Map();
    const phoneMap = new Map();

    // First pass: Group by email and phone to count occurrences
    data.forEach(item => {
      // Add email to map and increment count
      if (item.email) {
        const count = emailMap.get(item.email) || 0;
        emailMap.set(item.email, count + 1);
      }

      // Add phone to map and increment count
      if (item.mobile) {
        const count = phoneMap.get(item.mobile) || 0;
        phoneMap.set(item.mobile, count + 1);
      }
    });

    // Second pass: Create unique entries and set counts
    data.forEach(item => {
      // Create a unique key using email and phone
      const key = item.email && item.mobile ? `${item.email}:${item.mobile}` :
        item.email ? item.email :
          item.mobile ? item.mobile :
            item.id; // Fallback to ID if no email or phone

      // Only process if this entry hasn't been added yet
      if (!uniqueEntries.has(key)) {
        // Get the maximum count between email and phone matches
        const emailCount = item.email ? emailMap.get(item.email) : 0;
        const phoneCount = item.mobile ? phoneMap.get(item.mobile) : 0;

        // Set the found_count based on the maximum number of matches
        item.found_count = Math.max(emailCount, phoneCount, item.found_count || 0);

        // Add to unique entries map
        uniqueEntries.set(key, item);
      }
    });

    // Convert map to array and maintain sorting order (fresh leads first)
    const processedArray = Array.from(uniqueEntries.values());
    processedArray.sort((a, b) => new Date(b.submitDateTime) - new Date(a.submitDateTime));

    setProcessedData(processedArray);
  };

  useEffect(() => {
    fetchFreshInquiry();
  }, []);

  // Handle individual row selection - moved after filteredDataResults definition
  const handleRowSelect = (rowId) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    // Update select all checkbox state
    setSelectAll(newSelectedRows.size === filteredDataResults.length && filteredDataResults.length > 0);
  };

  // Handle select all checkbox - moved after filteredDataResults definition
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allRowIds = new Set(filteredDataResults.map(row => row.id));
      setSelectedRows(allRowIds);
      setSelectAll(true);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedRows.size === 0) {
      toast.warning("Please select rows to delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedRows.size} selected inquiries?`)) {
      try {
        // Here you would call your bulk delete API endpoint
        // For example: await deleteApi(`${API_PATH.SUPER_ADMIN.BULK_DELETE_ENQUIRY}`, { ids: Array.from(selectedRows) });
        console.log("Bulk deleting rows:", Array.from(selectedRows));

        // Remove from the processed data
        const updatedData = processedData.filter(item => !selectedRows.has(item.id));
        setProcessedData(updatedData);
        setSelectedRows(new Set());
        setSelectAll(false);

        toast.success(`${selectedRows.size} inquiries deleted successfully`);
      } catch (error) {
        console.error("Error bulk deleting inquiries:", error);
        toast.error("Failed to delete inquiries");
      }
    }
  };

  // Handle call button click
  const handleCallClick = (row) => {
    if (row.mobile) {
      // You can implement click-to-call functionality here
      // For example, opening a phone app with the number
      window.open(`tel:${row.mobile.replace(/\D/g, '')}`);
      console.log("Calling:", row.mobile);
      toast.info(`Initiating call to ${row.name || row.mobile}`);
    } else {
      toast.warning("No phone number available");
    }
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (row) => {
    if (row.mobile) {
      // Format number for WhatsApp API
      const formattedNumber = row.mobile.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${"07508972498"}`;
      window.open(whatsappUrl, '_blank');
      console.log("Opening WhatsApp for:", row.mobile);
    } else {
      toast.warning("No phone number available for WhatsApp");
    }
  };

  // Handle delete entry
  const handleDeleteClick = async (row) => {
    if (window.confirm(`Are you sure you want to delete the inquiry from ${row.name || row.email || row.mobile}?`)) {
      try {
        // Here you would call your delete API endpoint
        // For example: await deleteApi(`${API_PATH.SUPER_ADMIN.DELETE_ENQUIRY}/${row.id}`);
        console.log("Deleting row:", row.id);

        // Remove from the processed data
        const updatedData = processedData.filter(item => item.id !== row.id);
        setProcessedData(updatedData);

        // Remove from selected rows if it was selected
        const newSelectedRows = new Set(selectedRows);
        newSelectedRows.delete(row.id);
        setSelectedRows(newSelectedRows);

        toast.success("Inquiry deleted successfully");
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        toast.error("Failed to delete inquiry");
      }
    }
  };

  // Update selectAll state when filtered data changes
  useEffect(() => {
    if (filteredDataResults.length > 0) {
      const allSelected = filteredDataResults.every(row => selectedRows.has(row.id));
      setSelectAll(allSelected && selectedRows.size > 0);
    } else {
      setSelectAll(false);
    }
  }, [filteredDataResults, selectedRows]);

  // Define table columns with initial widths for the ResizableTable
  const tableColumns = [
    {
      id: "checkbox",
      label: (
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
          indeterminate={selectedRows.size > 0 && selectedRows.size < filteredDataResults.length}
          sx={{
            padding: 0,
            color: '#000000',
            '&.Mui-checked': {
              color: '#000000',
            }
          }}
        />

      ),
      initialWidth: 50,
      align: "center"
    },
    { id: "serialNo", label: "S.No.", initialWidth: 60, align: "center" },
    { id: "website", label: "Website", initialWidth: 130, align: "left" },
    { id: "name", label: "Name", initialWidth: 150, align: "left" },
    { id: "email", label: "Email", initialWidth: 200, align: "left" },
    { id: "mobile", label: "Mobile", initialWidth: 130, align: "left" },
    { id: "remarks", label: "Remarks", initialWidth: 150, align: "left" },
    { id: "submitDate", label: "Submit Date", initialWidth: 180, align: "left" },
    {
      id: "action",
      label: "Actions",
      initialWidth: 100,
      align: "center"
    },
    {
      id: "exist",
      label: "Exist",
      initialWidth: 80,
      align: "center"
    },
    {
      id: "delete",
      label: "Delete",
      initialWidth: 80,
      align: "center"
    },
    { id: "preferredTime", label: "Preferred Time", initialWidth: 150, align: "left" }
  ];



  return (
    <Container
      backgroundColor={colors.primary[900]}
      className="border-5"
      padding="0px"
    >
      <Grid
        container
        alignItems="center"
        sx={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          backgroundColor: "#ffffff",
          height: "95vh",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          sx={{
            backgroundColor: "#F4F7FF",
            borderRadius: "15px",
            padding: "10px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Box
            className="border-5"
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "0px",
            }}
          >
            <Box
              p="0px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                container
                alignItems="center"
                spacing={0}
                sx={{ marginBottom: "20px" }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <div>
                    <Typography
                      variant="h4"
                      style={{ color: "#1F2A40", fontWeight: "600" }}
                    >
                      Fresh Inquiry
                    </Typography>
                    <Typography variant="h6" style={{ color: "#000000" }}>
                      Welcome to Sarvottam CRM
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcCallIcon />}
                      onClick={() => setModalOpen(true)}
                    >
                      Add New Enquiry
                    </Button>

                    {selectedRows.size > 0 && (
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleBulkDelete}
                        size="small"
                      >
                        Delete ({selectedRows.size})
                      </Button>
                    )}
                  </Box>

                  <MultiStepModal
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    onSuccess={() => fetchFreshInquiry()} // Refresh after adding new entry
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box display="flex">
                    <input
                      type="text"
                      style={{
                        marginLeft: 2,
                        flex: 1,
                        color: "black",
                        borderRadius: "10px",
                        border: "solid 1px #e2e2e2",
                        padding: "8px 12px"
                      }}
                      placeholder="Search Email/Phone/Name"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                      <SearchIcon className="text-secondary" />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Select
                    className="w-100 text-dark"
                    options={websiteOptions}
                    onChange={(e) => setSelectedWebsite(e.value)}
                    placeholder="Select Website"
                    defaultValue={websiteOptions[0]}
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999
                      }),
                      control: (provided) => ({
                        ...provided,
                        zIndex: 50
                      })
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Replace your existing table Box with this */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: "auto",
                padding: "0px",
                border: "1px solid #e0e0e0",
                borderRadius: "18px 18px 0px 0px",
                backgroundColor: "#ffffff",
                maxHeight: "75vh" // Add this to control height
              }}
            >
              <ResizableTable
                columns={tableColumns}
                data={paginatedData} // Change from filteredDataResults to paginatedData
                headerStyle={headerStyle}
                cellStyle={cellStyle}
                emptyMessage={loading ? "Loading inquiry data..." : "No enquiry data found"}
                onCallClick={handleCallClick}
                onWhatsAppClick={handleWhatsAppClick}
                onDeleteClick={handleDeleteClick}
                onRowSelect={handleRowSelect}
                selectedRows={selectedRows}
              />
            </Box>

            {/* Add pagination controls right after the table Box */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                borderTop: "1px solid #e0e0e0",
                backgroundColor: "#9c9fa6",
                borderRadius: "0px 0px 10px 10px",
                
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h6" color="black" fontWeight="600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredDataResults.length)} of{" "}
                  {filteredDataResults.length} entries
                </Typography>

                <FormControl size="small" sx={{ minWidth: 80, color: "black", fontWeight: "600" }}>
                  <InputLabel sx={{ color: "black" }}>Per Page</InputLabel>
                  <MuiSelect
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    label="Per Page"
                    sx={{ color: "black" }}
                  >
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={75}>75</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </MuiSelect>
                </FormControl>
              </Box>

              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'black',
                    fontWeight: '600',
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                    color: 'white',
                    fontWeight: '600',
                  },
                }}
              />

            </Box>
          </Box>
        </Grid>
      </Grid>

      <ToastContainer />
    </Container>
  );
};

export default Dashboard;