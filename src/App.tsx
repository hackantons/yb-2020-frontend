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
      {delayedActiveScreen !== SCREENS[2] && (
        <React.Fragment>
          <Portfolio className="app__portfolio" />
          <Konto className="app__konto" />
        </React.Fragment>
      )}
    </div>
  );
};

ReactDOM.render(
  <Provider value={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
