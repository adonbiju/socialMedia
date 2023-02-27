
import { WidgetWrapper ,Popup,UploadPhoto} from "components";
import { Box, useMediaQuery, useTheme, Typography, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProfileCoverPhotoWidget = ({userId}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isMobileScreens = useMediaQuery("(max-width:1000px)");
  const [openCoverPhotoPopup,setOpenCoverPhotoPopup]=useState(false)
  const {_id,coverPhotoPath} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
   if (!user) return null;
  return (
    <WidgetWrapper>
      <Box position="relative">

        <Box display="flex" gap="2rem" justifyContent="flex-end">
          
          {(user._id===_id) &&<img style={{ objectFit: "cover", position: "absolute" }} width="100%" height="250px" alt="CoverPhoto"
            src={`http://localhost:5000/assets/${coverPhotoPath}`}
          />}
           {(user._id!==_id) &&<img style={{ objectFit: "cover", position: "absolute" }} width="100%" height="250px" alt="CoverPhoto"
            src={`http://localhost:5000/assets/${user.coverPhotoPath}`}
          />}
          {(user.coverPhotoPath===null) &&<img style={{ objectFit: "cover", position: "absolute" }} width="100%" height="250px" alt="CoverPhoto"
            src={`http://localhost:5000/assets/info4.jpeg`}
          />}
          <Box margin="1rem" >
            {(userId===_id) && <Button onClick={()=>setOpenCoverPhotoPopup(true)} variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              Add Cover Photo
            </Button>}
          </Box>
        </Box>


        <Box width="100%" padding="2rem 6%" display="flex" gap="2rem" justifyContent="flex-start" marginTop={(userId===_id)?"120px":"155px"} >
          <Box width="150px" height="150px" zIndex={1}>
            <img style={{ objectFit: "cover", borderRadius: "50%" }} width="150px" height="150px" alt="user"
              src={`http://localhost:5000/assets/${user.picturePath}`}
            />
          </Box>
          <Stack spacing={1} mt={"3.8rem"} alignItems="center" >
            <Typography color={main} variant="h3" fontWeight="500">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={main} variant="h5" fontWeight="500" >
              {user.friends.length} Friends
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
