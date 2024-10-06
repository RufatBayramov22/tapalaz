import axios from "axios";

// Axios örneğini oluştur
const apiRequest = axios.create({
  baseURL: "https://tapalaz-1-xzag.onrender.com", // API URL'iniz
  withCredentials: true, // Çerezleri dahil et
});

// İstek interceptor'ı ekle

export default apiRequest