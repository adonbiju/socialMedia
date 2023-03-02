
import { WidgetWrapper ,Popup,UploadPhoto} from "components";
import { Box, useMediaQuery, useTheme, Typography, Button, Stack,Backdrop,CircularProgress } from "@mui/material";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { AddOrRemoveFriendApi } from "helper/api";
import { setFriends } from "state";
import {useSnackbar} from "notistack" 

const ProfileCoverPhotoWidget = ({userId}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isMobileScreens = useMediaQuery("(max-width:1000px)");
  
  const [user, setUser] = useState(null);
  const [openCoverPhotoPopup,setOpenCoverPhotoPopup]=useState(false)
  const [backDrop,setBackDrop]=useState(false)
  const {_id,coverPhotoPath} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === userId);
  const {enqueueSnackbar} = useSnackbar();

  console.log(isFriend)
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const patchFriend = async () => {
    setBackDrop(true);
    const data = await AddOrRemoveFriendApi(_id,userId,token);
    dispatch(setFriends({ friends: data }));
    setBackDrop(false);
    if (isFriend){
      enqueueSnackbar(user.firstName+ (" Removed as your Friend Successfully!!"), { variant: 'warning',anchorOrigin:{ vertical: "top", horizontal: "right" } });
    } else {
      enqueueSnackbar(user.firstName+ (" Added as your Friend Successfully!!"), { variant: 'success',anchorOrigin:{ vertical: "top", horizontal: "right" } });
    }
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
            {userId===_id?(''):
            (
            <>{isMobileScreens && 
            <Button onClick={() => patchFriend()} variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              {isFriend? "Remove Friend":"Add Friend"}
            </Button>}</>
            )}

          </Stack>
        <Stack mt={"4.8rem"} >
            {userId===_id?(''):
            (
            <>{!isMobileScreens && 
            <Button onClick={() => patchFriend()} variant="contained" size="small" sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: "3rem", }} >
              {isFriend? "Remove Friend":"Add Friend"}
            </Button>}</>
            )}
          </Stack>
        </Box>

      </Box>
      <Popup title="Upload your cover photo " openPopup={openCoverPhotoPopup}  setOpenPopup={setOpenCoverPhotoPopup}  >
        <UploadPhoto/>
      </Popup>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </WidgetWrapper>
  );
}

export default ProfileCoverPhotoWidget;
