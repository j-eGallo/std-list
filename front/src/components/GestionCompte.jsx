import React, { useState } from "react";
import "./gestioncompte.css";

export default function GestionCompte() {

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const API_URL =
    "https://std-list-15e5.onrender.com";

  const user =
    JSON.parse(
      localStorage.getItem("admin_info")
    );

  const handleUpdateEmail = async () => {

    try {

      const res = await fetch(
        `${API_URL}/account/email`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            userId: user.id,

            newEmail,

            password: emailPassword

          })

        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Email modifié");

        setShowEmailModal(false);

      } else {

        alert(data.error);

      }

    } catch (err) {

      console.error(err);

    }

  };

  const handleUpdatePassword = async () => {

    if (
      newPassword !==
      confirmNewPassword
    ) {

      alert(
        "Les mots de passe ne correspondent pas"
      );

      return;

    }

    try {

      const res = await fetch(
        `${API_URL}/account/password`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            userId: user.id,

            currentPassword,

            newPassword

          })

        }
      );

      const data = await res.json();

      if (res.ok) {

        alert(
          "Mot de passe modifié"
        );

        setShowPasswordModal(false);

      } else {

        alert(data.error);

      }

    } catch (err) {

      console.error(err);

    }

  };

  const handleDeleteAccount = async () => {

    const password =
      prompt(
        "Entrez votre mot de passe"
      );

    if (!password) return;

    try {

      const res = await fetch(
        `${API_URL}/account/delete`,
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            userId: user.id,

            password

          })

        }
      );

      const data = await res.json();

      if (res.ok) {

        localStorage.clear();

        window.location.href = "/";

      } else {

        alert(data.error);

      }

    } catch (err) {

      console.error(err);

    }

  };

  return (
    <div className="gestion-page">

      <div className="gestion-container">

        <h1>Gérer mon compte</h1>

        <div
          className="gestion-card"
          onClick={() =>
            setShowEmailModal(true)
          }
        >
          <h2>Modifier mon email</h2>

          <p>
            Changer votre adresse mail
          </p>

        </div>

        <div
          className="gestion-card"
          onClick={() =>
            setShowPasswordModal(true)
          }
        >
          <h2>
            Modifier mon mot de passe
          </h2>

          <p>
            Changer votre mot de passe
          </p>

        </div>

        <button
          className="delete-account"
          onClick={handleDeleteAccount}
        >
          Supprimer mon compte
        </button>

      </div>

      {showEmailModal && (

        <div className="overlay">

          <div className="modal">

            <h2>
              Modifier mon email
            </h2>

            <input
              type="email"
              placeholder="Nouvel email"
              value={newEmail}
              onChange={(e) =>
                setNewEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={emailPassword}
              onChange={(e) =>
                setEmailPassword(
                  e.target.value
                )
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowEmailModal(false)
                }
              >
                Annuler
              </button>

              <button
                className="save-btn"
                onClick={handleUpdateEmail}
              >
                Modifier
              </button>

            </div>

          </div>

        </div>

      )}

      {showPasswordModal && (

        <div className="overlay">

          <div className="modal">

            <h2>
              Modifier mon mot de passe
            </h2>

            <input
              type="password"
              placeholder="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmNewPassword}
              onChange={(e) =>
                setConfirmNewPassword(
                  e.target.value
                )
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                Annuler
              </button>

              <button
                className="save-btn"
                onClick={handleUpdatePassword}
              >
                Modifier
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}