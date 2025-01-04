import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// signup
export const register = async (userData) => {
  try {
    const response = await api.post("/signup",userData);    
    return response.data;
  } catch (error) {
    console.log("error while signup:" + error);
    throw error;
  }
};