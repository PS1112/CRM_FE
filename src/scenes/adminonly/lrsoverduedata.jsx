// lrsoverduedata.jsx
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

const LrsOverDueData = () => {
  const theme = useTheme();
  const [lrsData, setLrsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Sample LRS overdue data based on the image
  useEffect(() => {
    const sampleLrsData = [
      {
        srNo: 1,
        name: 'Kanwar',
        pending: 6
      },
      {
        srNo: 2,
        name: 'Gayatri',
        pending: 5
      },
      {
        srNo: 3,
        name: 'S.Manjeet',
        pending: 34
      },
      {
        srNo: 4,
        name: 'Gurjeet',
        pending: 12
      },
      {
        srNo: 5,
        name: 'Maan Maninder',
        pending: 8
      },
      {
        srNo: 6,
        name: 'Raghav',
        pending: 15
      },
      {
        srNo: 7,
        name: 'Vijay',
        pending: 3
      },
      {
        srNo: 8,
        name: 'Vimal',
        pending: 9
      },
      {
        srNo: 9,
        name: 'Rishu',
        pending: 7
      },
      {
        srNo: 10,
        name: 'Rocky',
        pending: 11
      },
      {
        srNo: 11,
        name: 'Amit',
        pending: 4
      },
      {
        srNo: 12,
        name: 'Karan',
        pending: 13
      },
      {
        srNo: 13,
        name: 'Neeraj',
        pending: 2
      },
      {
        srNo: 14,
        name: 'Hanish',
        pending: 18
      },
      {
        srNo: 15,
        name: 'Garish',
        pending: 6
      }
    ];
    setLrsData(sampleLrsData);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(lrsData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = lrsData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate summary data
  const totalPending = lrsData.reduce((sum, item) => sum + item.pending, 0);
  const highPendingCount = lrsData.filter(item => item.pending > 10).length;
  const criticalPendingCount = lrsData.filter(item => item.pending > 20).length;

  // Get user pending counts for summary
  const userPendingSummary = lrsData.reduce((acc, item) => {
    acc[item.name] = item.pending;
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
          📋 Below are LRS Fresh Due & Over Dues of all users till today:
        </Typography>

        <Chip
          label={`Total Records: ${lrsData.length}`}
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
          Total Pending: {totalPending} | High Priority (>10): {highPendingCount} | Critical (>20): {criticalPendingCount} | 
          {Object.entries(userPendingSummary).slice(0, 5).map(([user, count]) => 
            ` ${user}: ${count}`
          ).join(',')}
          {Object.keys(userPendingSummary).length > 5 && '...'}
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
                Pending
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
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px' }}>
                  <Chip
                    label={row.pending}
                    size="small"
                    sx={{
                      backgroundColor: row.pending > 20 ? '#f44336' :  // Red for critical (>20)
                                      row.pending > 10 ? '#ff9800' :   // Orange for high (>10)
                                      row.pending > 5 ? '#2196f3' :    // Blue for medium (>5)
                                      '#4caf50',                       // Green for low (<=5)
                      color: 'white',
                      fontWeight: '600',
                      minWidth: '32px'
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
            Showing {startIndex + 1}-{Math.min(endIndex, lrsData.length)} of {lrsData.length} records
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

export default LrsOverDueData;