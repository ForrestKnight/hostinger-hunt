import React, { useState } from 'react';
import PuzzlePiece from './PuzzlePiece';

const PuzzleBoard = ({ image, rows, columns }) => {
    const [pieces, setPieces] = useState(generatePieces());

    function generatePieces() {
        let idCounter = 0;
        const pieceWidth = 100 / columns;
        const pieceHeight = 100 / rows;
        const piecesArr = [];
        
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                piecesArr.push({
                    id: idCounter++,
                    correctPosition: {
                        top: i * pieceHeight + '%',
                        left: j * pieceWidth + '%',
                    },
                    currentPosition: {
                        top: (Math.random() * 90) + '%',
                        left: (Math.random() * 90) + '%',
                    },
                    size: {
                        width: pieceWidth + '%',
                        height: pieceHeight + '%',
                    }
                });
            }
        }
        return piecesArr;
    }

    function handleDragEnd(e, piece) {
      const dataStr = e.dataTransfer.getData('text/plain');
      if(!dataStr) return; // Guard clause to handle empty data
      
      const data = JSON.parse(dataStr);
        if (Math.abs(data.top - piece.correctPosition.top) <= 10 && Math.abs(data.left - piece.correctPosition.left) <= 10) {
            const updatedPieces = pieces.map(p => {
                if (p.id === piece.id) {
                    return { ...p, currentPosition: p.correctPosition };
                }
                return p;
            });
            setPieces(updatedPieces);
        }
    }

    return (
        <div style={{position: 'relative', width: '500px', height: '500px'}}>
            {pieces.map(piece => (
                <PuzzlePiece 
                    key={piece.id}
                    id={piece.id}
                    image={image}
                    position={piece.currentPosition}
                    size={piece.size}
                    onDragEnd={(e) => handleDragEnd(e, piece)}
                />
            ))}
        </div>
    );
}

export default PuzzleBoard;
