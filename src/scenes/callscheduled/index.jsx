import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Button
} from "@mui/material";
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  NetworkPing as PingIcon,
  Download as DownloadIcon,
  Add as AddIcon
} from "@mui/icons-material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';

const Callscheduled = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [websiteFilter, setWebsiteFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Enhanced sample data
  const [allData, setAllData] = useState([
    {
      id: 1,
      website: 'tridentrealty.in',
      name: 'Poonam',
      mobile: '9988056650',
      submitOn: '23 Jun, 25',
      recommendedBy: '25 Aug, 25',
      assignedBy: 'Gurjeet',
      remarks: 'Interested in 3BHK',
      unique: '1',
      isOverdue: true
    },
    {
      id: 2,
      website: 'jubileegroupmohali.com',
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      submitOn: '24 Jun, 25',
      recommendedBy: '2 Aug, 25',
      assignedBy: 'Manpreet',
      remarks: 'Looking for plots',
      unique: '0',
      isOverdue: true
    },
    {
      id: 3,
      website: 'hiregroupmohali.in',
      name: 'Sunita Sharma',
      mobile: '9988776655',
      submitOn: '25 Jun, 25',
      recommendedBy: '28 Jul, 25',
      assignedBy: 'Simran',
      remarks: 'Budget 50L',
      unique: '2',
      isOverdue: false
    },
    {
      id: 4,
      website: 'tridentrealty.in',
      name: 'Amit Singh',
      mobile: '9123456789',
      submitOn: '26 Jun, 25',
      recommendedBy: '1 Aug, 25',
      assignedBy: 'Priya',
      remarks: 'First time buyer',
      unique: '0',
      isOverdue: true
    },
    {
      id: 5,
      website: 'jubileegroupmohali.com',
      name: 'Neha Gupta',
      mobile: '9998887776',
      submitOn: '27 Jun, 25',
      recommendedBy: '30 Aug, 25',
      assignedBy: 'Rohit',
      remarks: 'Ready to move',
      unique: '1',
      isOverdue: false
    },
    {
      id: 6,
      website: 'hiregroupmohali.in',
      name: 'Vikram Sethi',
      mobile: '9876512345',
      submitOn: '28 Jun, 25',
      recommendedBy: '2 Aug, 25',
      assignedBy: 'Anjali',
      remarks: 'Investment purpose',
      unique: '0',
      isOverdue: true
    },
    {
      id: 7,
      website: 'tridentrealty.in',
      name: 'Kavita Devi',
      mobile: '9988112233',
      submitOn: '29 Jun, 25',
      recommendedBy: '29 Jul, 25',
      assignedBy: 'Deepak',
      remarks: 'Urgent requirement',
      unique: '3',
      isOverdue: false
    },
    {
      id: 8,
      website: 'jubileegroupmohali.com',
      name: 'Raman Lal',
      mobile: '9876098760',
      submitOn: '30 Jun, 25',
      recommendedBy: '1 Aug, 25',
      assignedBy: 'Pooja',
      remarks: 'Near school required',
      unique: '0',
      isOverdue: true
    },
    {
      id: 9,
      website: 'hiregroupmohali.in',
      name: 'Sonia Kapoor',
      mobile: '9123098765',
      submitOn: '1 Jul, 25',
      recommendedBy: '3 Aug, 25',
      assignedBy: 'Karan',
      remarks: 'Premium location',
      unique: '1',
      isOverdue: true
    },
    {
      id: 10,
      website: 'tridentrealty.in',
      name: 'Hardeep Singh',
      mobile: '9988334455',
      submitOn: '2 Jul, 25',
      recommendedBy: '31 Jul, 25',
      assignedBy: 'Meera',
      remarks: 'Cash payment ready',
      unique: '2',
      isOverdue: false
    },
    {
      id: 11,
      website: 'jubileegroupmohali.com',
      name: 'Preeti Sharma',
      mobile: '9876543219',
      submitOn: '3 Jul, 25',
      recommendedBy: '2 Aug, 25',
      assignedBy: 'Naveen',
      remarks: 'Family shifting',
      unique: '0',
      isOverdue: true
    },
    {
      id: 12,
      website: 'hiregroupmohali.in',
      name: 'Jasbir Kaur',
      mobile: '9988776644',
      submitOn: '4 Jul, 25',
      recommendedBy: '1 Aug, 25',
      assignedBy: 'Rahul',
      remarks: 'NRI buyer',
      unique: '1',
      isOverdue: true
    }
  ]);

  const uniqueWebsites = [...new Set(allData.map(item => item.website))];

  // Check if date is overdue or current
  const isDateOverdue = (dateString) => {
    const currentDate = new Date();
    const [day, month, year] = dateString.split(' ');
    const months = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const targetDate = new Date(2000 + parseInt(year), months[month.replace(',', '')], parseInt(day));
    return targetDate <= currentDate;
  };

  // Handle adding unique
  const handleAddUnique = (id) => {
    // Add your logic here for adding unique
    console.log('Add unique for ID:', id);
  };

  // Filter and paginate data
  useEffect(() => {
    let filtered = allData;

    if (websiteFilter) {
      filtered = filtered.filter(item => item.website === websiteFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.website.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setTotalRecords(filtered.length);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredData(filtered.slice(startIndex, endIndex));
  }, [allData, searchQuery, websiteFilter, currentPage, pageSize]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalRecords / pageSize);
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  // const exportToCSV = () => {
  //   const headers = ['No.', 'Website', 'Name', 'Mobile', 'Submit On', 'Recommended By', 'Assigned By', 'Remarks', 'Unique'];
  //   let csvContent = headers.join(',') + '\n';

  //   allData.forEach((row, index) => {
  //     const csvRow = [
  //       index + 1,
  //       `"${row.website}"`,
  //       `"${row.name}"`,
  //       row.mobile,
  //       `"${row.submitOn}"`,
  //       `"${row.recommendedBy}"`,
  //       `"${row.assignedBy}"`,
  //       `"${row.remarks}"`,
  //       row.unique
  //     ].join(',');
  //     csvContent += csvRow + '\n';
  //   });

  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'callscheduled_data.csv');
  //   link.style.visibility = 'hidden';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
                My LRS Fresh
              </Typography>

              {/* Search Controls */}
              <Grid container spacing={1} alignItems="center" sx={{ marginBottom: '15px' }}>
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
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: '#fff',
                            '& .MuiMenuItem-root': {
                              color: '#333',
                              '&:hover': {
                                backgroundColor: '#f5f5f5',
                              },
                              '&.Mui-selected': {
                                backgroundColor: '#e3f2fd',
                                color: '#333',
                                '&:hover': {
                                  backgroundColor: '#bbdefb',
                                }
                              }
                            }
                          }
                        }
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" sx={{ color: '#333 !important' }}>All Websites</MenuItem>
                      {uniqueWebsites.map((website) => (
                        <MenuItem key={website} value={website} sx={{ color: '#333 !important' }}>
                          {website}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by Name/Mobile"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#666' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Right side - Color Indicators */}
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="right" gap={1} flexWrap="wrap">
                    <Chip label="Site Visit Done" size="medium" sx={{ backgroundColor: '#4CAF50', color: 'white', fontSize: '14px' }} />
                    <Chip label="LRS Call Done" size="medium" sx={{ backgroundColor: '#FFC107', color: 'White', fontSize: '14px' }} />
                    <Chip label="My Unique Call" size="medium" sx={{ backgroundColor: '#FF9800', color: 'white', fontSize: '14px' }} />
                  </Box>
                </Grid>
              </Grid>

              {/* Status Info */}
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                Below Enquiries are scheduled for calls.
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
                      }}>Submit On</TableCell>

                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Recommended By</TableCell>

                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Assigned By</TableCell>
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
                      }}>Add Unique</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Action</TableCell>
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
                          {row.submitOn}
                        </TableCell>


                        <TableCell sx={{
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          <Typography
                            variant="body2"
                            className={isDateOverdue(row.recommendedBy) ? 'blink_me' : ''}
                            sx={{
                              color: isDateOverdue(row.recommendedBy) ? '#f90' : '#333',
                              fontWeight: isDateOverdue(row.recommendedBy) ? 'bold' : 'normal'
                            }}
                          >
                            {row.recommendedBy}
                          </Typography>
                        </TableCell>


                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          {row.assignedBy}
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
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => handleAddUnique(row.id)}
                            sx={{
                              backgroundColor: '#28a745',
                              color: '#fff',
                              fontSize: '10px',
                              fontWeight: '600',
                              textTransform: 'none',
                              minWidth: 'auto',
                              padding: '4px 8px',
                              '&:hover': {
                                backgroundColor: '#218838'
                              }
                            }}
                          >
                            Add Unique
                          </Button>
                        </TableCell>
                        <TableCell sx={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <IconButton size="small" sx={{ color: '#4CAF50' }}>
                              <PhoneIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#25D366' }}>
                              <WhatsAppIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#1976d2' }}>
                              <PingIcon fontSize="small" />
                            </IconButton>
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
                          color: '#333 !important',
                          padding: '8px 12px'
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: '#fff',
                            '& .MuiMenuItem-root': {
                              color: '#333',
                              '&:hover': {
                                backgroundColor: '#f5f5f5',
                              },
                              '&.Mui-selected': {
                                backgroundColor: '#e3f2fd',
                                color: '#333',
                                '&:hover': {
                                  backgroundColor: '#bbdefb',
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
                {/* <Button
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
                </Button> */}

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

      {/* Add CSS for animations */}

      <style>
        {`
    .blink_me {
      animation-name: blinker;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    @keyframes blinker {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
      </style>


    </Container>
  );
};

export default Callscheduled;