
export const createPost = async (token, formData) => {
  const response = await fetch(`http://localhost:5000/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response;
};
