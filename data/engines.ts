export type EngineId =
  | 'dashboard'
  | 'market-intelligence'
  | 'narrative-scanner'
  | 'token-analyzer'
  | 'portfolio-architect'
  | 'risk-master'
  | 'on-chain-detective'
  | 'defi-navigator'
  | 'nft-lens'
  | 'ai-scenarios';

export type EngineInfo = {
  id: EngineId;
  name: string;
  description: string;
};

export const engines: EngineInfo[] = [
  {
    id: 'dashboard',
    name: 'Kokpit',
    description: 'Widok ogólny z metrykami rynku i skrótami do silników.'
  },
  {
    id: 'market-intelligence',
    name: 'Market Intelligence Engine',
    description: 'Szybkie metryki rynku i heurystyczny sentyment (edukacyjny).'
  },
  {
    id: 'narrative-scanner',
    name: 'Narrative Scanner',
    description: 'Przegląd głównych narracji i trendów (statusy edukacyjne).'
  },
  {
    id: 'token-analyzer',
    name: 'Token Analyzer Pro',
    description: 'Checklisty tokenomics i ryzyk (bez rekomendacji).'
  },
  {
    id: 'portfolio-architect',
    name: 'Portfolio Architect',
    description: 'Edukacyjne koszyki portfela dla różnych profili ryzyka.'
  },
  {
    id: 'risk-master',
    name: 'Risk Master Engine',
    description: 'Alerty ryzyk w oparciu o podział środków (język edukacyjny).'
  },
  {
    id: 'on-chain-detective',
    name: 'On-Chain Detective',
    description: 'Adresy do obserwacji i placeholder ruchów on-chain.'
  },
  {
    id: 'defi-navigator',
    name: 'DeFi Navigator',
    description: 'Katalog wybranych protokołów i powiązanych ryzyk.'
  },
  {
    id: 'nft-lens',
    name: 'NFT & Social Token Lens',
    description: 'Na co patrzeć przed wejściem w NFT lub social tokens.'
  },
  {
    id: 'ai-scenarios',
    name: 'AI-Driven Market Scenarios',
    description: 'Scenariusze edukacyjne generowane przez AI (bez rekomendacji).'
  }
];
