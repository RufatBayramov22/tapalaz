import Slider from "../pages/Slider";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PinIcon from "../assets/images/pin.png";
import apiRequest from "../lib/apiRequest";
import Noavatar from "../assets/images/noavatar.jpeg"
import { t } from "i18next";

function SinglePage() {
  const { post, error } = useLoaderData();
  const [saved, setSaved] = useState(post?.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSaved((prev) => !prev); // Toggle saved state immediately

    try {
      await apiRequest.post("/users/save", {
        postId: post._id,
        userId: currentUser._id,
      });
    } catch (err) {
      console.error("Failed to save post:", err);
      setSaved((prev) => !prev);
    }
  };
console.log(post);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!post) {
    return <div className="loading">Loading...</div>;
  }



  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
            {post.userId && (
                <div className="user-card">
                  <img src={post.userId.avatar || Noavatar} alt={post.userId.username || "İstifadəçi"} />
                  <div className="user-details">
                    <span>{post.userId.username || "Kullanıcı adı eksik"}</span>
                    <p><strong>Adı:</strong> {post.userId.username || "Adı eksik"}</p>
                    <p><strong>{t("phoneNumber")}</strong> {post.userId.phoneNumber || "Nomre Yoxdur"}</p>
                  </div>
                </div>
              )}
              <div className="post">
                <h1>{post.title || "Başlıq yoxdur"}</h1>
                <div className="address">
                  <img src={PinIcon} alt="Location pin" />
                  <span>{post.city || "Şəhər hakkında məlumat yoxdur"}</span>
                </div>
                <div className="price">AZN {post.price || "Qiymət haqqında məlumat yoxdu"}</div>
                <div className="category">
                  <span>Kategoriya: {post.type || "Kategoriya hakkında məlumat yoxdu"}</span>
                </div>
              </div>
   
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetailId?.desc || "Məlumat yoxdur"),
              }}
            ></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default SinglePage;
