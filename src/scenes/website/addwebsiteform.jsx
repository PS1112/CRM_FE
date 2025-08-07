// WebsiteForm.jsx
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from 'yup';
import { postApi } from "../../services/axiosInstance";
import { API_PATH } from "../../services/apipath";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WebsiteForm = () => {
  const Navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    website: "",
    name: "",
    address: "",
    url: "",
    city: "",
  };

  const checkoutSchema = yup.object().shape({
    website: yup.string().required("Website name is required"),
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    url: yup.string().url("Enter a valid URL").required("URL is required"),
    city: yup.string().required("City is required"),
  });

  const handleFormSubmit = async (values) => {
    console.log(values);

    try {
      toast.loading("Adding website...", { toastId: "loading" });

      const res = await postApi(API_PATH.WEBSITES.ADD_WEBSITE, values);
      console.log("Response:", res);

      toast.dismiss("loading");

      if (res.status === 200 || res.status === 201 || (res.data && res.data.success)) {
        toast.success("Website added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          Navigate("/fresh-enquiry");
        }, 1000);

      } else {
        toast.error("Failed to add website. Please try again.");
      }

    } catch (error) {
      console.log("Full error object:", error);

      toast.dismiss("loading");

      if (error.response) {
        console.log("Error response:", error.response.status, error.response.data);

        if (error.response.status >= 400 && error.response.status < 500) {
          const errorMessage = error.response.data?.message || "Invalid data provided";
          toast.error(`Error: ${errorMessage}`);
        } else if (error.response.status >= 500) {
          toast.error("Server error. Please try again later.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Website"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.website}
                name="website"
                error={!!touched.website && !!errors.website}
                helperText={touched.website && errors.website}
                sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
                InputProps={{
                  style: { color: '#000000' },
                  placeholder: "Website"
                }}
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
                InputProps={{
                  style: { color: '#000000' },
                  placeholder: "Name"
                }}
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                error={!!touched.url && !!errors.url}
                helperText={touched.url && errors.url}
                sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
                InputProps={{
                  style: { color: '#000000' },
                  placeholder: "URL"
                }}
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2", backgroundColor: "#F2F0F0" }}
                InputProps={{
                  style: { color: '#000000' },
                  placeholder: "City"
                }}
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4", backgroundColor: "#F2F0F0" }}
                InputProps={{
                  style: { color: '#000000' },
                  placeholder: "Address"
                }}
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  backgroundColor: '#FFAF00',
                  borderRadius: '9px',
                  paddingX: "40px",
                  paddingY: "15px",
                  '&:hover': {
                    backgroundColor: '#007FA3',
                    color: '#FFFFFF',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default WebsiteForm;
