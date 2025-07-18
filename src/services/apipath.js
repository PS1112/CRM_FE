export const API_PATH = {
  SUPER_ADMIN: {
    REGISTER: "api/v1/auth/register",
    LOGIN: "api/v1/auth/login",
    // ADD_FRESH_ENQUIRY: "http://54.236.177.45/api/crm/basic/add-fresh-query",
  },
  ENQUIRY:{
    GET_FRESH_ENQUIRY: "api/v1/basic/get-fresh-query",
    CHECK_AVAILABILITY: "api/v1/basic/check-availability",
    ADD_ENQUIRY:"/add-enquiry",
    UPDATE_ENQUIRY: "api/v1/basic/update-assign-project",
  },
  WEBSITES:{
    ADD_WEBSITE: "api/v1/basic/add-websites",
    GET_WEBSITES: "api/v1/basic/get-websites", 
  }
};