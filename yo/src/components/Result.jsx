import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css'; // Adicione o arquivo CSS

const personalities = {
  Intellectual: {
    description: "You are curious and love to explore new ideas.",
    color: "#3498db"
  },
  Adventurous: {
    description: "You are brave and always looking for new challenges.",
    color: "#e74c3c"
  },
  Creative: {
    description: "You are innovative and see the world in a unique way.",
    color: "#f39c12"
  },
  Analytical: {
    description: "You are logical and love solving problems.",
    color: "#8e44ad"
  },
  Social: {
    description: "You are outgoing and love to be around people.",
    color: "#2ecc71"
  },
  Calm: {
    description: "You are peaceful and take life as it comes.",
    color: "#1abc9c"
  }
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  const allPersonalities = Object.keys(personalities);

  const personalityCounts = results.reduce((acc, personality) => {
    acc[personality] = (acc[personality] || 0) + 1;
    return acc;
  }, {});

  const totalResponses = results.length;

  allPersonalities.forEach(personality => {
    if (!personalityCounts[personality]) {
      personalityCounts[personality] = 0;
    }
  });

  const dominantPersonality = Object.keys(personalityCounts).reduce((a, b) => 
    personalityCounts[a] > personalityCounts[b] ? a : b);

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="result-container">
      <h1 style={{ color: personalities[dominantPersonality].color }}>
        {dominantPersonality}
      </h1>
      <div className="result-content">
        <div className="description-container">
          <p>{personalities[dominantPersonality].description}</p>
        </div>
        <div className="response-list">
          {allPersonalities.map(personality => (
            <div key={personality}>
              <span className="personality-label">{personality}</span>
              <div className="progress-bar">
                <div className="bar">
                  <div 
                    className="fill"
                    style={{
                      width: `${(personalityCounts[personality] / totalResponses) * 100}%`,
                      backgroundColor: personalities[personality].color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="restart-button" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default Result;