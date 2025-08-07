import { Container, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';

const Campaign = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
              {/* Header */}
              <Typography variant="h3" style={{
                color: '#1F2A40',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Old CRM Data
              </Typography>

              {/* Coming Soon Message */}
              <Typography variant="h2" sx={{
                color: '#6B7280',
                fontWeight: '700',
                fontSize: '3rem',
                letterSpacing: '2px',
                marginTop: '50px',
                textAlign: 'center'
              }}>
                COMING SOON
              </Typography>
              
              <Typography variant="h6" sx={{
                color: '#9CA3AF',
                fontWeight: '400',
                fontSize: '1.2rem',
                lineHeight: '1.6',
                textAlign: 'center',
                marginTop: '20px',
                maxWidth: '400px',
                alignSelf: 'center'
              }}>
                We're working hard to bring you this feature. Stay tuned for updates!
              </Typography>

              {/* Optional: Add a decorative element */}
              <Box sx={{
                width: '80px',
                height: '4px',
                backgroundColor: '#6366F1',
                borderRadius: '2px',
                marginTop: '20px',
                alignSelf: 'center'
              }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Campaign;