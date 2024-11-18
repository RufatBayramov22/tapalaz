import Chat from "../components/Chat";
import List from "../pages/List";
import { Await, Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MobileNavBar from "../components/MobileNavbar";
import Noavatar from "../assets/images/noavatar.jpeg";
import apiRequest from "../lib/apiRequest";
import { useTranslation } from "react-i18next";


function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  

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
          <Suspense fallback={<p>Loading....</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
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