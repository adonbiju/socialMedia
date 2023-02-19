import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SendOutlined,
  DeleteOutlineOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme ,Backdrop,CircularProgress,InputBase} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost ,deletePost} from "state";
import PopupWidget from "./PopupWidget";

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
    const [openComment, setOpenComment] = useState(false);
    const [userLikedList,setUserLikedList]= useState(null);
    const [openPopup, setOpenPopup] = useState(false)
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
    const neutralLight = palette.neutral.light;

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
      showUsersLikedList().then(()=>setOpenPopup(true)).then(()=>setBackDrop(false))
    }

    const handleDeletePost=async()=>{
      setBackDrop(true)
       await fetch(`http://localhost:5000/posts/${postId}/${picturePath}/deletePost`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(()=>dispatch(deletePost(postId))).then(()=>setBackDrop(false))
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
            <IconButton onClick={() => setOpenComment(!openComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          </FlexBetween>
          {(loggedInUserId===postUserId)&&
              <IconButton onClick={handleDeletePost}>
                  <DeleteOutlineOutlined  />
              </IconButton>
          }
          </FlexBetween>

        {openComment && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
           <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="0rem" padding="0.1rem .1rem">
              <InputBase placeholder="Write a comment.....!" sx={{ width: "100%",padding: "1rem 2rem",height:"3rem"}}/>
              <IconButton onClick={handleDeletePost}>
                  <SendOutlined />
              </IconButton>
          </FlexBetween>
        </Box>
      )}
        {/* it will pop up the friends details */}
        
      <PopupWidget title="Likes" openPopup={openPopup} setOpenPopup={setOpenPopup}>
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
      </PopupWidget>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
            
      </WidgetWrapper>
    )
  }
  export default PostWidget;