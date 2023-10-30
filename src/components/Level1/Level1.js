import React, { useState } from 'react';
import './Level1.css';

function Level1({ progressToNextLevel }) {
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedPositions, setSelectedPositions] = useState([]);
    const wordsToFind = ["CODE", "HOST", "WEB", "HTML", "SERVER", "DOMAIN", "SCRIPT", "JAVASCRIPT", "DATABASE", "NETWORK"];
    const [foundWords, setFoundWords] = useState([]);

    const grid = [
      ['A', 'C', 'O', 'D', 'E', 'F', 'G', 'S', 'C', 'R', 'I', 'P'],
      ['H', 'H', 'O', 'S', 'T', 'X', 'J', 'K', 'T', 'W', 'E', 'B'],
      ['T', 'R', 'W', 'E', 'B', 'T', 'Y', 'U', 'I', 'D', 'A', 'T'],
      ['A', 'O', 'C', 'D', 'E', 'V', 'B', 'N', 'M', 'R', 'V', 'B'],
      ['D', 'D', 'O', 'M', 'A', 'I', 'N', 'G', 'T', 'H', 'O', 'S'],
      ['N', 'E', 'H', 'O', 'S', 'T', 'K', 'E', 'R', 'E', 'G', 'A'],
      ['J', 'A', 'J', 'A', 'V', 'A', 'R', 'I', 'P', 'T', 'H', 'J'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'W', 'E', 'R', 'T', 'Y', 'U'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Q', 'W', 'E', 'R', 'T'],
      ['Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J'],
      ['H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'A']
    ];
  
    const [letterColors, setLetterColors] = useState(Array(grid.length).fill().map(() => Array(grid[0].length).fill("#CFCFCF")));

    const isAdjacent = (lastPosition, newPosition) => {
      if (!lastPosition) return true;
      const [lastRow, lastCol] = lastPosition;
      const [newRow, newCol] = newPosition;
      return Math.abs(newRow - lastRow) <= 1 && Math.abs(newCol - lastCol) <= 1;
    }

    const handleLetterClick = (letter, row, col) => {
      if (isAdjacent(selectedPositions[selectedPositions.length - 1], [row, col])) {
          setSelectedWord(prev => prev + letter);
          setSelectedPositions(prev => [...prev, [row, col]]);
          
          const newColors = [...letterColors];
          newColors[row][col] = "green";
          setLetterColors(newColors);
      }
    }
  
  

    const checkWord = () => {
      const newColors = [...letterColors];
  
      if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
          setFoundWords(prev => [...prev, selectedWord]);
  
          // Make the letters gold on success
          for (let pos of selectedPositions) {
              newColors[pos[0]][pos[1]] = "gold";
          }
      } else {
          // Revert back to the default color on failure
          for (let pos of selectedPositions) {
              newColors[pos[0]][pos[1]] = "#CFCFCF";
          }
      }
  
      setLetterColors(newColors);
      setSelectedWord("");
      setSelectedPositions([]);
  
      if (foundWords.length === wordsToFind.length - 1) {
          progressToNextLevel();
      }
    }
  
  

    return (
      <div className="level1-container">
          <h2>Level 1: Code Terminology Word Search</h2>
          <div className="word-grid">
              {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid-row">
                      {row.map((letter, colIndex) => (
                          <button
                            key={colIndex}
                            className="grid-letter"
                            style={{ color: letterColors[rowIndex][colIndex] }}
                            onClick={() => handleLetterClick(letter, rowIndex, colIndex)}
                          >
                              {letter}
                          </button>
                      
                      ))}
                  </div>
              ))}
          </div>
          <div>
              <h3>Selected Word: {selectedWord}</h3>
              <button className="button" onClick={checkWord}>Submit Word</button>
          </div>
          <div>
              <h3>Words to find:</h3>
              <div className="words-to-find-grid">
                  {wordsToFind.map((word, index) => (
                      <div key={word} className="word-item">
                          <p style={{ textDecoration: foundWords.includes(word) ? "line-through" : "none" }}>
                              {word}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    );

}

export default Level1;
