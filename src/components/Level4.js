import React from 'react';

function Level4({ progressToNextLevel }) {

  // Placeholder logic for now
  const handleCompletion = () => {
    // Check if the level is completed
    // If yes, then proceed to the next level
    progressToNextLevel();
  };

  return (
    <div>
      <h2>Level 4: Memory Card Game</h2>
      <button onClick={handleCompletion}>Complete Level (Placeholder)</button>
    </div>
  );
}

export default Level4;
