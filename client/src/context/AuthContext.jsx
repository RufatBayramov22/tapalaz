import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Düzgün içe aktarma
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const updateUser = (data) => {
    setCurrentUser(data);
  };


  const isTokenExpired = (token) => {
    if (!token) return true; // Eğer token yoksa süresi dolmuş kabul et
    const decoded = jwtDecode(token); // jwt_decode yerine jwtDecode kullan
    const currentTime = Date.now() / 1000; // Şu anki zamanı saniye cinsinden al
    return decoded.exp < currentTime; // Eğer süresi dolmuşsa true döndür
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (isTokenExpired(token)) {
        updateUser(null); // Kullanıcı bilgisini sıfırlayın
        setToken(null); // Token'ı sıfırlayın
        localStorage.removeItem("token"); // Yerel depolamadan token'ı kaldırın
    
      }
    };

    checkTokenExpiry(); // Token süresini kontrol et

    // Belirli aralıklarla kontrol etmek için bir interval ayarlayın (örneğin, her 5 dakikada bir)
    const interval = setInterval(checkTokenExpiry, 7 * 24 * 60 * 60 * 1000); // 1 haftada bir kontrol et


    return () => clearInterval(interval); // Temizle
  }, [token]);

  return (
    <AuthContext.Provider value={{ currentUser, token, updateUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
