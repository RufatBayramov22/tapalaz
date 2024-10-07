import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest"; // apiRequest'ı içe aktar
import { t } from "i18next";

function Login() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajı durumu
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await apiRequest.post(
        "/auth/login",
        { username, password },
        {
          withCredentials: true, // Çerezlerle birlikte isteği gönder
        }
      );
  
      // Login başarılı ise token ve kullanıcı bilgilerini al
      const { token, ...userInfo } = res.data;
  
      // Kullanıcı bilgilerini ve token'ı localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify({ token, ...userInfo }));
  
      // currentUser'ı güncelle
      updateUser({ token, ...userInfo });
  
      // Ana sayfaya yönlendir
      navigate("/");
    } catch (err) {
      console.error("Giriş hatası:", err);
      setError(err.response ? err.response.data.message : "Bir hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>{t("welcome")}</h1>
          <input
            name="username"
            type="text"
            placeholder={t("username")}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("login")}
          </button>
          {error && <span>{error}</span>} {/* Hata mesajını göster */}
          <Link to="/register">{t("dontHave")}</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
