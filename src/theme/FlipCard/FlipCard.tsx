import React from 'react';

import './FlipCard.css';

const FlipCard = ({
  className = '',
  front,
  back,
  flipped,
  flipSpeed = 800,
  ...props
}: {
  className?: '';
  front: any;
  back: any;
  flipped: boolean;
  flipSpeed?: number;
  [key: string]: any;
}) => {
  return (
    <div
      className={`${className} flip-card ${
        flipped ? 'flip-card--flipped' : ''
      }`}
      {...props}
    >
      <div
        className="flip-card__inner"
        style={{
          transition: `transform ${flipSpeed}ms`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flip-card__front">{front}</div>
        <div className="flip-card__back">{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;
