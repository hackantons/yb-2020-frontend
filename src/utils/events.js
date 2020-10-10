import { ASSETS } from '@utils/constants';

export const INIT_EVENT = {
  title: 'Super-Duper-Trader',
  description:
    'Das ist das supercoole BEKB Spiel, bei dem deine Assets geschickt verwalten musst.\n\nDein Ziel ist es, bis zur Pensionierungstink reich zu sein. Passe dazu dein Portfolio geschickt auf reale Ereignisse an.\n\nSwipe jetzt auf den Icons um dein Startvermögen von 100k auf Immobilien, Aktien und Güter zu verteilen.',
  modifiers: {},
};

export const EVENTS = [
  {
    title: 'YB Meister',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 1.4,
      [ASSETS.SHARES]: 1.2,
      [ASSETS.COMMODITIES]: 1.2,
    },
    unexpectedOutcome: {
      propability: 50,
      title: 'YB Meister - fällt ins Wasser',
      description: 'Desc',
      modifiers: {
        [ASSETS.IMMO]: 0.1,
        [ASSETS.SHARES]: 0.1,
        [ASSETS.COMMODITIES]: 0.1,
      },
    },
  },
  {
    title: 'Schnee-Rekord',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 0.8,
      [ASSETS.SHARES]: 1.05,
      [ASSETS.COMMODITIES]: 0.98,
    },
  },
  {
    title: 'Bilateral Gefährdet',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 1.1,
      [ASSETS.SHARES]: 0.7,
      [ASSETS.COMMODITIES]: 1.2,
    },
  },
  {
    title: 'Bürgerkrieg im Kongo',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 1,
      [ASSETS.SHARES]: 0.95,
      [ASSETS.COMMODITIES]: 1.1,
    },
  },
  {
    title: 'Goldparität aufgehoben',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 1.02,
      [ASSETS.SHARES]: 1,
      [ASSETS.COMMODITIES]: 0.9,
    },
  },
  {
    title: 'Forscher entdecken künstliches Metall',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 0.95,
      [ASSETS.SHARES]: 1,
      [ASSETS.COMMODITIES]: 0.6,
    },
  },
  {
    title: 'Globale Covid-20 Pandemie',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 0.95,
      [ASSETS.SHARES]: 0.5,
      [ASSETS.COMMODITIES]: 0.8,
    },
  },
];
