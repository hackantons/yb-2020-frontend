import React, { Fragment } from 'react';
import './Event.css';

import { Button } from '../theme';

const TIMEOUT = 0;

const Event = ({
  title,
  description,
  onConfirmEvent,
  isFirst,
  unexpected,
  className = '',
}) => {
  const [init, setInit] = React.useState(false);
  const [fade, setFade] = React.useState('none');
  const [delayedEvent, setDelayedEvent] = React.useState({
    title,
    description,
    isFirst,
  });

  React.useEffect(() => {
    if (!init) {
      setDelayedEvent({
        title,
        description,
        isFirst,
      });
      setInit(true);
      return;
    }
    setFade('out');
    setTimeout(() => {
      setFade('in');
    }, 400);
    setTimeout(() => {
      setFade('none');
      setDelayedEvent({
        title,
        description,
        isFirst,
      });
    }, 500);
  }, [title, description, isFirst]);

  return (
    <div className={`event ${className}`} data-fade={fade}>
      <div className="event__newspaper">
        {delayedEvent.isFirst ? (
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
        {delayedEvent.isFirst ? (
          ''
        ) : (
          <div className="event__newspaper__date">01. Januar 2020</div>
        )}
      </div>
      <div className="event__text">
        <h2>
          {unexpected ? (
            <Fragment>
              Breaking! <span className="h2__light">{delayedEvent.title}</span>
            </Fragment>
          ) : (
            delayedEvent.title
          )}
        </h2>
        <p>{delayedEvent.description}</p>
      </div>
      <Button
        className="event__next"
        timerKey={delayedEvent.title}
        clickAfter={isFirst ? 0 : TIMEOUT}
        onClick={onConfirmEvent}
      >
        {delayedEvent.isFirst ? "Los geht's!" : 'Weiter'}
      </Button>
    </div>
  );
};

export default Event;
