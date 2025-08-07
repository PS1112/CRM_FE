import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Grid,
} from "@mui/material";
import FollowUpModal from "../../components/Modals/FollowUpModal.jsx"
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import "./style.css";
import { ToastContainer } from "react-toastify";
import { postApi } from "../../services/axiosInstance.js";
import { API_PATH } from "../../services/apipath";

// Import ResizableTable component
import ResizableTable from "../../components/ResizeableTable/ResizableTable.jsx";
import MultiStepModal from "../../components/Modals/MultiStepModal.jsx";
import { cellStyle, formatTableData, headerStyle, tableColumns } from "../../utils/helper.js";

const FreshPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Mobile

  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(0);
  const [freshQueriesData, setFreshQueriesData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedFollowUpItem, setSelectedFollowUpItem] = useState(null);

  // API call to fetch fresh enquiry data
  const fetchWebsites = async () => {
    try {
      const res = await postApi(API_PATH.WEBSITES.GET_WEBSITES, { page: 1, limit: 10 });
      if (res.status === 200) {
        setOptions(res.data.data.map((item) => ({ value: item.id, label: item.name })));
      }
    } catch (error) {
      console.log(error, "Error fetching websites");
    }
  };

  // API call to fetch fresh enquiry data
  const fetchFreshQuery = async () => {
    try {
      const url = API_PATH.ENQUIRY.GET_FRESH_ENQUIRY
      const res = await postApi(url);
      if (res.status === 200) {
        setFreshQueriesData(res.data);
      }
    } catch (error) {
      console.log(error, "Error fetching fresh enquiry data");
    }
  };

  React.useEffect(() => {
    fetchWebsites();
    fetchFreshQuery();
  }, []);

  const tableData = freshQueriesData.map((item) => formatTableData(item))

  return (
    <Container 
      className="border-5" 
      maxWidth={false}
      sx={{
        padding: { xs: '8px', sm: '16px', md: '20px' },
        minHeight: '100vh',
      }}
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
          height: { xs: "calc(100vh - 16px)", sm: "95vh" },
          minHeight: { xs: "600px", sm: "500px" },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#F4F7FF",
            borderRadius: "15px",
            padding: { xs: "8px", sm: "10px" },
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            className="border-5"
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "0px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                p: { xs: "10px", sm: "0 20px" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Grid
                container
                alignItems="center"
                spacing={{ xs: 1, sm: 2 }}
                sx={{ 
                  marginBottom: { xs: "10px", sm: "20px" },
                }}
              >
                {/* Title Section */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                    <Typography
                      variant={isXs ? "h5" : "h4"}
                      sx={{ 
                        color: "#1F2A40", 
                        fontWeight: "600",
                        fontSize: { xs: '0.8rem', sm: '1rem', md: '1.5rem' },
                        lineHeight: { xs: 1.2, sm: 1.3 },
                      }}
                    >
                      Fresh Enquiries
                    </Typography>
                  </Box>
                </Grid>

                {/* Add New Enquiry Button */}
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcCallIcon />}
                    onClick={() => setModalOpen(true)}
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      minWidth: { sm: '160px' },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      padding: { xs: '6px 12px', sm: '8px 16px' },
                      '& .MuiButton-startIcon': {
                        marginRight: { xs: '4px', sm: '8px' },
                      },
                    }}
                  >
                    {isXs ? 'Add Enquiry' : 'Add New Enquiry'}
                  </Button>

                  <MultiStepModal
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                  />
                </Grid>

                {/* Search Box */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: 'stretch', md: 'center' },
                    alignItems: "center",
                  }}
                >
                  <Box 
                    display="flex" 
                    sx={{ 
                      width: { xs: '100%', md: 'auto' },
                      minWidth: { md: '200px' },
                    }}
                  >
                    <input
                      type="text"
                      style={{
                        marginLeft: 2,
                        flex: 1,
                        color: "black",
                        borderRadius: "10px",
                        border: "solid 1px #e2e2e2",
                        padding: isXs ? "6px 10px" : "8px 12px",
                        fontSize: isXs ? "14px" : "16px",
                        minWidth: "120px",
                      }}
                      placeholder="Search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton 
                      type="button" 
                      sx={{ 
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <SearchIcon className="text-secondary" />
                    </IconButton>
                  </Box>
                </Grid>

                {/* Project Select Dropdown */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: 'stretch', md: 'center' },
                    alignItems: "end",
                  }}
                >
                  <Box sx={{ width: { xs: '100%', md: 'auto' }, minWidth: { md: '150px' } }}>
                    <Select
                      className="w-100 text-dark"
                      options={options}
                      onChange={(e) => setStatus(e.value)}
                      placeholder="Select Project"
                      styles={{
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 2000,
                        }),
                        control: (provided) => ({
                          ...provided,
                          minHeight: isXs ? '36px' : '40px',
                          fontSize: isXs ? '14px' : '16px',
                        }),
                        option: (provided) => ({
                          ...provided,
                          fontSize: isXs ? '14px' : '16px',
                        }),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Table Section */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: { xs: "auto", md: "hidden" },
                padding: { xs: "0 10px", sm: "0 20px" },
                minHeight: 0, // Important for flex child with overflow
              }}
            >
              <Box sx={{ 
                minWidth: { xs: '600px', md: 'auto' }, // Horizontal scroll on mobile if needed
              }}>
                <ResizableTable
                  columns={tableColumns}
                  data={tableData}
                  headerStyle={{
                    ...headerStyle,
                    fontSize: isXs ? '12px' : headerStyle.fontSize,
                    padding: isXs ? '8px 4px' : headerStyle.padding,
                  }}
                  cellStyle={{
                    ...cellStyle,
                    fontSize: isXs ? '12px' : cellStyle.fontSize,
                    padding: isXs ? '8px 4px' : cellStyle.padding,
                  }}
                  emptyMessage="No inquiry data found"
                  onCallClick={(_, index) => {
                    setSelectedFollowUpItem(freshQueriesData[index]);
                    setFollowUpModalOpen(true);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ToastContainer 
        position={isXs ? "top-center" : "top-right"}
        style={{
          fontSize: isXs ? '14px' : '16px',
        }}
      />
      
      {followUpModalOpen && (
        <FollowUpModal
          handleClose={() => {
            setFollowUpModalOpen(false);
            setSelectedFollowUpItem(null);
          }}
          open={followUpModalOpen}
          item={selectedFollowUpItem}
        />
      )}
    </Container>
  );
};

export default FreshPage;