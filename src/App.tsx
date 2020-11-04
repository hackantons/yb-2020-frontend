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
import { Card, SVG } from '@theme';

import useWindowSize from '@app/hooks/useWindowSize';

import { SCREENS } from '@utils/constants';

const App = () => {
  const { activeScreen }: State = useStoreState(['activeScreen']);
  const { setOffline, startGame, resetGame } = useActions(actions);
  const [opacity, setOpacity] = React.useState(0);
  const [delayedActiveScreen, setDelayedActiveScreen] = React.useState(
    activeScreen
  );
  const [appScreensHeight, setAppScreensHeight] = React.useState<number>(null);
  const windowSize = useWindowSize();

  const footerRef = React.useRef(null);
  const showFooter = React.useMemo(() => delayedActiveScreen !== SCREENS[2], [
    delayedActiveScreen,
  ]);

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

  React.useEffect(() => {
    if (windowSize.height) {
      setAppScreensHeight(
        windowSize.height -
          (footerRef.current ? footerRef.current.clientHeight : 0)
      );
    }
  }, [windowSize, footerRef, showFooter]);

  return (
    <div className="app">
      <div
        className="app__screens"
        style={{ opacity, height: appScreensHeight }}
      >
        {delayedActiveScreen === SCREENS[2] ? (
          <LeaderBoard className="app__card" />
        ) : delayedActiveScreen === SCREENS[1] ? (
          <Events className="app__card" />
        ) : (
          <Card
            title={<SVG path="logo.svg" alt="BEKB Logo" />}
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
      {showFooter && (
        <div className="app_footer" ref={footerRef}>
          <Portfolio className="app__portfolio" />
          <Konto className="app__konto" />
        </div>
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
