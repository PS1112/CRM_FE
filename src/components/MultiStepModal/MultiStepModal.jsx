import React, { useState, useEffect } from "react";
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
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postApi } from "../../services/axiosInstance";
import { API_PATH } from "../../services/apipath";
import { cellStyle, formatTableData, headerStyle, tableColumns } from "../../utils/helper";
import ResizableTable from "../ResizeableTable/ResizableTable";

const userOptions = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" }
];

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    width: 900, // wider
    maxWidth: "95vw"
};


const MultiStepModal = ({ open, handleClose }) => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [recordExists, setRecordExists] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [assignUser1, setAssignUser1] = useState(null);
    const [assignUser2, setAssignUser2] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [followUpDate, setFollowUpDate] = useState(null);

    const today = new Date();
    
    const handleCheckRecord = async () => {
      try {
        const res = await postApi(API_PATH.ENQUIRY.CHECK_AVAILABILITY, {
          mobile,
        });
        console.log(res, "Response from check availability API");
        if (res.status === 200) {
          setRecordExists(true);
          const queries = res.data.queries ?? [res.data];
          setTableData(queries.map(formatTableData));
          toast.success("Record exists!");
        } else {
          setRecordExists(false);
          toast.error("No record found, you can add a new one.");
        }
      } catch (error) {
        setRecordExists(false);
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Could not check record, please try again.";
        toast.error(errorMsg);
        console.log(error, "Error checking record");
      }
    };

    useEffect(() => {
        if (open) {
            setStep(1);
            setMobile("");
            setRecordExists(false);
            setAssignUser1(null);
            setAssignUser2(null);
            setAppointmentDate(null);
            setFollowUpDate(null);
        }
    }, [open]);

    const handleNext = () => {
        setStep(2);
    };

    const handleSave = () => {
        if (!assignUser1 || !assignUser2 || !appointmentDate || !followUpDate) {
            toast.error("Please fill all fields");
            return;
        }
        toast.success("Inquiry Saved!");
        handleClose();
        setStep(1);
    };

    const renderStep1 = () => (
      <>
        <Typography variant="h6" color={"#ffffff"} mb={2}>
          Kindly First Check Whether Record Exists or Not
        </Typography>
        <TextField
          fullWidth
          label="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="tel"
          margin="normal"
          borderColor="black !important"
        />
        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          mb={2}
          color={"black"}
        >
          <Button variant="contained" onClick={handleCheckRecord}>
            Show Availability
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            disabled={!mobile || recordExists}
          >
            Add New
          </Button>
        </Box>

        {recordExists && (
          <ResizableTable
            columns={tableColumns}
            data={tableData}
            headerStyle={headerStyle}
            cellStyle={cellStyle}
            emptyMessage="No inquiry data found"
          />
        )}
      </>
    );

    const renderStep2 = () => {
        const appointmentError =
            appointmentDate &&
            (new Date(appointmentDate) <= new Date(today.setDate(today.getDate() + 3)));

        const followUpError =
            followUpDate &&
            (new Date(followUpDate) > new Date(new Date().setDate(new Date().getDate() + 15)));

        return (
            <>
                <Typography variant="h6" mb={2} color={"#ffffff"}>Assign Details</Typography>
                <Grid container spacing={2} sx={{ backgroundColor: " #464791" }}>
                    {/* Left Side */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>Assigned to User 1<span style={{ color: 'red' }}> *</span></Typography>
                        <Select
                            placeholder="Select"
                            options={userOptions}
                            value={assignUser1}
                            onChange={setAssignUser1}
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "#f0f0f0", // light grey background
                                    color: "#1a1a1a",           // dark text
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "#1a1a1a",           // dark selected value text
                                }),
                                placeholder: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "#666",              // slightly lighter placeholder
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    zIndex: 9999
                                }),
                                option: (baseStyles, { isFocused }) => ({
                                    ...baseStyles,
                                    backgroundColor: isFocused ? "#e0e0e0" : "#fff",
                                    color: "#1a1a1a",
                                })
                            }}
                        />



                        <Typography variant="subtitle2" mt={2} gutterBottom>Appointment<span style={{ color: 'red' }}> *</span></Typography>
                        <Calendar
                            onChange={setAppointmentDate}
                            value={appointmentDate}
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
                        <Typography variant="subtitle2" gutterBottom>Assign to User 2<span style={{ color: 'red' }}> *</span></Typography>
                        <Select
                            placeholder="Select"
                            options={userOptions}
                            value={assignUser2}
                            onChange={setAssignUser2}
                        />

                        {/* <Select
                            placeholder="Select"
                            options={userOptions}
                            value={assignUser2}
                            onChange={setAssignUser2}
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "#f0f0f0", // light grey background
                                    color: "#1a1a1a",           // dark text
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "#1a1a1a",           // dark selected value text
                                }),
                                placeholder: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "#666",              // slightly lighter placeholder
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    zIndex: 9999
                                }),
                                option: (baseStyles, { isFocused }) => ({
                                    ...baseStyles,
                                    backgroundColor: isFocused ? "#e0e0e0" : "#fff",
                                    color: "#1a1a1a",
                                })
                            }}
                        /> */}


                        <Typography variant="subtitle2" mt={2} gutterBottom>New Follow Up Date<span style={{ color: 'red' }}> *</span></Typography>
                        <Calendar
                            onChange={setFollowUpDate}
                            value={followUpDate}
                            maxDate={new Date(new Date().setDate(new Date().getDate() + 15))}
                        />
                        {followUpError && (
                            <Typography color="error" fontSize="0.8rem" mt={1}>
                                Kindly select Date not more than 15 days
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                <Box mt={3} display="flex" justifyContent="center">
                    <Button onClick={handleSave} variant="contained" color="success" sx={{ mr: 2 }}>
                        Save
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </>
        );
    };


    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                setStep(1);
                setMobile("");
                setRecordExists(false);
                setAssignUser1(null);
                setAssignUser2(null);
                setAppointmentDate(null);
                setFollowUpDate(null);
            }}
        >
            <Box sx={modalStyle}>
                {step === 1 ? renderStep1() : renderStep2()}
            </Box>
        </Modal>
    );
};

export default MultiStepModal;