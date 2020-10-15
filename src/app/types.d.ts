export type AssetD = string;

export type PortfolioD = Record<AssetD, number>;

interface ModifierD {
  reason: string;
  multiplier: number;
}

export interface EventD {
  title: string;
  description: string;
  resolution: {
    description: string;
    modifiers: Record<AssetD, ModifierD>;
  };
  alterative?: {
    probability: number;
    description: string;
    modifiers: Record<AssetD, ModifierD>;
  };
}

export interface EventOutcome {
  expected: boolean;
  description: string;
  modifiers: Record<AssetD, ModifierD>;
  isLastEvent: boolean;
}
