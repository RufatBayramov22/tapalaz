// Router
import { Link } from "react-router-dom";

// Images
import profile from "../assets/images/profile.svg";
import search from "../assets/images/search-normal.svg";
import myBox from "../assets/images/my-box.svg";
import addIcon from "../assets/images/addIcon.png"
import { useState } from "react";
import { t } from "i18next";
const MobileNavBar = () => {
    const [query, setQuery] = useState({
        type: "",
        city: "",
      });
    
      const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  return (
    <div className="mobileNavBar">
      <nav className="navigation">
        <div className="list">
          <div className="item">
            <Link to="/">
              <div className="icon">
                <img src={myBox} alt="box-icon" />
              </div>
              <span className="">{t("home")}</span>
            </Link>
          </div>
          <div className="item">
            <Link to={`/list?type=${query.type}&city=${query.city}`}>
              <div className="icon">
                <img src={search} alt="search-icon" />
              </div>
              <span className="">{t("search")}</span>
            </Link>
          </div>
          {/* <Link
          to={`/list?type=${query.type}&city=${query.city}`}
        >
          <button>
            <img src={SearchIcon} alt="" />
          </button>
        </Link> */}

          <div className="item">
            <Link to="/add">
              <div className="icon">
                <img src={addIcon} alt="profile-icon" />
              </div>
              <span>{t("newAdd")}</span>
            </Link>
          </div>

          <div className="item">
            <Link to="/profile">
              <div className="icon">
                <img src={profile} alt="profile-icon" />
              </div>
              <span className="mobileProfilec">{t("profile")}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavBar;
