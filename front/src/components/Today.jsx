import React, { useEffect, useState } from "react";
import PlusIcon from "../assets/icons/PlusCircle.svg";
import "./today.css";

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("token");

  const openModal = (task = null) => {
    if (task) {
      setEditMode(true);
      setEditTaskId(task._id);
      setNewTaskText(task.text);
      setNewTaskDate(task.date);
    } else {
      setEditMode(false);
      setEditTaskId(null);
      setNewTaskText("");
      setNewTaskDate(today);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditTaskId(null);
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://https://std-list-15e5.onrender.com/api/tasks/${today}`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      const res = await fetch("http://https://std-list-15e5.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newTaskText, date: newTaskDate }),
      });

      const result = await res.json();
      if (res.ok) {
        closeModal();
        fetchTasks();
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Erreur ajout tâche :", err);
    }
  };

  useEffect(() => {

  document.title = "Super To-do List - Accueil";

}, []);

  const handleEditTask = async () => {
    try {
      const res = await fetch(`http://https://std-list-15e5.onrender.com/api/tasks/${editTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newTaskText, date: newTaskDate }),
      });

      if (res.ok) {
        closeModal();
        fetchTasks();
      } else {
        const result = await res.json();
        console.error(result.error);
      }
    } catch (err) {
      console.error("Erreur modif tâche :", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://https://std-list-15e5.onrender.com/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== taskId));
      } else {
        console.error("Erreur suppression tâche");
      }
    } catch (err) {
      console.error("Erreur :", err);
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
        <div className="right-block" onClick={() => openModal()}>
          <img src={PlusIcon} alt="Ajouter une tâche" className="plus-icon" />
          <span className="ajouter-texte">Ajouter une tâche</span>
        </div>
      </div>

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
              <button
                className="add-btn"
                onClick={editMode ? handleEditTask : handleAddTask}
              >
                {editMode ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <input
                type="checkbox"
                onChange={() => handleDeleteTask(task._id)}
              />
              <span
                className="task-text"
                onClick={() => openModal(task)}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
