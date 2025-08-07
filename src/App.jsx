import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import Dashboard from "./scenes/dashboard";
import Leads from "./scenes/leads";
import Form from "./scenes/form";
import Requests from "./scenes/requests";
import Callscheduled from "./scenes/callscheduled";
import Notifications from "./scenes/notifications";
import ForgetPassword from "./scenes/auth/forget";
import Login from "./scenes/auth/login";
import Signup from "./scenes/auth/signup";
import Updatequestions from "./scenes/updateques/updatequestions";
import MyLrsMf from "./scenes/mylrsmf";
import OpFresh from "./scenes/opfresh";
import OpFreshMf from "./scenes/opfreshmf";
import OpFreshSv from "./scenes/opfreshsv";
import FreshPage from "./scenes/freshpage";
import Normal from "./scenes/normal";
import Campaign from "./scenes/campaign";
import OldCRMData from "./scenes/oldcrmdata";
import Website from "./scenes/website";
import ProjectAssigned from "./scenes/projectassigned";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import AdminOnly from "./scenes/adminonly";

const AppContent = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="app">
      {!hideSidebar && <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
      <main
        className="content d-flex align-items-center justify-content-center"
        style={{
          marginLeft: hideSidebar ? "0px" : isCollapsed ? "52px" : "15vw",
          width: hideSidebar ? "100vw" : isCollapsed ? "96vw" : "85vw",
          minHeight: "100vh",
          transition: "margin-left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
          willChange: "margin-left, width",
        }}
      >
        {children}
      </main>
    </div>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  const [theme, colorMode] = useMode();
  const token = localStorage.getItem("token");

  // Redirect to /home if already logged in
  const AuthRedirectIfLoggedIn = ({ Component }) => {
    return isAuthenticated ? <Navigate to="/freshpage" replace /> : <Component />;
  };

  // Protect routes if not logged in
  const ProtectedRoute = ({ redirectPath = "/" }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <AppContent>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthRedirectIfLoggedIn Component={Login} />} />
            <Route path="/login" element={<AuthRedirectIfLoggedIn Component={Login} />} />
            <Route path="/signup" element={<AuthRedirectIfLoggedIn Component={Signup} />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute isAllowed={!!token} />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/form" element={<Form />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/callscheduled" element={<Callscheduled />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/add-website" element={<Website />} />
              <Route path="/mustfollow" element={<Updatequestions />} />
              <Route path="/mylrsmf" element={<MyLrsMf />} />
              <Route path="/opfresh" element={<OpFresh />} />
              <Route path="/opfreshmf" element={<OpFreshMf />} />
              <Route path="/opfreshsv" element={<OpFreshSv />} />
              <Route path="/freshpage" element={<FreshPage />} />
              <Route path="/normal" element={<Normal />} />
              <Route path="/projectassigned" element={<ProjectAssigned />} />
              
              <Route path="/adminfeatures" element={<AdminOnly />} />

              <Route path="/campaign" element={<Campaign />} />

              <Route path="/olddata" element={<OldCRMData />} />

            </Route>

            {/* Optional Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContent>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
