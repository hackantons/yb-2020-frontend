import { ASSETS } from '@utils/constants';

export const INIT_EVENT = {
  title: 'Super-Duper-Trader',
  description: "Das ist das supercoole BEKB Spiel, bei dem deine Assets geschickt verwalten musst.\n\nDein Ziel ist es, bis zur Pensionierung stink reich zu sein. Passe dazu dein Portfolio geschickt auf reale Ereignisse an.\n\nSwipe jetzt auf den Icons um dein Startvermögen von 100k auf Immobilien, Aktien und Güter zu verteilen.",
  modifiers: {},
};

export const EVENTS = [
  {
    title: 'Test',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 1.2,
      [ASSETS.COMMODITIES]: 0.9,
    },
  },
  {
    title: 'Test 2',
    description: 'Desc',
    modifiers: {
      [ASSETS.IMMO]: 0.1,
      [ASSETS.COMMODITIES]: 0.2,
    },
  },
];
