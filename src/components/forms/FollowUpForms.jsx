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

// Separate array for priority options

const priorityOptions = [
  { label: "All", value: 0 },
  { label: "New", value: 1 },
  { label: "Need Followed", value: 2 },
  { label: "Closed Elsewhere", value: 3 },
  { label: "Not Interested", value: 4 },
  { label: "Must Follow", value: 5 },
  { label: "Normal Enquiry", value: 6 },
  { label: "No Need to Call", value: 7 },
  { label: "Deal Done", value: 8 },
  { label: "Transfer to Other User", value: 9 },
  { label: "Low Budget", value: 10 },
  { label: "My Unique Calls", value: 11 },
  { label: "Spam Leads", value: 12 },
];
const inputFields = [
  { label: "Priority", name: "LrsPriority", type: "select", options: priorityOptions, visible: true },
  { label: "New Follow Up Date *", name: "appointmentDate", type: "calendar", visible: true },
  { label: "Is Site Visit Done", name: "siteVisitDone", type: "select", options: ["No", "Yes"], visible: true },
  { label: "Budget", name: "budget", type: "select", options: [
    "less then 50 lac", "50-80 Lac", "80 - 1.25 Cr", "1.25 - 2 Cr", "2 Cr Above"
  ], visible: true },
  { label: "Req", name: "requirement", type: "text", placeholder: "2/3/4 BHK Or Plot", visible: true },
  { label: "Prop. Status", name: "propStatus", type: "select", options: [
    "Ready to Move", "Under Construction", "Does Not Matter"
  ], visible: true },
  { label: "From City", name: "location", type: "text", placeholder: "From City", visible: true },
  { label: "Remarks", name: "remarks", type: "text", multiline: true, rows: 3, visible: true },
];

const getFieldVisibility = (followUpData, didNotConnect) => {
  // Default: all visible
  let visibleNames = inputFields.map(f => f.name);

  // If didNotConnect, only show remarks
  if (didNotConnect) {
    visibleNames = ["remarks"];
  }
  // If siteVisitDone is "Yes", only show calendar and remarks
  else if (followUpData.siteVisitDone === "Yes") {
    visibleNames = ["appointmentDate", "remarks","siteVisitDone","LrsPriority"];
  }

  const visibleFields = inputFields.filter(f => visibleNames.includes(f.name));
  const hiddenFields = inputFields.filter(f => !visibleNames.includes(f.name));
  return { visibleFields, hiddenFields };
};

const FollowUpForm = ({ followUpData, setFollowUpData, didNotConnect, setDidNotConnect }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFollowUpData({
      ...followUpData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDidNotConnectChange = (e) => {
    setDidNotConnect(e.target.checked);
  };

  const { visibleFields } = getFieldVisibility(followUpData, didNotConnect);

  // Split left/right for layout
  const leftFields = visibleFields.filter(f => ["LrsPriority", "appointmentDate"].includes(f.name));
  const rightFields = visibleFields.filter(f => !["LrsPriority", "appointmentDate", "remarks"].includes(f.name));
  const remarksField = visibleFields.find(f => f.name === "remarks");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📝 New Follow Up
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={didNotConnect}
            onChange={handleDidNotConnectChange}
            name="didNotConnect"
            data-index={0}
          />
        }
        label="Did Not Connect"
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {/* Left side: Priority and Calendar */}
        <Grid item xs={12} sm={6}>
          {leftFields.map((field, idx) =>
            field.type === "select" ? (
              <FormControl fullWidth required key={field.name} sx={{ mt: 3 }}>
                <InputLabel data-index={idx + 1}>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={followUpData[field.name]}
                  onChange={handleChange}
                  label={field.label}
                  data-index={idx + 1}
                >
                  {field.options.map((option, oidx) => (
                    <MenuItem
                      value={option.value || option}
                      key={option}
                      data-index={`${idx + 1}-${oidx}`}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : field.type === "calendar" ? (
              <Box sx={{ mt: 3 }} key={field.name}>
                <Typography gutterBottom data-index={idx + 1}>
                  {field.label}
                </Typography>
                <Calendar
                  onChange={(date) =>
                    setFollowUpData({ ...followUpData, [field.name]: date })
                  }
                  value={followUpData[field.name]}
                  data-index={idx + 1}
                />
              </Box>
            ) : null
          )}
        </Grid>
        {/* Right side: all other fields except remarks */}
        <Grid item xs={12} sm={6}>
          {rightFields.map((field, idx) =>
            field.type === "select" ? (
              <FormControl fullWidth required key={field.name} sx={{ mt: 3 }}>
                <InputLabel data-index={idx + leftFields.length + 1}>
                  {field.label}
                </InputLabel>
                <Select
                  name={field.name}
                  value={followUpData[field.name]}
                  onChange={handleChange}
                  label={field.label}
                  data-index={idx + leftFields.length + 1}
                >
                  {field.options.map((option, oidx) => (
                    <MenuItem
                      value={typeof option === "object" ? option.value : option}
                      key={typeof option === "object" ? option.value : option}
                      data-index={`${idx + leftFields.length + 1}-${oidx}`}
                    >
                      {typeof option === "object" ? option.label : option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : field.type === "calendar" ? (
              <Box sx={{ mt: 3 }} key={field.name}>
                <Typography
                  gutterBottom
                  data-index={idx + leftFields.length + 1}
                >
                  {field.label}
                </Typography>
                <Calendar
                  onChange={(date) =>
                    setFollowUpData({ ...followUpData, [field.name]: date })
                  }
                  value={followUpData[field.name]}
                  data-index={idx + leftFields.length + 1}
                />
              </Box>
            ) : (
              <TextField
                fullWidth
                required
                label={field.label}
                name={field.name}
                value={followUpData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                multiline={field.multiline || false}
                rows={field.rows || 1}
                data-index={idx + leftFields.length + 1}
                key={field.name}
                sx={{ mt: 3 }}
              />
            )
          )}
        </Grid>
        {/* Remarks field full width */}
        {remarksField && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label={remarksField.label}
              name={remarksField.name}
              value={followUpData[remarksField.name]}
              onChange={handleChange}
              sx={{ mt: 3 }}
              multiline
              rows={remarksField.rows || 3}
              data-index={inputFields.length + 1}
            />
          </Grid>
        )}
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
