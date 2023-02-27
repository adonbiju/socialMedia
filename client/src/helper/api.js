import axios from "axios";
import { BASE_ROUTE } from "./routes";

export const createPost = async (token, formData) => {
  const response = await fetch(`${BASE_ROUTE}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response;
};

export const UsersCommentedList = async(postId,token) => {
  const response = await axios.get(`${BASE_ROUTE}/posts/${postId}/postCommentedUsersDetails`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getAllUsersApi = async(token) => {
  const response = await axios.get(`${BASE_ROUTE}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const AddOrRemoveFriendApi = async(_id,friendId,token) => {
  const response = await axios.patch(`${BASE_ROUTE}/user/${_id}/${friendId}`, {}, {
    headers: { Authorization: `Bearer ${token}`,  'content-type': 'application/json' },
  })
  return response.data
}

export const UploadCoverPhoto = async(_id,token,formData) => {
  const response = await axios.patch(`${BASE_ROUTE}/user/${_id}/uplaoadCoverPhoto`, formData, {
    headers: { Authorization: `Bearer ${token}`},
  })
  return response.data
}