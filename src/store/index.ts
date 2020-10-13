import { State } from './types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';

import { isDev, shuffle } from '@utils/helpers';
import { EVENTS } from '@utils/events';
import { assets } from '@utils/constants';

const initialState: State = {
  events: [],
  eventIndex: 0,
  portfolio: assets.map(asset => ({
    asset,
    value: 0,
  })),
  offline: false,
};

export const actions = (store: Store<State>) => ({
  resetGame: state =>
    store.setState({
      events: shuffle(EVENTS).slice(0, 6),
      eventIndex: 0,
      portfolio: assets.map(asset => ({
        asset,
        value: 0,
      })),
    }),
  setOffline: (state, offline: boolean) => store.setState({ offline }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
