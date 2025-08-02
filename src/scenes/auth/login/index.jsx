import React, { useState } from "react";
import "./stylesheet.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  const [showPassword, setShowPassword] = useState(false);

  // Local credentials for bypass
  // const validCredentials = {
  //   "admingayatri@gmail.com": "adminG123",
  // };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Prevent mouse down event on the icon
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      const res = await postApi(API_PATH.SUPER_ADMIN.LOGIN, data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.replace("/freshpage");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/assets/login_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CssBaseline />
      
      {/* Card with blur effect */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "450px", // Slightly larger than the inner content
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Blur effect
          WebkitBackdropFilter: "blur(10px)", // Safari support
          borderRadius: "16px", // Rounded corners
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)", // Soft shadow
          padding: "40px 30px", // Inner padding
          margin: "20px", // Outer margin
          position: "relative",
          overflow: "hidden" // Ensure content doesn't overflow
        }}
      >
        {/* Optional: Additional glass effect overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            borderRadius: "16px",
            pointerEvents: "none", // Don't interfere with interactions
            zIndex: 1
          }}
        />
        
        {/* Login form content */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2 // Above the overlay
          }}
        >
          <Box
            component="img"
            src={MainImage}
            alt="Mainlogocrm"
            sx={{ width: "50%", maxWidth: "150px", mb: 2 }}
          />
          <Typography 
            component="h1" 
            variant="h2" 
            sx={{ 
              color: "#000000", 
              mb: 2, 
              fontWeight:"600",
              textShadow: "0 2px 4px rgba(255, 255, 255, 0.5)" // Optional text shadow for better readability
            }}
          >
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
              <label htmlFor="email" className="mb-1" style={{color:"black", fontSize:"17px", textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"}}>Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                required
                style={{ 
                  width: "100%", 
                  padding: "8px 12px", 
                  borderRadius: "8px", 
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly more opaque for better readability
                  backdropFilter: "blur(5px)"
                }}
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
              <label htmlFor="password" className="mb-1" style={{color:"black", fontSize:"17px", textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"}}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                  style={{ 
                    width: "100%", 
                    padding: "8px 50px 8px 12px",
                    borderRadius: "8px", 
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(5px)"
                  }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "4px",
                    color: "#666"
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
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
                color: "white",
                backgroundColor: "#2E3092",
                fontSize:"16px",
                fontWeight:"600",                
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(248, 204, 64, 0.3)",
                "&:hover": {
                  backgroundColor: "#575657ff",
                  boxShadow: "0 6px 20px #3E3D3F"
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;