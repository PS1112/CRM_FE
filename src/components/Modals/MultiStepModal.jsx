import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postApi } from "../../services/axiosInstance";
import { API_PATH } from "../../services/apipath";
import {
  cellStyle,
  formatTableData,
  headerStyle,
  tableColumns,
} from "../../utils/helper";
import ResizableTable from "../ResizeableTable/ResizableTable";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import LrsForm from "../forms/LrsForm";

const userOptions = [
  { value: "kanwar", label: "Kanwar" },
  { value: "gayatri", label: "Gayatri" },
  { value: "raghav", label: "raghav" },
  { value: "smanjeet", label: "S.Manjeet" },
  { value: "monica", label: "Monica" },
  { value: "maanmaninder", label: "Maan Maninder" },
  { value: "vijay", label: "Vijay" },
  { value: "gurjeet", label: "Gurjeet" },
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
  maxWidth: "95vw",
};

const MultiStepModal = ({ open, handleClose }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [recordExists, setRecordExists] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [lrsData, setLrsData] = useState({
    assignUser1: null,
    assignUser2: null,
    appointmentDate: null,
    followUpDate: null,
  });
  const [personalDetails, setPersonalDetails] = useState({
      name: "",
      email: "",
      mobile: "7087670183",
      enquirySource: "A All Websites",
      priority: "Must Follow",
      budget: "",
      requirement: "",
      propStatus: "",
      location: "",
      message: "",
    appointment: new Date(),
      siteVisitDone: "No",
      itsMyCall: "No",
    });

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
      setLrsData({
        assignUser1: null,
        assignUser2: null,
        appointmentDate: null,
        followUpDate: null,
      });
      setPersonalDetails({
        name: "",
        email: "",
        mobile: "",
        enquirySource: "A All Websites",
        priority: "Must Follow",
        budget: "",
        requirement: "",
        propStatus: "",
        location: "",
        message: "",
        appointment: new Date(),
        siteVisitDone: "No",
        itsMyCall: "No",
      });
    }
  }, [open]);

  const handleNext = () => {
    setStep(2);
  };

  const handleSave =async () => {
    console.log(personalDetails,lrsData)
    if (!lrsData.assignUser1 || !lrsData.assignUser2 || !lrsData.appointmentDate || !lrsData.followUpDate) {
      toast.error("Please fill all fields");
      return;
    }
    // try {
    //   const reqBody =  {
      // name,
      // email,
      // mobile,
      // Remarks,
      // submitDate,
      // trashdate,
      // website,
      // usertype,
      // EnquiryType,
      // officecode,
      // role,
      // status,
      // IsVisited,
      // visitedDate,
    // }
    // const res = await postApi(API_PATH.ENQUIRY.ADD_ENQUIRY,reqBody)
    // if (res.status === 200) {
    //   console.log(data)
    // toast.success("Inquiry Saved!");

    // } 
    // } catch (error) {
    //   console.log(error,"error in adding query")
    // }
   
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
    // const appointmentError =
    //   appointmentDate &&
    //   new Date(appointmentDate) <= new Date(today.setDate(today.getDate() + 3));

    // const followUpError =
    //   followUpDate &&
    //   new Date(followUpDate) >
    //     new Date(new Date().setDate(new Date().getDate() + 15));

    return (
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          padding: 32,
          background: "#464791",
        }}
      >

        <PersonalDetailsForm
          personalDetails={personalDetails}
          setPersonalDetails={setPersonalDetails}
        />

        <LrsForm
          userOptions={userOptions}
          lrsData={lrsData}
          setLrsData={setLrsData}
        />

        <Box mt={3} display="flex" justifyContent="center">
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
      </Box>
      </div>
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
        setLrsData({
          assignUser1: null,
          assignUser2: null,
          appointmentDate: null,
          followUpDate: null,
        });
      }}
    >
      <Box sx={modalStyle}>{step === 1 ? renderStep1() : renderStep2()}</Box>
    </Modal>
  );
};

export default MultiStepModal;
