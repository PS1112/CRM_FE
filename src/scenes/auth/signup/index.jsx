import './stylesheet.css';
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postApi } from "../../../services/axiosInstance";
import { API_PATH } from "../../../services/apipath";
import MainImage from "../forget/mainlogo.png"
import bannerImage from "../forget/signup.jpg"

const Signup = () => {
  const [registerErrMsg, setRegisterErrMsg] = useState("");

    const defaultTheme = createTheme();
    const handleSubmit = async (event) => {
     try {

const formData = {
    fname: "Super",
    lname: "Admin",
    email: "superadmin@example.com",
    username: "superadmin",
    password: "piyush@123", // Use a real bcrypt hash in production
   
    mobile: "9876543210",
    role: 1, // SA
    status: 1,
  }
        const data = new FormData(formData);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        
      const res = await postApi(API_PATH.SUPER_ADMIN.REGISTER, data);
      if (res.status === 200) {
        console.log(res.data);
        // localStorage.setItem("token", res.data.token);
        // window.location.replace("/home");
      }

    } catch (error) {
      setRegisterErrMsg("Registration failed. Please try again.");
    }
  };

    return (
        <>

            <Box sx={{ display: 'flex', minHeight: '100vh', }}>
                <Grid container>
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

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            my: 3,
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
                                            sx={{ width: '25%' }}
                                        />
                                        <Typography component="h1" variant="h5">
                                            Sign up
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        autoComplete="given-name"
                                                        name="firstName"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="family-name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="new-password"
                                                    />
                                                </Grid>
                                                
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
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


export default Signup