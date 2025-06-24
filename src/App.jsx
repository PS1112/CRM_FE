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
import Website from "./scenes/website";
import ProjectAssigned from "./scenes/projectassigned";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColorModeContext, useMode } from "./theme";

const AppContent = ({ children }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="app">
      {!hideSidebar && <Sidebar />}
      <main
        className="content d-flex align-items-center justify-content-center"
        style={{
          marginLeft:"80px",
          transition: "margin-left 0.2s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

function App() {
  const [theme, colorMode] = useMode();
  const token = localStorage.getItem("token");

  const ProtectedRoute = ({ Component }) => {
    return token ? <Navigate to="/home" replace={true} /> : <Component />;
  };

  const ProtectedRoute1 = ({ isAllowed, redirectPath = "/" }) => {
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace={true} />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <AppContent>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<ProtectedRoute Component={Signup} />} />
            <Route path="/" element={<ProtectedRoute Component={Login} />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute1 isAllowed={!!token} />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/form" element={<Form />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/callscheduled" element={<Callscheduled />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/add-website" element={<Website />} />
              <Route path="/updatequestions" element={<Updatequestions />} />
              <Route path="/mylrsmf" element={<MyLrsMf />} />
              <Route path="/opfresh" element={<OpFresh />} />
              <Route path="/opfreshmf" element={<OpFreshMf />} />
              <Route path="/opfreshsv" element={<OpFreshSv />} />
              <Route path="/freshpage" element={<FreshPage />} />
              <Route path="/normal" element={<Normal />} />
              <Route path="/projectassigned" element={<ProjectAssigned />} />
              <Route path="/campaign" element={<Campaign />} />
            </Route>

            {/* Fallback Route (optional) */}
            {/* <Route path="*" element={<Unauthorized />} /> */}
          </Routes>
        </AppContent>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
