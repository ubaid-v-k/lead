import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";
import NotificationPanel from "./NotificationPanel";
import { getCurrentUser } from "../api/authService";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // const user = JSON.parse(localStorage.getItem("user")); // OLD
  const user = getCurrentUser();

  const displayName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  const firstLetter = displayName.charAt(0).toUpperCase();

  // close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
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

        {/* NOTIFICATIONS */}
        <div className="notification-wrapper" ref={notificationRef} style={{ position: "relative" }}>
          <button
            className="icon-btn"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <i className="bi bi-bell"></i>
          </button>
          {notificationOpen && (
            <NotificationPanel onClose={() => setNotificationOpen(false)} />
          )}
        </div>

        {/* PROFILE */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile-avatar"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {firstLetter}
          </div>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <div className="avatar-lg">{firstLetter}</div>
                <div>
                  <h6>{displayName}</h6>
                  <p>{user?.email || "user@example.com"}</p>
                </div>
              </div>

              <div className="profile-meta">
                <p>
                  <strong>Registered:</strong> {user?.registeredAt || "N/A"}
                </p>
                {user?.phone && (
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                )}
                {user?.company && (
                  <p>
                    <strong>Company:</strong> {user.company}
                  </p>
                )}
              </div>

              <div className="divider" style={{ margin: "8px 0", borderTop: "1px solid #eee" }}></div>

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
