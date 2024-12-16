import axios from "axios";

// Axios örneğini oluştur
const apiRequest = axios.create({
  baseURL: "https://tapalaz-2-ryj8.onrender.com", 
  withCredentials: true, 
});

export default apiRequest;
