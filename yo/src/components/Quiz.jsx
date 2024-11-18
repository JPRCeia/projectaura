import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const questions = [
    {
      index: 1,
      question: "What's your favorite type of activity?",
      options: [
        { text: "Reading", personality: "Intellectual" },
        { text: "Hiking", personality: "Adventurous" },
        { text: "Cooking", personality: "Creative" },
        { text: "Gaming", personality: "Analytical" },
        { text: "Partying", personality: "Social" },
        { text: "Meditating", personality: "Calm" },
      ],
    },
    {
      index: 2,
      question: "How do you usually spend your weekends?",
      options: [
        { text: "With a book", personality: "Intellectual" },
        { text: "Exploring nature", personality: "Adventurous" },
        { text: "Trying new recipes", personality: "Creative" },
        { text: "Playing strategy games", personality: "Analytical" },
        { text: "Out with friends", personality: "Social" },
        { text: "Practicing yoga", personality: "Calm" },
      ],
    },
    {
      index: 3,
      question: "What describes you the best?",
      options: [
        { text: "Curious", personality: "Intellectual" },
        { text: "Brave", personality: "Adventurous" },
        { text: "Innovative", personality: "Creative" },
        { text: "Logical", personality: "Analytical" },
        { text: "Outgoing", personality: "Social" },
        { text: "Peaceful", personality: "Calm" },
      ],
    },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(questions);
  questions.forEach(question => shuffleArray(question.options));
  
  const logoToBackgroundMap = [
    { logo: '/LogoRed.png', backgroundColor: '#F05AE6' },
    { logo: '/LogoYellow.png', backgroundColor: '#BF3032' },
    { logo: '/LogoBlue.png', backgroundColor: '#28A16C' },
    { logo: '/LogoGreen.png', backgroundColor: '#FFB52B' },
    { logo: '/LogoPurple.png', backgroundColor: '#3E70E6' },
    { logo: '/LogoPink.png', backgroundColor: '#4A0C7B' },
  ];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [logoBackground, setLogoBackground] = useState(() => {
    const randomIndex = Math.floor(Math.random() * logoToBackgroundMap.length);
    return logoToBackgroundMap[randomIndex];
  });
  const [shuffledQuestions] = useState(questions);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getRandomLogoBackground = () => {
      const randomIndex = Math.floor(Math.random() * logoToBackgroundMap.length);
      return logoToBackgroundMap[randomIndex];
    };
  
    setLogoBackground(getRandomLogoBackground());
  }, [currentQuestionIndex]);
  
  const handleOptionClick = (index) => {
    const selectedPersonality = shuffledQuestions[currentQuestionIndex].options[index].personality;
    const updatedResults = [...results, selectedPersonality];
    setResults(updatedResults);
  
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/result', { state: { results: updatedResults } });
    }
  };
  
  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setResults(prevResults => prevResults.slice(0, -1)); // Remove the last selected result
    }
  };
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="quiz-container">
      <div
        className="header"
        style={{ backgroundColor: logoBackground.backgroundColor }}
      >
        <div className="header-top">
          <div className="header-left">
            <span>aura</span>
          </div>
        </div>
        <div className="header-right">
          <img src={logoBackground.logo} alt="Logo" className="quiz-logo" />
        </div>
        <h1 className="question">{currentQuestion.question}</h1>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              results[currentQuestionIndex] === option.personality
                ? "selected"
                : ""
            }`}
            onClick={() => handleOptionClick(index)}
          >
            {option.text}
          </button>
        ))}
      </div>
      {currentQuestionIndex > 0 && (
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      )}
    </div>
  );
};

export default Quiz;
