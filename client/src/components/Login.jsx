import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { t } from "i18next";
import axios from "axios";

function Login() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajı için durum ekle

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://tapalaz-1-xzag.onrender.com/auth/login", {
        username,
        password,
      }, { withCredentials: true });
  
      // Access token'ı kontrol et
      const accessToken = response.data.accessToken;
  
      if (accessToken) {
        // Axios default header'ı ayarla
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
        // Access token'ı localStorage'a kaydet
        localStorage.setItem("token", accessToken);
        console.log(localStorage.getItem("token"));
  
        // Kullanıcı bilgilerini güncelle
        if (response.data.user) {
          updateUser(response.data.user);
        }
  
        navigate("/"); // Ana sayfaya yönlendir
      } else {
        throw new Error("Access Token not found in the response.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : "Bir hata oluştu!");
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
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{t("login")}</button>

          {error && <span>{error}</span>} {/* Hata mesajını göster */}

          <Link to="/register">{t("dontHave")}</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
