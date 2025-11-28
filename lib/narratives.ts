import { NarrativeItem } from '@/types/narrative';

export const mockNarratives: NarrativeItem[] = [
  {
    name: 'AI & DePIN',
    status: 'rising',
    notes: 'Rośnie liczba integracji AI + infrastruktura fizyczna; wysoki szum medialny.',
    watchFactors: ['Nowe partnerstwa sprzętowe', 'Wzrost liczby aktywnych użytkowników', 'Finansowania venture']
  },
  {
    name: 'Layer 2 (scaling)',
    status: 'stable',
    notes: 'Stały napływ użytkowników, opłaty niższe niż L1; adopcja w DeFi i gaming.',
    watchFactors: ['TVL w głównych L2', 'Spadki kosztów gazu', 'Nowe mosty cross-chain']
  },
  {
    name: 'RWA & tokenizacja',
    status: 'rising',
    notes: 'Regulacyjne sandboxy i pilotaże; wzmożone publikacje raportów branżowych.',
    watchFactors: ['Nowe emisje zabezpieczone aktywami', 'Partnerstwa instytucjonalne', 'Aktywność legislacyjna']
  },
  {
    name: 'Gaming / Metaverse',
    status: 'cooling',
    notes: 'Mniejsza liczba premier; uwagę przejmują narracje AI i DePIN.',
    watchFactors: ['Liczba DAU/MAU', 'Nowe wydania gier', 'Aktywność streamerów']
  },
  {
    name: 'Privacy & ZK',
    status: 'stable',
    notes: 'Stały rozwój technologiczny; adopcja zależy od UX i regulacji.',
    watchFactors: ['Deploymenty ZK-Rollupów', 'Zmiany regulacyjne dot. prywatności', 'Audytowane biblioteki ZK']
  },
  {
    name: 'Meme / Social tokens',
    status: 'cooling',
    notes: 'Zmniejszona płynność w memecoinach; hype przenosi się na utility / infra.',
    watchFactors: ['Wolumeny DEX/CEX', 'Trend w social media', 'Udział nowych portfeli']
  }
];

export function getNarratives() {
  return mockNarratives;
}

// Helper do formularzy – zwraca listę nazw narracji.
export function narrativesForSelect() {
  return mockNarratives.map((item) => item.name);
}

// Hook na przyszłość: integracja ze źródłami news/social, np. API lub webhooks.
export async function updateNarrativesFromSources() {
  // TODO: podłączyć automatyczny import narracji po dodaniu źródeł.
  return mockNarratives;
}
