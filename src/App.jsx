import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import './App.css';

import { shuffle } from '@utils/helpers';

import Portfolio from '@app/Portfolio';
import Event from '@app/Event';
import LeaderBoard from '@app/LeaderBoard';

import { ASSETS } from '@utils/constants';
import { EVENTS, INIT_EVENT } from '@utils/events';

const allEvents = [INIT_EVENT, ...shuffle(EVENTS).slice(0, 6)];

const App = () => {
  const [end, setEnd] = useState(false);
  const [locked, setLocked] = useState(false);
  const [step, setStep] = useState(0);
  const [bank, setBank] = useState(1000);
  const [portfolio, setPortfolio] = useState({
    [ASSETS.IMMO]: 0,
    [ASSETS.SHARES]: 0,
    [ASSETS.COMMODITIES]: 0,
  });

  const [unexpectedTitle, setUnexpectedTitle] = React.useState(null);
  const [unexpectedDescription, setUnexpectedDescription] = React.useState(
    null
  );

  const currentEvent = React.useMemo(
    () => ({ ...allEvents[step], isFirst: step === 0 }),
    [step]
  );

  const totalAssets = React.useMemo(
    () => Object.values(portfolio).reduce((acc, v) => v + acc, 0),
    [portfolio]
  );

  const total = React.useMemo(() => totalAssets + bank, [totalAssets, bank]);

  const onConfirmEvent = () => {
    const modifiedAssets = {};
    setLocked(true);

    if (unexpectedTitle) {
      setUnexpectedTitle(null);
      setUnexpectedDescription(null);
      setLocked(false);
    } else {
      const rand = Math.floor(Math.random() * Math.floor(100));
      if (
        'unexpectedOutcome' in currentEvent &&
        rand < currentEvent.unexpectedOutcome.propability
      ) {
        setUnexpectedTitle(currentEvent.unexpectedOutcome.title);
        setUnexpectedDescription(currentEvent.unexpectedOutcome.description);
        Object.entries(currentEvent.unexpectedOutcome.modifiers).map(
          ([asset, multipl]) => {
            modifiedAssets[asset] = portfolio[asset] * multipl;
          }
        );
      } else {
        Object.entries(currentEvent.modifiers).map(([asset, multipl]) => {
          modifiedAssets[asset] = portfolio[asset] * multipl;
        });
        setLocked(false);
      }
      setStep(step + 1);
      setPortfolio({ ...portfolio, ...modifiedAssets });
      if (allEvents.length - 1 === step) {
        setEnd(true);
      }
    }
  };

  return (
    <div className="app">
      {end ? (
        <LeaderBoard value={total} />
      ) : (
        <React.Fragment>
          <Event
            title={unexpectedTitle || currentEvent.title}
            description={unexpectedDescription || currentEvent.description}
            onConfirmEvent={onConfirmEvent}
            isFirst={currentEvent.isFirst}
            unexpected={unexpectedTitle !== null}
          />
          <Portfolio
            locked={locked}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            bank={bank}
            setBank={setBank}
            totalAssets={totalAssets}
          />
        </React.Fragment>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
