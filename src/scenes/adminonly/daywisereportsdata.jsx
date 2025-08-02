// daywisereportsdata.jsx
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

const DaywiseReportsData = () => {
  const theme = useTheme();
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Changed from 5 to 10

  // Sample data - replace with your actual data source
  useEffect(() => {
    // This would typically come from an API call
    const sampleData = [
      {
        srNo: 1,
        name: 'Gurjeet',
        date: '1 August, 2025',
        discussed: 19
      },
      {
        srNo: 2,
        name: 'Maan Maninder',
        date: '1 August, 2025',
        discussed: 2
      },
      {
        srNo: 3,
        name: 'Raghav',
        date: '1 August, 2025',
        discussed: 5
      },
      {
        srNo: 4,
        name: 'Vijay',
        date: '1 August, 2025',
        discussed: 8
      },
      {
        srNo: 5,
        name: 'Vimal',
        date: '31 July, 2025',
        discussed: 1
      },
      {
        srNo: 6,
        name: 'Maan Maninder',
        date: '31 July, 2025',
        discussed: 20
      },
      {
        srNo: 7,
        name: 'Raghav',
        date: '31 July, 2025',
        discussed: 14
      },
      {
        srNo: 8,
        name: 'Rishu',
        date: '31 July, 2025',
        discussed: 2
      },
      {
        srNo: 9,
        name: 'Rocky',
        date: '31 July, 2025',
        discussed: 1
      },
      {
        srNo: 10,
        name: 'S Manjeet',
        date: '31 July, 2025',
        discussed: 2
      },
      {
        srNo: 11,
        name: 'Vijay',
        date: '31 July, 2025',
        discussed: 1
      },
      {
        srNo: 12,
        name: 'Gurjeet',
        date: '30 July, 2025',
        discussed: 5
      },
      // Add more sample data to see pagination in action
      {
        srNo: 13,
        name: 'Amit',
        date: '29 July, 2025',
        discussed: 7
      },
      {
        srNo: 14,
        name: 'Karan',
        date: '29 July, 2025',
        discussed: 3
      },
      {
        srNo: 15,
        name: 'Neeraj',
        date: '28 July, 2025',
        discussed: 9
      },
      {
        srNo: 16,
        name: 'Hanish',
        date: '28 July, 2025',
        discussed: 12
      },
      {
        srNo: 17,
        name: 'Garish',
        date: '27 July, 2025',
        discussed: 6
      },
      {
        srNo: 18,
        name: 'Rahul',
        date: '27 July, 2025',
        discussed: 4
      }
    ];
    setReportData(sampleData);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(reportData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = reportData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate summary data
  const currentMonthTotal = reportData.filter(item =>
    item.date.includes('August')
  ).reduce((sum, item) => sum + item.discussed, 0);

  const userSummary = {
    kanwar: 0,
    maninder: reportData.filter(item => item.name.includes('Maninder')).reduce((sum, item) => sum + item.discussed, 0),
    manjit: 0,
    gavan: 0,
    gayatri: 0,
    amit: 0,
    garish: 0,
    rahul: 0,
    neeraj: 0,
    hanish: 0,
    karan: 0
  };

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
          📊 Below are Daily Count by User.
        </Typography>

        <Chip
          label={`Current Month Counter: Total: ${currentMonthTotal}`}
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }}
        />
      </Box>

      {/* User Summary Bar */}
      <Box sx={{
        backgroundColor: '#cdcbcb',
        padding: '8px 12px',
        borderRadius: '4px',
        marginBottom: '16px',
        fontSize: '12px',
        color: '#000000',
      }}>
        <Typography variant="body2">
          Kanwar: {userSummary.kanwar}, Maninder Maan: {userSummary.maninder}, Manjit: {userSummary.manjit},
          Gavan: {userSummary.gavan}, Gayatri: {userSummary.gayatri}, Amit: {userSummary.amit},
          Maninder: {userSummary.maninder}, Garish: {userSummary.garish}, Rahul: {userSummary.rahul},
          Neeraj: {userSummary.neeraj}, Hanish: {userSummary.hanish}, Karan: {userSummary.karan}
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
                Discussed
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
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px' }}>
                  <Chip
                    label={row.discussed}
                    size="small"
                    sx={{
                      backgroundColor: row.discussed > 10 ? '#4caf50' :
                        row.discussed > 5 ? '#ff9800' : '#2196f3',
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
            Showing {startIndex + 1}-{Math.min(endIndex, reportData.length)} of {reportData.length} records
          </Typography>
        </Box>

        {/* Pagination with Dark Colors */}
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
                color: '#333', // Dark color for pagination items
                borderColor: '#333',
                '&:hover': {
                  backgroundColor: '#f0f0f0'
                }
              },
              '& .Mui-selected': {
                backgroundColor: '#333 !important', // Dark background for selected page
                color: 'white !important'
              },
              '& .MuiPaginationItem-previousNext': {
                color: '#333 !important', // Dark color for arrows
                '&:hover': {
                  backgroundColor: '#f0f0f0'
                }
              },
              '& .MuiPaginationItem-firstLast': {
                color: '#333 !important', // Dark color for first/last buttons
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

export default DaywiseReportsData;