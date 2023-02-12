import React from 'react'
import {BallTriangle} from 'react-loader-spinner'
import { styled } from "@mui/system";
import { Box } from "@mui/material";
const Loading = () => {

    const LoadingComponent = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor:theme.palette.background.alt,
        position: 'relative',
        width:'100%',
        height:'100%'
      }));
    
  return (
    <LoadingComponent>
        <BallTriangle color="#e50914" height="150" width="150"/>
    </LoadingComponent>
  )
}

export default Loading