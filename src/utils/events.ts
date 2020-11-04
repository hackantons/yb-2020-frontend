import { EventD } from '@app/types';

export const INIT_EVENT = {
  title: 'BEKB Investment Simulator',
  description:
    'Passe dein Portfolio geschickt auf reale Ereignisse an.\n\nSwipe jetzt auf den Icons um dein Startvermögen auf Immobilien, Aktien und Güter zu verteilen.',
  modifiers: {},
};

export const EVENTS: EventD[] = [
  {
    title: 'YB Meister',
    description:
      'Wird YB es nochmals schaffen? YB muss sich nur noch im Spiel gegen Basel beweisen und dann haben sie den Titel!',
    resolution: {
      description: 'ist doch klar, oder?',
      modifiers: {
        'real-estate': {
          reason:
            'Die Stadt Bern ist im Aufschwung. Reihenweise ziehen Fans in die Stadt und lassen die Mieten steigen.',
          multiplier: 1.4,
        },
        shares: {
          reason:
            'Die Börse reagiert mit einem deutlichen Plus auf den Sieg des BSCYBs. Endlich scheint die Vorherrschaft des FC Basels gebrochen.',
          multiplier: 1.2,
        },
        commodities: {
          reason: '',
          multiplier: 1,
        },
      },
    },
    alterative: {
      probability: 50,
      description: 'Leider kommt es nicht immer, wie man denkt',
      modifiers: {
        'real-estate': {
          reason:
            'Leider doch kein Kaufrausch in den Berner Innenstädten. Enttäuschte Grossinvestoren ziahen sich aus den Innenstädten zurück.',
          multiplier: 0.8,
        },
        shares: {
          reason:
            'Diverse Anleger haben auf eine Wachablösung an der Spitze des Schweizer Fussballs gehofft. Die Enttäuschung sieht man deutlich in den Zahlen.',
          multiplier: 0.8,
        },
        commodities: {
          reason: '',
          multiplier: 1,
        },
      },
    },
  },
  {
    title: 'Schnee-Rekord',
    description:
      'Schnee Rekord in Bern! Bis am Sonntagmorgen fallen in der Stadt 250 Zentimeter Neuschnee. Es ist mit enormen Ausfällen jeglichen Verkehrs zu rechnen.',
    resolution: {
      description:
        'Schnee bis ins Flachland. Die Kinder freuts, die Immobilienbesizer blicken mit Sorge in den Frühling.',
      modifiers: {
        'real-estate': {
          reason:
            'Die für den Frühling erwarteten Hochwasser bereiten der Immobilienbranche grosse Sorge',
          multiplier: 0.8,
        },
        shares: {
          reason:
            'Wenn das Geld aus den Immobilien genommen wird, fliesst es in Aktion. Ein kleines Plus',
          multiplier: 1.05,
        },
        commodities: {
          reason: '',
          multiplier: 0,
        },
      },
    },
  },
  {
    title: 'Bürgerkrieg im Kongo',
    description:
      'Kongo steht kurz vor einem Bürgerkrieg. Die NATO versucht zu vermitteln, aber die Chancen stehen schlecht.',
    resolution: {
      description:
        'Im Kongo ist Bürgerkrieg ausgebrochen, dies verzögert auch die Auslieferung der neuen Macbooks welche diverse Rohmateralien aus dem Kongo benötigen.',
      modifiers: {
        'real-estate': {
          reason: '',
          multiplier: 1.1,
        },
        shares: {
          reason:
            'Diverse Unternehmen leiden unter den Auswirkungen des Bürgerkrieges',
          multiplier: 0.9,
        },
        commodities: {
          reason: 'Rohstoffe werden plötzlich enorm begehrt und dadurch teuer.',
          multiplier: 1.4,
        },
      },
    },
    alterative: {
      probability: 20,
      description: 'Die NATO konnte erfolgreich vermitteln.',
      modifiers: {
        'real-estate': {
          reason: '',
          multiplier: 1.1,
        },
        shares: {
          reason: 'Die Börse kann aufatmen',
          multiplier: 1.3,
        },
        commodities: {
          reason: '',
          multiplier: 0.9,
        },
      },
    },
  },
];

/*
const = eOld = {
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
    unexpectedOutcome: {
      propability: 100,
      title: 'Impfung gegen COVID-20 gefunden',
      description:
        'Gegen jede Erwartung haben Forscher in Basel eine Impfung gegen das neuartige COVID-20 gefunden. Eine zweite Pandemie konnte damit abgewendet werden.',
      modifiers: {
        [ASSETS.IMMO]: 0.1,
        [ASSETS.SHARES]: 0.1,
        [ASSETS.COMMODITIES]: 0.1,
      },
    }*/
