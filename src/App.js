import { faBoxOpen, faChevronLeft, faFingerprint, faMemory, faPuzzlePiece, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';
import './App.css';
import Level1 from './components/Level1/Level1';
import Level2 from './components/Level2/Level2';
import Level3 from './components/Level3/Level3';
import Level4 from './components/Level4/Level4';
import Level5 from './components/Level5/Level5';

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
      <div className="challenge-container">
        <div className="challenge-row">
          <div className="challenge-item" id="challenge1" onClick={() => setViewedChallenge(1)}>
            <FontAwesomeIcon icon={faPuzzlePiece} size="3x"/>       
          </div>
          <div className="challenge-item" id="challenge2" onClick={() => setViewedChallenge(2)}>
            <FontAwesomeIcon icon={faFingerprint} size="3x" />
          </div>
          <div className="challenge-item" id="challenge3" onClick={() => setViewedChallenge(3)}>
            <FontAwesomeIcon icon={faTerminal} size="3x" />
          </div>
        </div>
        <div className="challenge-row">
          <div className="challenge-item" id="challenge4" onClick={() => setViewedChallenge(4)}>
            <FontAwesomeIcon icon={faMemory} size="3x" />
          </div>
          <div className="challenge-item" id="challenge5" onClick={() => setViewedChallenge(5)}>
            <FontAwesomeIcon icon={faBoxOpen} size="3x" />
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="App">
      <div className="header-container">
        { viewedChallenge && 
          <div className="back-button">
            <FontAwesomeIcon 
              icon={faChevronLeft} 
              onClick={() => setViewedChallenge(null)} 
              style={{ cursor: "pointer" }}
              size="xl"
            />
          </div>
        }
        <h1>Hostinger Hunt</h1>
      </div>
      {renderCurrentLevel()}
      <div className="progress-container">
        <div className="vertical-line"></div>
        <div className="vertical-line"></div>
        <div className="progress-bar" style={{ width: `${(progressArray.filter(Boolean).length / 5) * 100}%` }}></div>
      </div>

    </div>
  );
}

export default App;
