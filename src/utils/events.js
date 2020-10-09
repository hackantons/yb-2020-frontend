import { ASSETS } from '@utils/constants';

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
