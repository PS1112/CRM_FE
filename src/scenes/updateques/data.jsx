import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

import "../updateques/style.css";

function Data() {

  return (
    <Box sx={{ overflow: "hidden" }}>
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
  );
}

export default Data;