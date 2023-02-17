import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme ,Dialog,DialogActions,DialogContent,DialogTitle,
  Button,Backdrop,CircularProgress} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => 
  {
    const [isComments, setIsComments] = useState(false);
    const [userLikedList,setUserLikedList]= useState(null);
    const [dialog, setDialog]=useState(false)
    const [backDrop,setBackDrop]=useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const dark = palette.neutral.dark

    const patchLike = async () => {
      setBackDrop(true)
      const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setBackDrop(false)
    };
    
    const showUsersLikedList= async()=>{
        const response = await fetch(`http://localhost:5000/posts/${postId}/postLikedUsersDetails`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserLikedList(data);
    }
    const showPostLikedUserDialog=()=>{
      setBackDrop(true)
      showUsersLikedList().then(()=>setDialog(true)).then(()=>setBackDrop(false))
    }

    const handleClose=()=>{
      setDialog(false)
    }
 
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography onClick={showPostLikedUserDialog}  sx={{
            "&:hover": {
              color: primary,
              cursor: "pointer",
            },
            }}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          </FlexBetween>

              <IconButton>
                  <ShareOutlined />
              </IconButton>
          </FlexBetween>

        {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
        {/* it will pop up the friends details */}
        
        <Dialog open={dialog} >
          <DialogTitle>Likes</DialogTitle>
          <DialogContent dividers>
            <>
            <Box display="flex" flexDirection="column" gap="1.5rem" width={300}>

            {(userLikedList!==null && userLikedList.length!==0)?(
            <>
              {userLikedList.map((friend) => (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              ))}
            </>
             
            ):(
              <Typography
                color={dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
              No Likes for this Post Yet!!
            </Typography>         
            )
            }
            </Box>
        </>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
         </Dialog>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
            
      </WidgetWrapper>
    )
  }
  export default PostWidget;