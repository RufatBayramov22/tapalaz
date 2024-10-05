import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { t } from "i18next";

function Login() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajı için durum ekle

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
  
      console.log(res.data); // Yanıtı kontrol et
  
      // Kullanıcı bilgilerini güncelle
      if (res.data.user) {
        updateUser(res.data.user);
        localStorage.setItem("token", res.data.accessToken); // Access token'ı localStorage'a kaydet
        // Eğer refresh token'ı da saklamak isterseniz, onu da burada saklayabilirsiniz.
        // localStorage.setItem("refreshToken", res.data.refreshToken);
      } else {
        throw new Error("User data not found in response");
      }
  
      navigate("/"); // Ana sayfaya yönlendir
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : "An error occurred!");
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
