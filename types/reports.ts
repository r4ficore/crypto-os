export type FounderEntry = {
  id: string;
  timestamp: string; // ISO
  title: string;
  narrative: string;
  tags: string[];
  scenario: string;
  riskNotes?: string;
  confidence?: 'niskie' | 'średnie' | 'wysokie';
};

export type WeeklySummary = {
  weekRange: string;
  narrativeShifts: string[];
  highlightedScenarios: string[];
  riskReminders: string[];
  watchNextWeek: string[];
  methodologyNote: string;
};

export type DailyAiReport = {
  generatedAt: string;
  asOfRange: string;
  topTokens: TokenFinding[];
  topOpportunity?: TokenOpportunity;
  riskNotes: string[];
  narrativesToWatch: string[];
  methodologyNote: string;
};

export type TokenFinding = {
  name: string;
  symbol: string;
  priceChangePct: number;
  price: number;
  volumeUsd: number;
  liquidityUsd: number;
  link?: string;
  newsStatus?: string;
  riskScore?: number;
  recommendationLabel?: '✅ Obserwuj' | '🚀 Scenariusz edukacyjny' | '⚠️ Ignoruj';
  fakeVolumeFlags?: string[];
};

export type TokenOpportunity = {
  title: string;
  thesis: string;
  triggers: string[];
  narrativeAlignment: string;
  caution: string;
};
