// manualentrydata.jsx
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
  Grid
} from '@mui/material';

const ManualEntryReportsData = () => {
  const theme = useTheme();
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [currentMonthlyPage, setCurrentMonthlyPage] = useState(1);
  const [currentDailyPage, setCurrentDailyPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Sample data for Monthly Entry
  useEffect(() => {
    const sampleMonthlyData = [
      { srNo: 1, name: 'Gurjeet', monthlyEntry: 1 },
      { srNo: 2, name: 'Maan Maninder', monthlyEntry: 5 },
      { srNo: 3, name: 'Raghav', monthlyEntry: 2 },
      { srNo: 4, name: 'Vijay', monthlyEntry: 8 },
      { srNo: 5, name: 'Vimal', monthlyEntry: 3 },
      { srNo: 6, name: 'Rishu', monthlyEntry: 12 },
      { srNo: 7, name: 'Rocky', monthlyEntry: 7 },
      { srNo: 8, name: 'S Manjeet', monthlyEntry: 4 },
      { srNo: 9, name: 'Amit', monthlyEntry: 9 },
      { srNo: 10, name: 'Karan', monthlyEntry: 6 },
      { srNo: 11, name: 'Neeraj', monthlyEntry: 11 },
      { srNo: 12, name: 'Hanish', monthlyEntry: 2 },
      { srNo: 13, name: 'Garish', monthlyEntry: 15 },
      { srNo: 14, name: 'Rahul', monthlyEntry: 1 },
      { srNo: 15, name: 'Darshan', monthlyEntry: 8 }
    ];

    const sampleDailyData = [
      { srNo: 1, name: 'Gurjeet', todayEntry: 1 },
      { srNo: 2, name: 'Maan Maninder', todayEntry: 0 },
      { srNo: 3, name: 'Raghav', todayEntry: 3 },
      { srNo: 4, name: 'Vijay', todayEntry: 2 },
      { srNo: 5, name: 'Vimal', todayEntry: 1 },
      { srNo: 6, name: 'Rishu', todayEntry: 4 },
      { srNo: 7, name: 'Rocky', todayEntry: 0 },
      { srNo: 8, name: 'S Manjeet', todayEntry: 2 },
      { srNo: 9, name: 'Amit', todayEntry: 1 },
      { srNo: 10, name: 'Karan', todayEntry: 0 },
      { srNo: 11, name: 'Neeraj', todayEntry: 5 },
      { srNo: 12, name: 'Hanish', todayEntry: 1 },
      { srNo: 13, name: 'Garish', todayEntry: 3 },
      { srNo: 14, name: 'Rahul', todayEntry: 0 },
      { srNo: 15, name: 'Darshan', todayEntry: 2 }
    ];

    setMonthlyData(sampleMonthlyData);
    setDailyData(sampleDailyData);
  }, []);

  // Calculate pagination for Monthly data
  const totalMonthlyPages = Math.ceil(monthlyData.length / rowsPerPage);
  const monthlyStartIndex = (currentMonthlyPage - 1) * rowsPerPage;
  const monthlyEndIndex = monthlyStartIndex + rowsPerPage;
  const currentMonthlyData = monthlyData.slice(monthlyStartIndex, monthlyEndIndex);

  // Calculate pagination for Daily data
  const totalDailyPages = Math.ceil(dailyData.length / rowsPerPage);
  const dailyStartIndex = (currentDailyPage - 1) * rowsPerPage;
  const dailyEndIndex = dailyStartIndex + rowsPerPage;
  const currentDailyData = dailyData.slice(dailyStartIndex, dailyEndIndex);

  // Handle page changes
  const handleMonthlyPageChange = (event, value) => {
    setCurrentMonthlyPage(value);
  };

  const handleDailyPageChange = (event, value) => {
    setCurrentDailyPage(value);
  };

  // Calculate totals
  const monthlyTotal = monthlyData.reduce((sum, item) => sum + item.monthlyEntry, 0);
  const dailyTotal = dailyData.reduce((sum, item) => sum + item.todayEntry, 0);

  const TableComponent = ({ data, type, currentPage, totalPages, onPageChange, startIndex, endIndex, total }) => (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        marginBottom: '12px'
      }}>
        <Typography variant="h6" sx={{ fontWeight: '600', color: '#1F2A40' }}>
          📊 Below are Manual Entry {type} by User.
        </Typography>
        
        <Chip
          label={`Total ${type}: ${total}`}
          sx={{
            backgroundColor: type === 'Monthly' ? '#2196f3' : '#ff9800',
            color: 'white',
            fontWeight: '600',
            fontSize: '12px'
          }}
        />
      </Box>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '350px',
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
                {type === 'Monthly' ? 'Monthly Entry' : 'Today Entry'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
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
                    label={type === 'Monthly' ? row.monthlyEntry : row.todayEntry}
                    size="small"
                    sx={{
                      backgroundColor: (type === 'Monthly' ? row.monthlyEntry : row.todayEntry) > 5 ? '#4caf50' :
                                      (type === 'Monthly' ? row.monthlyEntry : row.todayEntry) > 2 ? '#ff9800' : 
                                      (type === 'Monthly' ? row.monthlyEntry : row.todayEntry) > 0 ? '#2196f3' : '#f44336',
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
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Records Info */}
        <Box sx={{
          fontSize: '14px',
          color: '#666'
        }}>
          <Typography variant="body2">
            Showing {startIndex + 1}-{Math.min(endIndex, type === 'Monthly' ? monthlyData.length : dailyData.length)} of {type === 'Monthly' ? monthlyData.length : dailyData.length} records
          </Typography>
        </Box>

        {/* Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
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

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Main Header */}
      <Typography variant="h5" sx={{ 
        fontWeight: '600', 
        color: '#1F2A40', 
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        📈 Manual Entry Reports
      </Typography>

      {/* Two Tables Layout */}
      <Grid container spacing={3}>
        {/* Monthly Entry Table */}
        <Grid item xs={12} lg={6}>
          <TableComponent
            data={currentMonthlyData}
            type="Monthly"
            currentPage={currentMonthlyPage}
            totalPages={totalMonthlyPages}
            onPageChange={handleMonthlyPageChange}
            startIndex={monthlyStartIndex}
            endIndex={monthlyEndIndex}
            total={monthlyTotal}
          />
        </Grid>

        {/* Daily Entry Table */}
        <Grid item xs={12} lg={6}>
          <TableComponent
            data={currentDailyData}
            type="Daily"
            currentPage={currentDailyPage}
            totalPages={totalDailyPages}
            onPageChange={handleDailyPageChange}
            startIndex={dailyStartIndex}
            endIndex={dailyEndIndex}
            total={dailyTotal}
          />
        </Grid>
      </Grid>

      {/* Summary Section */}
      <Box sx={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <Chip
          label={`Total Monthly Entries: ${monthlyTotal}`}
          sx={{
            backgroundColor: '#2196f3',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            padding: '8px 12px'
          }}
        />
        <Chip
          label={`Total Daily Entries: ${dailyTotal}`}
          sx={{
            backgroundColor: '#ff9800',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            padding: '8px 12px'
          }}
        />
      </Box>
    </Box>
  );
};

export default ManualEntryReportsData;