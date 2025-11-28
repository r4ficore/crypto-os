export interface NftCategory {
  name: string;
  network: string;
  type: 'PFP' | 'Utility' | 'Gaming' | 'Creator' | 'Social Token';
  whatToCheck: string[];
  risks: string[];
}
