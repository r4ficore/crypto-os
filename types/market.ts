export type MarketSnapshot = {
  globalCapUsd: number | null;
  btcDominance: number | null;
  fearGreedIndex?: number | null;
  capChange24h?: number | null;
  fetchedAt: string;
  source: 'coingecko' | 'fallback';
};

export type MarketMoodLabel = 'byczy' | 'neutralny' | 'niedźwiedzi';

export type MarketMood = {
  label: MarketMoodLabel;
  note: string;
  rationale: string[];
};
