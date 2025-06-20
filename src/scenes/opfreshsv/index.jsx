import { Container, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid';
import Data from "../notifications/data"

import Select from 'react-select';

const OpFreshSv = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = [
    { value: 'Past', label: 'Past' },
    { value: 'Future', label: 'Future' },
    { value: 'Purchases', label: 'Purchases' }
  ]

  return (
    <Container backgroundColor={colors.primary[900]} className="border-5"
      sx={{ padding: "16px 0 17px 0" }}>

      <Grid container alignItems="center" spacing={0} sx={{
        padding: "16px", borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        backgroundColor: "#ffffff"
      }}>

        <Grid item xs={12} sm={6} md={12} sx={{ backgroundColor: "#F4F7FF", borderRadius: "15px", padding: "10px" }}>
          <Box
            className="border-5"
            height={500}
            sx={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '0px',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '0px',
            }}
          >

            <Box
              p="0 20px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >

              <Grid container alignItems="center" spacing={0} sx={{ marginBottom: "20px" }}>
                <Grid item xs={12} sm={6} md={9}>
                  <div >
                    <Typography variant="h4" style={{ color: '#1F2A40', fontWeight: '600' }}>
                      Op Fresh SV
                    </Typography>
                    {/* <Typography variant="h6" style={{ color: '#000000' }}>
                    Notification from Client
                    </Typography> */}
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center" alignItems="end">
                  <Select className='w-100 text-dark' options={options} sx={{ overflow: "visible" }} />
                </Grid>
              </Grid>

            </Box>

            <Box height="430px" m="-20px 0 0 0" sx={{ overflowY: 'scroll' }}>
              <Data />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container >
  );
};

export default OpFreshSv;