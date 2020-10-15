import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useStoreState, useActions } from 'unistore-hooks';
import { actions, store } from '@store/index';
import { State } from '@store/types';

import './App.css';

import Portfolio from '@app/portfolio/Portfolio';
import Konto from '@app/Konto';
import Events from '@app/Events';
import LeaderBoard from '@app/LeaderBoard';
import { ShadowBox, Button, Card } from '@theme';

import InformationPopup from '@app/onboarding/InformationPopup';

import { AssetD } from '@app/types';
import { SCREENS } from '@utils/constants';

const App = () => {
  const { activeScreen }: State = useStoreState(['activeScreen']);
  const { setOffline, startGame, resetGame } = useActions(actions);
  const [opacity, setOpacity] = React.useState(0);
  const [delayedActiveScreen, setDelayedActiveScreen] = React.useState(
    activeScreen
  );

  const [informationPopup, setInformationPopup] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    resetGame();
  }, []);

  React.useEffect(() => {
    setOpacity(0);
    setTimeout(() => {
      setOpacity(1);
      setDelayedActiveScreen(activeScreen);
    }, 400);
  }, [activeScreen]);

  React.useEffect(() => {
    setOffline(!navigator.onLine);
    window.addEventListener('online', () => setOffline(false), false);
    window.addEventListener('offline', () => setOffline(true), false);
  }, []);

  return (
    <div className="app">
      <div className="app__screens" style={{ opacity }}>
        {delayedActiveScreen === SCREENS[2] ? (
          <LeaderBoard className="app__card" />
        ) : delayedActiveScreen === SCREENS[1] ? (
          <Events className="app__card" />
        ) : (
          <Card
            title={<img src="/assets/static/logo.svg" alt="BEKB Logo" />}
            ctaOnClick={() => startGame()}
            ctaText="Los geht's!"
            className="app__card"
          >
            <h1>BEKB Investment Simulator</h1>
            <p>Passe dein Portfolio geschickt auf reale Ereignisse an.</p>
            <p>
              Swipe jetzt auf den Icons um dein Startvermögen auf Immobilien,
              Aktien und Güter zu verteilen.
            </p>
          </Card>
        )}
      </div>
      <Portfolio className="app__portfolio" />
      <Konto className="app__konto" />
    </div>
  );

  /*
  const [end, setEnd] = useState<boolean>(false);
  const [locked, setLocked] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [bank, setBank] = useState<number>(1000);
  const [portfolio, setPortfolio] = useState<Record<AssetD, number>>({
    'real-estate': 0,
    shares: 0,
    commodities: 0,
  });

  const [unexpectedTitle, setUnexpectedTitle] = React.useState<string>(null);
  const [unexpectedDescription, setUnexpectedDescription] = React.useState<
    string
  >(null);

  const [changeFromStep, setChangeFromStep] = React.useState(false);

  const currentEvent = React.useMemo(
    () => ({ ...allEvents[step], isFirst: step === 0 }),
    [step]
  );

  const totalAssets = React.useMemo<number>(
    () =>
      Object.values(portfolio).reduce((acc: number, v: number) => v + acc, 0),
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
      setChangeFromStep(true);
      setPortfolio({ ...portfolio, ...modifiedAssets });
      window.setTimeout(() => {
        setChangeFromStep(false);
      }, 10);

      if (allEvents.length - 1 === step) {
        setEnd(true);
      }
    }
  };

  return (
    <div className="app">
      {end ? (
        <LeaderBoard className="app__event" value={total} />
      ) : (
        <React.Fragment>
          <div className="app__event">
            <Event
              title={unexpectedTitle || currentEvent.title}
              description={unexpectedDescription || currentEvent.description}
              onConfirmEvent={onConfirmEvent}
              isFirst={currentEvent.isFirst}
              unexpected={unexpectedTitle !== null}
            />
          </div>
          <Portfolio
            locked={locked}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            bank={bank}
            setBank={setBank}
            totalAssets={totalAssets}
            changeFromStep={changeFromStep}
            className="app__portfolio"
          />
        </React.Fragment>
      )}
      {!end && (
        <button
          className="explanation-button"
          onClick={() => setInformationPopup(true)}
        >
          <img
            className="explanation-button__img"
            src={`/assets/static/info.svg`}
          />
        </button>
      )}

      {informationPopup && <InformationPopup setOpen={setInformationPopup} />}
    </div>
  );
       */
};

ReactDOM.render(
  <Provider value={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
