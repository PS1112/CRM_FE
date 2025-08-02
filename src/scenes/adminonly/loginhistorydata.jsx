// loginhistorydata.jsx
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
  Stack
} from '@mui/material';

const LoginHistoryData = () => {
  const theme = useTheme();
  const [loginData, setLoginData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Sample data with AM/PM time format
  useEffect(() => {
    const sampleLoginData = [
      {
        srNo: 1,
        name: 'Kanwar',
        date: '3 May, 2025',
        time: '09:22:58 AM',
        ip: '223.178.211.116'
      },
      {
        srNo: 2,
        name: 'Gayatri',
        date: '3 May, 2025',
        time: '09:23:00 AM',
        ip: '223.178.211.116'
      },
      {
        srNo: 3,
        name: 'Monica',
        date: '3 May, 2025',
        time: '09:39:32 AM',
        ip: '223.178.211.116'
      },
      {
        srNo: 4,
        name: 'Manjeet',
        date: '3 May, 2025',
        time: '09:39:33 AM',
        ip: '223.178.211.116'
      },
      {
        srNo: 5,
        name: 'Maninder',
        date: '3 May, 2025',
        time: '10:07:47 AM',
        ip: '223.178.211.116'
      },
      {
        srNo: 6,
        name: 'Gurjeet',
        date: '3 May, 2025',
        time: '11:34:07 AM',
        ip: '103.215.251.42'
      },
      {
        srNo: 7,
        name: 'Gayatri',
        date: '3 May, 2025',
        time: '11:42:16 AM',
        ip: '122.173.26.253'
      },
      {
        srNo: 8,
        name: 'Gurjeet',
        date: '3 May, 2025',
        time: '11:52:10 AM',
        ip: '103.215.251.42'
      },
      {
        srNo: 9,
        name: 'Vijay',
        date: '3 May, 2025',
        time: '12:06:20 PM',
        ip: '103.215.251.42'
      },
      {
        srNo: 10,
        name: 'Vijay',
        date: '3 May, 2025',
        time: '12:37:18 PM',
        ip: '103.215.251.42'
      },
      {
        srNo: 11,
        name: 'Raghav',
        date: '3 May, 2025',
        time: '12:41:55 PM',
        ip: '122.173.26.253'
      },
      {
        srNo: 12,
        name: 'Gayatri',
        date: '3 May, 2025',
        time: '12:48:31 PM',
        ip: '122.173.26.253'
      },
      {
        srNo: 13,
        name: 'Manjeet',
        date: '3 May, 2025',
        time: '12:52:14 PM',
        ip: '106.217.185.212'
      },
      {
        srNo: 14,
        name: 'Maninder',
        date: '2 May, 2025',
        time: '09:15:22 AM',
        ip: '103.215.251.42'
      },
      {
        srNo: 15,
        name: 'Rishu',
        date: '2 May, 2025',
        time: '10:30:45 AM',
        ip: '122.173.26.253'
      },
      {
        srNo: 16,
        name: 'Rocky',
        date: '2 May, 2025',
        time: '11:22:33 AM',
        ip: '103.215.251.42'
      },
      {
        srNo: 17,
        name: 'Vimal',
        date: '2 May, 2025',
        time: '02:18:29 PM',
        ip: '223.178.211.116'
      },
      {
        srNo: 18,
        name: 'Raghav',
        date: '1 May, 2025',
        time: '04:45:12 PM',
        ip: '106.217.185.212'
      }
    ];
    setLoginData(sampleLoginData);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(loginData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = loginData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate summary data
  const todayLogins = loginData.filter(item => 
    item.date.includes('3 May')
  ).length;

  const uniqueUsers = [...new Set(loginData.map(item => item.name))].length;
  const uniqueIPs = [...new Set(loginData.map(item => item.ip))].length;

  // Get user login counts
  const userLoginCounts = loginData.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header with Summary */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0'
      }}>
        <Typography variant="h5" sx={{ fontWeight: '600', color: '#1F2A40' }}>
          🔐 Below are Daily Count by User.
        </Typography>

        <Chip
          label={`Today's Logins: ${todayLogins}`}
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }}
        />
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
          Total Users: {uniqueUsers} | Unique IPs: {uniqueIPs} | 
          {Object.entries(userLoginCounts).map(([user, count]) => 
            ` ${user}: ${count}`
          ).join(',')}
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
                Name
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Date
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Time
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                IP
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
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', fontWeight: '500', color: '#000000' }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', color: '#000000' }}>
                  {row.date}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '14px', 
                  padding: '8px 16px', 
                  color: '#000000',
                }}>
                  {row.time}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '13px', 
                  padding: '8px 16px', 
                  color: '#000000',
                }}>
                  <Chip
                    label={row.ip}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '11px',
                      height: '24px',
                      borderColor: '#2196f3',
                      color: '#2196f3',
                      '& .MuiChip-label': {
                        padding: '0 8px'
                      }
                    }}
                  />
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
            Showing {startIndex + 1}-{Math.min(endIndex, loginData.length)} of {loginData.length} records
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

export default LoginHistoryData;