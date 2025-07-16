import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
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
import LrsForm from "../Forms/LrsForm";
import FollowUpForm from "../Forms/FollowUpForms";

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

const FollowUpModal = ({ open, handleClose, item }) => {
  console.log(item, "Item in FollowUpModal");
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [recordExists, setRecordExists] = useState(false);
  const [didNotConnect, setDidNotConnect] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [lrsData, setLrsData] = useState({
    assignUser1: null,
    assignUser2: null,
    appointmentDate: null,
    followUpDate: null,
  });
  const [followUpData, setFollowUpData] = useState({
    priority:item.priorityid || "",
    budget: item.Budget ||"",
    requirement: item.requirement || "",
    propStatus: item.propStatus || "",
    location: item.location || "",
    remarks: item.lastremarks || "", // set from prop
    appointmentDate: new Date(),
    siteVisitDone: "No"
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

  // useEffect(() => {
  //   if (open) {
  //     setStep(2);
  //     setMobile("");
  //     setRecordExists(false);
  //     setLrsData({
  //       assignUser1: null,
  //       assignUser2: null,
  //       appointmentDate: null,
  //       followUpDate: null,
  //     });
  //     setFollowUpData({
  //       priority: "",
  //       budget: "",
  //       requirement: "",
  //       propStatus: "",
  //       location: "",
  //       remarks: "", // set from prop
  //       appointmentDate: new Date(),
  //       siteVisitDone: "No",
  //       didNotConnect: false,
  //     });
  //   }
  // }, [open]);

  const handleNext = () => {
    setStep(2);
  };

  const handleSave =async () => {
    console.log(followUpData,lrsData)
    if (!lrsData.assignUser1 || !lrsData.assignUser2 || !lrsData.appointmentDate || !lrsData.followUpDate) {
      toast.error("Please fill all fields");
      return;
    }

   
    toast.success("Inquiry Saved!");
    handleClose();
    setStep(1);
  };


  const renderStep2 = () => {

    return (
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          padding: 32,
          background: "#464791",
        }}
      >
        <FollowUpForm
          followUpData={followUpData}
          setFollowUpData={setFollowUpData}
          didNotConnect={didNotConnect}
          setDidNotConnect={setDidNotConnect}
        />
        {!didNotConnect && (
          <LrsForm
            userOptions={userOptions}
            lrsData={lrsData}
            setLrsData={setLrsData}
          />
        )}

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
      <Box sx={modalStyle}>{renderStep2()}</Box>
    </Modal>
  );
};

export default FollowUpModal;
