import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';
import './App.css';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Level4 from './components/Level4';
import Level5 from './components/Level5';

function App() {
  const [progressArray, setProgressArray] = useState([false, false, false, false, false]);
  const [viewedChallenge, setViewedChallenge] = useState(null);

  useEffect(() => {
    const savedProgress = Cookie.get('progressArray');
    if (savedProgress) {
      setProgressArray(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    Cookie.set('progressArray', JSON.stringify(progressArray));
  }, [progressArray]);

  const updateProgress = (levelCompleted) => {
    let updatedProgress = [...progressArray];
    updatedProgress[levelCompleted - 1] = true;
    setProgressArray(updatedProgress);
    setViewedChallenge(null);  // Return to home screen after completing a level
  };

  const renderCurrentLevel = () => {
    switch (viewedChallenge) {
      case 1:
        return <Level1 progressToNextLevel={() => updateProgress(1)} />;
      case 2:
        return <Level2 progressToNextLevel={() => updateProgress(2)} />;
      case 3:
        return <Level3 progressToNextLevel={() => updateProgress(3)} />;
      case 4:
        return <Level4 progressToNextLevel={() => updateProgress(4)} />;
      case 5:
        return <Level5 progressToNextLevel={() => updateProgress(5)} />;
      default:
        return renderHomeScreen();
    }
  };

  const renderHomeScreen = () => {
    return (
      <div className="challenge-grid">
        <div className="challenge-item" id="challenge1" onClick={() => setViewedChallenge(1)}>
            <img src="/path/to/icon1.png" alt="Challenge 1" />
        </div>
        <div className="challenge-item" id="challenge2" onClick={() => setViewedChallenge(2)}>
            <img src="/path/to/icon2.png" alt="Challenge 2" />
        </div>
        <div className="challenge-item" id="challenge3" onClick={() => setViewedChallenge(3)}>
            <img src="/path/to/icon3.png" alt="Challenge 3" />
        </div>
        <div className="challenge-item" id="challenge4" onClick={() => setViewedChallenge(4)}>
            <img src="/path/to/icon4.png" alt="Challenge 4" />
        </div>
        <div className="challenge-item" id="challenge5" onClick={() => setViewedChallenge(5)}>
            <img src="/path/to/icon5.png" alt="Challenge 5" />
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Hostinger Hunt</h1>
      {renderCurrentLevel()}
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>

    </div>
  );
}

export default App;
