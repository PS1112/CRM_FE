import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PersonalDetailsForm = ({ personalDetails, setPersonalDetails }) => {

  const handleChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        {/* Left side fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={personalDetails.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={personalDetails.email}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={personalDetails.mobile}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Enquiry Source</InputLabel>
            <Select
              name="enquirySource"
              value={personalDetails.enquirySource}
              onChange={handleChange}
              label="Enquiry Source"
            >
              <MenuItem value="A All Websites">A All Websites</MenuItem>
              <MenuItem value="Social Media">Social Media</MenuItem>
              <MenuItem value="Referral">Referral</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={personalDetails.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Must Follow">Must Follow</MenuItem>
              <MenuItem value="Can Skip">Can Skip</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Budget</InputLabel>
            <Select
              name="budget"
              value={personalDetails.budget}
              onChange={handleChange}
              label="Budget"
            >
              <MenuItem value="10-20 Lakhs">10-20 Lakhs</MenuItem>
              <MenuItem value="20-50 Lakhs">20-50 Lakhs</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Requirement"
            name="requirement"
            value={personalDetails.requirement}
            onChange={handleChange}
            sx={{ mt: 2 }}
            placeholder="2/3/4 BHK Or Plot"
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Prop. Status</InputLabel>
            <Select
              name="propStatus"
              value={personalDetails.propStatus}
              onChange={handleChange}
              label="Prop. Status"
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Under Construction">Under Construction</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={personalDetails.location}
            onChange={handleChange}
            sx={{ mt: 2 }}
            placeholder="From City"
          />
        </Grid>

        {/* Right side fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={personalDetails.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />

          <Box mt={3}>
            <Typography>Appointment *</Typography>
            <Calendar
              onChange={(date) =>
                setPersonalDetails({ ...personalDetails, appointment: date })
              }
              value={personalDetails.appointment || new Date()}
            />
          </Box>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Is Site Visit Done</InputLabel>
            <Select
              name="siteVisitDone"
              value={personalDetails.siteVisitDone}
              onChange={handleChange}
              label="Is Site Visit Done"
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>It's My Call</InputLabel>
            <Select
              name="itsMyCall"
              value={personalDetails.itsMyCall}
              onChange={handleChange}
              label="It's My Call"
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
export default PersonalDetailsForm;