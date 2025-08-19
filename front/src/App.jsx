import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import AuthHome from './components/AuthHome.jsx'; // Assure-toi du bon chemin

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth-home" element={<AuthHome />} />
    </Routes>
  );
}

export default App;
