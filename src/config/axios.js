import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ⬅ MUST for cookies
  headers: {
    "Content-Type": "application/json",
  },
});
