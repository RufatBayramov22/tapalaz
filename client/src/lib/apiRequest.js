import axios from "axios";

// Axios örneğini oluştur
const apiRequest = axios.create({
  baseURL: "http://localhost:8800", // API URL'iniz
  withCredentials: true, // Çerezleri dahil et
});

// İstek interceptor'ı ekle

export default apiRequest