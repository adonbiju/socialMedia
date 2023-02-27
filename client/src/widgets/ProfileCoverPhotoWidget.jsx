
import { WidgetWrapper ,Popup,UploadPhoto} from "components";
import { Box, useMediaQuery, useTheme, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";

const ProfileCoverPhotoWidget = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isMobileScreens = useMediaQuery("(max-width:1000px)");
  const [openCoverPhotoPopup,setOpenCoverPhotoPopup]=useState(false)

  return (
    <WidgetWrapper>
      <Box position="relative">

        <Box display="flex" gap="2rem" justifyContent="flex-end">
          <img style={{ objectFit: "cover", position: "absolute" }} width="100%" height="250px" alt="CoverPhoto"
            src={`http://localhost:5000/assets/info4.jpeg`}
          />
          <Box margin="1rem" >
            <Button onClick={()=>setOpenCoverPhotoPopup(true)} variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              Add Cover Photo
            </Button>
          </Box>
        </Box>


        <Box width="100%" padding="2rem 6%" display="flex" gap="2rem" justifyContent="flex-start" marginTop={"120px"} >
          <Box width="150px" height="150px" zIndex={1}>
            <img style={{ objectFit: "cover", borderRadius: "50%" }} width="150px" height="150px" alt="user"
              src={`http://localhost:5000/assets/IMG_20210415_072610_729.jpg`}
            />
          </Box>
          <Stack spacing={1} mt={"3.8rem"} alignItems="center" >
            <Typography color={main} variant="h3" fontWeight="500">
              Adon Biju
            </Typography>
            <Typography color={main} variant="h5" fontWeight="500" >
              24 Friends
            </Typography>
            {isMobileScreens && <Button variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              Add Friend
            </Button>}
          </Stack>
          <Stack mt={"4.8rem"} >
            {!isMobileScreens && <Button variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              Add Friend
            </Button>}
          </Stack>
        </Box>

      </Box>
      <Popup title="Upload your cover photo " openPopup={openCoverPhotoPopup}  setOpenPopup={setOpenCoverPhotoPopup}  >
        <UploadPhoto/>
      </Popup>
    </WidgetWrapper>
  );
}

export default ProfileCoverPhotoWidget;
