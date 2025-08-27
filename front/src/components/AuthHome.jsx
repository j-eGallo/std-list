import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar"; // adapte le chemin
import Today from "./Today"; // idem
import "./authhome.css";

export default function AuthHome() {
  const [prenom, setPrenom] = useState("Utilisateur");
  const [nom, setNom] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeView, setActiveView] = useState("today");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("admin_info");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed?.prenom) setPrenom(parsed.prenom);
        if (parsed?.nom) setNom(parsed.nom);
      } catch (err) {
        console.error("❌ Erreur parsing localStorage :", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="authhome-wrapper">
      <Sidebar
        prenom={prenom}
        nom={nom}
        setActiveView={setActiveView}
        activeView={activeView}
        handleLogout={handleLogout}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      <main className="main-content">
        {activeView === "today" && <Today />}
        {activeView === "add" && <h1>Formulaire d'ajout à venir</h1>}
        {activeView === "calendar" && <h1>Vue calendrier à venir</h1>}
      </main>
    </div>
  );
}
