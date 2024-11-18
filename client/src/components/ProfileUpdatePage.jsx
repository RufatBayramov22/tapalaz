import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";
import MobileNavBar from "./MobileNavbar";
import apiRequest from "../lib/apiRequest";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, phoneNumber, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser._id}/updateUser`, {
        username,
        phoneNumber,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">PhoneNumber</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="phoneNumber"
              defaultValue={currentUser.phoneNumber}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt="Avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "rufodev",
            uploadPreset: "ads_web",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
      <div className="mobile">
        <MobileNavBar />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
