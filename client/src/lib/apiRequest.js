import axios from "axios";

const apiRequest = axios.create({  
  // baseURL: "https://tapalaz-1-xzag.onrender.com",
  baseURL:"http://localhost:8800",
  withCredentials: true,
});

export default apiRequest;
