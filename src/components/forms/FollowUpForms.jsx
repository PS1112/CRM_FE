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
              <MenuItem value="Closed Elsewhere">Closed Elsewhere</MenuItem>
              <MenuItem value="Deal Done">Deal Done</MenuItem>
              <MenuItem value="Low Budget">Low Budget</MenuItem>
              <MenuItem value="Must Follow">Must Follow</MenuItem>
              <MenuItem value="My Unique Calls">My Unique Calls</MenuItem>
              <MenuItem value="No Need to Call">No Need to Call</MenuItem>
              <MenuItem value="Normal Enquiry">Normal Enquiry</MenuItem>
              <MenuItem value="Not Interested">Not Interested</MenuItem>
              <MenuItem value="Not Interested">Spam Leads</MenuItem>
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
              <MenuItem value="less then 50 lac">Less Then 50 Lac</MenuItem>
              <MenuItem value="50-80 Lac">50 - 80 Lac </MenuItem>
              <MenuItem value="80 - 1.25 Cr">80 - 1.25 Cr</MenuItem>
              <MenuItem value="1.25 - 2 Cr">1.25 - 2 Cr</MenuItem>
              <MenuItem value="2 Cr Above">2 Cr Above</MenuItem>
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
              <MenuItem value="Ready to Move">Ready to Move</MenuItem>
              <MenuItem value="Under Construction">Under Construction</MenuItem>
              <MenuItem value="Under Construction">Does Not Matter</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="From City"
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
