import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import {
  deleteApi,
  getApi,
  postApi,
  putApi,
} from "../../services/axiosInstance.js";
import { API_PATH } from "../../services/apipath.js";
import {
  Avatar,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close, Delete, Edit } from "@mui/icons-material";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  const [companyObject, setCompanyObject] = useState([]);
  const [institutecompanyObject, setInstituteCompanyObject] = useState([]);
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const fetchRequests = async () => {
    try {
      const res = await getApi(API_PATH.SUPER_ADMIN.REQUEST_LIST);
      if (res.status === 200) {
        setCompanyObject(res.data);
      }
    } catch (error) {
      console.log();
    }
  };

  const Institute = async () => {
    try {
      const res = await getApi(API_PATH.SUPER_ADMIN.INSTITUTE_LIST);
      if (res.status === 200) {
        setInstituteCompanyObject(res.data);
      }
    } catch (error) {
      console.log();
    }
  };
  useEffect(() => {
    fetchRequests();
    Institute();
  }, []);

  console.log(companyObject);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    const payload = {
      requestId: leadId,
      email: data.email,
      instituteName: data.InstituteName,
      phoneNumber: data.contact,
      planType: parseInt(data.planType),
      location: data.location,
    };
    console.log(payload, "locationlocation");
    const res = await putApi(API_PATH.SUPER_ADMIN.EDIT_REQUESTS, payload);
    if (res.status == 200) {
      toast.success("Updated successfully");
      fetchRequests();
      await closeModal();
    }
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

  // const deleteRequest = async (id) => {
  //   try {
  //     const res = await deleteApi(API_PATH.SUPER_ADMIN.DELETE_REQUEST, {
  //       id: id,
  //     });
  //     if (res.status === 200) {
  //       toast.success("Deleted Successfully");
  //       fetchRequests();
  //     }
  //   } catch (error) { }
  // };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const deleteRequest = async () => {
    try {
      const res = await deleteApi(API_PATH.SUPER_ADMIN.DELETE_REQUEST, {
        id: deleteId,
      });
      if (res.status === 200) {
        toast.success("Deleted Successfully");
        fetchRequests();
        closeDeleteModal(); // Close the modal after deletion
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const AcceptRequest = async (id) => {
    try {
      const res = await postApi(API_PATH.SUPER_ADMIN.ACCEPT_REQUEST, {
        id: id,
      });
      if (res.status === 201) {
        toast.success("Done");
        fetchRequests();
        Institute();
      }
    } catch (error) {}
  };

  const handleWhatsAppClick = (id, phoneNumber) => {
    const filter = institutecompanyObject.filter((i) => i.email === id);
    const m = `Admin Panel : Email : ${filter[0].email} Password : ${filter[0].password}  How to create student account? 
    2) Click on Create.
    3) Click on Add Subscription, this will add subscription for 30 days.
    4) Click on Login button to get student username and password. 
    5) Go to ptetest.in & login with username and password.`;

    // const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(m)}`;
    const url = `https://web.whatsapp.com/send?phone=${
      filter[0].phoneNumber
    }&text=${encodeURIComponent(m)}`;
    window.open(url, "_blank");
  };

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
                  background: "transparent",
                  border: "solid 1px #b8b8b8",
                  boxShadow: "none",
                }}
              >
                <Grid container alignItems="center" spacing={0}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={10}
                    display="flex"
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="d-flex align-items-center">
                        <Avatar
                          alt={i.instituteName}
                          src={i.image}
                          sx={{
                            width: 24,
                            height: 24,
                            marginRight: "5px",
                          }}
                          variant="rounded"
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontSize: "16px", marginLeft: "10px" }}
                        >
                          {i.instituteName} <br />
                          {i.location}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      display="flex"
                      alignItems="center"
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "16px" }}
                        display="flex"
                        justifyContent="center"
                      >
                        {i.domain}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      display="flex"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontSize: "14px" }}
                        display="flex"
                        justifyContent="center"
                      >
                        {i.email}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      display="flex"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontSize: "14px" }}
                        display="flex"
                        justifyContent="center"
                      >
                        {i.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>

                  {i.requestAccepted === 0 ? (
                    <div className="">
                      <Grid item pl={3} display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ color: "white" }}
                          onClick={() => AcceptRequest(i._id)}
                        >
                          Accept
                        </Button>
                        <Edit
                          sx={{
                            mx: 1,
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => openModal(i, i._id)}
                        />

                        <Delete
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => openDeleteModal(i._id)}
                        />
                      </Grid>
                    </div>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <WhatsAppIcon
                        sx={{
                          mr: "10px",
                          color: "green",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          handleWhatsAppClick(i.email, i.phoneNumber)
                        }
                      />
                      <Delete
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => openDeleteModal(i._id)}
                      />
                    </Grid>
                  )}
                </Grid>
              </Card>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Delete Confirmation"
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-dark">Confirm Deletion</h2>
          <IconButton onClick={closeDeleteModal}>
            <Close sx={{ color: "#000" }} />
          </IconButton>
        </div>
        <Typography variant="body1" className="text-dark">
          Do you want to delete this?
        </Typography>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={closeDeleteModal}
            color="primary"
            variant="contained"
            sx={{
              marginRight: "10px",
              backgroundColor: "#f8cc40",
              "&:hover": {
                backgroundColor: "#007FA3",
                color: "#FFFFFF",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={deleteRequest}
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#9a0007",
                color: "#FFFFFF",
              },
            }}
          >
            Yes
          </Button>
        </Box>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-dark"> Edit Requests</h2>
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
                // gridColumn: isNonMobile ? undefined : "span 4",
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
            <FormControl
              fullWidth
              variant="filled"
              sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
            >
              <InputLabel style={{ color: "#000000" }}>Options</InputLabel>
              <Select
                label="Plan Type"
                name="options"
                defaultValue={selectedLead.planType}
                sx={{
                  ".MuiSelect-filled": {
                    color: "#000000", // Text color for selected option
                  },
                  ".MuiSvgIcon-root": {
                    color: "#000000", // Color of the dropdown icon
                  },
                }}
                {...register("planType", {
                  required: "plan Type is required",
                })}
                error={!!errors.planType}
                helperText={errors.planType?.message}
              >
                <MenuItem value={0}>Both</MenuItem>
                <MenuItem value={1}>Core</MenuItem>
                <MenuItem value={2}>Academic</MenuItem>
              </Select>
              <FormHelperText
                style={{
                  margin: 0,
                  color: !!errors.planType ? "#d32f2f" : "#000000",
                }}
              >
                {errors.planType?.message}
              </FormHelperText>
            </FormControl>

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
