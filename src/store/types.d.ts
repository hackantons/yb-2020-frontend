import { AssetD, EventD } from '@app/types';

export interface State {
  events: EventD[];
  eventIndex: number;
  portfolio: Array<{
    asset: AssetD;
    value: number;
  }>;
  offline: boolean;
}

export interface Actions {}
