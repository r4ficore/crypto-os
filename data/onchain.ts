import { OnChainSignal, WatchAddress, WhaleMove } from '@/types/onchain';

export const starterWatchlist: WatchAddress[] = [
  {
    label: 'ETH multisig research',
    address: '0x9f...a12b',
    network: 'Ethereum',
    note: 'Duże wejścia w L2 / rollups'
  },
  {
    label: 'Solana ecosystem fund',
    address: 'So1...fund',
    network: 'Solana',
    note: 'Monitorowanie ruchów do DePIN/gaming'
  }
];

export const whaleMoves: WhaleMove[] = [
  {
    label: 'Whale swap to stETH',
    network: 'Ethereum',
    summary: 'Duża konwersja ETH → stETH na Lido (sygnał rotacji do LSD).',
    impact: 'Możliwy popyt na LSD + staking yields',
    timestamp: '2024-06-01T08:30:00Z'
  },
  {
    label: 'SOL → USDC hedging',
    network: 'Solana',
    summary: 'Ruch do stable po gwałtownym wzroście SOL – realizacja zysków.',
    impact: 'Krótki oddech w narracjach SOL / DePIN',
    timestamp: '2024-06-01T09:10:00Z'
  }
];

export const onChainSignals: OnChainSignal[] = [
  {
    title: 'Placeholder: whale moves API',
    description:
      'Hook na integrację z publicznymi feedami (Whale Alert / Dune). Obecnie statyczne dane edukacyjne.',
    status: 'placeholder'
  },
  {
    title: 'Adresy obserwacyjne',
    description:
      'Możesz dodawać własne adresy z tagiem i notatką. Dane są lokalne i mają charakter informacyjny.',
    status: 'info'
  }
];
