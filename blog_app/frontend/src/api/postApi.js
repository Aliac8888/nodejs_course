import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.log("error while fetching posts:" + error);
    throw error;
  }
//   const mockPosts = [
//     { id: 1, title: "First Post", content: "This is the first post." },
//     { id: 2, title: "Second Post", content: "This is the second post." },
//   ];
};
