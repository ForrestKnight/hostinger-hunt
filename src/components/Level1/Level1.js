import React from 'react';
import hostingerLogo from '../../assets/768px-Hostinger_logo.png';
import PuzzleBoard from './PuzzleBoard';

function Level1({ progressToNextLevel }) {
  const imageUrl = hostingerLogo;

  // Placeholder logic for now
  const handleCompletion = () => {
    // Check if the puzzle is solved
    // For now, we're simply progressing to the next level for simplicity
    progressToNextLevel();
  };

  return (
    <div>
      <h2>Level 1: Jigsaw Puzzle</h2>
      <PuzzleBoard image={imageUrl} rows={4} columns={4} />
      <button onClick={handleCompletion}>Complete Level (Placeholder)</button>
    </div>
  );
}

export default Level1;
