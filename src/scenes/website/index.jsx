import { Box, Container, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

// Import components
import WebsiteForm from './addwebsiteform';
import WebsiteList from './websitelist';
import CreateUsersForm from './createusers';
import AdditionalSettings from './addtionalsettings'; 

const Website = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeTab, setActiveTab] = useState(0);

  const websiteTabs = [
    {
      label: 'Add Website',
      component: <WebsiteForm />
    },
    {
      label: 'Website List',
      component: <WebsiteList />
    },
    {
      label: 'Create Users',
      component: <CreateUsersForm /> 
    },
    {
      label: 'Additional Settings',
      component: <AdditionalSettings />
    }
  ];

  return (
    <Container backgroundColor={colors.primary[900]} className="border-5">
      <Grid container alignItems="center" spacing={0} sx={{
        padding: "16px",
        borderRadius: '16px',
        backgroundColor: "#ffffff",
        height: "98vh"
      }}>
        <Grid item xs={12} sm={6} md={12} sx={{
          backgroundColor: "#F4F7FF",
          borderRadius: "15px",
          padding: "10px"
        }}>
          <Box
            className="border-5"
            height={535}
            sx={{
              borderRadius: '16px',
            }}
          >
            <Box
              p="5px"
              display="flex"
              flexDirection="column"
            >
              <Typography variant="h3" style={{
                color: '#1F2A40',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Add Website and Create Users Management
              </Typography>

              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                {websiteTabs.map((tab, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Box
                      onClick={() => setActiveTab(index)}
                      sx={{
                        backgroundColor: activeTab === index ? '#1976d2' : '#6c757d',
                        color: 'white',
                        fontWeight: '600',
                        padding: '12px 8px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '13px',
                        lineHeight: '1.2',
                        minHeight: '56px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: activeTab === index ? '#1565c0' : '#5a6268',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      {tab.label}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  flexGrow: 1,
                  height: '410px',
                  overflowY: 'auto',
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}
              >
                {websiteTabs[activeTab]?.component}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

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
      />
    </Container>
  );
}

export default Website;