import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import { useMediaQuery } from "@mui/material";
const MainLayot = () => {
    const isAuth = Boolean(useSelector((state) => state.token));
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    if(!isAuth){
        return <Navigate to={"/"} />;
    }
  return (
    <>
    <Navbar/>
    {!isNonMobileScreens && (<BottomNavigation/>)}
    <Outlet />
    </>
  )
}

export default MainLayot