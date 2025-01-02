import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("error while fetching posts:" + error);
    throw error;
  }
};

// create new post
export const createPost = async (postData) => {
  try {
    const response = await api.post("/create", postData);
    return response.data;
  } catch (error) {
    console.log("error while creating post:" + error);
    throw error;
  }
};
