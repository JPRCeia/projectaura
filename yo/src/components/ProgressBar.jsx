import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ label, value, max, color }) => {
  const percent = (value / max) * 100;

  return (
    <div className="progress-bar">
      <span className="label">{label}</span>
      <div className="bar">
        <div className="fill" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
      <span className="percent">{`${Math.round(percent)}%`}</span>
    </div>
  );
};

export default ProgressBar;