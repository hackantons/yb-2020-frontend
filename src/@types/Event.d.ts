import { AssetD } from './Assets';

export interface EventD {
  title: string;
  description: string;
  resolution: {
    description: string;
    modifiers: Record<
      AssetD,
      {
        reason: string;
        multiplier: number;
      }
    >;
  };
  alterative?: {
    probability: number;
    description: string;
    modifiers: Record<
      AssetD,
      {
        reason: string;
        multiplier: number;
      }
    >;
  };
}
