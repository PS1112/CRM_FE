import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import LogoutIcon from "@mui/icons-material/Logout";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/FormatAlignLeft';
import LightModeOutlinedIcon from '@mui/icons-material/FormatAlignLeft';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { useAuth } from "../../context/AuthContext";

import "./style.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="fs-6">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const ToolTip = ({title, placement,itemTitle,itemTo, icon,selected,setSelected}) =>{
  return (
    <Tooltip
      title={title}
      placement={placement}
      componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '16px',
                }
              }
            }}
    >
      <div>
        <Item
          title={itemTitle}
          to={itemTo}
          icon={icon}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </Tooltip>
  );
}        
const Sidebar = ({isCollapsed, setIsCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { logout } = useAuth();

  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

  const handleToggleColorMode = () => {
    colorMode.toggleColorMode();
  };

  const handleLogout = () => {
  logout();
  navigate("/");
};
  const sidebarItems = [
    {
      title: "Fresh Page",
      placement: "right",
      itemTitle: "Fresh Page",
      itemTo: "/freshpage",
      icon: <AutorenewIcon />,
    },
    {
      title: "All Enquiries",
      placement: "right",
      itemTitle: "All Enquiries",
      itemTo: "/freshpage",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "My Unique",
      placement: "right",
      itemTitle: "My Unique",
      itemTo: "/leads",
      icon: <AutoGraphIcon />,
    },
    {
      title: "My Ping",
      placement: "right",
      itemTitle: "My Ping",
      itemTo: "/requests",
      icon: <ContactsOutlinedIcon />,
    },
    {
      title: "My LRS Fresh",
      placement: "right",
      itemTitle: "My LRS Fresh",
      itemTo: "/callscheduled",
      icon: <AddIcCallIcon />,
    },
    {
      title: "My LRS SV",
      placement: "right",
      itemTitle: "My LRS SV",
      itemTo: "/notifications",
      icon: <AddIcCallIcon />,
    },
    {
      title: "Must Follow",
      placement: "right",
      itemTitle: "Must Follow",
      itemTo: "/mustfollow",
      icon: <FollowTheSignsIcon />,
    },
    {
      title: "My LRS MF",
      placement: "right",
      itemTitle: "My LRS MF",
      itemTo: "/mylrsmf",
      icon: <AddIcCallIcon />,
    },
    {
      title: "OP Fresh",
      placement: "right",
      itemTitle: "OP Fresh",
      itemTo: "/opfresh",
      icon: <HowToRegIcon />,
    },
    {
      title: "OP Fresh MF",
      placement: "right",
      itemTitle: "OP Fresh MF",
      itemTo: "/opfreshmf",
      icon: <HowToRegIcon />,
    },
    {
      title: "OP Fresh SV",
      placement: "right",
      itemTitle: "OP Fresh SV",
      itemTo: "/opfreshsv",
      icon: <HowToRegIcon />,
    },
    {
      title: "Normal",
      placement: "right",
      itemTitle: "Normal",
      itemTo: "/normal",
      icon: <TextSnippetIcon />,
    },
    {
      title: "Project Assigned",
      placement: "right",
      itemTitle: "Project Assigned",
      itemTo: "/projectassigned",
      icon: <HomeWorkIcon />,
    },
    {
      title: "Campaign",
      placement: "right",
      itemTitle: "Campaign",
      itemTo: "/campaign",
      icon: <FormatAlignLeftIcon />,
    }, 
    {
      title: "Add Website",
      placement: "right",
      itemTitle: "Add Website",
      itemTo: "/add-website",
      icon: <AddCircleOutlineIcon />,
    },
    {
      title: "Admin Features",
      placement: "right",
      itemTitle: "Admin Features",
      itemTo: "/adminfeatures",
      icon: <SupervisorAccountIcon />,
    },
  ];
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: isCollapsed ? "80px" : "200px",
        minWidth: isCollapsed ? "80px" : "200px",
        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), min-width 0.35s cubic-bezier(0.4,0,0.2,1)",
        willChange: "width, min-width",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 10px 5px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#cda83f !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width={isCollapsed ? 80 : 200}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "5px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  Sarvottam CRM
                </Typography>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="100px"
                  src={`../../assets/sarvottam_center1.png`}
                />
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {sidebarItems.map((item, index) => (
              <ToolTip
                key={index}
                title={item.title}
                placement={item.placement}
                itemTitle={item.itemTitle}
                itemTo={item.itemTo}
                icon={item.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}

            <Item
              title="Logout"
              // to="/"
              onClick={() => handleLogout()}
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={() => handleLogout()}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
