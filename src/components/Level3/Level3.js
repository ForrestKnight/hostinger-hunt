import React, { useState } from 'react';
import './Level3.css';

function Level3({ progressToNextLevel }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: 'Who is known as the father of the World Wide Web?',
      options: ['Steve Jobs', 'Bill Gates', 'Tim Berners-Lee', 'Mark Zuckerberg'],
      correctAnswer: 2
    },
    {
      question: 'Which of these is NOT a way to store data in JavaScript?',
      options: ['Array', 'List', 'Object', 'Set'],
      correctAnswer: 1
    },
    {
      question: 'Which of these is NOT a primitive data type in JavaScript?',
      options: ['Number', 'String', 'Boolean', 'Array'],
      correctAnswer: 3
    }
  ];

  const handleAnswer = () => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      if (correct) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      }
      setShowFeedback(false);
    }, 2000);
};

  return (
    <div className="container">
      <h2>Level 3: Code Trivia</h2>
      <p className="trivia-question">{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, index) => (
        <div 
          key={index}
          className={`option-box ${selectedAnswer === index ? "selected" : ""}`}
          onClick={() => setSelectedAnswer(index)}
        >
          <input 
            className="option-input"
            type="radio" 
            value={index} 
            checked={selectedAnswer === index}
            onChange={() => {}}
            readOnly
          />
          {option}
        </div>
      ))}
      {!showFeedback && <button className="button" onClick={handleAnswer}>Submit Answer</button>}
      {showFeedback && (
        <div>{isCorrect ? "Correct!" : "Wrong Answer, Try Again!"}</div>
      )}
    </div>
  );
}

export default Level3;
