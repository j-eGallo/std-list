import React, { useEffect, useState } from "react";
import Plus from "../assets/icons/PlusCircle.svg";
import CalendarIcon from "../assets/icons/CalendarAlt.svg?react";
import "./authhome.css";

export default function AuthHome() {
  const [prenom, setPrenom] = useState("Utilisateur");
  const [nom, setNom] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("admin_info");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        console.log("✅ Données user récupérées :", parsed);
        if (parsed?.prenom) setPrenom(parsed.prenom);
        if (parsed?.nom) setNom(parsed.nom);
      } catch (err) {
        console.error("❌ Erreur parsing localStorage :", err);
      }
    } else {
      console.warn("⚠️ Aucune donnée dans localStorage pour 'user'");
    }
  }, []);

  return (
    <div className="authhome-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="user-section">
            <div className="user-avatar" />
            <div className="user-name">{prenom} {nom}</div>
          </div>

          <nav className="menu">
            <button className="menu-btn">
              <img src={Plus} className="icon" alt="Ajouter" />
              <h1>Ajouter une tâche</h1>
            </button>
            <button className="menu-btn active">
              <CalendarIcon className="icon" />
              <h1>Aujourd'hui</h1>
            </button>
            <button className="menu-btn">
              <CalendarIcon className="icon" />
              <h1>Calendrier</h1>
            </button>
          </nav>
        </div>

        <div className="bottom-link">Aides</div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h1>Page vide - à compléter avec les tâches</h1>
      </main>
    </div>
  );
}
