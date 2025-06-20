import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Backdrop,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { Add as AddIcon } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";

const ModalDialog = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false); // State to manage modal open/close
  const isNonMobile = useMediaQuery("(min-width:400px)");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="primary">
        <EditIcon className="editicon" /> {/* Change to your desired icon */}
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          m="20px"
          bgcolor="background.paper"
          borderRadius="8px"
          p="20px"
          maxWidth="600px"
          mx="auto"
          // mt="10%"
          component="form"
          sx={{ backgroundColor: "#1F2A40", position: "relative" }}
        >
          <Box sx={{ marginBottom: "14px" }}>
            <Typography variant="h2">Edit Lead</Typography>
          </Box>

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
        </Box>
      </Modal>
    </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  // address2: "",
};

export default ModalDialog;
