import React, { Fragment } from 'react';
import './Event.css';

import { Button } from '../theme';
import moment from 'moment';

const TIMEOUT = 20;
const DATEADDERINMONTHS = 2;

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
    unexpected,
  });
  const [dateCalculated, setDateCalculated] = React.useState(
    moment().add(-DATEADDERINMONTHS, 'months')
  );

  React.useEffect(() => {
    if (!init) {
      setDelayedEvent({
        title,
        description,
        isFirst,
        unexpected,
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
        unexpected,
      });
    }, 500);
    setDateCalculated(dateCalculated.add(DATEADDERINMONTHS, 'months'));
  }, [title, description, isFirst, unexpected]);

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
          <div className="event__newspaper__date">
            {dateCalculated.format('DD. MMM YYYY')}
          </div>
        )}
      </div>
      <div className="event__text">
        {delayedEvent.unexpected ? (
          <Fragment>
            <div className="event__unexpected__tag">Eilmeldung</div>
          </Fragment>
        ) : (
          ''
        )}
        <h2>{delayedEvent.title}</h2>
        <p>{delayedEvent.description}</p>
      </div>
      <Button
        className="event__next"
        timerKey={delayedEvent.title}
        clickAfter={isFirst || unexpected ? 0 : TIMEOUT}
        onClick={onConfirmEvent}
      >
        {delayedEvent.isFirst ? "Los geht's!" : 'Weiter'}
      </Button>
    </div>
  );
};

export default Event;
