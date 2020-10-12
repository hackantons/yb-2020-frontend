import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import './App.css';

import { shuffle } from '@utils/helpers';

import Portfolio from '@app/Portfolio';
import Event from '@app/Event';
import LeaderBoard from '@app/LeaderBoard';
import { ShadowBox, Button } from './theme';

import { EVENTS, INIT_EVENT } from '@utils/events';
import { AssetD } from './@types/Assets';

const allEvents = [INIT_EVENT, ...shuffle(EVENTS).slice(0, 6)];

const App = () => {
  const [shadowBox, setShadowBox] = React.useState<boolean>(false);
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

    /*
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
     */
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
          onClick={() => setShadowBox(true)}
        >
          <img
            className="explanation-button__img"
            src={`/assets/static/info.svg`}
          />
        </button>
      )}

      {shadowBox && (
        <ShadowBox close={() => setShadowBox(false)}>
          <div className="explanation">
            <img
              class="asset__image--filled explanation-icon"
              src="/assets/static/real-estate.png"
            />
            <p>
              Dieses Icon stellt die Immobilien in deinem Portfdolio dar,
              überlege dir gut ob es Sinn macht zu investieren
            </p>
            <img
              class="asset__image--filled explanation-icon"
              src="/assets/static/shares.png"
            />
            <p>
              Dieses Icon stellt die Aktien in deinem Portfdolio dar, Sie sind
              volatiler als Rohstoffe und Immobilien.
            </p>
            <img
              class="asset__image--filled explanation-icon"
              src="/assets/static/commodities.png"
            />
            <p>
              Dieses Icon stellt die Rohstoffe in deinem Portfolio dar, die
              Rohstoffe sind als Anlage stabiler, aber bringen weniger Gewinn
            </p>
            <br />
            <p>
              Mit all diesen Icons lässt sich per rauf und runter "swipen"
              interagieren
            </p>
            <br />

            <img
              class="asset__image--filled explanation-bar"
              src="/assets/static/bar.png"
            />
            <p>
              Dieser Balken stellt dein Bankvermögen dar, dieses Geld kannst du
              investieren oder bei der BEKB sicher lagern
            </p>
          </div>
        </ShadowBox>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
