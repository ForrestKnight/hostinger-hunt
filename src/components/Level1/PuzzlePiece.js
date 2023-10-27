import React from 'react';

const PuzzlePiece = ({ image, position, size, onDragEnd, id }) => {

    const handleDragStart = (e) => {
        const data = JSON.stringify({ id, ...position });
        e.dataTransfer.setData('text/plain', data);
    };

    return (
        <div 
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: size.width,
                height: size.height,
                backgroundImage: `url(${image})`,
                backgroundSize: `${100}% ${100}%`,
                backgroundPosition: `-${position.left} -${position.top}`,
                border: '1px solid black',
                cursor: 'grab'
            }}
        ></div>
    );
}

export default PuzzlePiece;
