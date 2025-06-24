import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FollowUpForm = ({ followUpData, setFollowUpData }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFollowUpData({
      ...followUpData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📝 New Follow Up
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={followUpData.didNotConnect}
            onChange={handleChange}
            name="didNotConnect"
          />
        }
        label="Did Not Connect"
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={followUpData.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Must Follow">Must Follow</MenuItem>
              <MenuItem value="Can Skip">Can Skip</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Typography gutterBottom>New Follow Up Date *</Typography>
            <Calendar
              onChange={(date) =>
                setFollowUpData({ ...followUpData, appointmentDate: date })
              }
              value={followUpData.appointmentDate}
            />
          </Box>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Is Site Visit Done</InputLabel>
            <Select
              name="siteVisitDone"
              value={followUpData.siteVisitDone}
              onChange={handleChange}
              label="Is Site Visit Done"
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Budget</InputLabel>
            <Select
              name="budget"
              value={followUpData.budget}
              onChange={handleChange}
              label="Budget"
            >
              <MenuItem value="10-20 Lakhs">10-20 Lakhs</MenuItem>
              <MenuItem value="20-50 Lakhs">20-50 Lakhs</MenuItem>
              <MenuItem value="50+ Lakhs">50+ Lakhs</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="Req"
            name="requirement"
            value={followUpData.requirement}
            onChange={handleChange}
            placeholder="2/3/4 BHK Or Plot"
            sx={{ mt: 3 }}
          />

          <FormControl fullWidth sx={{ mt: 3 }} required>
            <InputLabel>Prop. Status</InputLabel>
            <Select
              name="propStatus"
              value={followUpData.propStatus}
              onChange={handleChange}
              label="Prop. Status"
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Under Construction">Under Construction</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="Location"
            name="location"
            value={followUpData.location}
            onChange={handleChange}
            sx={{ mt: 3 }}
            placeholder="From City"
          />

          <TextField
            fullWidth
            required
            label="Remarks"
            name="remarks"
            value={followUpData.remarks}
            onChange={handleChange}
            sx={{ mt: 3 }}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          <strong>First Remarks:</strong> {followUpData.remarks || "N/A"}
        </Typography>
      </Box>
    </Box>
  );
};

export default FollowUpForm;
