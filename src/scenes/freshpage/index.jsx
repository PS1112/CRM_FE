import * as React from "react";
import { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Input,
  Paper,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import FollowUpModal from "../../components/Modals/FollowUpModal.jsx"
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

import "./style.css";
import { ToastContainer } from "react-toastify";
import { getApi, postApi, putApi } from "../../services/axiosInstance.js";
import { API_PATH } from "../../services/apipath";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Moment from "react-moment";

// Import ResizableTable component
import ResizableTable from "../../components/ResizeableTable/ResizableTable.jsx";
import MultiStepModal from "../../components/Modals/MultiStepModal.jsx";
import zIndex from "@mui/material/styles/zIndex.js";
import { cellStyle, formatTableData, headerStyle, tableColumns } from "../../utils/helper.js";

const options = [
  { value: 0, label: "Project" },
  { value: 1, label: "Project 1" },
  { value: 2, label: "Project 2" },
  { value: 3, label: "Project 3" },
  { value: 4, label: "Project 4" },
];

const planType = [
  { value: 0, label: "Both" },
  { value: 1, label: "Core" },
  { value: 2, label: "Academic" },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "10010",
  },
};

const FreshPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(0);
  const [freshQueriesData, setFreshQueriesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [options, setOptions] = useState([]);
  // generic functions to handle events
  
    const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 // API call to fetch fresh enquiry data
  const fetchWebsites = async () => {
    try {
      const res = await postApi(API_PATH.WEBSITES.GET_WEBSITES,{ page : 1, limit : 10 });
      if (res.status === 200) {
        setOptions(res.data.data.map((item) => ({ value: item.id, label: item.name })));
      }
    } catch (error) {
      console.log(error, "Error fetching websites");
    }
  };

  // API call to fetch fresh enquiry data
  const fetchFreshQuery = async () => {
    try {
      const url =API_PATH.ENQUIRY.GET_FRESH_ENQUIRY
      const res = await getApi(url);
      if (res.status === 200) {
        setFreshQueriesData(res.data);
      }
    } catch (error) {
      console.log(error, "Error fetching fresh enquiry data");
    }
  };


  React.useEffect(() => {
    fetchWebsites();
    fetchFreshQuery();
  }, []);


  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const isNonMobile = useMediaQuery("(min-width:400px)");

const tableData = freshQueriesData.map((item) => formatTableData(item))

  return (
    <Container className="border-5" padding="0px">
      <Grid
        container
        alignItems="center"
        sx={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          backgroundColor: "#ffffff",
          height: "95vh",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          sx={{
            backgroundColor: "#F4F7FF",
            borderRadius: "15px",
            padding: "10px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Box
            className="border-5"
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "0px",
            }}
          >
            <Box
              p="0 20px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                container
                alignItems="center"
                spacing={0}
                sx={{ marginBottom: "20px" }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <div>
                    <Typography
                      variant="h4"
                      style={{ color: "#1F2A40", fontWeight: "600" }}
                    >
                      Fresh Enquiries
                    </Typography>
                    {/* <Typography variant="h6" style={{ color: "#000000" }}>
                      Welcome to Sarvottam CRM
                    </Typography> */}
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcCallIcon />}
                    onClick={() => setModalOpen(true)}
                  >
                    Add New Enquiry
                  </Button>

                  <MultiStepModal
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box display="flex">
                    <input
                      type="text"
                      style={{
                        marginLeft: 2,
                        flex: 1,
                        color: "black",
                        borderRadius: "10px",
                        border: "solid 1px #e2e2e2",
                        padding: "8px 12px",
                      }}
                      placeholder="Search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                      <SearchIcon className="text-secondary" />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Select
                    className="w-100 text-dark"
                    options={options}
                    onChange={(e) => setStatus(e.value)}
                    placeholder="Select Project"
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 2000, // or any value higher than your overlays
                      }),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              height="calc(100% - 100px)"
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                padding: "0 20px",
              }}
            >
              {/* Replace the standard table with ResizableTable */}
              <ResizableTable
                columns={tableColumns}
                data={tableData}
                headerStyle={headerStyle}
                cellStyle={cellStyle}
                emptyMessage="No inquiry data found"
                onCallClick={()=>setFollowUpModalOpen(true)}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ToastContainer />
      <FollowUpModal 
      handleClose={() => setFollowUpModalOpen(false)}
      initialRemarks={""}
      open={followUpModalOpen}
      />
    </Container>
  );
};

export default FreshPage;