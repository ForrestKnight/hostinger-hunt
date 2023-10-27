import React from 'react';

function Level3({ progressToNextLevel }) {

  // Placeholder logic for now
  const handleCompletion = () => {
    // Check if the level is completed
    // If yes, then proceed to the next level
    progressToNextLevel();
  };

  return (
    <div>
      <h2>Level 3: Code Trivia</h2>
      <button onClick={handleCompletion}>Complete Level (Placeholder)</button>
    </div>
  );
}

export default Level3;
