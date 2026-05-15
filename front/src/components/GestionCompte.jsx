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

  return (
    <div className="gestion-page">

      <div className="gestion-container">

        <h1>Gérer mon compte</h1>

        <div
          className="gestion-card"
          onClick={() => setShowEmailModal(true)}
        >
          <h2>Modifier mon email</h2>
          <p>Changer votre adresse mail</p>
        </div>

        <div
          className="gestion-card"
          onClick={() => setShowPasswordModal(true)}
        >
          <h2>Modifier mon mot de passe</h2>
          <p>Changer votre mot de passe</p>
        </div>

        <button className="delete-account">
          Supprimer mon compte
        </button>

      </div>

      {showEmailModal && (

        <div className="overlay">

          <div className="modal">

            <h2>Modifier mon email</h2>

            <input
              type="email"
              placeholder="Nouvel email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowEmailModal(false)}
              >
                Annuler
              </button>

              <button className="save-btn">
                Modifier
              </button>

            </div>

          </div>

        </div>

      )}

      {showPasswordModal && (

        <div className="overlay">

          <div className="modal">

            <h2>Modifier mon mot de passe</h2>

            <input
              type="password"
              placeholder="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmNewPassword}
              onChange={(e) =>
                setConfirmNewPassword(e.target.value)
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Annuler
              </button>

              <button className="save-btn">
                Modifier
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}