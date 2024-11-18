import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <div className="circle-container">
        <div className="logo-container">
          <img src="/Logo.png" alt="Logo" className="home-logo" /> {/* Adicione o caminho correto para a logo */}
          <span className="circle-text">aura</span>
        </div>
      </div>
      <button className="start-button" onClick={handleStartClick}>
        Discover your aura
      </button>
    </div>
  );
};

export default Home;