import { Container, TableContainer } from "@mui/material";
import React, { useState } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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

import "./style.css";

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

const Data = () => {
  const [filter, setFilter] = useState("");
  const [companyObject, setCompanyObject] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchInstitute = async () => {
    try {
      const response = await getApi(API_PATH.SUPER_ADMIN.INSTITUTES);
      if (response.status === 200) {
        setCompanyObject(response.data);
      }
    } catch (error) {
      console.log();
    }
  };

  // const changeStatus = async (status, id) => {
  //   const payload = {
  //     instituteId: id,
  //     leadUpdatedStatus: parseInt(status),
  //   };
  //   try {
  //     const res = await postApi(
  //       API_PATH.SUPER_ADMIN.CHANGE_LEAD_STATUS,
  //       payload
  //     );
  //     if (res.status === 200) {
  //       fetchLeads();
  //       toast.success("Status Updated");
  //     }
  //   } catch (error) {
  //     console.log(error, "leaads");
  //   }
  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isNonMobile = useMediaQuery("(min-width:400px)");

  const handleFormSubmit = async (data) => {
    const payload = {
      InstituteId: instituteId,
      name: data.Name,
      email: data.email,
      instituteName: data.InstituteName,
      phoneNumber: data.contact,
    };
    const res = await putApi(
      API_PATH.SUPER_ADMIN.EDIT_INSTITUTE_DETAILS,
      payload
    );
    if (res.status == 200) {
      toast.success("Updated successfully");
      fetchInstitute();
      await closeModal();
    }
    // handleClose(); // Close the modal after form submission
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [instituteId, setinstituteId] = React.useState("");
  const [selectedInstitute, setSelectedInstitute] = React.useState([]);

  function openModal(data, id) {
    setIsOpen(true);
    setinstituteId(id);
    setSelectedInstitute(data);
  }

  function closeModal() {
    setIsOpen(false);
    setinstituteId("");
    setSelectedInstitute([]);
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
                }}
              >
                <Grid container alignItems="center" spacing={0}>
                  <Grid item sx={{ marginRight: "8px" }}>
                    <th className="px-3 py-2 rounded-3 text-dark nostudent">
                      {i.sr}
                    </th>
                  </Grid>

                  <Grid item>
                    <div className="d-flex">
                      <div className="p-1 rounded-3 me-2 logoimage">"""</div>
                      <Typography variant="h6" sx={{ fontSize: "16px" }}>
                        {i.fullname}
                      </Typography>
                      {/* <IconButton aria-label="delete" color="primary" variant="contained" onClick={handleOpen}>  <EditIcon className="editicon"/></IconButton> */}

                      <Edit
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => openModal(i, i._id)}
                      />
                    </div>
                    <Typography sx={{ fontSize: "14px" }}>{i.email}</Typography>
                    <Typography sx={{ fontSize: "13px" }}>
                      {i.password}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid>
                  <Typography sx={{ fontSize: "15px" }}>{i.date}</Typography>
                  <Typography sx={{ fontSize: "14px" }}>{i.contact}</Typography>
                  <Typography sx={{ fontSize: "13px" }}>{i.domain}</Typography>
                  <Typography sx={{ fontSize: "13px" }}>
                    {i.location}
                  </Typography>
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
          <h2 className="text-dark"> Edit Institute</h2>
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
              defaultValue={selectedInstitute.instituteName}
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
              defaultValue={selectedInstitute.name}
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
              defaultValue={selectedInstitute.email}
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
              defaultValue={selectedInstitute.phoneNumber}
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
