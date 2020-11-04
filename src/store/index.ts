import { State } from './types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';

import { isDev, shuffle } from '@utils/helpers';
import { EVENTS } from '@utils/events';
import { ASSETS, SCREENS } from '@utils/constants';
import { EventOutcome } from '@app/types';

const INITIAL_BALANCE = 700;

const initialState: State = {
  activeScreen: SCREENS[0],
  events: [],
  eventIndex: 0,
  eventOutcome: null,
  portfolio: [],
  accountBalance: INITIAL_BALANCE,
  offline: false,
};

const generateOutcome = (events, eventIndex) => {
  const currentEvent = events[eventIndex];
  const isLastEvent = eventIndex === events.length - 1;
  let eventOutcome: EventOutcome = {
    expected: true,
    description: currentEvent.resolution.description,
    modifiers: currentEvent.resolution.modifiers,
    isLastEvent,
  };

  if (
    'alterative' in currentEvent &&
    Math.floor(Math.random() * Math.floor(100)) <
      currentEvent.alterative.probability
  ) {
    eventOutcome = {
      expected: false,
      description: currentEvent.alterative.description,
      modifiers: currentEvent.alterative.modifiers,
      isLastEvent,
    };
  }
  return eventOutcome;
};

export const actions = (store: Store<State>) => ({
  resetGame: state =>
    store.setState({
      activeScreen: SCREENS[0],
      events: shuffle(EVENTS).slice(0, 6),
      eventIndex: 0,
      portfolio: Object.keys(ASSETS).map(asset => ({
        key: asset,
        value: 100,
      })),
      accountBalance: INITIAL_BALANCE,
    }),
  showLeaderBoard: state => store.setState({ activeScreen: SCREENS[2] }),
  startGame: ({ events }) =>
    store.setState({
      activeScreen: SCREENS[1],
      eventIndex: 0,
      eventOutcome: generateOutcome(events, 0),
    }),
  nextEvent: ({ eventIndex, events }) => {
    eventIndex = eventIndex + 1;
    store.setState({
      eventIndex,
      eventOutcome: generateOutcome(events, eventIndex),
    });
  },
  resolveCurrentEvent: ({ eventOutcome, portfolio }) => {
    store.setState({
      portfolio: portfolio.map(asset => ({
        ...asset,
        value:
          asset.key in eventOutcome.modifiers
            ? asset.value * eventOutcome.modifiers[asset.key].multiplier
            : asset.value,
      })),
    });
  },
  updateAsset: ({ portfolio, accountBalance }, modifiedAssetKey, value) => {
    let diff = 0;
    const newPortfolio = portfolio.map(asset => {
      if (asset.key !== modifiedAssetKey) {
        return asset;
      }

      let newValue = asset.value + value;
      if (newValue <= 0) {
        newValue = 0;
      }

      let assetDiff = asset.value - newValue;
      if (accountBalance + assetDiff < 0) {
        newValue = accountBalance + asset.value;
        assetDiff = asset.value - newValue;
      }
      diff = assetDiff + diff;

      return {
        ...asset,
        value: newValue,
      };
    });

    store.setState({
      portfolio: newPortfolio,
      accountBalance: accountBalance + diff,
    });
  },
  setOffline: (state, offline: boolean) => store.setState({ offline }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
