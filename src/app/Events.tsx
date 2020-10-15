import React from 'react';

import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@store/index';
import { State } from '@store/types';

import './Events.css';

import { Badge, Card } from '../theme';
import { ASSETS } from '@utils/constants';
import { formatMultiplier } from '@utils/helpers';

const TIMEOUT = 20;

const Events = ({ className = '' }: { className?: string }) => {
  const [init, setInit] = React.useState(false);
  const [fade, setFade] = React.useState('none');
  const [showOutcome, setShowOutcome] = React.useState(false);
  const { events, eventIndex, eventOutcome }: State = useStoreState([
    'events',
    'eventIndex',
    'eventOutcome',
  ]);
  const { resolveCurrentEvent, nextEvent, showLeaderBoard } = useActions(
    actions
  );

  const currentEvent = React.useMemo(
    () => (events ? events[eventIndex] : null),
    [events, eventIndex]
  );
  const [delayedEvent, setDelayedEvent] = React.useState(currentEvent);

  React.useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }
    setFade('out');
    setTimeout(() => {
      setFade('in');
      setShowOutcome(false);
    }, 400);
    setTimeout(() => {
      setFade('none');
      setDelayedEvent(currentEvent);
    }, 500);
  }, [currentEvent]);

  return (
    <div className={`${className} events`} data-fade={fade}>
      {showOutcome ? (
        <Card
          title={
            <img
              src="/assets/static/bernerzeitung.svg"
              alt="Logo Berner Zeitung"
            />
          }
          ctaOnClick={() =>
            eventOutcome.isLastEvent ? showLeaderBoard() : nextEvent()
          }
          ctaText={
            eventOutcome.isLastEvent ? 'Leaderboard anzeigen' : 'Nächster Event'
          }
          ctaProps={{
            clickAfter: 0,
            timerKey: `outcome-${eventIndex}`,
          }}
        >
          <React.Fragment>
            {!eventOutcome.expected && (
              <p>
                <Badge>Eilmendung</Badge>
              </p>
            )}
            <p>{eventOutcome.description}</p>
            {Object.entries(eventOutcome.modifiers).map(
              ([assetKey, modifier]) => (
                <p>
                  <b>
                    {ASSETS[assetKey]}: {formatMultiplier(modifier.multiplier)}
                  </b>
                  <br />
                  {modifier.reason}
                </p>
              )
            )}
          </React.Fragment>
        </Card>
      ) : (
        <Card
          title={
            <img
              src="/assets/static/bernerzeitung.svg"
              alt="Logo Berner Zeitung"
            />
          }
          ctaOnClick={() => {
            setShowOutcome(true);
            resolveCurrentEvent();
          }}
          ctaText="Weiter"
          className={className}
          ctaProps={{
            clickAfter: TIMEOUT,
            timerKey: `event-${eventIndex}`,
          }}
        >
          <h1>{delayedEvent.title}</h1>
          <p>{delayedEvent.description}</p>
        </Card>
      )}
    </div>
  );
};

export default Events;
