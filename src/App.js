import React, { useState } from 'react';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Level4 from './components/Level4';
import LevelFinal from './components/LevelFinal';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const progressToNextLevel = () => {
    if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
    } else {
      // Handle game completion here (like showing the grand reveal)
    }
  };

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 1:
        return <Level1 progressToNextLevel={progressToNextLevel} />;
      case 2:
        return <Level2 progressToNextLevel={progressToNextLevel} />;
      case 3:
        return <Level3 progressToNextLevel={progressToNextLevel} />;
      case 4:
        return <Level4 progressToNextLevel={progressToNextLevel} />;
      case 5:
        return <LevelFinal progressToNextLevel={progressToNextLevel} />;
      default:
        return <div>Error! Invalid level.</div>;
    }
  };

  return (
    <div className="App">
      <h1>Hostinger Hunt</h1>
      {renderCurrentLevel()}
    </div>
  );
}

export default App;