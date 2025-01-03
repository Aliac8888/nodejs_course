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

// fetch post by ID
export const fetchSinglePost = async (id) => {
  try {
    const response = await api.get("/" + id);
    return response.data;
  } catch (error) {
    console.log("error while fetching post:" + error);
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

// update post
export const updatePost = async (id,postData) => {
  try {
    const response = await api.put("/" + id, postData);
    return response.data;
  } catch (error) {
    console.log("error while updating post:" + error);
    throw error;
  }
};
