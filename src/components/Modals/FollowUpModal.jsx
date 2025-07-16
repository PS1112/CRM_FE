import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postApi } from "../../services/axiosInstance";
import { API_PATH } from "../../services/apipath";
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
  console.log(item)
  // Set initial values from item, fallback to defaults if not present
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState(item?.Mobile || "");
  const [recordExists, setRecordExists] = useState(false);
  const [didNotConnect, setDidNotConnect] = useState(false);
  const [tableData, setTableData] = useState([]);

  // LRS Data
  const [lrsData, setLrsData] = useState({
    assignUser1: item?.LrsAssignTo ? { value: item.LrsAssignTo, label: item.LrsAssignTo } : null,
    assignUser2: item?.LrsAssignTo2 ? { value: item.LrsAssignTo2, label: item.LrsAssignTo2 } : null,
    appointmentDate: item?.LrsDate ? new Date(item.LrsDate) : null,
    followUpDate: item?.LrsFollowDate ? new Date(item.LrsFollowDate) : null,
  });

  // Follow Up Data
  const [followUpData, setFollowUpData] = useState({
    LrsPriority: item?.LrsPriority ?? "",
    Budget: item?.Budget ?? "",
    requirement: item?.requirement ?? "",
    propStatus: item?.propStatus ?? "",
    location: item?.location ?? "",
    remarks: item?.lastremarks ?? item?.Remarks ?? "",
    appointmentDate: item?.appointmentDate ? new Date(item.appointmentDate) : new Date(),
    siteVisitDone: item?.IsVisited === 1 ? "Yes" : "No",
  });
  const handleSave =async () => {
  try {
      const url =API_PATH.ENQUIRY.UPDATE_ENQUIRY+ `/${item._id}`;
      const data = {
        ...item,
        ...followUpData,
        ...lrsData,
      };
      const res = await postApi(url,data);
      if (res.status === 200) {
        // setFreshQueriesData(res.data);
        toast.success("Inquiry Updated!");
      }
    } catch (error) {
      console.log(error, "Error fetching fresh enquiry data");
      toast.error("Error updating enquiry");
    }
   
    // toast.success("Inquiry Saved!");
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
