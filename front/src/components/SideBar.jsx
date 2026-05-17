import React, {
  useEffect,
  useRef
} from "react";

import CalendarIcon
from "../assets/icons/CalendarAlt.svg?react";

import LogoutSVG
from "../assets/icons/Logout.svg";

import Settings
from "../assets/icons/Settings.svg";

import "./authhome.css";

export default function SideBar({

  prenom,
  nom,

  setActiveView,
  activeView,

  handleLogout,

  showDropdown,
  setShowDropdown,

  sidebarOpen,
  setSidebarOpen

}) {

  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {

        setShowDropdown(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <aside
      className={
        `sidebar ${sidebarOpen ? "open" : ""}`
      }
    >

      <button
        className="sidebar-toggle"
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      >

        {sidebarOpen ? "<" : ">"}

      </button>

      <div>

        <div className="user-section">

          <div className="user-avatar" />

          <div className="user-name">

            {prenom} {nom}

            <div
              className="dropdown-container"
              ref={dropdownRef}
            >

              <div
                className="dropdown-button"
                onClick={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
              >

                <span className="arrow">
                  ▾
                </span>

              </div>

              {showDropdown && (

                <div className="dropdown-menu">

                  <button
                    className="dropdown-item"
                    onClick={() => {

                      setActiveView(
                        "gestion-compte"
                      );

                      setSidebarOpen(false);

                      setShowDropdown(false);

                    }}
                  >

                    <img
                      src={Settings}
                      alt="Gérer"
                    />

                    Gérer mon compte

                  </button>

                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >

                    <img
                      src={LogoutSVG}
                      alt="Déconnexion"
                    />

                    Déconnexion

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        <nav className="menu">

          <button
            className={`menu-btn ${
              activeView === "today"
                ? "active"
                : ""
            }`}
            onClick={() => {

              setActiveView("today");

              setSidebarOpen(false);

            }}
          >

            <CalendarIcon className="icon" />

            <h1>Aujourd'hui</h1>

          </button>

          <button
            className={`menu-btn ${
              activeView === "calendar"
                ? "active"
                : ""
            }`}
            onClick={() => {

              setActiveView("calendar");

              setSidebarOpen(false);

            }}
          >

            <CalendarIcon className="icon" />

            <h1>Calendrier</h1>

          </button>

        </nav>

      </div>

      {/* <div className="bottom-link">
        Aides
      </div> */}

    </aside>

  );

}