export interface WatchAddress {
  label: string;
  address: string;
  network: string;
  note?: string;
}

export interface WhaleMove {
  label: string;
  network: string;
  summary: string;
  impact?: string;
  timestamp: string;
}

export interface OnChainSignal {
  title: string;
  description: string;
  status: 'placeholder' | 'info';
}
