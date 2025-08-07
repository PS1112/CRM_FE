import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
} from '@mui/material';
import { toast } from 'react-toastify';

const CreateUsersForm = () => {
    const [formData, setFormData] = useState({
        managerName: '',
        phoneNumber: '',
        emailId: '',
        roleType: ''
    });

    const [errors, setErrors] = useState({});

    // Role options
    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'supervisor', label: 'Supervisor' },
        { value: 'operator', label: 'Operator' },
        { value: 'viewer', label: 'Viewer' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.managerName.trim()) {
            newErrors.managerName = 'Manager name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.emailId.trim()) {
            newErrors.emailId = 'Email ID is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
            newErrors.emailId = 'Please enter a valid email address';
        }

        if (!formData.roleType) {
            newErrors.roleType = 'Role type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            toast.success('User created successfully!');

            // Reset form
            setFormData({
                managerName: '',
                phoneNumber: '',
                emailId: '',
                roleType: ''
            });
        } else {
            toast.error('Please fix the errors in the form');
        }
    };

    const handleReset = () => {
        setFormData({
            managerName: '',
            phoneNumber: '',
            emailId: '',
            roleType: ''
        });
        setErrors({});
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            padding: 0
        }}>
            <Typography variant="h5" gutterBottom sx={{
                color: '#1F2A40', // Dark color instead of white
                fontWeight: 600,
                marginBottom: 3,
                fontSize: '1.25rem'
            }}>
                Create New User
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Manager Name"
                            name="managerName"
                            value={formData.managerName}
                            onChange={handleInputChange}
                            error={!!errors.managerName}
                            helperText={errors.managerName}
                            variant="outlined"
                            required
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '4px',
                                '& .MuiInputLabel-root': {
                                    color: '#1F2A40', // Dark label color
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: '#1F2A40', // Dark text color
                                    '& fieldset': {
                                        borderColor: '#d0d7de',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber}
                            variant="outlined"
                            required
                            type="tel"
                            placeholder="Enter 10-digit phone number"
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '4px',
                                '& .MuiInputLabel-root': {
                                    color: '#1F2A40',
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: '#1F2A40',
                                    '& fieldset': {
                                        borderColor: '#d0d7de',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '& input::placeholder': {
                                        color: '#6c757d',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email ID"
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleInputChange}
                            error={!!errors.emailId}
                            helperText={errors.emailId}
                            variant="outlined"
                            required
                            type="email"
                            placeholder="example@company.com"
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '4px',
                                '& .MuiInputLabel-root': {
                                    color: '#1F2A40',
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: '#1F2A40',
                                    '& fieldset': {
                                        borderColor: '#d0d7de',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '& input::placeholder': {
                                        color: '#6c757d',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            required
                            error={!!errors.roleType}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '4px',
                            }}
                        >
                            <InputLabel sx={{ color: '#1F2A40' }}>Role Type</InputLabel>
                            <Select
                                name="roleType"
                                value={formData.roleType}
                                label="Role Type"
                                onChange={handleInputChange}
                                sx={{
                                    backgroundColor: '#ffffff', // Ensure white background
                                    color: '#1F2A40',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d0d7de',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#1F2A40',
                                    },
                                    // Force white background for the select field
                                    '&.MuiInputBase-root': {
                                        backgroundColor: '#ffffff !important',
                                    },
                                    '& .MuiSelect-select': {
                                        backgroundColor: '#ffffff !important',
                                    }
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#ffffff', // White background for dropdown menu
                                            '& .MuiMenuItem-root': {
                                                color: '#1F2A40',
                                                backgroundColor: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: '#e3f2fd',
                                                    '&:hover': {
                                                        backgroundColor: '#bbdefb',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                {roleOptions.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.roleType && (
                                <Typography variant="caption" sx={{
                                    color: '#d32f2f',
                                    mt: 1,
                                    ml: 2,
                                    fontSize: '0.75rem'
                                }}>
                                    {errors.roleType}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-start',
                            mt: 2
                        }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                    padding: '10px 30px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.875rem'
                                }}
                            >
                                CREATE USER
                            </Button>

                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleReset}
                                sx={{
                                    borderColor: '#6c757d',
                                    color: '#6c757d',
                                    backgroundColor: '#ffffff',
                                    '&:hover': {
                                        borderColor: '#5a6268',
                                        backgroundColor: '#f8f9fa',
                                        color: '#5a6268',
                                    },
                                    padding: '10px 30px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.875rem'
                                }}
                            >
                                RESET
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateUsersForm;