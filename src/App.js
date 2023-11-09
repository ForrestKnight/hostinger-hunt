import { faBoxOpen, faChevronLeft, faFingerprint, faMagnifyingGlass, faMemory, faTerminal } from '@fortawesome/free-solid-svg-icons';
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
  const [levelCompletedAnimation, setLevelCompletedAnimation] = useState(false);
  const [videoReveal, setVideoReveal] = useState(false);
  const [rowsMoved, setRowsMoved] = useState(false);

  useEffect(() => {
    const savedProgress = Cookie.get('progressArray');
    if (savedProgress) {
      setProgressArray(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    Cookie.set('progressArray', JSON.stringify(progressArray));
  }, [progressArray]);

  useEffect(() => {
    const allLevelsCompleted = progressArray.every(Boolean);
    if (allLevelsCompleted && !rowsMoved) {
      setRowsMoved(true); // Trigger rows moving
  
      // After rows animation is complete, reveal the video
      setTimeout(() => {
        setVideoReveal(true);
      }, 3000); // Assuming your row animations are 3 seconds
    }
  }, [progressArray, rowsMoved]);  

  const updateProgress = (levelCompleted, completeAll = false) => {
    let updatedProgress = [...progressArray];
    if (completeAll) {
      updatedProgress = [true, true, true, true, true];
    } else {
      updatedProgress[levelCompleted - 1] = true;
    }
    setProgressArray(updatedProgress);
  
    if (!completeAll) {
      // Trigger the completion animation
      setLevelCompletedAnimation(true);
      
      // After the animation, return to the home screen
      setTimeout(() => {
          setLevelCompletedAnimation(false);
          setViewedChallenge(null);
      }, 2000);  // 2 seconds delay
    }
  };
  

  const renderCurrentLevel = () => {
    if (levelCompletedAnimation) {
      return renderCompletionAnimation();
    }
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

  const renderCompletionAnimation = () => {
    return (
        <div className="completion-animation">
            🎉 Level Completed! 🎉
        </div>
    );
  };

  const renderHomeScreen = () => {

    return (
      <div className={`challenge-container ${rowsMoved ? "rows-moved" : ""} ${videoReveal ? "video-reveal" : ""}`}>
        <div className="challenge-row top-row">
          <div className={`challenge-item ${progressArray[0] ? "completed" : ""}`} id="challenge1" onClick={() => setViewedChallenge(1)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="3x" className="icon" />       
          </div>
          <div className={`challenge-item ${progressArray[1] ? "completed" : ""}`} id="challenge2" onClick={() => setViewedChallenge(2)}>
            <FontAwesomeIcon icon={faFingerprint} size="3x" className="icon" />
          </div>
          <div className={`challenge-item ${progressArray[2] ? "completed" : ""}`} id="challenge3" onClick={() => setViewedChallenge(3)}>
            <FontAwesomeIcon icon={faTerminal} size="3x" className="icon" />
          </div>
        </div>
        {videoReveal && 
          <div className="video-container">
            <iframe 
              title="Congratulations! You're a Winner!"   
              src={process.env.REACT_APP_GRAND_REVEAL} 
              width="560" 
              height="315"
              style={{ opacity: videoReveal ? 1 : 0, pointerEvents: videoReveal ? 'auto' : 'none' }}
              allowFullScreen>
            </iframe>
          </div>
        }
        <div className="challenge-row bottom-row">
          <div className={`challenge-item ${progressArray[3] ? "completed" : ""}`} id="challenge4" onClick={() => setViewedChallenge(4)}>
            <FontAwesomeIcon icon={faMemory} size="3x" className="icon" />
          </div>
          <div className={`challenge-item ${progressArray[4] ? "completed" : ""}`} id="challenge5" onClick={() => setViewedChallenge(5)}>
            <FontAwesomeIcon icon={faBoxOpen} size="3x" className="icon" />
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
