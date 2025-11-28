import { DefiProtocol } from '@/types/defi';

export const defiProtocols: DefiProtocol[] = [
  {
    name: 'Uniswap v3',
    network: 'Ethereum',
    type: 'DEX',
    useCase: 'Swapy spot + LP concentrated liquidity',
    risks: ['Impermanent loss', 'MEV / sandwich', 'Koszty gazu'],
    links: { website: 'https://app.uniswap.org', docs: 'https://docs.uniswap.org' }
  },
  {
    name: 'Aave v3',
    network: 'Ethereum / L2',
    type: 'Lending',
    useCase: 'Pożyczki zabezpieczone, stable i blue-chips',
    risks: ['Ryzyko smart contract', 'Likwidacje przy spadkach', 'Ryzyko stopy procentowej'],
    links: { website: 'https://app.aave.com', docs: 'https://docs.aave.com' }
  },
  {
    name: 'GMX v2',
    network: 'Arbitrum',
    type: 'Derivatives',
    useCase: 'Perpy na główne pary + płynność GLP',
    risks: ['Dźwignia i funding', 'Ryzyko oracle', 'Volatility risk dla dostawców płynności']
  },
  {
    name: 'Jupiter',
    network: 'Solana',
    type: 'DEX',
    useCase: 'Agregator swapów + DCA / limit order',
    risks: ['Ryzyko smart contract', 'Potencjalne slippage', 'Ryzyko mostów przy cross-chain'],
    links: { website: 'https://jup.ag' }
  },
  {
    name: 'Lido',
    network: 'Ethereum',
    type: 'Liquid Staking',
    useCase: 'Staking ETH → stETH z płynnością',
    risks: ['Ryzyko kontraktów', 'Ryzyko stETH depeg', 'Koncentracja dostawców'],
    links: { website: 'https://lido.fi' }
  },
  {
    name: 'Pendle',
    network: 'Ethereum / L2',
    type: 'Yield',
    useCase: 'Handel stopami procentowymi, tokenizacja yield',
    risks: ['Płynność na rynku stóp', 'Złożoność produktu', 'Zależność od bazowych yieldów']
  },
  {
    name: 'Curve',
    network: 'Ethereum',
    type: 'Stablecoin',
    useCase: 'AMM dla stabilnych par + boost z veCRV',
    risks: ['Ryzyko smart contract', 'Ryzyka governance/veCRV', 'Ataki na stablecoiny w pulach']
  }
];
