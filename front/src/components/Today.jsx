import React, { useEffect, useState } from "react";
import PlusIcon from "../assets/icons/PlusCircle.svg";
import "./today.css";

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const openModal = () => {
    setNewTaskText("");
    setNewTaskDate(today); // par défaut : aujourd’hui
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const token = localStorage.getItem("token");

  // 🔄 Charger les tâches du jour depuis MongoDB
  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${today}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Erreur fetch tasks :", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Ajouter une nouvelle tâche
  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: newTaskText,
          date: newTaskDate,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        closeModal();
        fetchTasks(); // 🔄 recharger la liste après ajout
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Erreur ajout tâche :", err);
    }
  };

  return (
    <div className="today-wrapper">
      <div className="today-header">
        <div className="left-block">
          <h1>Aujourd'hui</h1>
          <span className="task-count">
            {tasks.length} tâche{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="right-block" onClick={openModal}>
          <img src={PlusIcon} alt="Ajouter une tâche" className="plus-icon" />
          <span className="ajouter-texte">Ajouter une tâche</span>
        </div>
      </div>

      {/* 💡 Modal ajout de tâche */}
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h3>Nom de la tâche</h3>
            <input
              type="text"
              placeholder="Ex: Réparer armoire"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />

            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>
                Annuler
              </button>
              <button className="add-btn" onClick={handleAddTask}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📋 Liste des tâches */}
      {tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              ⭕ {task.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
