import { Box, useMediaQuery } from "@mui/material";
import Navbar from 'scenes/Navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import { useSelector } from "react-redux";
const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <div>
    <Navbar/>
    <Box
     width="100%"
     padding="2rem 6%"
     display={isNonMobileScreens ? "flex" : "block"}
     gap="0.5rem"
     justifyContent="space-between">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
    </Box>
    </div>
  )
}

export default HomePage