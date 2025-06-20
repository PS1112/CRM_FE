import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import chroma from "chroma-js";

import { ColourOption, colourOptions } from "./filteroption.ts";
import Select, { StylesConfig } from "react-select";

import { getApi, postApi, putApi } from "../../services/axiosInstance.js";
import { API_PATH } from "../../services/apipath.js";
import moment from "moment/moment";
import {
  Backdrop,
  Badge,
  Box,
  Button,
  IconButton,
  // Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Close, FiberManualRecord } from "@mui/icons-material";
import { toast } from "react-toastify";
import Edit from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

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

const colourOptions1 = [
  { value: 1, label: "Ready" },
  { value: 2, label: "Call" },
  { value: 3, label: "Demo" },
  { value: 4, label: "Usage" },
  { value: 5, label: "Completed" },
];

const Data = () => {
  const [filter, setFilter] = useState("");
  const [companyObject, setCompanyObject] = useState([]);

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const fetchLeads = async () => {
    try {
      const res = await getApi(API_PATH.SUPER_ADMIN.LEADS);
      if (res.status === 200) {
        setCompanyObject(res.data);
      }
    } catch (error) {
      console.log();
    }
  };

  const changeStatus = async (status, id) => {
    const payload = {
      leadId: id,
      leadUpdatedStatus: parseInt(status),
    };
    try {
      const res = await postApi(
        API_PATH.SUPER_ADMIN.CHANGE_LEAD_STATUS,
        payload
      );
      if (res.status === 200) {
        fetchLeads();
        toast.success("Status Updated");
      }
    } catch (error) {
      // console.log(error, "leaads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // State to manage modal open/close
  const isNonMobile = useMediaQuery("(min-width:400px)");

  const handleFormSubmit = async (data) => {
    const payload = {
      leadId: leadId,
      name: data.Name,
      email: data.email,
      instituteName: data.InstituteName,
      phoneNumber: data.contact,
    };
    const res = await putApi(API_PATH.SUPER_ADMIN.UPDATE_LEAD, payload);
    if (res.status == 200) {
      toast.success("Updated successfully");
      fetchLeads();
      await closeModal();
    }
    // handleClose(); // Close the modal after form submission
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [leadId, setleadId] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState([]);

  function openModal(data, id) {
    setIsOpen(true);
    setleadId(id);
    setSelectedLead(data);
  }

  function closeModal() {
    setIsOpen(false);
    setleadId("");
    setSelectedLead([]);
  }
  return (
    <>
      <table className="table table-white text-dark">
        <tbody>
          {companyObject.map((i, j) => {
            return (
              <Card
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "row",
                  margin: "12px",
                  overflow: "visible",
                  background: "transparent",
                  border: "solid 1px #b8b8b8",
                  boxShadow: "none",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={0}
                  className="py-3"
                >
                  {j + 1}.
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", paddingLeft: "12px" }}
                    >
                      <FiberManualRecord
                        sx={{
                          color:
                            i.leadStatus === 1
                              ? "red"
                              : i.leadStatus === 2
                              ? "blue"
                              : i.leadStatus === 3
                              ? "yellow"
                              : i.leadStatus === 4
                              ? "orange"
                              : i.leadStatus === 5
                              ? "green"
                              : "gray",
                        }}
                      />
                      {i.instituteName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px" }}
                      display="flex"
                      justifyContent="start"
                    >
                      {i.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px" }}
                      display="flex"
                      justifyContent="start"
                    >
                      {i.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} alignItems="end">
                    <Typography
                      sx={{ fontSize: "15px" }}
                      display="flex"
                      justifyContent="start"
                    >
                      {moment(i.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px" }}
                      display="flex"
                      justifyContent="start"
                    >
                      {i.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Select
                      defaultValue={colourOptions[i.leadStatus - 1]}
                      options={colourOptions}
                      styles={colourStyles}
                      onChange={(e) => {
                        setFilter(e);
                        changeStatus(e.value, i._id);
                      }}
                    />
                  </Grid>
                  <Grid item pl={3} display="flex" justifyContent="center">
                    <Edit
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => openModal(i, i._id)}
                    />
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-dark"> Edit Lead</h2>
          <IconButton onClick={closeModal}>
            <Close sx={{ color: "#000" }} />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Institute Name"
              name="firstName"
              defaultValue={selectedLead.instituteName}
              sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
              InputProps={{
                style: { color: "#000000" }, // Text color
                placeholder: "Institute Name",
              }}
              InputLabelProps={{
                style: { color: "#000000" }, // Label color
              }}
              {...register("InstituteName", {
                required: "Institute Name is required",
              })}
              error={!!errors.InstituteName}
              helperText={errors.InstituteName?.message}
              FormHelperTextProps={{ style: { margin: 0 } }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              name="Name"
              defaultValue={selectedLead.name}
              sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
              InputProps={{
                style: { color: "#000000" }, // Text color
                placeholder: "Name",
              }}
              InputLabelProps={{
                style: { color: "#000000" }, // Label color
              }}
              {...register("Name", {
                required: " Name is required",
              })}
              error={!!errors.Name}
              helperText={errors.Name?.message}
              FormHelperTextProps={{ style: { margin: 0 } }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              name="email"
              defaultValue={selectedLead.email}
              sx={{ gridColumn: "span 4", backgroundColor: "#F2F0F0" }}
              InputProps={{
                style: { color: "#000000" }, // Text color
                placeholder: "First Name",
              }}
              InputLabelProps={{
                style: { color: "#000000" }, // Label color
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|mail)\.com$/i,
                  message: "Please enter a valid  email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              FormHelperTextProps={{ style: { margin: 0 } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              name="contact"
              defaultValue={selectedLead.phoneNumber}
              sx={{ gridColumn: "span 4", backgroundColor: "#F2F0F0" }}
              InputProps={{
                style: { color: "#000000" }, // Text color
                placeholder: "Contact Number",
              }}
              InputLabelProps={{
                style: { color: "#000000" }, // Label color
              }}
              {...register("contact", {
                required: "Number  is required",
              })}
              error={!!errors.contact}
              helperText={errors.contact?.message}
              FormHelperTextProps={{ style: { margin: 0 } }}
            />
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Location"
              name="address1"
              sx={{ gridColumn: "span 4", backgroundColor: "#F2F0F0" }}
              InputProps={{
                style: { color: "#000000" }, // Text color
                placeholder: "Location",
              }}
              InputLabelProps={{
                style: { color: "#000000" }, // Label color
              }}
              {...register("location", {
                required: "location  is required",
              })}
              error={!!errors.location}
              helperText={errors.location?.message}
              FormHelperTextProps={{ style: { margin: 0 } }}
            /> */}
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                backgroundColor: "#f8cc40",
                borderRadius: "9px",
                paddingX: "40px",
                paddingY: "15px",
                "&:hover": {
                  backgroundColor: "#007FA3", // Change the background color on hover
                  color: "#FFFFFF", // Change the text color on hover
                },
              }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default Data;
