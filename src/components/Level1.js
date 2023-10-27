import React from 'react';

function Level1({ progressToNextLevel }) {

  // Placeholder logic for now
  const handleCompletion = () => {
    // Check if the level is completed
    // If yes, then proceed to the next level
    progressToNextLevel();
  };

  return (
    <div>
      <h2>Level 1: Jigsaw Puzzle (Secret Image)</h2>
      <button onClick={handleCompletion}>Complete Level (Placeholder)</button>
    </div>
  );
}

export default Level1;
