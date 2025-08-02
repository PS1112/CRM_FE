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
  InputLabel,
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectAssignedData = () => {
  const theme = useTheme();
  const [projectData, setProjectData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    const sampleProjectData = [
      {
        srNo: 1,
        username: 'Gurjeet',
        projectAssigned: 'creativeinnovationgurjant.com',
        projects: 15,
        lastUpdated: '01/08/2025 2:30 PM'
      },
      {
        srNo: 2,
        username: 'Maan Maninder',
        projectAssigned: 'waterseriesmohali.com',
        projects: 8,
        lastUpdated: '01/08/2025 1:45 PM'
      },
      {
        srNo: 3,
        username: 'Raghav',
        projectAssigned: 'digitalsolutionspunjab.in',
        projects: 12,
        lastUpdated: '01/08/2025 11:20 AM'
      },
      {
        srNo: 4,
        username: 'Vijay',
        projectAssigned: 'techservicesdelhi.co.in',
        projects: 6,
        lastUpdated: '31/07/2025 4:15 PM'
      },
      {
        srNo: 5,
        username: 'Gayatri',
        projectAssigned: 'businesssolutionschandigarh.com',
        projects: 20,
        lastUpdated: '31/07/2025 3:22 PM'
      },
      {
        srNo: 6,
        username: 'S.Manjeet',
        projectAssigned: 'waterseriesmohali.com',
        projects: 9,
        lastUpdated: '31/07/2025 2:10 PM'
      },
      {
        srNo: 7,
        username: 'Rishu',
        projectAssigned: 'creativeinnovationgurjant.com',
        projects: 14,
        lastUpdated: '30/07/2025 5:30 PM'
      },
      {
        srNo: 8,
        username: 'Rocky',
        projectAssigned: 'digitalsolutionspunjab.in',
        projects: 7,
        lastUpdated: '30/07/2025 1:25 PM'
      },
      {
        srNo: 9,
        username: 'Vimal',
        projectAssigned: 'techservicesdelhi.co.in',
        projects: 11,
        lastUpdated: '29/07/2025 3:45 PM'
      },
      {
        srNo: 10,
        username: 'Amit',
        projectAssigned: 'businesssolutionschandigarh.com',
        projects: 5,
        lastUpdated: '29/07/2025 12:30 PM'
      },
      {
        srNo: 11,
        username: 'Karan',
        projectAssigned: 'creativeinnovationgurjant.com',
        projects: 13,
        lastUpdated: '28/07/2025 4:20 PM'
      },
      {
        srNo: 12,
        username: 'Neeraj',
        projectAssigned: 'waterseriesmohali.com',
        projects: 16,
        lastUpdated: '28/07/2025 2:15 PM'
      },
      {
        srNo: 13,
        username: 'Hanish',
        projectAssigned: 'digitalsolutionspunjab.in',
        projects: 4,
        lastUpdated: '27/07/2025 11:50 AM'
      },
      {
        srNo: 14,
        username: 'Garish',
        projectAssigned: 'techservicesdelhi.co.in',
        projects: 18,
        lastUpdated: '27/07/2025 10:30 AM'
      },
      {
        srNo: 15,
        username: 'Rahul',
        projectAssigned: 'businesssolutionschandigarh.com',
        projects: 10,
        lastUpdated: '26/07/2025 3:40 PM'
      },
      {
        srNo: 16,
        username: 'Darshan',
        projectAssigned: 'creativeinnovationgurjant.com',
        projects: 9,
        lastUpdated: '26/07/2025 12:15 PM'
      },
      {
        srNo: 17,
        username: 'Kanwar',
        projectAssigned: 'waterseriesmohali.com',
        projects: 7,
        lastUpdated: '25/07/2025 4:30 PM'
      },
      {
        srNo: 18,
        username: 'Maninder',
        projectAssigned: 'digitalsolutionspunjab.in',
        projects: 15,
        lastUpdated: '25/07/2025 2:45 PM'
      },
      {
        srNo: 19,
        username: 'Gagan',
        projectAssigned: 'techservicesdelhi.co.in',
        projects: 12,
        lastUpdated: '24/07/2025 11:30 AM'
      },
      {
        srNo: 20,
        username: 'Simran',
        projectAssigned: 'businesssolutionschandigarh.com',
        projects: 8,
        lastUpdated: '24/07/2025 9:20 AM'
      },
      {
        srNo: 21,
        username: 'Arjun',
        projectAssigned: 'creativeinnovationgurjant.com',
        projects: 11,
        lastUpdated: '23/07/2025 3:15 PM'
      },
      {
        srNo: 22,
        username: 'Priya',
        projectAssigned: 'waterseriesmohali.com',
        projects: 6,
        lastUpdated: '23/07/2025 1:40 PM'
      },
      {
        srNo: 23,
        username: 'Rohit',
        projectAssigned: 'digitalsolutionspunjab.in',
        projects: 14,
        lastUpdated: '22/07/2025 4:50 PM'
      },
      {
        srNo: 24,
        username: 'Deepak',
        projectAssigned: 'techservicesdelhi.co.in',
        projects: 9,
        lastUpdated: '22/07/2025 2:25 PM'
      },
      {
        srNo: 25,
        username: 'Kavita',
        projectAssigned: 'businesssolutionschandigarh.com',
        projects: 17,
        lastUpdated: '21/07/2025 11:10 AM'
      }
    ];
    setProjectData(sampleProjectData);
    setFilteredData(sampleProjectData);
  }, []);

  // Get unique users and projects for dropdowns
  const uniqueUsers = ['All Users', ...new Set(projectData.map(item => item.username))];
  const uniqueProjects = [...new Set(projectData.map(item => item.projectAssigned))];

  // Filter data based on user selection only
  useEffect(() => {
    let filtered = projectData;

    // Filter by user
    if (selectedUser !== 'All Users') {
      filtered = filtered.filter(item => item.username === selectedUser);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedUser, projectData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle dropdown changes
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setSelectedProjects([]); // Clear selected projects when user changes
  };

  const handleProjectChange = (event) => {
    const value = event.target.value;
    setSelectedProjects(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle button actions with toast notifications
  const handleUpdate = () => {
    if (selectedUser === 'All Users' || selectedProjects.length === 0) {
      // Warning toast for invalid selection
      toast.warning('Please select a specific user and at least one project to assign!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Loading toast
    const toastId = toast.loading('Assigning projects...', {
      position: "top-right",
    });

    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        // Update the project data
        const updatedData = projectData.map(item => {
          if (item.username === selectedUser && selectedProjects.includes(item.projectAssigned)) {
            return {
              ...item,
              lastUpdated: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
              })
            };
          }
          return item;
        });

        setProjectData(updatedData);

        // Update loading toast to success
        toast.update(toastId, {
          render: `Successfully assigned ${selectedProjects.length} project(s) to ${selectedUser}!`,
          type: "success",
          isLoading: false,
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Clear selections after successful assignment
        setSelectedProjects([]);
        
      } catch (error) {
        // Update loading toast to error
        toast.update(toastId, {
          render: "❌ Failed to assign projects. Please try again!",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }, 1500); // Simulate 1.5 second API call
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    setSelectedUser('All Users');
    setSelectedProjects([]);
    
    // Info toast for cancel action
    toast.info('Selection cleared!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Calculate summary data
  const totalProjects = filteredData.reduce((sum, item) => sum + item.projects, 0);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header with Title */}
      <Typography variant="h5" sx={{
        fontWeight: '600',
        color: '#1F2A40',
        marginBottom: '20px'
      }}>
        📊 Below are Daily Count by User.
      </Typography>

      {/* Controls Section */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left side - Dropdowns */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          {/* Users Dropdown */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel sx={{ color: '#1F2A40', fontWeight: '500' }}>Users</InputLabel>
            <Select
              value={selectedUser}
              onChange={handleUserChange}
              label="Users"
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
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
                backgroundColor: 'white',
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
              {uniqueUsers.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Projects Dropdown with Multiple Selection */}
          <FormControl size="small" sx={{ minWidth: 300 }}>
            <InputLabel sx={{ color: '#1F2A40', fontWeight: '500' }}>
              {selectedUser === 'All Users' ? 'Select User First' : 'Assign Projects'}
            </InputLabel>
            <Select
              multiple
              disabled={selectedUser === 'All Users'}
              value={selectedProjects}
              onChange={handleProjectChange}
              input={<OutlinedInput label={selectedUser === 'All Users' ? 'Select User First' : 'Assign Projects'} />}
              renderValue={(selected) => 
                selected.length === 0 
                  ? 'No projects selected' 
                  : `${selected.length} project(s) selected`
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    maxHeight: 300,
                    '& .MuiMenuItem-root': {
                      fontSize: '14px',
                      color: '#1F2A40',
                      padding: '4px 16px',
                      '&:hover': {
                        backgroundColor: '#f0f7ff'
                      }
                    }
                  }
                }
              }}
              sx={{
                backgroundColor: 'white',
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
                  borderColor: selectedUser === 'All Users' ? '#ddd' : '#1976d2'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: selectedUser === 'All Users' ? '#ddd' : '#1976d2',
                  borderWidth: '2px'
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              {uniqueProjects.map((project) => (
                <MenuItem key={project} value={project}>
                  <Checkbox 
                    checked={selectedProjects.indexOf(project) > -1}
                    sx={{
                      color: '#1976d2',
                      '&.Mui-checked': {
                        color: '#1976d2'
                      }
                    }}
                  />
                  <ListItemText 
                    primary={project} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '13px',
                        fontWeight: selectedProjects.indexOf(project) > -1 ? '600' : '400'
                      }
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Right side - Buttons */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={selectedUser === 'All Users' || selectedProjects.length === 0}
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              padding: '8px 20px',
              borderRadius: '6px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#388e3c'
              },
              '&:disabled': {
                backgroundColor: '#cccccc',
                color: '#666666'
              }
            }}
          >
            Assign Projects
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: '#f44336',
              color: '#f44336',
              fontWeight: '600',
              fontSize: '14px',
              padding: '8px 20px',
              borderRadius: '6px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: '#ffebee'
              }
            }}
          >
            Cancel
          </Button>
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
          Showing: {filteredData.length} records | Selected User: {selectedUser} | 
          {selectedProjects.length > 0 && ` Selected Projects: ${selectedProjects.length} |`} Total Projects: {totalProjects}
        </Typography>
      </Box>

      {/* Selected Projects Display */}
      {selectedProjects.length > 0 && (
        <Box sx={{
          backgroundColor: '#e3f2fd',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '16px',
          border: '1px solid #1976d2'
        }}>
          <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '8px', color: '#1976d2' }}>
            Selected Projects for {selectedUser}:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedProjects.map((project) => (
              <Chip
                key={project}
                label={project}
                size="small"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '12px'
                }}
              />
            ))}
          </Box>
        </Box>
      )}

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
                Username
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Project Assigned
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Projects
              </TableCell>
              <TableCell sx={{
                backgroundColor: '#f8f9fa',
                fontWeight: '600',
                fontSize: '14px',
                color: '#1F2A40',
                borderBottom: '2px solid #e0e0e0'
              }}>
                Last Update
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow
                key={row.srNo}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#dbdbdb',
                  // Highlight selected projects
                  ...(selectedProjects.includes(row.projectAssigned) && selectedUser === row.username && {
                    backgroundColor: '#e8f5e8',
                    border: '2px solid #4caf50'
                  })
                }}
              >
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', color: '#000000' }}>
                  {row.srNo}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px', fontWeight: '500', color: '#000000' }}>
                  {row.username}
                </TableCell>
                <TableCell sx={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  color: '#000000',
                  maxWidth: '250px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {row.projectAssigned}
                  {selectedProjects.includes(row.projectAssigned) && selectedUser === row.username && (
                    <Chip
                      label="Selected"
                      size="small"
                      sx={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        fontSize: '10px',
                        height: '20px',
                        marginLeft: '8px'
                      }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', padding: '8px 16px' }}>
                  <Chip
                    label={row.projects}
                    size="small"
                    sx={{
                      backgroundColor: row.projects > 15 ? '#4caf50' :
                        row.projects > 10 ? '#2196f3' :
                          row.projects > 5 ? '#ff9800' : '#f44336',
                      color: 'white',
                      fontWeight: '600',
                      minWidth: '32px'
                    }}
                  />
                </TableCell>
                <TableCell sx={{
                  fontSize: '12px',
                  padding: '8px 16px',
                  color: '#000000',
                }}>
                  {row.lastUpdated}
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </Box>
  );
};

export default ProjectAssignedData;