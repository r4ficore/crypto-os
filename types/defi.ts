export type ProtocolType = 'DEX' | 'Lending' | 'Yield' | 'Liquid Staking' | 'Derivatives' | 'Stablecoin';

export interface DefiProtocol {
  name: string;
  network: string;
  type: ProtocolType;
  useCase: string;
  risks: string[];
  links?: { website?: string; docs?: string };
}
