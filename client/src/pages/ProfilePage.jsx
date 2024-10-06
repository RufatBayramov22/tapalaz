import Chat from "../components/Chat";
import List from "../pages/List";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MobileNavBar from "../components/MobileNavbar";
import Noavatar from "../assets/images/noavatar.jpeg";
import apiRequest from "../lib/apiRequest";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const { t } = useTranslation();
  
  // Posts state'ini tanımlayın
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleme durumu

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Profile posts verisini almak için useEffect kullanın
  useEffect(() => {
    const fetchProfilePosts = async () => {
      const accessToken = localStorage.getItem("accessToken"); // Token'ı localStorage'dan al
      try {
        const response = await apiRequest.get("/users/profilePosts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data.userPosts); // Başarılı yanıtı state'e ata
      } catch (error) {
        console.error('Error fetching profile posts:', error);
        setError(error.response?.data?.message || 'Bir hata oluştu'); // Hata mesajını state'e ata
      } finally {
        setLoading(false); // Yükleme tamamlandığında
      }
    };

    fetchProfilePosts(); // Fonksiyonu çağır
  }, []); // Boş bağımlılık dizisi, bileşen ilk yüklendiğinde çalışır

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>{t("aboutMe")}</h1>
          </div>
          <div className="info">
            <span className="image">
              {t("image")}:
              <img src={currentUser.avatar || Noavatar} alt="User Avatar" />
            </span>
            <span className="username">
              {t("name")}:<b>{currentUser.username || "N/A"}</b>
            </span>
            <span className="phoneNumber">
              {t("phoneNumber")}:<b>{currentUser.phoneNumber || "N/A"}</b>
            </span>
            <button onClick={handleLogout}>{t("logOut")}</button>
          </div>
          <div className="title">
            <h1 className="myProductsTitle">{t("myProducts")}</h1>
            <Link to="/add" className="addnewLink">
              <button className="addNewBtn">{t("addNew")}</button>
            </Link>
          </div>

          {loading ? ( // Yükleniyorsa
            <p>Loading....</p>
          ) : error ? ( // Hata varsa
            <p>Error loading posts: {error}</p>
          ) : ( // Başarılıysa
            <List posts={posts} />
          )}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
      <div className="mobile">
        <MobileNavBar />
      </div>
    </div>
  );
}

export default ProfilePage;
