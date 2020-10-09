import React from 'react';
import './Event.css';

import { Button } from '../theme';

const TIMEOUT = 0;

const Event = ({ title, description, onConfirmEvent, isFirst }) => {
  return (
    <div className="event">
      <div className="event__newspaper">
        <img
              className="event__newspaper__logo"
              src={`/assets/static/bernerzeitung.svg`}
            />
        <div className="event__newspaper__date">01. Januar 2020</div>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button
        className="event__next"
        timerKey={title}
        clickAfter={isFirst ? TIMEOUT : 0}
        onClick={onConfirmEvent}
      >
        {isFirst ? 'Starten' : 'Weiter'}
      </Button>
    </div>
  );
};

export default Event;
