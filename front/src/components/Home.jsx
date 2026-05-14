import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './home.css';
import LogoW from '../assets/img/logo-w.png';
import Deco from '../assets/deco.png';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerPrenom, setRegisterPrenom] = useState('');
  const [registerNom, setRegisterNom] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Super To-do List - Accueil";

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        'https://std-list-l5e5.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem('token', data.token);
        localStorage.setItem('admin_id', data.admin.id);
        localStorage.setItem(
          'admin_info',
          JSON.stringify(data.admin)
        );

        setMessage('Connexion réussie');

        navigate('/auth-home');

      } else {

        setMessage(
          data.error || 'Erreur de connexion'
        );

      }

    } catch (err) {

      console.error(err);

      setMessage('Erreur serveur !');

    }

  };

const handleRegister = async (e) => {

  e.preventDefault();

  if (registerPassword !== confirmPassword) {

    setMessage(
      "Les mots de passe ne correspondent pas"
    );

    return;

  }

  try {

    const res = await fetch(
      "https://std-list-l5e5.onrender.com/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          prenom: registerPrenom,
          nom: registerNom,
          email: registerEmail,
          password: registerPassword

        })

      }
    );

    const data = await res.json();

    if (res.ok) {

      setMessage("Compte créé avec succès");

      console.log(data);

    } else {

      setMessage(
        data.error || "Erreur inscription"
      );

    }

  } catch (err) {

    console.error(err);

    setMessage("Erreur serveur");

  }

};



  return (
    <div className="home-wrapper">

      <div className="login-page">

        <img
          className="logo"
          src={LogoW}
          alt="Logo"
        />

        <div id="login-card">

          {!showRegister ? (

            <>
              <h2>CONNEXION</h2>

              <form onSubmit={handleLogin}>

                <div className="form-group">

                  <label htmlFor="email">
                    Adresse Mail :
                  </label>

                  <input
                    id="email"
                    className="aremplir"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="password">
                    Mot de passe :
                  </label>

                  <input
                    id="password"
                    className="aremplir"
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <button
                  id="subutton"
                  type="submit"
                >
                  SE CONNECTER
                </button>

              </form>

              <p className="switch-text">

                Si vous n'êtes pas connecté vous pouvez

                <span
                  className="switch-span"
                  onClick={() =>
                    setShowRegister(true)
                  }
                >
                  {" "}vous inscrire
                </span>

              </p>
            </>

          ) : (

            <>
              <h2>INSCRIPTION</h2>

              <form onSubmit={handleRegister}>

                <div className="form-group">

                  <label>Prénom :</label>

                  <input
                    className="aremplir"
                    type="text"
                    value={registerPrenom}
                    onChange={(e) =>
                      setRegisterPrenom(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Nom :</label>

                  <input
                    className="aremplir"
                    type="text"
                    value={registerNom}
                    onChange={(e) =>
                      setRegisterNom(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Adresse Mail :</label>

                  <input
                    className="aremplir"
                    type="email"
                    value={registerEmail}
                    onChange={(e) =>
                      setRegisterEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Mot de passe :</label>

                  <input
                    className="aremplir"
                    type="password"
                    value={registerPassword}
                    onChange={(e) =>
                      setRegisterPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Confirmer le mot de passe :</label>

                  <input
                    className="aremplir"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />

                </div>
                <button
                  id="subutton"
                  type="submit"
                >
                  S'INSCRIRE
                </button>

              </form>

              <p className="switch-text">

                Déjà un compte ?

                <span
                  className="switch-span"
                  onClick={() =>
                    setShowRegister(false)
                  }
                >
                  {" "}Se connecter
                </span>

              </p>
            </>

          )}

          {message && (
            <p className="message">
              {message}
            </p>
          )}

        </div>

      </div>

      <div className="deco">
        <img src={Deco} alt="" />
      </div>

    </div>
  );
}