import React, { useState } from 'react';
import './Level2.css';

function Level2({ progressToNextLevel }) {
  const [userInput, setUserInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const originalMessage = "Talk is cheap. Show me the code.";
  const cipheredMessage = originalMessage.split('').map(char => 
    char === ' ' ? ' ' : 
    char === '.' ? '.' : 
    String.fromCharCode(char.charCodeAt(0) + 3)
  ).join('');

  const handleCompletion = () => {
    if (userInput.trim() === originalMessage) {
      setIsSuccess(true);
      setTimeout(() => {
        // setIsSuccess(false);
        setTimeout(progressToNextLevel, 1000);
      }, 1000);
    } else {
      setErrorMessage('Wrong Answer. Try Again!');
      setTimeout(() => {
        setErrorMessage(''); // Hide error message after 5 seconds
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h2>Decryption Challenge</h2>
      <p><strong>Unlock the secret!</strong> Decode the encrypted message below to progress.</p>
      <p className="matrix-style">{cipheredMessage}</p>
      <textarea
        className="textarea"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Decipher the message here"
        rows="3"
      />
      <br />
      {!isSuccess && !errorMessage && <button className="button" onClick={handleCompletion}>Decrypt and Submit</button>}
      {isSuccess && <div>Correct! You've deciphered the message.</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );

}

export default Level2;
