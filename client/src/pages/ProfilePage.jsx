import Chat from "../components/Chat";
import List from "../pages/List";
import { Await, Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MobileNavBar from "../components/MobileNavbar";
import Noavatar from "../assets/images/noavatar.jpeg"
import apiRequest from "../lib/apiRequest";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);
  const {t,i18n} =useTranslation()
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");

      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // const [savedPosts, setSavedPosts] = useState([]);

  // useEffect(() => {
  //   const fetchSavedPosts = async () => {
  //     try {
  //       const response = await apiRequest.get(`/users/savedPosts/${currentUser._id}`);
  //       setSavedPosts(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch saved posts:", error);
  //     }
  //   };

  //   fetchSavedPosts();
  // }, [currentUser]);

  // console.log(savedPosts);

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>{t("aboutMe")}</h1>
            {/* <Link to="/profile/update">
              <button>{t("updateAcc")}</button>
            </Link> */}
          </div>
          <div className="info">
            <span className="image">
            {t("image")}:
              <img src={currentUser.avatar || Noavatar } alt="" />
            </span>
            <span className="username">
            {t("name")}:<b>{currentUser.username} </b>
            </span>
            <span className="phoneNumber">
              PhoneNumber:<b>{currentUser.phoneNumber}</b>
            </span>
            <button onClick={handleLogout}> {t("logOut")}</button>
          </div>
          <div className="title">
            <h1 className="myProducsTitle"> {t("myProducts")}</h1>
            <Link to="/add" className="addnewLink">
              <button className="addNewBtn"> {t("addNew")}</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading....</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts}/>}
            </Await>
          </Suspense>

          {/* <div className="title">
            <h1> {t("Save")}</h1>
          </div>
          <Suspense fallback={<p>Loading....</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List  posts={postResponse.data.savedPosts}/>}
            </Await>
           
          </Suspense> */}
          {/* <div>
      <h1>Saved Posts</h1>
      {savedPosts.length === 0 ? (
        <p>No saved posts found.</p>
      ) : (
        <div className="row">
          {savedPosts.map((item) => (
            <Card key={item} item={item._id}/>
          ))}
        </div>
      )}
    </div> */}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
      <div className="mobile">
        <MobileNavBar/>
      </div>
    </div>
  );
}

export default ProfilePage;
