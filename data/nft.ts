import { NftCategory } from '@/types/nft';

export const nftCategories: NftCategory[] = [
  {
    name: 'Blue-chip PFP',
    network: 'Ethereum',
    type: 'PFP',
    whatToCheck: ['Aktywność zespołu', 'Plan na util / wydarzenia', 'Historia floor price'],
    risks: ['Spadek narracji', 'Ryzyko IP / marki', 'Niska płynność na rynku wtórnym']
  },
  {
    name: 'Gaming assets',
    network: 'Multichain',
    type: 'Gaming',
    whatToCheck: ['Realny player base', 'Monetyzacja', 'Balans ekonomii gry'],
    risks: ['Pompowane DAU', 'Brak adopcji', 'Szybkie starzenie się tytułów']
  },
  {
    name: 'Utility / membership',
    network: 'Ethereum / L2',
    type: 'Utility',
    whatToCheck: ['Jaką funkcję pełni NFT', 'Czy utility jest on-chain', 'Dostępność alternatyw'],
    risks: ['Utility off-chain', 'Brak roadmapy', 'Zależność od pojedynczego podmiotu']
  },
  {
    name: 'Creator tokens',
    network: 'Solana',
    type: 'Creator',
    whatToCheck: ['Stabilność przychodów twórcy', 'Relacja z community', 'Transparentność rozliczeń'],
    risks: ['Ryzyko reputacyjne', 'Mała płynność', 'Brak kontroli nad podażą']
  },
  {
    name: 'Social tokens',
    network: 'Base',
    type: 'Social Token',
    whatToCheck: ['Mechanika utility', 'Zgodność prawna', 'Czy jest treasury / DAO'],
    risks: ['Regulacje', 'Centralizacja emisji', 'Ryzyko płynności']
  }
];
