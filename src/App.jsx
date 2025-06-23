import * as React from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Leads from "./scenes/leads";
import Form from "./scenes/form";
import Requests from "./scenes/requests";
import Callscheduled from "./scenes/callscheduled";
import Notifications from "./scenes/notifications";
import Sidebar from "./components/Sidebar/Sidebar";
import ForgetPassword from "./scenes/auth/forget";
import Login from "./scenes/auth/login";
import Signup from "./scenes/auth/signup";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { ToastContainer } from "react-toastify";
import Unauthorized from "./scenes/Unauthorized/Unauthorized";
import Updatequestions from "./scenes/updateques/updatequestions";
import MyLrsMf from "./scenes/mylrsmf";
import OpFresh from "./scenes/opfresh";
import OpFreshMf from "./scenes/opfreshmf";
import ProjectAssigned from "./scenes/projectassigned";
import OpFreshSv from "./scenes/opfreshsv";
import FreshPage from "./scenes/freshpage";
import Normal from "./scenes/normal";
import Campaign from "./scenes/campaign";
import Website from "./scenes/website";


const AppContent = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  const token = localStorage.getItem("token");
  const ProtectedRoute = () => {
    return token ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <div className="app">
      {!hideSidebar && <Sidebar />}
      <main className="content d-flex align-items-center justify-content-center">
        <Routes>
          {/* <Route exact path="/" element={<Signup />} /> */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/form" element={<Form />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/callscheduled" element={<Callscheduled />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/add-website" element={<Website />} />
            <Route path="/updatequestions" element={<Updatequestions />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const ProtectedRoute = ({ Component }) => {
    if (token) {
      return <Navigate to="/home" replace={true} />;
    }
    return <Component />;
  };
  const ProtectedRoute1 = ({ isAllowed, redirectPath = "/", children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace={true} />;
    }
    return children ? children : <Outlet />;
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <div className="app">
          {!hideSidebar && <Sidebar />}
          <main
            className="content d-flex align-items-center justify-content-center"
            style={{
              marginLeft: hideSidebar ? "80px" : "200px",
              transition: "margin-left 0.2s"
            }}
          >
            <Routes>
              <Route
                exact
                path="/signUp"
                element={<ProtectedRoute Component={Signup} />}
              />
              <Route
                exact
                path="/"
                element={<ProtectedRoute Component={Login} />}
              />
              <Route
                exact
                path="/forgetpassword"
                element={<ForgetPassword />}
              />
              <Route path="/*" element={<AppContent />} />{" "}
              <Route element={<ProtectedRoute1 isAllowed={!!token} />}/>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/freshpage" element={<FreshPage />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/form" element={<Form />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/callscheduled" element={<Callscheduled />} />
                <Route path="/notifications" element={<Notifications />} />

                <Route path="/mylrsmf" element={<MyLrsMf />} />
                <Route path="/opfresh" element={<OpFresh />} />
                <Route path="/opfreshsv" element={<OpFreshSv />} />

                <Route path="/opfreshmf" element={<OpFreshMf />} />
                <Route path="/normal" element={<Normal />} />
                <Route path="/projectassigned" element={<ProjectAssigned />} />
                <Route path="/campaign" element={<Campaign />} />
            <Route path="/add-website" element={<Website />} />

                <Route path="/updatequestions" element={<Updatequestions />} />
                {/* </Route> */}
                {/* <Route path="/*" element={<Unauthorized />}></Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
