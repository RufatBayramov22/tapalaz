import axios from "axios";

const apiRequest = axios.create({  
  baseURL: "https://tapalaz-1-xzag.onrender.com",
  withCredentials: true,
});

export default apiRequest;
