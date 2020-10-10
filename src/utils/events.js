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
    description:
      'Wird YB es nochmals schaffen? YB muss sich nur noch im Spiel gegen Basel beweisen und dann haben sie den Titel!',
    modifiers: {
      [ASSETS.IMMO]: 1.4,
      [ASSETS.SHARES]: 1.2,
      [ASSETS.COMMODITIES]: 1.2,
    },
    unexpectedOutcome: {
      propability: 10,
      title: 'YB Meister - fällt ins Wasser',
      description:
        'Basel gewinnt völlig überraschend in der Verlängerung mit einem 6:5 Torschuss',
      modifiers: {
        [ASSETS.IMMO]: 0.1,
        [ASSETS.SHARES]: 0.1,
        [ASSETS.COMMODITIES]: 0.1,
      },
    },
  },
  {
    title: 'Schnee-Rekord',
    description:
      'Schnee Rekord in Bern! \n Bis am Sonntagmorgen fallen in der Stadt 250 Zentimeter Neuschnee. Es ist mit enormen Ausfällen jeglichen Verkehrs zu rechnen.',
    modifiers: {
      [ASSETS.IMMO]: 0.8,
      [ASSETS.SHARES]: 1.05,
      [ASSETS.COMMODITIES]: 0.98,
    },
  },
  {
    title: 'Bilaterale Gefährdet',
    description:
      'Durch die neue SVP Abstimmung "Gotthard für Ausländer schliessen" sind die Bilateralen aufs neue gefährdet. Die EU zieht in Erwägung ein Embargo zu verkünden.',
    modifiers: {
      [ASSETS.IMMO]: 1.1,
      [ASSETS.SHARES]: 0.7,
      [ASSETS.COMMODITIES]: 1.2,
    },
  },
  {
    title: 'Bürgerkrieg im Kongo',
    description:
      'Im Kongo ist Bürgerkrieg ausgebrochen, dies verzögert auch die Auslieferung der neuen Macbooks welche diverse Rohmateralien aus dem Kongo benötigen.',
    modifiers: {
      [ASSETS.IMMO]: 1,
      [ASSETS.SHARES]: 0.95,
      [ASSETS.COMMODITIES]: 1.1,
    },
  },
  {
    title: 'Goldparität aufgehoben',
    description:
      'Die SNB hebt die Goldparität auf! \n Der internationale Goldmarkt erbebt! Wird dies einen Einfluss haben?',
    modifiers: {
      [ASSETS.IMMO]: 1.02,
      [ASSETS.SHARES]: 1,
      [ASSETS.COMMODITIES]: 0.9,
    },
  },
  {
    title: 'Forscher entdecken künstliches Metall',
    description:
      'Der Stein der Weisen wurde gefunden!\nMit dieser Schlagzeile verkündet das CERN die neue Entdeckung einer Möglichkeit Blei in Gold und andere Metalle umzuwandeln.',
    modifiers: {
      [ASSETS.IMMO]: 0.95,
      [ASSETS.SHARES]: 1,
      [ASSETS.COMMODITIES]: 0.6,
    },
  },
  {
    title: 'Globale Covid-20 Pandemie',
    description:
      'Die Weiterentwicklung des Covid-19 betrifft uns alle; mit diesen Worten verkündet das WHO Covid-20, die neue Pandemie für das neue Jahr.',
    modifiers: {
      [ASSETS.IMMO]: 0.95,
      [ASSETS.SHARES]: 0.5,
      [ASSETS.COMMODITIES]: 0.8,
    },
  },
];
