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
  Download as DownloadIcon
} from "@mui/icons-material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';

const Updatequestions = () => {
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
      website: 'bollywood',
      name: 'Vimal',
      mobile: '7508772498',
      submitDate: '31 May, 25',
      nextFollowup: '28 Jun, 25',
      user: 'Vimal',
      lrsUser: 'Gayatri',
      remarks: 'Site Visit Done',
      status: 'site_visit_done',
      isOverdue: true
    },
    {
      id: 2,
      website: 'aerovist',
      name: 'Vimal',
      mobile: '7508772498',
      submitDate: '28 Jun, 25',
      nextFollowup: '26 Jul, 25',
      user: 'Vimal',
      lrsUser: 'Gayatri',
      remarks: 'Site Visit Done + LRS Call Done',
      status: 'site_visit_lrs_done',
      isOverdue: false
    },
    {
      id: 3,
      website: 'horizons',
      name: 'ChatGPT LRS Follow 1',
      mobile: '07807395400',
      submitDate: '26 Jul, 25',
      nextFollowup: '28 Jul, 25',
      user: 'Gayatri',
      lrsUser: 'Vimal',
      remarks: 'Interested in plots',
      status: 'normal',
      isOverdue: false
    },
    {
      id: 4,
      website: 'yamanagar',
      name: 'ChatGPT LRS SV Follow',
      mobile: '07807395400',
      submitDate: '26 Jul, 25',
      nextFollowup: '15 Sep, 25',
      user: 'Gayatri',
      lrsUser: 'Vimal',
      remarks: 'Budget discussion',
      status: 'normal',
      isOverdue: false
    },
    {
      id: 5,
      website: 'yamanagar',
      name: 'ChatGPT LRS SV Follow Up',
      mobile: '07807395400',
      submitDate: '26 Jul, 25',
      nextFollowup: '10 Nov, 25',
      user: 'Gayatri',
      lrsUser: 'Vimal',
      remarks: 'Ping',
      status: 'ping',
      isOverdue: false
    },
    {
      id: 6,
      website: 'naveesta',
      name: 'Amirudh PM Mohali',
      mobile: '8255355684',
      submitDate: '30 Jul, 25',
      nextFollowup: '1 Nov, 25',
      user: 'raghav',
      lrsUser: 'Vbij',
      remarks: 'Follow up required',
      status: 'normal',
      isOverdue: false
    },
    {
      id: 7,
      website: 'als-dera',
      name: 'Cal Mahender Singh',
      mobile: '9720778829',
      submitDate: '26 Jul, 25',
      nextFollowup: '1 Jan, 26',
      user: 'Gurjeet',
      lrsUser: 'Vbij',
      remarks: 'Site Visit Done',
      status: 'site_visit_done',
      isOverdue: false
    },
    {
      id: 8,
      website: 'YouTube',
      name: 'Sohal Goverdhan',
      mobile: '9914197728',
      submitDate: '18 Jul, 25',
      nextFollowup: '12 Aug, 25',
      user: 'Gurjeet',
      lrsUser: 'Manjeet',
      remarks: 'Site Visit Done + LRS Call Done',
      status: 'site_visit_lrs_done',
      isOverdue: false
    },
    {
      id: 9,
      website: 'naveesta',
      name: 'Akul',
      mobile: '8556624751',
      submitDate: '13 Jul, 25',
      nextFollowup: '19 Dec, 25',
      user: 'Maan Maninder',
      lrsUser: 'Vijay',
      remarks: 'Budget finalization',
      status: 'normal',
      isOverdue: false
    },
    {
      id: 10,
      website: 'omsave-ne',
      name: 'Jamanshu Sharma',
      mobile: '8826448962',
      submitDate: '16 Jul, 25',
      nextFollowup: '10 Oct, 25',
      user: 'S.Manjeet',
      lrsUser: 'Vikas',
      remarks: 'Ping',
      status: 'ping',
      isOverdue: false
    }
  ]);

  const uniqueWebsites = [...new Set(allData.map(item => item.website))];

  // Calculate days between submit date and next followup
  const calculateDays = (submitDate, nextFollowup) => {
    try {
      const [submitDay, submitMonth, submitYear] = submitDate.split(' ');
      const [followupDay, followupMonth, followupYear] = nextFollowup.split(' ');

      const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };

      const submitDateObj = new Date(2000 + parseInt(submitYear), months[submitMonth.replace(',', '')], parseInt(submitDay));
      const followupDateObj = new Date(2000 + parseInt(followupYear), months[followupMonth.replace(',', '')], parseInt(followupDay));

      const timeDifference = followupDateObj.getTime() - submitDateObj.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      return daysDifference > 0 ? daysDifference : 0;
    } catch (error) {
      return 0;
    }
  };

  // Check if date is overdue or current
  const isDateOverdue = (dateString) => {
    try {
      const currentDate = new Date();
      const [day, month, year] = dateString.split(' ');
      const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const targetDate = new Date(2000 + parseInt(year), months[month.replace(',', '')], parseInt(day));
      return targetDate <= currentDate;
    } catch (error) {
      return false;
    }
  };

  // Get name styling based on status
  const getNameStyling = (status, name) => {
    switch (status) {
      case 'site_visit_done':
        return (
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              color: 'white',
              backgroundColor: '#4CAF50',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: '600'
            }}
          >
            {name}
          </Typography>
        );
      case 'site_visit_lrs_done':
        return (
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              color: 'white',
              background: 'linear-gradient(to right, #4CAF50 50%, #2196F3 50%)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: '600'
            }}
          >
            {name}
          </Typography>
        );
      case 'ping':
        return (
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              color: 'white',
              backgroundColor: '#f44336',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: '600'
            }}
          >
            {name}
          </Typography>
        );
      default:
        return (
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#333' }}>
            {name}
          </Typography>
        );
    }
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
  //   const headers = ['No.', 'Website', 'Name', 'Mobile', 'Submit Date', 'Next Followup', 'User', 'LRS User', 'Remarks', 'Days'];
  //   let csvContent = headers.join(',') + '\n';

  //   allData.forEach((row, index) => {
  //     const csvRow = [
  //       index + 1,
  //       `"${row.website}"`,
  //       `"${row.name}"`,
  //       row.mobile,
  //       `"${row.submitDate}"`,
  //       `"${row.nextFollowup}"`,
  //       `"${row.user}"`,
  //       `"${row.lrsUser}"`,
  //       `"${row.remarks}"`,
  //       calculateDays(row.submitDate, row.nextFollowup)
  //     ].join(',');
  //     csvContent += csvRow + '\n';
  //   });

  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'must_follow_data.csv');
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
                Must Follow
              </Typography>

              {/* Search Controls */}
              <Grid container spacing={1} alignItems="center" sx={{ marginBottom: '15px' }}>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
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
               <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="flex-end" gap={1} flexWrap="wrap">
                    <Chip label="Site Visit Done" size="medium" sx={{ backgroundColor: '#468847', color: 'white', fontSize: '14px' }} />
                    <Chip label="LRS Done" size="medium" sx={{ backgroundColor: '#999999', color: 'white', fontSize: '14px' }} />
                    <Chip label="My Unique Call" size="medium" sx={{ backgroundColor: '#EFC21E', color: 'white', fontSize: '14px' }} />
                    <Chip label="Pinged" size="medium" sx={{ backgroundColor: '#B94A48', color: 'white', fontSize: '14px' }} />
                  </Box>
                </Grid>
              </Grid>

              {/* Status Info */}
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                Below Enquiries are under Must Follow Up Priority for ALL Users.
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
                      }}>No.</TableCell>
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
                      }}>Next Followup</TableCell>
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
                      }}>LRS User</TableCell>
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
                      }}>Action</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}>Days</TableCell>
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
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          backgroundColor: "aliceblue"
                        }}>
                          {getNameStyling(row.status, row.name)}
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
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue"
                        }}>
                          <Typography
                            variant="body2"
                            className={isDateOverdue(row.nextFollowup) ? 'blink_me' : ''}
                            sx={{
                              color: isDateOverdue(row.nextFollowup) ? '#f90' : '#333',
                              fontWeight: isDateOverdue(row.nextFollowup) ? 'bold' : 'normal',
                              fontSize: '12px'
                            }}
                          >
                            {row.nextFollowup}
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
                          {row.lrsUser}
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
                        <TableCell sx={{
                          color: '#333',
                          fontSize: '12px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'center',
                          backgroundColor: "aliceblue",
                          fontWeight: 'bold'
                        }}>
                          {calculateDays(row.submitDate, row.nextFollowup)}
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

export default Updatequestions;
