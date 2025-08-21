import React from "react";
// import { FaPlusCircle, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
// import { FiChevronDown } from "react-icons/fi";
// import Nothing from '../assets/Nothing.png';
import './authhome.css'; 

export default function AuthHome() {
  return (
    <div className="authhome-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-section">
          <div className="user-avatar" />
          <div className="user-name">Jean-Emmanuel <FiChevronDown /></div>
        </div>

        <nav className="menu">
          <button className="menu-btn">
            <FaPlusCircle className="icon" />
            Ajouter une tâche
          </button>
          <button className="menu-btn">
            <FaCalendarAlt className="icon" />
            Aujourd'hui
          </button>
          <button className="menu-btn">
            <FaCalendarAlt className="icon" />
            Calendrier
          </button>
        </nav>

        <div className="bottom-link">
          <FaQuestionCircle className="icon" />
          Aides
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* <img src={Nothing} alt="Nothing to display" className="nothing-img" /> */}
      </main>
    </div>
  );
}
