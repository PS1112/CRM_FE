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
    IconButton,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid
} from '@mui/material';
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    FirstPage,
    LastPage
} from '@mui/icons-material';
import axios from 'axios';
import { postApi } from "../../services/axiosInstance";
import { API_PATH } from "../../services/apipath";
import { toast } from "react-toastify";

const WebsiteList = () => {
    const [websites, setWebsites] = useState([]);
    const [filteredWebsites, setFilteredWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);

    // Delete confirmation modal states
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [websiteToDelete, setWebsiteToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Edit modal states
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editFormData, setEditFormData] = useState({
        website: '',
        name: '',
        url: '',
        city: '',
        address: ''
    });
    const [websiteToEdit, setWebsiteToEdit] = useState(null);

    // Fetch websites data
    const fetchWebsites = async () => {
        try {
            setLoading(true);
            const res = await postApi(API_PATH.WEBSITES.GET_WEBSITES, {
                page: 1,
                limit: 100
            });

            if (res.status === 200) {
                setWebsites(res.data.data);
                setFilteredWebsites(res.data.data);
                setError('');
            } else {
                setError('Failed to fetch websites');
            }
        } catch (error) {
            console.error('Error fetching websites:', error);
            setError('Error fetching websites. Please try again.');
            toast.error('Error fetching websites');
        } finally {
            setLoading(false);
        }
    };

    // Filter websites based on search query
    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(0);
        if (!query.trim()) {
            setFilteredWebsites(websites);
        } else {
            const filtered = websites.filter(website =>
                website.name?.toLowerCase().includes(query.toLowerCase()) ||
                website.website?.toLowerCase().includes(query.toLowerCase()) ||
                website.city?.toLowerCase().includes(query.toLowerCase()) ||
                website.url?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredWebsites(filtered);
        }
    };

    useEffect(() => {
        fetchWebsites();
    }, []);

    // Edit handlers
    const handleEdit = (website) => {
        setWebsiteToEdit(website);
        setEditFormData({
            website: website.website || '',
            name: website.name || '',
            url: website.url || '',
            city: website.city || '',
            address: website.address || ''
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setWebsiteToEdit(null);
        setEditFormData({
            website: '',
            name: '',
            url: '',
            city: '',
            address: ''
        });
        setEditLoading(false);
    };

    const handleEditFormChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitEdit = async () => {
        const websiteId = websiteToEdit?.id || websiteToEdit?._id || websiteToEdit?.website_id;

        if (!websiteToEdit || !websiteId) {
            toast.error('Invalid website data. Cannot update.');
            return;
        }

        // Basic validation
        if (!editFormData.name.trim()) {
            toast.error('Website name is required');
            return;
        }

        try {
            setEditLoading(true);

            const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('accessToken');

            const updateData = {
                ...editFormData,
                id: websiteId
            };

            const response = await axios.put(`${API_PATH.WEBSITES.UPDATE_WEBSITES}/${websiteId}`, updateData, {
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                // Update the website in local state
                const updatedWebsites = websites.map(website => {
                    const currentId = website.id || website._id || website.website_id;
                    if (currentId === websiteId) {
                        return { ...website, ...editFormData };
                    }
                    return website;
                });

                setWebsites(updatedWebsites);

                // Update filtered websites as well
                const updatedFilteredWebsites = filteredWebsites.map(website => {
                    const currentId = website.id || website._id || website.website_id;
                    if (currentId === websiteId) {
                        return { ...website, ...editFormData };
                    }
                    return website;
                });
                setFilteredWebsites(updatedFilteredWebsites);

                toast.success('Website updated successfully!');
                handleCloseEditModal();
            } else {
                toast.error('Failed to update website');
            }
        } catch (error) {
            console.error('Error updating website:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error updating website. Please try again.';
            toast.error(errorMessage);
        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = (website) => {
        setWebsiteToDelete(website);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setWebsiteToDelete(null);
        setDeleteLoading(false);
    };

    const handleConfirmDelete = async () => {
        const websiteId = websiteToDelete?.id || websiteToDelete?._id || websiteToDelete?.website_id;

        if (!websiteToDelete || !websiteId) {
            toast.error('Invalid website data. Cannot delete.');
            return;
        }

        try {
            setDeleteLoading(true);

            const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('accessToken');

            const response = await axios.delete(`${API_PATH.WEBSITES.REMOVE_WEBSITES}/${websiteId}`, {
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 204) {
                const updatedWebsites = websites.filter(website => {
                    const currentId = website.id || website._id || website.website_id;
                    return currentId !== websiteId;
                });
                setWebsites(updatedWebsites);

                const updatedFilteredWebsites = filteredWebsites.filter(website => {
                    const currentId = website.id || website._id || website.website_id;
                    return currentId !== websiteId;
                });
                setFilteredWebsites(updatedFilteredWebsites);

                toast.success('Website deleted successfully!');
                handleCloseDeleteModal();

                const newTotalPages = Math.ceil(updatedFilteredWebsites.length / rowsPerPage);
                if (page >= newTotalPages && newTotalPages > 0) {
                    setPage(newTotalPages - 1);
                }
            } else {
                toast.error('Failed to delete website');
            }
        } catch (error) {
            console.error('Error deleting website:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error deleting website. Please try again.';
            toast.error(errorMessage);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleView = (website) => {
        if (website.url) {
            window.open(website.url, '_blank');
        }
    };

    // Pagination handlers
    const totalPages = Math.ceil(filteredWebsites.length / rowsPerPage);

    const handleFirstPage = () => {
        setPage(0);
    };

    const handlePreviousPage = () => {
        setPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const handleLastPage = () => {
        setPage(totalPages - 1);
    };

    // Get current page data
    const paginatedWebsites = filteredWebsites.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2, color: '#1F2A40' }}>Loading websites...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.2}>
                <Typography variant="h5" fontWeight="600" color="#1F2A40">
                    Website List ({filteredWebsites.length})
                </Typography>
                <TextField
                    size="small"
                    placeholder="Search websites..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#666666' }} />
                            </InputAdornment>
                        ),
                        style: { color: '#1F2A40' }
                    }}
                    sx={{
                        width: '300px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            '& fieldset': {
                                borderColor: '#e0e0e0',
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                        }
                    }}
                />
            </Box>

            {/* Websites Table */}
            {filteredWebsites.length === 0 ? (
                <Box textAlign="center" py={4}>
                    <Typography variant="h6" color="#666666">
                        {searchQuery ? 'No websites found matching your search' : 'No websites available'}
                    </Typography>
                </Box>
            ) : (
                <Paper sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                    <TableContainer sx={{ maxHeight: '500px' }}>
                        <Table stickyHeader aria-label="websites table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none',
                                        width: '80px'
                                    }}>
                                        Sr No.
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none'
                                    }}>
                                        Name
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none'
                                    }}>
                                        Website
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none'
                                    }}>
                                        URL
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none'
                                    }}>
                                        City
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        borderBottom: 'none'
                                    }}>
                                        Address
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '700',
                                        backgroundColor: '#CDCBCB',
                                        color: '#000000ff',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        borderBottom: 'none'
                                    }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedWebsites.map((website, index) => (
                                    <TableRow
                                        key={website.id || website._id || index}
                                        sx={{
                                            '&:nth-of-type(odd)': { backgroundColor: '#f8f9ff' },
                                            '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                                transition: 'background-color 0.2s ease'
                                            },
                                            borderBottom: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <TableCell sx={{
                                            padding: '16px',
                                            borderBottom: '1px solid #f0f0f0',
                                            width: '80px'
                                        }}>
                                            <Typography
                                                fontWeight="500"
                                                color="#1F2A40"
                                                fontSize="14px"
                                                textAlign="center"
                                            >
                                                {page * rowsPerPage + index + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography
                                                fontWeight="600"
                                                color="#1F2A40"
                                                fontSize="14px"
                                            >
                                                {website.name || 'Unnamed Website'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography color="#424242" fontSize="14px">
                                                {website.website || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            {website.url ? (
                                                <Typography
                                                    color="#1976d2"
                                                    fontSize="14px"
                                                    fontWeight="500"
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            textDecoration: 'underline',
                                                            color: '#1565c0'
                                                        },
                                                        maxWidth: '250px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    onClick={() => handleView(website)}
                                                    title={website.url}
                                                >
                                                    {website.url}
                                                </Typography>
                                            ) : (
                                                <Typography color="#9e9e9e" fontSize="14px">-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography color="#424242" fontSize="14px">
                                                {website.city || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography
                                                color="#424242"
                                                fontSize="14px"
                                                sx={{
                                                    maxWidth: '250px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                title={website.address}
                                            >
                                                {website.address || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                            <Box display="flex" justifyContent="center" gap={1}>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: '#1976d2',
                                                        '&:hover': {
                                                            backgroundColor: '#e3f2fd',
                                                            color: '#1565c0'
                                                        }
                                                    }}
                                                    onClick={() => handleView(website)}
                                                    title="Visit Website"
                                                >
                                                    <ViewIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: '#ff9800',
                                                        '&:hover': {
                                                            backgroundColor: '#fff3e0',
                                                            color: '#f57c00'
                                                        }
                                                    }}
                                                    onClick={() => handleEdit(website)}
                                                    title="Edit Website"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: '#f44336',
                                                        '&:hover': {
                                                            backgroundColor: '#ffebee',
                                                            color: '#d32f2f'
                                                        }
                                                    }}
                                                    onClick={() => handleDelete(website)}
                                                    title="Delete Website"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px 24px',
                                backgroundColor: '#f8f9ff',
                                borderTop: '1px solid #e0e0e0'
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#1F2A40',
                                    fontWeight: '500'
                                }}
                            >
                                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredWebsites.length)} of {filteredWebsites.length} websites
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    onClick={handleFirstPage}
                                    disabled={page === 0}
                                    size="small"
                                    sx={{
                                        color: page === 0 ? '#bdbdbd' : '#1976d2',
                                        '&:hover': {
                                            backgroundColor: page === 0 ? 'transparent' : '#e3f2fd'
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd'
                                        }
                                    }}
                                    title="First Page"
                                >
                                    <FirstPage fontSize="small" />
                                </IconButton>

                                <IconButton
                                    onClick={handlePreviousPage}
                                    disabled={page === 0}
                                    size="small"
                                    sx={{
                                        color: page === 0 ? '#bdbdbd' : '#1976d2',
                                        '&:hover': {
                                            backgroundColor: page === 0 ? 'transparent' : '#e3f2fd'
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd'
                                        }
                                    }}
                                    title="Previous Page"
                                >
                                    <KeyboardArrowLeft fontSize="small" />
                                </IconButton>

                                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#1F2A40',
                                            fontWeight: '600',
                                            minWidth: '80px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Page {page + 1} of {totalPages}
                                    </Typography>
                                </Box>

                                <IconButton
                                    onClick={handleNextPage}
                                    disabled={page >= totalPages - 1}
                                    size="small"
                                    sx={{
                                        color: page >= totalPages - 1 ? '#bdbdbd' : '#1976d2',
                                        '&:hover': {
                                            backgroundColor: page >= totalPages - 1 ? 'transparent' : '#e3f2fd'
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd'
                                        }
                                    }}
                                    title="Next Page"
                                >
                                    <KeyboardArrowRight fontSize="small" />
                                </IconButton>

                                <IconButton
                                    onClick={handleLastPage}
                                    disabled={page >= totalPages - 1}
                                    size="small"
                                    sx={{
                                        color: page >= totalPages - 1 ? '#bdbdbd' : '#1976d2',
                                        '&:hover': {
                                            backgroundColor: page >= totalPages - 1 ? 'transparent' : '#e3f2fd'
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd'
                                        }
                                    }}
                                    title="Last Page"
                                >
                                    <LastPage fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </Paper>
            )}

            {/* Edit Website Modal */}
            <Dialog
                open={editModalOpen}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-dialog-title"
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        backgroundColor: "white"
                    }
                }}
            >
                <DialogTitle
                    id="edit-dialog-title"
                    sx={{
                        color: '#1F2A40',
                        fontWeight: '600',
                        fontSize: '24px',
                        textAlign: 'center',
                        pb: 2,
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    Edit Website Details
                </DialogTitle>
                <DialogContent sx={{ padding: '24px' }}>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {/* First Row */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                value={editFormData.website}
                                onChange={(e) => handleEditFormChange('website', e.target.value)}
                                variant="outlined"
                                inputProps={{
                                    style: { color: '#1F2A40' } // Add this line
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9ff',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': { // Add this section
                                        color: '#000000ff !important'
                                    }
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={editFormData.name}
                                onChange={(e) => handleEditFormChange('name', e.target.value)}
                                variant="outlined"
                                inputProps={{
                                    style: { color: '#1F2A40' }
                                }}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9ff',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#000000ff !important'
                                    }
                                }}
                            />
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="URL"
                                value={editFormData.url}
                                onChange={(e) => handleEditFormChange('url', e.target.value)}
                                variant="outlined"
                                inputProps={{
                                    style: { color: '#1F2A40' }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9ff',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#000000ff !important'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                value={editFormData.city}
                                onChange={(e) => handleEditFormChange('city', e.target.value)}
                                variant="outlined" inputProps={{
                                    style: { color: '#1F2A40' } // Add this line
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9ff',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        }
                                    }, '& .MuiOutlinedInput-input': { // Add this section
                                        color: '#000000ff !important'
                                    }
                                }}
                            />
                        </Grid>

                        {/* Third Row - Full Width Address */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={editFormData.address}
                                onChange={(e) => handleEditFormChange('address', e.target.value)}
                                variant="outlined"
                                inputProps={{
                                    style: { color: '#1F2A40' } // Add this line
                                }}
                                multiline
                                rows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9ff',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': { // Add this section
                                        color: '#000000ff !important'
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
                    <Button
                        onClick={handleCloseEditModal}
                        variant="outlined"
                        disabled={editLoading}
                        sx={{
                            color: '#666666',
                            borderColor: '#666666',
                            '&:hover': {
                                borderColor: '#424242',
                                backgroundColor: '#f5f5f5'
                            },
                            minWidth: '120px',
                            borderRadius: '8px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitEdit}
                        variant="contained"
                        disabled={editLoading}
                        sx={{
                            backgroundColor: '#ff9800',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#f57c00'
                            },
                            minWidth: '120px',
                            borderRadius: '8px'
                        }}
                        startIcon={editLoading ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {editLoading ? 'Updating...' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={deleteModalOpen}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        padding: '16px',
                        backgroundColor: "white"
                    }
                }}
            >
                <DialogTitle
                    id="delete-dialog-title"
                    sx={{
                        color: '#d32f2f',
                        fontWeight: '600',
                        fontSize: '20px',
                        textAlign: 'center',
                        pb: 2
                    }}
                >
                    Delete Website
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            color: '#424242',
                            fontSize: '16px',
                            textAlign: 'center',
                            mb: 1
                        }}
                    >
                        Are you sure you want to delete this website?
                    </Typography>
                    <Typography
                        variant="body2"
                        color="#d32f2f"
                        sx={{
                            textAlign: 'center',
                            fontWeight: '500'
                        }}
                    >
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 1, gap: 2 }}>
                    <Button
                        onClick={handleCloseDeleteModal}
                        variant="outlined"
                        disabled={deleteLoading}
                        sx={{
                            color: '#666666',
                            borderColor: '#666666',
                            '&:hover': {
                                borderColor: '#424242',
                                backgroundColor: '#f5f5f5'
                            },
                            minWidth: '100px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        disabled={deleteLoading}
                        sx={{
                            backgroundColor: '#d32f2f',
                            '&:hover': {
                                backgroundColor: '#b71c1c'
                            },
                            minWidth: '100px'
                        }}
                        startIcon={deleteLoading ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WebsiteList;