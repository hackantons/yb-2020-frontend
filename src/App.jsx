import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import './App.css';

import { shuffle } from '@utils/helpers';

import Portfolio from '@app/Portfolio';
import Event from '@app/Event';
import LeaderBoard from '@app/LeaderBoard';

import { ASSETS } from '@utils/constants';
import { EVENTS, INIT_EVENT } from '@utils/events';

const allEvents = [INIT_EVENT, ...shuffle(EVENTS)];

const App = () => {
  const [end, setEnd] = useState(false);
  const [locked, setLocked] = useState(false);
  const [step, setStep] = useState(0);
  const [bank, setBank] = useState(1000);
  const [portfolio, setPortfolio] = useState({
    [ASSETS.IMMO]: 0,
    [ASSETS.COMMODITIES]: 0,
    [ASSETS.SHARES]: 0,
  });

  const currentEvent = React.useMemo(
    () => ({ ...allEvents[step], first: step === 0 }),
    [step]
  );

  const totalAssets = React.useMemo(
    () => Object.values(portfolio).reduce((acc, v) => v + acc, 0),
    [portfolio]
  );

  const total = React.useMemo(() => totalAssets + bank, [totalAssets, bank]);

  const onConfirmEvent = () => {
    const modifiedAssets = {};
    Object.entries(currentEvent.modifiers).map(([asset, multipl]) => {
      modifiedAssets[asset] = portfolio[asset] * multipl;
    });
    setPortfolio({ ...portfolio, ...modifiedAssets });
    if (allEvents.length - 1 === step) {
      setEnd(true);
    }
    setStep(step + 1);
  };

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__header__logo" src="/assets/static/logo.svg" />
        <div className="app__header__slogan">Hyppo the Trading Coach</div>
      </div>
      {end ? (
        <LeaderBoard value={total} />
      ) : (
        <React.Fragment>
          <Event
            title={currentEvent.title}
            description={currentEvent.description}
            onConfirmEvent={onConfirmEvent}
            isFirst={currentEvent.first}
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
