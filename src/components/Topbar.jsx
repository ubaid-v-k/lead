import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button className="menu-btn" onClick={onMenuClick}>
          <i className="bi bi-list"></i>
        </button>
        <h4 className="brand">CRM</h4>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input placeholder="Search" />
        </div>

        <button className="icon-btn">
          <i className="bi bi-bell"></i>
        </button>

        {/* PROFILE */}
        <div className="profile-wrapper" ref={menuRef}>
          <div
            className="profile-avatar"
            onClick={() => setOpen(!open)}
          >
            {firstLetter}
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <div className="avatar-lg">{firstLetter}</div>
                <div>
                  <h6>{user?.name}</h6>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className="profile-meta">
                <p>
                  <strong>Registered:</strong> {user?.registeredAt}
                </p>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
