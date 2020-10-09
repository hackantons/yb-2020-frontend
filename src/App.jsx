import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import Assets from '@app/Assets';
import Event from '@app/Event';
import LeaderBoard from '@app/LeaderBoard';

import { ASSETS } from '@utils/constants';
import { EVENTS } from '@utils/events';

const App = () => {
  const [end, setEnd] = useState(false);
  const [total, setTotal] = useState(0);
  const [locked, setLocked] = useState(false);
  const [step, setStep] = useState(0);
  const [bank, setBank] = useState(100);
  const [portfolio, setPortfolio] = useState({
    [ASSETS.IMMO]: 20,
    [ASSETS.COMMODITIES]: 20,
    [ASSETS.SHARES]: 20,
  });

  const currentEvent = React.useMemo(() => EVENTS[step], [step]);

  const onConfirmEvent = () => {
    const modifiedAssets = {};
    Object.entries(currentEvent.modifiers).map(([asset, multipl]) => {
      modifiedAssets[asset] = portfolio[asset] * multipl;
    });
    setPortfolio({ ...portfolio, ...modifiedAssets });

    if (EVENTS.length - 1 === step) {
      const allAssets = Object.values(portfolio).reduce((acc, v) => v + acc, 0);
      setTotal(allAssets + bank);
      setEnd(true);
    }
    setStep(step + 1);
  };

  if (end) {
    return <LeaderBoard value={total} />;
  }

  return (
    <div>
      <Assets
        locked={locked}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        bank={bank}
        setBank={setBank}
      />
      -----------------------------------------
      <Event
        title={currentEvent.title}
        description={currentEvent.description}
        onConfirmEvent={onConfirmEvent}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
