import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://tapalaz-1-xzag.onrender.com", // API'nizin temel URL'si
  withCredentials: true, // Gerekirse çerezlerin gönderilmesini sağla
});

apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRequest;
