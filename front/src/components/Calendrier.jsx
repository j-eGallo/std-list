import { useEffect, useState } from "react";
import "../components/calendrier.css";

export default function Calendrier() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const formattedDate =
    selectedDate.toISOString().split("T")[0];

  const fetchTasks = async () => {

    try {

      const res = await fetch(
        `http://localhost:3000/api/tasks/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setTasks(data);

    } catch (err) {

      console.error("Erreur fetch tasks :", err);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, [selectedDate]);

  const handleDeleteTask = async (taskId) => {

    try {

      const res = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {

        setTasks(
          tasks.filter((t) => t._id !== taskId)
        );

      } else {

        console.error("Erreur suppression tâche");

      }

    } catch (err) {

      console.error("Erreur :", err);

    }

  };

  const days = [];

  for (let i = -3; i <= 3; i++) {

    const date = new Date(selectedDate);

    date.setDate(selectedDate.getDate() + i);

    days.push(date);

  }

  const goToday = () => {

    setSelectedDate(new Date());

  };

  const goPreviousDay = () => {

    const newDate = new Date(selectedDate);

    newDate.setDate(selectedDate.getDate() - 1);

    setSelectedDate(newDate);

  };

  const goNextDay = () => {

    const newDate = new Date(selectedDate);

    newDate.setDate(selectedDate.getDate() + 1);

    setSelectedDate(newDate);

  };

  return (
    <div className="calendrier-page">

      <div className="calendrier-header">

        <div className="month-label">
          {
            selectedDate
              .toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })
              .charAt(0)
              .toUpperCase()
            +
            selectedDate
              .toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })
              .slice(1)
          }
        </div>

        <div className="calendar-controls">

          <button
            className="daynav"
            onClick={goPreviousDay}
          >
            ‹
          </button>

          <button
            className="today"
            onClick={goToday}
          >
            Aujourd’hui
          </button>

          <button
            className="daynav"
            onClick={goNextDay}
          >
            ›
          </button>

        </div>

      </div>

      <div className="days-row">

        {days.map((day) => {

          const isActive =
            day.toDateString() ===
            selectedDate.toDateString();

          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={
                isActive
                  ? "day-item active"
                  : "day-item"
              }
            >

              <span>
                {day.toLocaleDateString(
                  "fr-FR",
                  {
                    weekday: "short",
                  }
                )}
              </span>

              <strong>
                {day.getDate()}
              </strong>

            </button>
          );

        })}

      </div>

      <div className="tasks-container">

        <h2 className="tasks-title">

          {
            selectedDate.toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "long",
                weekday: "long",
              }
            )
          }

        </h2>

        {tasks.length === 0 ? (

          <p className="empty-tasks">
            Aucune tâche.
          </p>

        ) : (

          <div className="task-list">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="task-item"
              >

                <input
                  type="checkbox"
                  onChange={() =>
                    handleDeleteTask(task._id)
                  }
                />

                <span className="task-text">
                  {task.text}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}