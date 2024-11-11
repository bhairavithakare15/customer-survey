// src/components/SurveyContainer.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import questions from '../data/questions';  
import WelcomeScreen from './Welcomescreen';
import SurveyQuestion from './SurveyQuestion';

const SurveyContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId] = useState(uuidv4());
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      localStorage.setItem(sessionId, JSON.stringify(answers));
    }
  }, [answers, sessionId, isStarted]);

  const handleStart = () => setIsStarted(true);

  const handleAnswer = (questionId, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentProgress = `${currentQuestion + 1}/${questions.length}`;

  return (
    <div className="survey-container">
      {!isStarted ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <div>
          <h3>{currentProgress}</h3>
          <SurveyQuestion
            question={questions[currentQuestion]}
            answer={answers[questions[currentQuestion].id]}
            onAnswer={handleAnswer}
          />
          <div className="nav-buttons">
            <button onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyContainer;
