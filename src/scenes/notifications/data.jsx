import React from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Data = () => {
  const companyObject = [
    {
      sr: 1,
      fullname: "Synthesis technologies",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 2,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 3,
      fullname: "Sarvottam Real Estates",
      email: "Sarvottamrealestates@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 4,
      fullname: "Wave Mohali",
      email: "Wave@mohali.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 5,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 6,
      fullname: "WavePTE Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 7,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 8,
      fullname: "Wave Chandigarh",
      email: "Wavesimple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 9,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 10,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 11,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 12,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 13,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 14,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },

    {
      sr: 15,
      fullname: "Wave Chandigarh",
      email: "Wave@simple.com ",
      contact: "123456789",
      password: "price",
      domain: "XYZ@gmail.com",
      date: "20-03-2024",
    },
  ];

  return (
    <>
      <table className="table table-white text-dark">
        <tbody>
          {companyObject.map((i, j) => {
            return (
              <Card
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "row",
                  margin: "12px",
                  background: "transparent",
                  border: "solid 1px #b8b8b8",
                  boxShadow: "none",
                }}
              >
                <Grid container alignItems="center" spacing={0}>
                  <Grid item sx={{ marginRight: "8px" }}>
                    {/* <th>{i.sr}</th> */}
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" sx={{ fontSize: "16px" }}>
                      {i.fullname}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>{i.email}</Typography>
                    <Typography sx={{ fontSize: "13px" }}>
                      {i.password}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid>
                  <Typography sx={{ fontSize: "15px" }}>{i.date}</Typography>
                  <Typography sx={{ fontSize: "14px" }}>{i.contact}</Typography>
                  <Typography sx={{ fontSize: "13px" }}>{i.domain}</Typography>
                </Grid>
              </Card>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Data;
