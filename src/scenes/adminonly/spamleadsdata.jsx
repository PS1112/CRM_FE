// spamleadsdata.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel
} from '@mui/material';

const SpamLeadsData = () => {
  const theme = useTheme();
  const [spamData, setSpamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedWebsite, setSelectedWebsite] = useState('All Websites');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample spam leads data
  useEffect(() => {
    const sampleSpamData = [
      {
        srNo: 1,
        website: 'creativeinnovationgurjant.com',
        name: 'Devloper Team',
        email: 'gayatri.testing@gmail.com',
        mobile: '+91 9874563210',
        submitDate: '26/07/2025 5:01 PM',
        ipAddress: '92.235.252.45',
        userRemarks: 'Gayatri - testing'
      },
      {
        srNo: 2,
        website: 'waterseriesmohali.com',
        name: 'Dr QB',
        email: 'testing@example.com',
        mobile: 'Null',
        submitDate: '25/07/2025 3:02 PM',
        ipAddress: '103.215.251.42',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 3,
        website: 'waterseriesmohali.com',
        name: '755-1-0-0-0-01',
        email: 'testing@example.com',
        mobile: 'Null',
        submitDate: '24/07/2025 3:03 PM',
        ipAddress: '122.173.26.253',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 4,
        website: 'waterseriesmohali.com',
        name: 'Q-275-67',
        email: 'testing@example.com',
        mobile: 'Null',
        submitDate: '23/07/2025 2:56 PM',
        ipAddress: '106.217.185.212',
        userRemarks: 'Kanwar - Null 20 Home Lead'
      },
      {
        srNo: 5,
        website: 'waterseriesmohali.com',
        name: 't4est',
        email: 'testing@example.com',
        mobile: '+48 3214569875',
        submitDate: '22/07/2025 3:08 PM',
        ipAddress: '223.178.211.116',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 6,
        website: 'waterseriesmohali.com',
        name: 'UeFwaa',
        email: 'testing@example.com',
        mobile: 'Null',
        submitDate: '21/07/2025 3:05 PM',
        ipAddress: '103.215.251.42',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 7,
        website: 'waterseriesmohali.com',
        name: 'testnew',
        email: 'testing@example.com',
        mobile: '+1 5896321475',
        submitDate: '20/07/2025 3:09 PM',
        ipAddress: '122.173.26.253',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 8,
        website: 'waterseriesmohali.com',
        name: 'UeFwaa',
        email: 'testing@example.com',
        mobile: 'Null',
        submitDate: '19/07/2025 3:10 PM',
        ipAddress: '92.235.252.45',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 9,
        website: 'waterseriesmohali.com',
        name: 'Sample',
        email: 'sample@mail.com',
        mobile: 'Null',
        submitDate: '18/07/2025 3:09 PM',
        ipAddress: '106.217.185.212',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 10,
        website: 'waterseriesmohali.com',
        name: 'newtest',
        email: 'testing@mail.com',
        mobile: '+91 1236547895',
        submitDate: '17/07/2025 2:08 PM',
        ipAddress: '223.178.211.116',
        userRemarks: 'Gayatri - Null 20 Home Lead'
      },
      {
        srNo: 11,
        website: 'creativeinnovationgurjant.com',
        name: 'John Smith',
        email: 'spam.bot@fakemail.com',
        mobile: '+1234567890',
        submitDate: '16/07/2025 4:15 PM',
        ipAddress: '185.220.101.42',
        userRemarks: 'Automated spam bot'
      },
      {
        srNo: 12,
        website: 'waterseriesmohali.com',
        name: 'Marketing',
        email: 'promo@spamsite.net',
        mobile: 'Null',
        submitDate: '15/07/2025 1:22 PM',
        ipAddress: '94.142.241.111',
        userRemarks: 'Promotional spam'
      },
      {
        srNo: 13,
        website: 'creativeinnovationgurjant.com',
        name: 'SEO Expert',
        email: 'seo@randomdomain.xyz',
        mobile: 'Null',
        submitDate: '14/07/2025 11:30 AM',
        ipAddress: '192.168.1.100',
        userRemarks: 'SEO spam message'
      },
      {
        srNo: 14,
        website: 'waterseriesmohali.com',
        name: 'Web Designer',
        email: 'design@fakecompany.co',
        mobile: '9876543210',
        submitDate: '13/07/2025 2:45 PM',
        ipAddress: '203.192.12.34',
        userRemarks: 'Design service spam'
      },
      {
        srNo: 15,
        website: 'creativeinnovationgurjant.com',
        name: 'Digital Agency',
        email: 'contact@spamagency.biz',
        mobile: 'Null',
        submitDate: '12/07/2025 10:15 AM',
        ipAddress: '172.16.254.1',
        userRemarks: 'Agency promotional spam'
      }
    ];
    setSpamData(sampleSpamData);
    setFilteredData(sampleSpamData);
  }, []);

  // Get unique websites for dropdown
  const uniqueWebsites = ['All Websites', ...new Set(spamData.map(item => item.website))];

  // Filter data based on website and search query
  useEffect(() => {
    let filtered = spamData;

    // Filter by website
    if (selectedWebsite !== 'All Websites') {
      filtered = filtered.filter(item => item.website === selectedWebsite);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userRemarks.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedWebsite, searchQuery, spamData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle website dropdown change
  const handleWebsiteChange = (event) => {
    setSelectedWebsite(event.target.value);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Calculate summary data
  const todaySpam = filteredData.filter(item =>
    item.submitDate.includes('26/07/2025')
  ).length;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header with Summary and Controls */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <Typography variant="h5" sx={{ fontWeight: '600', color: '#1F2A40' }}>
          🚫 Below are Daily Count by User.
        </Typography>

        {/* Controls Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {/* Website Dropdown */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: '#1F2A40', fontWeight: '500' }}>All Websites</InputLabel>
            <Select
              value={selectedWebsite}
              onChange={handleWebsiteChange}
              label="All Websites"
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    border: '1px solid #757070ff',
                    '& .MuiMenuItem-root': {
                      fontSize: '14px',
                      color: '#1F2A40',
                      padding: '8px 16px',
                      '&:hover': {
                        backgroundColor: '#f0f7ff'
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#e3f2fd',
                        color: '#1F2A40',
                        '&:hover': {
                          backgroundColor: '#e3f2fd'
                        }
                      }
                    }
                  }
                }
              }}
              sx={{
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                color: '#1F2A40',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                  color: '#1F2A40'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ddd'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: '2px'
                }
              }}
            >
              {uniqueWebsites.map((website) => (
                <MenuItem key={website} value={website}>
                  {website}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Search by Email/Mobile/Name"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              minWidth: 250,
              '& .MuiInputBase-input': {
                padding: '8px 12px',
                fontSize: '14px',
                color: '#000000' // Black color for typed text
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd'
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '2px'
                }
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#666', // Changed to grey for better contrast
                opacity: 1
              }
            }}
          />


          {/* Total Spam Chip */}
          <Chip
            label={`Total Spam: ${filteredData.length}`}
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px'
            }}
          />
        </Box>
      </Box>

      {/* Summary Stats Bar */}
      <Box sx={{
        backgroundColor: '#cdcbcb',
        padding: '8px 12px',
        borderRadius: '4px',
        marginBottom: '16px',
        fontSize: '12px',
        color: '#000000',
      }}>
        <Typography variant="body2">
          Showing: {filteredData.length} records | Selected Website: {selectedWebsite} |
          {searchQuery && ` Search: "${searchQuery}" | `}
          Today's entries: {todaySpam}
        </Typography>
      </Box>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          marginBottom: '16px'
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Sr No.
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Website
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Name
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Email
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Mobile
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Submit Date
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                IP Address
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                User Remarks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow
                key={row.srNo}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#dbdbdb'
                }}
              >
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', color: '#000000' }}>
                  {row.srNo}
                </TableCell>
                <TableCell sx={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  color: '#000000',
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {row.website}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', fontWeight: '500', color: '#000000' }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  color: '#000000',
                  maxWidth: '180px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {row.email}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', color: '#000000' }}>
                  <Chip
                    label={row.mobile}
                    size="small"
                    sx={{
                      backgroundColor: row.mobile === 'Null' ? '#f44336' : '#4caf50',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '11px'
                    }}
                  />
                </TableCell>
                <TableCell sx={{
                  fontSize: '12px',
                  padding: '8px 16px',
                  color: '#000000',
                  fontFamily: 'monospace'
                }}>
                  {row.submitDate}
                </TableCell>
                <TableCell sx={{
                  fontSize: '12px',
                  padding: '8px 16px',
                  color: '#000000',
                  fontFamily: 'monospace'
                }}>
                  <Chip
                    label={row.ipAddress}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '10px',
                      height: '24px',
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      '& .MuiChip-label': {
                        padding: '0 6px'
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  color: '#000000',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {row.userRemarks}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination and Info */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Records Info */}
        <Box sx={{
          fontSize: '14px',
          color: '#666'
        }}>
          <Typography variant="body2">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} records
          </Typography>
        </Box>

        {/* Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="medium"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                borderColor: '#333',
                '&:hover': {
                  backgroundColor: '#f0f0f0'
                }
              },
              '& .Mui-selected': {
                backgroundColor: '#333 !important',
                color: 'white !important'
              },
              '& .MuiPaginationItem-previousNext': {
                color: '#333 !important',
                '&:hover': {
                  backgroundColor: '#f0f0f0'
                }
              },
              '& .MuiPaginationItem-firstLast': {
                color: '#333 !important',
                '&:hover': {
                  backgroundColor: '#f0f0f0'
                }
              }
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default SpamLeadsData;