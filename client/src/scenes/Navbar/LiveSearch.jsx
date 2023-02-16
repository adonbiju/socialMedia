import { useState,useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Friend from "components/Friend";

import {Box} from "@mui/material";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";


const LiveSearch=()=>{
  
  const token = useSelector((state) => state.token);
  const [allUsers, setAllUsers] = useState(false);

  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:5000/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAllUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!allUsers) return null;
  return(
  
  <Autocomplete 
      id="combo-box-search"
      getOptionLabel={(allUsers)=>`${allUsers.firstName} ${allUsers.lastName}`} 
      options={allUsers} 
      sx={{ width: 350 }}
      isOptionEqualToValue={(option,value)=>
        option.firstName===value.firstName
      }
      noOptionsText={"No user Found!!!"}
      renderOption={(props,allUsers) =>(
        <WidgetWrapper  key={allUsers._id}>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          <Friend
            key={allUsers._id}
            friendId={allUsers._id}
            name={`${allUsers.firstName} ${allUsers.lastName}`}
            subtitle={allUsers.occupation}
            userPicturePath={allUsers.picturePath}
          />
        </Box>
        </WidgetWrapper>
        
      )}
      
      renderInput={(params) => 
        <TextField   label={"Search..."}
            sx={{
              "& fieldset": { border: 'none' },
            }}
            {...params}   
          />
      }
        
    />
    
  )

}

export default LiveSearch