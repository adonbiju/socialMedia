import React from 'react'
import Navbar from 'scenes/Navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import { useSelector } from "react-redux";
const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div>
    <Navbar/>
    <UserWidget userId={_id} picturePath={picturePath}/>
    </div>
  )
}

export default HomePage