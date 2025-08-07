import { 
  Container, 
  Box, 
  Typography, 
  useTheme, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';

const ProjectAssigned = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Data from your screenshot
  const projectData = [
    {
      name: "Manjeet",
      projects: "Hero, Jubilee, Emaar, DownTown"
    },
    {
      name: "Gayatri",
      projects: "TDI, Wellness City, Ubber Mews Gate, Medallion, Ananta Aspire"
    },
    {
      name: "Kanwar",
      projects: "Wave, Joy Grand"
    },
    {
      name: "Maninder",
      projects: "Suntec, Omaxe, HLP Ali, Dist One, Bollywood"
    },
    {
      name: "Raghav",
      projects: "JLPL, DLF, Trident, Sushma"
    },
    {
      name: "Vijay",
      projects: "SBP Mohali, ATS DB, Aerovista"
    }
  ];

  // Function to handle download
  const handleDownloadReadyReckoner = () => {
    // Create CSV content
    const csvHeaders = "Name,Assigned Projects\n";
    const csvContent = projectData.map(row => 
      `"${row.name}","${row.projects}"`
    ).join('\n');
    
    const csvData = csvHeaders + csvContent;
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'project-assignments-ready-reckoner.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              {/* Header with Download Button */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography variant="h3" style={{
                  color: '#1F2A40',
                  fontWeight: '600'
                }}>
                  Project Assigned
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownloadReadyReckoner}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  Download Ready Reckoner
                </Button>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: '1px solid #e0e0e0'
              }}>
                <Table sx={{ minWidth: 650 }} aria-label="project assignments table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#1F2A40',
                        borderBottom: '2px solid #e0e0e0',
                        padding: '16px'
                      }}>
                        Name
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#1F2A40',
                        borderBottom: '2px solid #e0e0e0',
                        padding: '16px'
                      }}>
                        Assigned Projects
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: '#fafafa',
                          },
                          '&:hover': {
                            backgroundColor: '#f0f0f0',
                          },
                        }}
                      >
                        <TableCell sx={{
                          fontSize: '14px',
                          color: '#333',
                          padding: '16px',
                          borderBottom: '1px solid #e0e0e0',
                          fontWeight: '500'
                        }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{
                          fontSize: '14px',
                          color: '#666',
                          padding: '16px',
                          borderBottom: '1px solid #e0e0e0',
                          lineHeight: '1.5'
                        }}>
                          {row.projects}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectAssigned;