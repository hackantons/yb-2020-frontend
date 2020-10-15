import { EventD, EventOutcome } from '@app/types';

export interface State {
  activeScreen: string;
  events: EventD[];
  eventIndex: number;
  eventOutcome: EventOutcome;
  portfolio: Array<{
    key: string;
    value: number;
  }>;
  accountBalance: number;
  offline: boolean;
}

export interface Actions {}
