export type PortfolioStyle = 'defensive' | 'balanced' | 'aggressive';

export type PortfolioBucket = {
  label: string;
  percentage: number;
  description: string;
};

export type PortfolioRecommendation = {
  style: PortfolioStyle;
  horizon: string;
  riskTolerance: string;
  buckets: PortfolioBucket[];
  notes: string[];
};
