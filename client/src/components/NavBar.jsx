import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../pages/SearchBar";
import Add from "../assets/images/addIcon.jpg"
import { useTranslation } from "react-i18next";
function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
const {t,i18n} =useTranslation()

const handleLanguageChange = (event) => {
  i18n.changeLanguage(event.target.value);
};
const [filterQuery, setFilterQuery] = useState({});

// Filtre değişikliklerini ele alan fonksiyon
const handleFilterChange = (newFilterQuery) => {
  setFilterQuery(newFilterQuery);
};
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          
          <span>TapAl</span>
        </Link>
        <SearchBar onFilter={handleFilterChange}/>
      </div>

      <div className="right-side">
        <div className="lang">
        <select className="language" onChange={handleLanguageChange}>
      <option value="az">Aze</option>
      <option value="en">En</option>
      <option value="ru">Rus</option> {/* value should be "ru" not "rus" */}
    </select>
        </div>
        <div className="userInfo">
          {currentUser ? (
            <div className="user">
                <Link to="/add" className="addNews">
              <img src={Add} alt="" />
                {t("newAdd")}
              </Link>
              {/* <img src={currentUser.avatar || Noavatar} alt="profile-img" />
              <span>{currentUser.username}</span> */}
              <Link to="/profile" className="profile">
                {/* <div className="notification">3</div> */}
                <span>{t("profile")}</span>
              </Link>
            
            </div>
          ) : (
            <div className="user">

              {/* <Link to="/login">{t("login")}</Link>
              <Link to="/register">{t("register")}</Link> */}
              <Link to="/add" className="addNews">
              <img src={Add} alt="" />
                {t("newAdd")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
