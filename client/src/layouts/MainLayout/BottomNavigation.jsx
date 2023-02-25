import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from "@mui/material";
import {
  AccountCircleOutlined,
  LogoutOutlined,
  DarkMode,
  LightMode,
  HomeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import { useState } from "react";

const BottomNavigationWidget = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0,zIndex:1 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlined />}
          onClick={() => navigate("/home")}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleOutlined />}
          onClick={() => navigate(`/profile/${_id}`)}
        />
        <BottomNavigationAction
          onClick={() => dispatch(setMode())}
          icon={
            theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Logout"
          icon={<LogoutOutlined />}
          onClick={() => dispatch(setLogout())}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationWidget;
