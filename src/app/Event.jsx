import React from 'react';
import './Event.css';

import { Button } from '../theme';

const TIMEOUT = 0;

const Event = ({ title, description, onConfirmEvent, isFirst }) => {
  return (
    <div className="event">
      <div className="event__newspaper">
        {isFirst ? (
          <img
            className="event__newspaper__logo"
            src={`/assets/static/logo.svg`}
          />
        ) : (
            <img
              className="event__newspaper__logo"
              src={`/assets/static/bernerzeitung.svg`}
            />
          )}
        {isFirst ? '' : <div className="event__newspaper__date">01. Januar 2020</div>}
      </div>
      <div className="event__text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Button
        className="event__next"
        timerKey={title}
        clickAfter={isFirst ? TIMEOUT : 0}
        onClick={onConfirmEvent}
      >
        {isFirst ? 'Los geht\'s!' : 'Weiter'}
      </Button>
    </div>
  );
};

export default Event;
