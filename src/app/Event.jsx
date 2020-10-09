import React from 'react';

import { Button } from '../theme';

const Event = ({ title, description, onConfirmEvent }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button timerKey={title} clickAfter={10} onClick={onConfirmEvent}>
        Weiter
      </Button>
    </div>
  );
};

export default Event;
