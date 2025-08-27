import React from "react";
import Plus from "../assets/icons/PlusCircle.svg";
import CalendarIcon from "../assets/icons/CalendarAlt.svg?react";
import LogoutSVG from "../assets/icons/Logout.svg"
import "./authhome.css"; 

export default function SideBar({ prenom, nom, setActiveView, activeView, handleLogout, showDropdown, setShowDropdown }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="user-section">
          <div className="user-avatar" />
          <div className="user-name">
            {prenom} {nom}
            <div className="dropdown-container">
              <div
                className="dropdown-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="arrow">▾</span>
              </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item">
                    <img src="/assets/icons/settings.svg" alt="Gérer" />
                    Gérer mon compte
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <img src={LogoutSVG} alt="Déconnexion" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="menu">
          <button
            className={`menu-btn ${activeView === "add" ? "active" : ""}`}
            onClick={() => setActiveView("add")}
          >
            <img src={Plus} className="icon" alt="Ajouter" />
            <h1>Ajouter une tâche</h1>
          </button>
          <button
            className={`menu-btn ${activeView === "today" ? "active" : ""}`}
            onClick={() => setActiveView("today")}
          >
            <CalendarIcon className="icon" />
            <h1>Aujourd'hui</h1>
          </button>
          <button
            className={`menu-btn ${activeView === "calendar" ? "active" : ""}`}
            onClick={() => setActiveView("calendar")}
          >
            <CalendarIcon className="icon" />
            <h1>Calendrier</h1>
          </button>
        </nav>
      </div>

      <div className="bottom-link">Aides</div>
    </aside>
  );
}
