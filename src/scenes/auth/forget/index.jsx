import React from 'react';
import './stylesheet.css';


// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Container, Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import bannerImage from "./reset.jpg"

import MainImage from "./mainlogo.png"


const ForgetPassword = () => {
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
    };


    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Grid container >
                    {/* Left Side */}
                    <Grid item xs={12} md={6}>
                        <ThemeProvider theme={defaultTheme}>
                            <Grid container component="main" sx={{
                                height: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CssBaseline />
                               
                                <Grid item xs={12} >
                                    <Box sx={{
                                        mt: 5,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '90vh',
                                    }}
                                    >
                                        <Box
                                            component="img"
                                            src={MainImage} // Replace with your image URL
                                            alt="MainlogoPTE"
                                            sx={{ width: '35%' }}
                                        />
                                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <LockOutlinedIcon />
                                        </Avatar> */}
                                        <Typography component="h1" variant="h5">
                                            Reset Password
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Send Request
                                            </Button>
                                            <Grid container justifyContent="flex-start">
                                                <Grid item>
                                                    <Link href="/login" variant="body2">
                                                        Already have an account? Sign in
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </Grid>

                    {/* Right Side */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', color: 'white', padding: 4 ,boxShadow: "none" }}>
                            <Box
                                component="img"
                                src={bannerImage} // Replace with your image URL
                                alt="Illustration"
                                sx={{ width: '90%' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ForgetPassword