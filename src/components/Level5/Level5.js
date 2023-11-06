import React, { useState } from 'react';
import './Level5.css';

function Level5({ progressToNextLevel }) {
  const [boxes, setBoxes] = useState([false, false, false, false, false]);
  const emojis = ["💻", "🐞", "📖", "⚙️", "🚀"];
  const chosenBox = 1; // The index of the "bug" emoji which is the correct answer to the riddle

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleClickBox = index => {
    if (index === chosenBox) {
      setIsCorrect(true);
      setShowFeedback(true);
      
      const newBoxes = [...boxes];
      newBoxes[index] = true;
      setBoxes(newBoxes);
  
      setTimeout(() => {
        handleCompletion();
      }, 1500);  // Delay the completion message to let the user see they've found the treasure
    } else {
      setIsCorrect(false);
      setShowFeedback(true);
      
      const newBoxes = [...boxes];
      newBoxes[index] = true;
      setBoxes(newBoxes);

      setTimeout(() => {
        newBoxes[index] = false;  // Reset the clicked box state after 1 second
        setBoxes(newBoxes);
        setShowFeedback(false);   // Hide feedback after 1 second
      }, 1000);
    }
  };
  

  const handleCompletion = () => {
    // console.log("Congratulations! You've completed the treasure hunt!");
    // You can also trigger an animation or effect here
    progressToNextLevel();
  };

  return (
    <div className="container">
      <h2>Riddle Reveal</h2>
      <p>Answer the riddle related to coding and select the right digital box.</p>
      <p className="riddle">The more you code, the more of me there is.<br />
        I may be gone for now but you can’t get rid of me forever.<br />
        What am I?</p>
      <div className="box-grid">
        {boxes.map((box, index) => (
          <div 
            key={index}
            className={`box ${box ? "open" : ""}`}
            onClick={() => handleClickBox(index)}
          >
            {(box && index === chosenBox) ? "🏆" : emojis[index]}  {/* Displays trophy if correct box is clicked */}
          </div>
        ))}
      </div>
      {showFeedback && (
        <div style={{ color: isCorrect ? 'white' : 'red' }}>
          {isCorrect ? "A bug. That's Correct!" : "Wrong Answer, Try Again!"}
        </div>
      )}
    </div>
  );
}

export default Level5;
