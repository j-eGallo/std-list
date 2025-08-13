import React from "react";
import './home.css';
import LogoW from '../assets/img/logo-w.png';
export default function Home() {
  return (
    <div className="login-page">
      <img className="logo" src={LogoW} alt="" />
      <h1>CC</h1>
    </div>
  )
}