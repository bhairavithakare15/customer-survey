// src/components/SurveyQuestion.js
import React from 'react';

const SurveyQuestion = ({ question, answer, onAnswer }) => {
  const handleChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  if (question.type === 'rating') {
    return (
      <div>
        <h4>{question.text}</h4>
        {[...Array(question.scale)].map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index + 1}
              checked={answer === index + 1}
              onChange={handleChange}
            />
            {index + 1}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div>
        <h4>{question.text}</h4>
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />
      </div>
    );
  }

  return null;
};

export default SurveyQuestion;
