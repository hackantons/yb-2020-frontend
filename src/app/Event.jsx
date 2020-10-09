import React from 'react';

const Event = ({ title, description, onConfirmEvent }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onConfirmEvent}>Weiter</button>
    </div>
  );
};

export default Event;
