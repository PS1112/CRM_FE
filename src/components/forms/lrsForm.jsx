import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Select from "react-select";
import Calendar from "react-calendar";

const LrsForm = ({
  userOptions,
  lrsData,
  setLrsData,
}) => {
  const today = new Date();

  const appointmentError =
    lrsData.appointmentDate &&
    new Date(lrsData.appointmentDate) <= new Date(today.setDate(today.getDate() + 3));

  const followUpError =
    lrsData.followUpDate &&
    new Date(lrsData.followUpDate) >
      new Date(new Date().setDate(new Date().getDate() + 15));

  return (
    <>
      <Typography variant="h6" mb={2} color={"#ffffff"}>
        Assign Details
      </Typography>
      <Grid container spacing={2} sx={{ backgroundColor: " #464791" }}>
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Assigned to User 1<span style={{ color: "red" }}> *</span>
          </Typography>
          <Select
            placeholder="Select"
            options={userOptions}
            value={lrsData.assignUser1}
            onChange={(val) => setLrsData({ ...lrsData, assignUser1: val })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#f0f0f0",
                color: "#1a1a1a",
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "#1a1a1a",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "#666",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                zIndex: 9999,
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#e0e0e0" : "#fff",
                color: "#1a1a1a",
              }),
            }}
          />

          <Typography variant="subtitle2" mt={2} gutterBottom>
            Appointment<span style={{ color: "red" }}> *</span>
          </Typography>
          <Calendar
            onChange={(date) => setLrsData({ ...lrsData, appointmentDate: date })}
            value={lrsData.appointmentDate}
            minDate={new Date(new Date().setDate(new Date().getDate() + 3))}
          />
          {appointmentError && (
            <Typography color="error" fontSize="0.8rem" mt={1}>
              Kindly select Date not more than 3 days
            </Typography>
          )}
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Assign to User 2<span style={{ color: "red" }}> *</span>
          </Typography>
          <Select
            placeholder="Select"
            options={userOptions}
            value={lrsData.assignUser2}
            onChange={(val) => setLrsData({ ...lrsData, assignUser2: val })}
          />

          <Typography variant="subtitle2" mt={2} gutterBottom>
            New Follow Up Date<span style={{ color: "red" }}> *</span>
          </Typography>
          <Calendar
            onChange={(date) => setLrsData({ ...lrsData, followUpDate: date })}
            value={lrsData.followUpDate}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 15))}
          />
          {followUpError && (
            <Typography color="error" fontSize="0.8rem" mt={1}>
              Kindly select Date not more than 15 days
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default LrsForm;
