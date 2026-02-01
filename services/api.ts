import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // عدّلها حسب backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
