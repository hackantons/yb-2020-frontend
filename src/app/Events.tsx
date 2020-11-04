import React from 'react';

import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@store/index';
import { State } from '@store/types';

import './Events.css';

import { Badge, Card, FlipCard, SVG } from '../theme';
import { ASSETS } from '@utils/constants';
import { formatMultiplier } from '@utils/helpers';

const TIMEOUT = 20;

const Events = ({ className = '' }: { className?: string }) => {
  const [init, setInit] = React.useState(false);
  const [fade, setFade] = React.useState('none');
  const [flipSpeed, setFlipSpeed] = React.useState(800);
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
  const [delayedEventOutcome, setDelayedEventOutcome] = React.useState(
    eventOutcome
  );

  React.useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }
    setFade('out');
    setFlipSpeed(800);
    setTimeout(() => {
      setFade('in');
      setShowOutcome(false);
      setFlipSpeed(0);
    }, 400);
    setTimeout(() => {
      setFade('none');
      setDelayedEvent(currentEvent);
      setDelayedEventOutcome(eventOutcome);
      setFlipSpeed(800);
    }, 500);
  }, [currentEvent]);

  return (
    <div className={`${className} events`} data-fade={fade}>
      <FlipCard
        flipped={showOutcome}
        flipSpeed={flipSpeed}
        front={
          <Card
            title={<SVG path="bernerzeitung.svg" alt="Logo Berner Zeitung" />}
            ctaOnClick={() => {
              setShowOutcome(true);
              resolveCurrentEvent();
            }}
            ctaText="Weiter"
            ctaProps={{
              clickAfter: TIMEOUT,
              timerKey: `event-${eventIndex}`,
            }}
          >
            <h1>{delayedEvent.title}</h1>
            <p>{delayedEvent.description}</p>
          </Card>
        }
        back={
          <Card
            title={
              <img
                src="/assets/static/bernerzeitung.svg"
                alt="Logo Berner Zeitung"
              />
            }
            ctaOnClick={() =>
              delayedEventOutcome.isLastEvent ? showLeaderBoard() : nextEvent()
            }
            ctaText={
              delayedEventOutcome.isLastEvent
                ? 'Leaderboard anzeigen'
                : 'Nächster Event'
            }
            ctaProps={{
              clickAfter: 0,
              timerKey: `outcome-${eventIndex}`,
            }}
          >
            <React.Fragment>
              {!delayedEventOutcome.expected && (
                <p>
                  <Badge>Eilmendung</Badge>
                </p>
              )}
              <p>
                <b>{delayedEventOutcome.description}</b>
              </p>
              {Object.entries(delayedEventOutcome.modifiers).map(
                ([assetKey, modifier]) => (
                  <p>
                    <b>
                      {ASSETS[assetKey]}:{' '}
                      {formatMultiplier(modifier.multiplier)}
                    </b>
                    <br />
                    {modifier.reason}
                  </p>
                )
              )}
            </React.Fragment>
          </Card>
        }
      />
    </div>
  );
};

export default Events;
