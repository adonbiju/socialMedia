import axios from "axios";
import { BASE_ROUTE } from "./routes";
export const createPost = async (token, formData) => {
  const response = await fetch(`http://localhost:5000/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response;
};


export const UsersCommentedList = async(postId,token) => {
  const response = await axios.get(`${BASE_ROUTE}posts/${postId}/postCommentedUsersDetails`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}