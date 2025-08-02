import { Container, Box, Typography, useTheme, Tabs, Tab } from "@mui/material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';
import { useState } from 'react';

// Import your data components
import DaywiseReportsData from './daywisereportsdata';
import ManualEntryReportsData from './manualentrydata';
import LoginHistoryData from './loginhistorydata';
import SpamLeadsData from './spamleadsdata';
import LrsOverDueData from './lrsoverduedata';
import ProjectAssignedData from './projectassigneddata';

const AdminOnly = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Tab state
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const adminTabs = [
    {
      label: 'Daywise Reports',
      component: <DaywiseReportsData />
    },
    {
      label: 'Manual Entry Reports',
      component: <ManualEntryReportsData />
    },
    {
      label: 'Login History',
      component: <LoginHistoryData />
    },
    {
      label: 'Spam Leads',
      component: <SpamLeadsData />
    },
    {
      label: 'LRS Over Due',
      component: <LrsOverDueData />
    },
    {
      label: 'Project assigned to Team',
      component: <ProjectAssignedData />
    }
  ];

  return (
    <Container backgroundColor={colors.primary[900]} className="border-5" >
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
            // gap={2}
            >
              {/* Header */}
              <Typography variant="h3" style={{
                color: '#1F2A40',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Admin Features
              </Typography>

              {/* Button-style Tabs */}
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                {adminTabs.map((tab, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
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

              {/* Tab Content */}
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
                {adminTabs[activeTab]?.component}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOnly;
