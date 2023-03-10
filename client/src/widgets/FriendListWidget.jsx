import { Box, Typography, useTheme } from "@mui/material";
import { WidgetWrapper,Friend} from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";


const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const {_id} = useSelector((state) => state.user)
  const [friends2,setFriends2] = useState(null)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if(userId===_id){
    dispatch(setFriends({ friends: data }));
    }else{
    setFriends2(data)
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
   
  // if (!friends2) return null;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {(userId.toString()===_id.toString())?( <>
          {friends && friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </>):( <>
          {friends2 && friends2.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </>)
        }
        
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
