import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
  Chip
} from "@mui/material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';
import Data from "../notifications/data";
import DownloadIcon from '@mui/icons-material/Download';
import PhoneIcon from '@mui/icons-material/Phone';
import "./style.css";

const Normal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [websiteFilter, setWebsiteFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Sample data matching your image structure
  const [allData, setAllData] = useState([
    {
      id: 1,
      website: "jplhousing.com",
      name: "Vinita",
      mobile: "9921947618",
      submitDate: "11 Apr, 19",
      tran: "0",
      user: "Kanwar",
      secondUser: "Samir",
      remarks: "Enquiry for 3BHK ",
      action: "All Remarks"
    },
    {
      id: 2,
      website: "monastownships.in",
      name: "Raj Kumar Saroha",
      mobile: "7017192265",
      submitDate: "6 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Kanwar",
      remarks: "Testing Remark",
      action: "All Remarks"
    },
    {
      id: 3,
      website: "laparisian-mohali.ambikaarealty.com",
      name: "Mahesh chopra",
      mobile: "7027300093",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Gayatri",
      remarks: "",
      action: "All Remarks"
    },
    {
      id: 4,
      website: "gopinfra.com",
      name: "Priyanka",
      mobile: "8219909862",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Manjeet",
      remarks: "",
      action: "All Remarks"
    },
    {
      id: 5,
      website: "hermitagegroup.in",
      name: "Ammy",
      mobile: "9501080103",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Manjeet",
      remarks: "Price for Plots",
      action: "All Remarks"
    },
    {
      id: 6,
      website: "emaargroupmohali.com",
      name: "Amarpreet singh",
      mobile: "9417199809",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Manjeet",
      secondUser: "Bhavna",
      remarks: "",
      action: "All Remarks"
    },
    {
      id: 7,
      website: "wavestatemohali.com",
      name: "Avtar Singh",
      mobile: "9646474630",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Kanwar",
      remarks: "",
      action: "All Remarks"
    },
    {
      id: 8,
      website: "emaargroupmohali.com",
      name: "Sandeep",
      mobile: "7500242901",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Manjeet",
      secondUser: "Maninder Maan",
      remarks: "Invest in plots",
      action: "All Remarks"
    },
    {
      id: 9,
      website: "euphoriaksauli.sandwoodsinfra.com",
      name: "Ardhendu Das",
      mobile: "9958924924",
      submitDate: "7 Mar, 20",
      tran: "0",
      user: "Kanwar",
      secondUser: "Kanwar",
      remarks: "",
      action: "All Remarks"
    }
  ]);

  // Get unique websites for filter dropdown
  const uniqueWebsites = [...new Set(allData.map(item => item.website))];

  // Filter and paginate data
  useEffect(() => {
    let filtered = allData;

    // Apply website filter
    if (websiteFilter) {
      filtered = filtered.filter(item => item.website === websiteFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm) ||
        item.website.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTotalRecords(filtered.length);

    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredData(filtered.slice(startIndex, endIndex));
  }, [allData, searchTerm, websiteFilter, currentPage, pageSize]);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['No.', 'Website', 'Name', 'Mobile', 'Submit Date', 'Tran', 'User', '2nd User', 'Remarks', 'Action',];

    let csvContent = headers.join(',') + '\n';

    allData.forEach((row, index) => {
      const csvRow = [
        index + 1,
        `"${row.website}"`,
        `"${row.name}"`,
        row.mobile,
        `"${row.submitDate}"`,
        row.tran,
        `"${row.user}"`,
        `"${row.secondUser}"`,
        `"${row.remarks}"`,
        `"${row.action}"`,
      ].join(',');
      csvContent += csvRow + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'enquiries_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container backgroundColor={colors.primary[900]} className="border-5">
      <Grid container alignItems="center" spacing={0} sx={{
        padding: "16px",
        borderRadius: '16px',
        backgroundColor: "#ffffff",
        height: "98vh"
      }}>

        <Grid item xs={12} sm={6} md={12} sx={{ backgroundColor: "#F4F7FF", borderRadius: "15px", padding: "10px" }}>
          <Box
            className="border-5"
            height={535}
            sx={{
              borderRadius: '16px',
            }}
          >
            {/* Header Section */}
            <Box
              p="5px 0px"
              display="flex"
              flexDirection="column"
            >
              {/* Title */}
              <Typography variant="h3" style={{
                color: '#1F2A40',
                fontWeight: '600',
                marginBottom: '20px'
              }}>
                Normal Enquiry
              </Typography>

              {/* Search Controls */}
              <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '15px' }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: '#000000', '&.Mui-focused': { color: '#1976d2' } }}>
                      All Websites
                    </InputLabel>
                    <Select
                      value={websiteFilter}
                      label="All Websites"
                      onChange={(e) => setWebsiteFilter(e.target.value)}
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ddd',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#bbb',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        '& .MuiSelect-select': {
                          color: '#333 !important',
                          padding: '10px 14px'
                        }
                      }}
                      // Add MenuProps to control dropdown styling
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: '#fff', // Set dropdown background to white
                            '& .MuiMenuItem-root': {
                              color: '#333',
                              '&:hover': {
                                backgroundColor: '#f5f5f5', // Light gray on hover
                              },
                              '&.Mui-selected': {
                                backgroundColor: '#e3f2fd', // Light blue when selected
                                color: '#333',
                                '&:hover': {
                                  backgroundColor: '#bbdefb', // Darker blue on hover when selected
                                }
                              }
                            }
                          }
                        }
                      }}
                    >
                      <MenuItem value="" sx={{ color: '#333' }}>All Websites</MenuItem>
                      {uniqueWebsites.map((website) => (
                        <MenuItem key={website} value={website} sx={{ color: '#333' }}>
                          {website}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by Name/Mobile"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: '#bbb',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                        '& input': {
                          color: '#333',
                          padding: '10px 14px'
                        },
                        '& input::placeholder': {
                          color: '#888',
                          opacity: 1
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      fontWeight: '600',
                      '&:hover': {
                        backgroundColor: '#c82333'
                      },
                      textTransform: 'none',
                      padding: '8px 20px'
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>

              {/* Status Info */}
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                Below Enquiries are under Normal Priority.
                <Typography component="span" sx={{
                  fontWeight: 'bold',
                  ml: 2,
                  color: '#333'
                }}>
                  Total Records: {totalRecords}
                </Typography>
              </Typography>
            </Box>

            {/* Table Section */}
            <Box height="320px" sx={{ overflowY: 'auto' }}>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>SNo.</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Website</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Name</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Mobile</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Submit Date</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Tran</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>User</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>2nd User</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Remarks</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Proper Remark</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {(currentPage - 1) * pageSize + index + 1}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.website}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{
                          color: '#007bff',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.mobile}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.submitDate}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.tran}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.user}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.secondUser}
                        </TableCell>
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.remarks}
                        </TableCell>

                        <TableCell sx={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <Chip
                              label={row.action}
                              size="small"
                              sx={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: '600',
                                height: '20px'
                              }}
                            />
                          </Box>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Footer Controls */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px 20px"
              flexWrap="wrap"
              gap={2}
              sx={{ backgroundColor: '#f8f9fa', borderRadius: '0 0 15px 15px', marginTop: 'auto' }}
            >
              {/* Left Section */}
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                  Showing {startRecord} to {endRecord} of {totalRecords} entries
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>Show</Typography>
                  <FormControl size="small">
                    <Select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      sx={{
                        minWidth: 60,
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ddd',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#bbb',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        '& .MuiSelect-select': {
                          color: '#333 !important', // Force dark color for selected text
                          padding: '8px 12px'
                        }
                      }}
                      // Add MenuProps to control dropdown styling
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: '#fff', // Set dropdown background to white
                            '& .MuiMenuItem-root': {
                              color: '#333',
                              '&:hover': {
                                backgroundColor: '#f5f5f5', // Light gray on hover
                              },
                              '&.Mui-selected': {
                                backgroundColor: '#e3f2fd', // Light blue when selected
                                color: '#333', // Ensure selected items stay dark
                                '&:hover': {
                                  backgroundColor: '#bbdefb', // Darker blue on hover when selected
                                }
                              }
                            }
                          }
                        }
                      }}
                    >
                      <MenuItem value={10} sx={{ color: '#333 !important' }}>10</MenuItem>
                      <MenuItem value={25} sx={{ color: '#333 !important' }}>25</MenuItem>
                      <MenuItem value={50} sx={{ color: '#333 !important' }}>50</MenuItem>
                      <MenuItem value={100} sx={{ color: '#333 !important' }}>100</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>entries</Typography>
                </Box>
              </Box>

              {/* Right Section */}
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={exportToCSV}
                  sx={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    fontWeight: '600',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#218838'
                    }
                  }}
                >
                  EXPORT CSV
                </Button>

                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#333',
                      fontSize: '14px'
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#1976d2 !important',
                      color: '#fff'
                    }
                  }}
                />
              </Box>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Normal;