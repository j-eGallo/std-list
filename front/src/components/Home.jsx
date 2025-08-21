import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './home.css';
import LogoW from '../assets/img/logo-w.png';
import Deco from '../assets/deco.png'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin_id', data.admin.id);
        localStorage.setItem('admin_info', JSON.stringify(data.admin));
        setMessage('Connexion réussie');
        navigate('/auth-home'); // ✅ à adapter selon ta route réelle
      } else {
        setMessage(data.error || 'Erreur de connexion');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur !');
    }
  };

  return (
    <div className="home-wrapper">
      <div className="login-page">
        <img className="logo" src={LogoW} alt="Logo" />

        <div id="login-card">
          <h2>CONNEXION</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Adresse Mail :</label>
              <input
                id="email"
                className="aremplir"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <input
                id="password"
                className="aremplir"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button id="subutton" type="submit">SE CONNECTER</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>

      <div className="deco">
        <img src={Deco} alt="" />
      </div>
    </div>
  );
}
