import axios from "axios";

// Axios örneğini oluştur
const apiRequest = axios.create({
  baseURL: "http://localhost:8800", 
  withCredentials: true, 
});

export default apiRequest;
