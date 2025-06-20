import { Box, Typography, useTheme , Container, Grid } from "@mui/material";
import { tokens } from "../../theme";

import Data from "../updateques/data"

const Updatequestions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

        <Grid item xs={12} sm={12} md={12} sx={{ backgroundColor: "#F4F7FF", borderRadius: "15px", padding: "10px" }}>
          <Box
            className="border-5"
            height={515}
            sx={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '0px',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '0px',
            }}
          >

            <Box
              p="0 20px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >

              <Grid container alignItems="center" spacing={0} sx={{ marginBottom: "20px" }}>
                <Grid item xs={12} sm={6} md={12}>
                  <div >
                    <Typography variant="h4" style={{ color: '#1F2A40', fontWeight: '600' }}>
                      Must Follow 
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Box>

            <Box height="470px" m="-20px 0 0 0" sx={{ overflowY: 'scroll' }}>
              <Data />
            </Box>

          </Box>
        </Grid>
      </Grid>

    </Container >
  );
};

export default Updatequestions;
