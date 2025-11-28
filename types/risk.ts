export type Exposure = {
  name: string;
  amount: number;
};

export type RiskInput = {
  totalCapital: number;
  cryptoTotal: number;
  stableValue: number;
  exposures: Exposure[];
};

export type RiskAlert = {
  level: 'info' | 'warning' | 'critical';
  message: string;
};
