import React from 'react';
import './Event.css';

const Event = ({ title, description, onConfirmEvent }) => {
  return (
    <div className="event">
      <div className="event__newspaper">
        <div className="event__newspaper__logo">Berner Zeitung</div>
        <div className="event__newspaper__date">01. Januar 2020</div>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onConfirmEvent}>Weiter</button>
    </div>
  );
};

export default Event;
