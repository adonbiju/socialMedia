import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SendOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
  InputBase,
  useMediaQuery
} from "@mui/material";
import { Popup,FlexBetween,Friend,WidgetWrapper } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, deletePost } from "state";
import { UsersCommentedList } from "helper/api";
import {useSnackbar} from "notistack"
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
}) => {
  const [openComment, setOpenComment] = useState(false);
  const [userLikedList, setUserLikedList] = useState(null);
  const [userCommentedList, setUserCommentedList] = useState(null);
  const [comment, setComment] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [openCommentsPopup, setOpenCommentsPopup] = useState(false);
  const [openConformaionPopup,setOpenConformationPopup]=useState(false)
  const [backDrop, setBackDrop] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const {enqueueSnackbar} = useSnackbar();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;
  const neutralLight = palette.neutral.light;

  const patchLike = async () => {
    setBackDrop(true);
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
    setBackDrop(false);
  };

  const showUsersLikedList = async () => {
    const response = await fetch(
      `http://localhost:5000/posts/${postId}/postLikedUsersDetails`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUserLikedList(data);
  };
  const showPostLikedUserDialog = () => {
    setBackDrop(true);
    showUsersLikedList()
      .then(() => setOpenPopup(true))
      .then(() => setBackDrop(false));
  };

  const handleDeletePost = async () => {
    setBackDrop(true);
    await fetch(
      `http://localhost:5000/posts/${postId}/${picturePath}/deletePost`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => dispatch(deletePost(postId)))
      .then(() => setBackDrop(false));
      enqueueSnackbar('Post deleted Successfully!!', { variant: 'success',anchorOrigin:{ vertical: "top", horizontal: "right" } })
  };

  const handleComment = async () => {
    setBackDrop(true);
    const commentData = {
      userId: loggedInUserId,
      comment: comment,
    };
    const response=await fetch(`http://localhost:5000/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setBackDrop(false);
    setComment("");
    enqueueSnackbar('Comment Added Successfully!!', { variant: 'success',anchorOrigin:{ vertical: "top", horizontal: "right" } })
  };

  const showUsersCommentedList = async () => {
    // const response = await fetch(
    //   `http://localhost:5000/posts/${postId}/postCommentedUsersDetails`,
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
     //const data = await response.json();
     
    const response= await UsersCommentedList(postId,token)
    setUserCommentedList(response);
  };
  const showPostCommentedUserDialog = () => {
    setBackDrop(true);
    showUsersCommentedList()
      .then(() => setOpenCommentsPopup(true))
      .then(() => setBackDrop(false));
  };
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
            <Typography
              onClick={showPostLikedUserDialog}
              sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
            >
              {likeCount}
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setOpenComment(!openComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography
              onClick={showPostCommentedUserDialog}
              sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
            >
              {comments.length}
            </Typography>
          </FlexBetween>
        </FlexBetween>
        {loggedInUserId === postUserId && (
          <IconButton onClick={()=>setOpenConformationPopup(true)}>
            <DeleteOutlineOutlined />
          </IconButton>
        )}
      </FlexBetween>

      {openComment && (
        <Box mt="0.5rem">
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="0rem"
            padding="0.1rem .1rem"
          >
            <InputBase
              placeholder="Write a comment.....!"
              sx={{ width: "100%", padding: "1rem 2rem", height: "3rem" }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <IconButton onClick={handleComment}>
              <SendOutlined />
            </IconButton>
          </FlexBetween>
        </Box>
      )}
      {/* it will pop up the friends details */}

      <Popup
        title="Likes"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <>
          <Box display="flex"  flexDirection="column" gap="1.5rem" width={300}>
            {userLikedList !== null && userLikedList.length !== 0 ? (
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
            ) : (
              <Typography
                color={dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
              >
                No Likes for this Post Yet!!
              </Typography>
            )}
          </Box>
        </>
      </Popup>
      <Popup
        title="Comments"
        openPopup={openCommentsPopup}
        setOpenPopup={setOpenCommentsPopup}
      >
        <>
          <Box display="flex" flexDirection="column" gap="1.5rem" width={isNonMobileScreens?500:370}>
            {userCommentedList !== null && userCommentedList.length !== 0 ? (
              <>
              <WidgetWrapper >
                {userCommentedList.map((comment) => (
                  <>
                    <Friend
                      key={comment.commentBy._id}
                      friendId={comment.commentBy._id}
                      name={`${comment.commentBy.firstName} ${comment.commentBy.lastName}`}
                      subtitle={comment.commentBy.location}
                      userPicturePath={comment.commentBy.picturePath}
                    />
                    <Box
                      sx={{
                        backgroundColor: neutralLight,
                        margin:".5rem 1rem 0rem 4rem",
                        borderRadius:"0.75rem"
                      }}
                    >
                      <Typography
                        color={dark}
                        variant="h6"
                        fontWeight="500"
                        sx={{ mb: "1.5rem", padding: "1rem 1rem" }}
                      >
                        {comment.comment}
                      </Typography>
                    </Box>
                  </>
                ))}
                </WidgetWrapper>
              </>
            ) : (
              <Typography
                color={dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
              >
                No Comments for this Post Yet!!
              </Typography>
            )}
          </Box>
        </>
      </Popup>
      <Popup title="Conformation" openPopup={openConformaionPopup}  setOpenPopup={setOpenConformationPopup} clickHandler={handleDeletePost} >
        <Typography  color={dark} variant="h5"  fontWeight="500"   sx={{ mb: "1.5rem" }}  >
              Are you sure want to delete this post?
        </Typography>
      </Popup>
      
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </WidgetWrapper>
  );
};
export default PostWidget;
