import React, { useState } from 'react';
import './Level1.css';

function Level1({ progressToNextLevel }) {
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedPositions, setSelectedPositions] = useState([]);
    const wordsToFind = ["CODE", "HOST", "DATABASE", "DEVNOTES", "SERVER", "DOMAIN", "HTML", "NETWORK", "WEB", "JAVASCRIPT"];
    const [foundWords, setFoundWords] = useState([]);

    const grid = [
      ['A', 'C', 'O', 'D', 'E', 'F', 'G', 'S', 'C', 'R', 'I', 'N'],
      ['H', 'H', 'L', 'S', 'P', 'X', 'J', 'K', 'T', 'W', 'E', 'B'],
      ['J', 'R', 'W', 'D', 'B', 'T', 'Y', 'U', 'I', 'T', 'A', 'T'],
      ['A', 'A', 'C', 'O', 'E', 'V', 'S', 'N', 'W', 'R', 'V', 'B'],
      ['D', 'D', 'V', 'M', 'A', 'I', 'E', 'O', 'T', 'H', 'O', 'S'],
      ['N', 'A', 'H', 'A', 'S', 'T', 'R', 'E', 'R', 'E', 'G', 'A'],
      ['J', 'T', 'J', 'I', 'S', 'K', 'V', 'L', 'M', 'T', 'H', 'H'],
      ['A', 'A', 'D', 'N', 'G', 'C', 'E', 'E', 'R', 'T', 'Y', 'O'],
      ['Q', 'B', 'E', 'R', 'T', 'Y', 'R', 'I', 'O', 'P', 'L', 'S'],
      ['Z', 'A', 'C', 'V', 'B', 'N', 'M', 'I', 'W', 'E', 'R', 'T'],
      ['Y', 'S', 'I', 'O', 'P', 'A', 'S', 'D', 'P', 'G', 'H', 'J'],
      ['H', 'E', 'K', 'L', 'D', 'E', 'V', 'N', 'O', 'T', 'E', 'S']
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
      <div className="container">
          <h2>Code Terminology Word Search</h2>
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
