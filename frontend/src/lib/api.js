import axios from "axios";

const api = axios.create({
  baseURL: "https://community-data-storage-hub-7.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
