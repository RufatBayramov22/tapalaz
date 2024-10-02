import Slider from "../pages/Slider";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PinIcon from "../assets/images/pin.png";
import SavedIcon from "../assets/images/save.png";
import ChatIcon from "../assets/images/chat.png";
import apiRequest from "../lib/apiRequest";

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

  // Dinamik render için kategoriye göre alanları gösteriyoruz
  const renderCategorySpecificFields = () => {
    switch (post.type) {
      case "Avtomobiller":
        return (
          <>
            <p><strong>Model:</strong> {post.model || "Məlumat yoxdur"}</p>
            <p><strong>Motor Hacmi:</strong> {post.engineSize || "Məlumat yoxdur"}</p>
            <p><strong>Kilometre:</strong> {post.mileage || "Məlumat yoxdur"}</p>
            <p><strong>Yakıt Türü:</strong> {post.fuelType || "Məlumat yoxdur"}</p>
            <p><strong>Vites:</strong> {post.gearbox || "Məlumat yoxdur"}</p>
          </>
        );
      case "Su Nəqliyyatı":
        return (
          <>
            <p><strong>Bot Türü:</strong> {post.boatType || "Məlumat yoxdur"}</p>
            <p><strong>Uzunluk:</strong> {post.length || "Məlumat yoxdur"}</p>
            <p><strong>Motor Gücü:</strong> {post.enginePower || "Məlumat yoxdur"}</p>
          </>
        );
      case "Avtobuslar":
        return (
          <>
            <p><strong>Otobüs Türü:</strong> {post.busType || "Məlumat yoxdur"}</p>
            <p><strong>Koltuk Sayısı:</strong> {post.seatCount || "Məlumat yoxdur"}</p>
          </>
        );
      case "Qeydiyyat Nişanları":
        return <p><strong>Kayıt Numarası:</strong> {post.registerNumber || "Məlumat yoxdur"}</p>;
      case "Phone":
      case "Laptop":
      case "Tablet":
        return (
          <>
            <p><strong>Marka:</strong> {post.brand || "Məlumat yoxdur"}</p>
            <p><strong>Model:</strong> {post.model || "Məlumat yoxdur"}</p>
          </>
        );
      case "Simcard":
        return <p><strong>Numara:</strong> {post.number || "Məlumat yoxdur"}</p>;
      case "Kompyuter":
        return (
          <>
            <p><strong>Marka:</strong> {post.brand || "Məlumat yoxdur"}</p>
            <p><strong>Özellikler:</strong> {post.specifications || "Məlumat yoxdur"}</p>
          </>
        );
      case "Smart-watch":
        return (
          <>
            <p><strong>Marka:</strong> {post.brand || "Məlumat yoxdur"}</p>
            <p><strong>Özellikler:</strong> {post.features || "Məlumat yoxdur"}</p>
          </>
        );
      case "Car Parts":
      case "Bike Parts":
        return (
          <>
            <p><strong>Parça Adı:</strong> {post.partName || "Məlumat yoxdur"}</p>
            <p><strong>Durum:</strong> {post.condition || "Məlumat yoxdur"}</p>
          </>
        );
      case "Mənzillər":
        return (
          <>
            <p><strong>Mərtəbə:</strong> {post.floorNumber || "Məlumat yoxdur"}</p>
            <p><strong>Otaq Sayı:</strong> {post.roomCount || "Məlumat yoxdur"}</p>
            <p><strong>Ölçü:</strong> {post.area || "Məlumat yoxdur"} m²</p>
            <p><strong>Kira / Satış:</strong> {post.rentOrSale || "Məlumat yoxdur"}</p>
          </>
        );
      case "Villalar":
        return (
          <>
            <p><strong>Əmlakın Növü:</strong> {post.emlakinNovu || "Məlumat Yoxdur"}</p>
            <p><strong>Ölçü:</strong> {post.area || "Məlumat yoxdur"} m²</p>
            <p><strong>Otaq Sayı:</strong> {post.roomCount || "Məlumat yoxdur"}</p>
            <p><strong>Kira / Satış:</strong> {post.rentOrSale || "Məlumat yoxdur"}</p>
          </>
        );
      default:
        return <p>Kategoriye özel Məlumat yoxdur.</p>;
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title || "Başlıq yoxdur"}</h1>
                <div className="address">
                  <img src={PinIcon} alt="Location pin" />
                  <span>{post.city || "Şəhər hakkında məlumat yoxdur"}</span>
                </div>
                <div className="price">AZN {post.price || "Qiymət haqqında məlumat yoxdu"}</div>
                <div className="category">
                  {renderCategorySpecificFields()}
                  <span>Kategoriya: {post.type || "Kategoriya hakkında məlumat yoxdu"}</span>
                </div>
              </div>
              {post.userId && (
                <div className="user-card">
                  <img src={post.userId.avatar || "/default-avatar.png"} alt={post.userId.username || "İstifadəçi"} />
                  <div className="user-details">
                    <span>{post.userId.username || "Kullanıcı adı eksik"}</span>
                    <p><strong>Adı:</strong> {post.userId.username || "Adı eksik"}</p>
                    <p><strong>PhoneNumber:</strong> {post.userId.phoneNumber || "Nomre Yoxdur"}</p>
                  </div>
                </div>
              )}
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
      <div className="features">
        <div className="wrapper">
          {/* <p className="title">Genel</p> */}
          {post.mainCategory !== 'Avtomobil' && post.mainCategory !== 'Yük maşınları' && post.mainCategory !== 'İş Elanları' && post.mainCategory !== 'Su Nəqliyyatı' && post.mainCategory !== 'Phone' && post.mainCategory !== 'Xidmet' && post.mainCategory !== 'Hobbi' && (
            <div className="listVertical">
              {post.carModel && <p><strong>Marka:</strong> {post.carModel}</p>}
              {/* Diğer özellikler burada listelenebilir... */}
            </div>
          )}
          {/* <p className="title">Konum</p>
          <div className="buttons">
            <button>
              <img src={ChatIcon} alt="Chat icon" />
              Mesaj Gönder
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "red" : "white",
                color: saved ? "white" : "black",
              }}
            >
              <img src={SavedIcon} alt="Save icon" />
              Kaydet
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
