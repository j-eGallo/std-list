import React, {
  useEffect,
  useState,
  useRef
} from "react";

import PlusIcon from "../assets/icons/PlusCircle.svg";

import "./today.css";

export default function Today() {

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [newTaskText, setNewTaskText] = useState("");

  const [newTaskDate, setNewTaskDate] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editTaskId, setEditTaskId] = useState(null);

  const modalRef = useRef(null);

  const today =
    new Date().toISOString().split("T")[0];

  const token =
    localStorage.getItem("token");

  const API_URL =
    "https://std-list-15e5.onrender.com";

  useEffect(() => {

    document.title =
      "Super To-do List - Accueil";

  }, []);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {

        closeModal();

      }

    };

    if (showModal) {

      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

    }

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, [showModal]);

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

      const res = await fetch(
        `${API_URL}/api/tasks/${today}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          },
        }
      );

      const data = await res.json();

      setTasks(data);

    } catch (err) {

      console.error(
        "Erreur fetch tasks :",
        err
      );

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const handleAddTask = async () => {

    if (!newTaskText.trim()) return;

    try {

      const res = await fetch(
        `${API_URL}/api/tasks`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            text: newTaskText,
            date: newTaskDate
          }),

        }
      );

      const result = await res.json();

      if (res.ok) {

        closeModal();

        fetchTasks();

      } else {

        console.error(result.error);

      }

    } catch (err) {

      console.error(
        "Erreur ajout tâche :",
        err
      );

    }

  };

  const handleEditTask = async () => {

    try {

      const res = await fetch(
        `${API_URL}/api/tasks/${editTaskId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            text: newTaskText,
            date: newTaskDate
          }),

        }
      );

      if (res.ok) {

        closeModal();

        fetchTasks();

      } else {

        const result =
          await res.json();

        console.error(result.error);

      }

    } catch (err) {

      console.error(
        "Erreur modif tâche :",
        err
      );

    }

  };

  const handleDeleteTask = async (taskId) => {

    try {

      const res = await fetch(
        `${API_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`
          },

        }
      );

      if (res.ok) {

        setTasks(
          tasks.filter(
            (t) => t._id !== taskId
          )
        );

      } else {

        console.error(
          "Erreur suppression tâche"
        );

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

            {tasks.length} tâche
            {tasks.length !== 1 ? "s" : ""}

          </span>

        </div>

        <div
          className="right-block"
          data-cy="open-add-task"
          onClick={() => openModal()}
        >

          <img
            src={PlusIcon}
            alt="Ajouter une tâche"
            className="plus-icon"
          />

          <span className="ajouter-texte">
            Ajouter une tâche
          </span>

        </div>

      </div>

      {showModal && (

        <div className="overlay">

          <div
            className="modal"
            ref={modalRef}
          >

            <h3>Nom de la tâche</h3>

            <input
              data-cy="text-input"
              type="text"
              placeholder="Ex: Réparer armoire"
              value={newTaskText}
              onChange={(e) =>
                setNewTaskText(
                  e.target.value
                )
              }
            />

            <input
              data-cy="task-date"
              type="date"
              value={newTaskDate}
              onChange={(e) =>
                setNewTaskDate(
                  e.target.value
                )
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={closeModal}
              >
                Annuler
              </button>

              <button
                data-cy="submit-task"
                className="add-btn"
                onClick={
                  editMode
                    ? handleEditTask
                    : handleAddTask
                }
              >

                {
                  editMode
                    ? "Modifier"
                    : "Ajouter"
                }

              </button>

            </div>

          </div>

        </div>

      )}

      {tasks.length > 0 && (

        <div className="task-list">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="task-item"
              data-cy="task-item"
            >

              <input
                data-cy="delete-task"
                type="checkbox"
                onChange={() =>
                  handleDeleteTask(
                    task._id
                  )
                }
              />

              <span
                className="task-text"
                onClick={() =>
                  openModal(task)
                }
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