import React, { useState } from "react";
import "./stylesheet.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainImage from "../forget/sarvottam_center.png";
// Import still included but we'll comment the actual API call
import { postApi } from "../../../services/axiosInstance";
import { API_PATH } from "../../../services/apipath";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const defaultTheme = createTheme();
  const [loginError, setLoginError] = useState("");

  // Local credentials for bypass
  const validCredentials = {
    "admingayatri@gmail.com": "adminG123",
  };

  const onSubmit = async (data) => {
    try {
      const res = await postApi(API_PATH.SUPER_ADMIN.LOGIN, data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.replace("/home");
      // }
 
      // // LOCAL BYPASS IMPLEMENTATION
      // const { email, password } = data;

      // // Check if credentials match our local validation
      // if (validCredentials[email] === password) {
      //   // Store mock token in localStorage
      //   localStorage.setItem("token", "bypass-auth-token-" + Date.now());
      //   localStorage.setItem("userEmail", email);

      //   // Redirect to home page
      //   window.location.replace("/home");
      } else {
        // Show error for invalid credentials
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          // backgroundColor: "#768ebd",
          backgroundImage: "url('/assets/login_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 3
          }}
        >
          <Box
            component="img"
            src={MainImage}
            alt="Mainlogocrm"
            sx={{ width: "50%", maxWidth: "150px", mb: 2 }}
          />
          <Typography component="h1" variant="h4" sx={{ color: "#000000", mb: 2 }}>
            Login
          </Typography>

          {loginError && (
            <Typography
              component="p"
              sx={{
                color: "error.main",
                mb: 2,
                fontSize: "0.875rem",
                width: "100%",
                textAlign: "center",
                padding: "8px",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "4px"
              }}
            >
              {loginError}
            </Typography>
          )}

          {/* Test credentials notice */}
          {/* <Typography 
            component="p" 
            sx={{ 
              color: "primary.main", 
              mb: 2, 
              fontSize: "0.875rem", 
              width: "100%",
              textAlign: "center",
              padding: "8px",
              backgroundColor: "rgba(0, 0, 255, 0.05)",
              borderRadius: "4px"
            }}
          >
            Try: admin@gmail.com / admin123
          </Typography> */}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <div className="form-group">
              <label htmlFor="email" className="mb-1 text-#000000">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                required
                style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc" }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|mail)\.com$/i,
                    message: "Please enter a valid Email Address",
                  },
                })}
              />
              {errors.email && (
                <p style={{ color: "red", margin: "4px 0 0", fontSize: "0.75rem" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="mb-1 text-#000000">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc" }}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p style={{ color: "red", margin: "4px 0 0", fontSize: "0.75rem" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "black",
                backgroundColor: "#F8CC40",
                "&:hover": {
                  backgroundColor: "#e6b32e"
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;