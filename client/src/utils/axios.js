import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://fullstack-quiz-xx4e.onrender.com/api",
  withCredentials: true,
});
