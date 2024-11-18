import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MobileNavBar from "../components/MobileNavbar";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main-content-wrapper">
        <aside className="left-aside">
          {/* Sol taraftaki reklam alanı */}
          <div className="advertisement">Sol Reklam Hissesi</div>
        </aside>
        <div className="content">
          <Outlet />
        </div>
        <aside className="right-aside">
          {/* Sağ taraftaki reklam alanı */}
          <div className="advertisement">Sag Reklam Hissesi</div>
        </aside>
      </div>
      <div className="mobile">
        <MobileNavBar />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main-content-wrapper">
          <aside className="left-aside">
            {/* Sol taraftaki reklam alanı */}
            <div className="advertisement">Left Ad Space</div>
          </aside>
          <div className="content">
            <Outlet />
          </div>
          <aside className="right-aside">
            {/* Sağ taraftaki reklam alanı */}
            <div className="advertisement">Right Ad Space</div>
          </aside>
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
