import { PortfolioRecommendation, PortfolioStyle } from '@/types/portfolio';

const mixes: Record<PortfolioStyle, PortfolioRecommendation> = {
  defensive: {
    style: 'defensive',
    horizon: '12-24 miesięcy',
    riskTolerance: 'Niska / ochrona kapitału',
    buckets: [
      { label: 'BTC / ETH', percentage: 55, description: 'Największe, płynne aktywa – fundament rynku.' },
      { label: 'Large caps', percentage: 20, description: 'Top projekty infrastrukturalne / L1 / L2.' },
      { label: 'Stablecoiny', percentage: 20, description: 'Poduszka płynności + możliwość reakcji.' },
      { label: 'Eksperymenty', percentage: 5, description: 'Mała ekspozycja edukacyjna na nowe narracje.' }
    ],
    notes: [
      'Edukacyjny profil defensywny – redukcja zmienności.',
      'Celem jest obserwacja rynku i reagowanie bez presji FOMO.',
      'Brak konkretnych tickerów – tylko koszyki procentowe (DYOR).'
    ]
  },
  balanced: {
    style: 'balanced',
    horizon: '9-18 miesięcy',
    riskTolerance: 'Średnia',
    buckets: [
      { label: 'BTC / ETH', percentage: 45, description: 'Trzon portfela dla stabilności.' },
      { label: 'Large caps', percentage: 25, description: 'Infrastruktura, L1/L2, wybrane blue-chip DeFi.' },
      { label: 'Stablecoiny', percentage: 15, description: 'Rezerwa na korekty / okazje.' },
      { label: 'Narracje wzrostowe', percentage: 10, description: 'Projekty z wybranych narracji (AI, DePIN, RWA).' },
      { label: 'Eksperymenty', percentage: 5, description: 'Małe pozycje edukacyjne / uczenie się rynku.' }
    ],
    notes: [
      'Portfel zrównoważony – łączy stabilność z ekspozycją na nowe narracje.',
      'Zachowuj własne limity ryzyka na pojedynczy projekt.',
      'Żadna część nie jest rekomendacją zakupu – to ramy edukacyjne.'
    ]
  },
  aggressive: {
    style: 'aggressive',
    horizon: '6-12 miesięcy',
    riskTolerance: 'Wyższa / świadoma zmienność',
    buckets: [
      { label: 'BTC / ETH', percentage: 30, description: 'Minimalna kotwica w aktywach o największej kapitalizacji.' },
      { label: 'Large / mid caps', percentage: 25, description: 'Silniejsze projekty z płynnością, ale wyższa beta.' },
      { label: 'Stablecoiny', percentage: 10, description: 'Poduszka na rynek w dół, możliwość szybkiej reakcji.' },
      { label: 'Narracje wzrostowe', percentage: 20, description: 'Wybrane narracje z Researchu (AI, Infra, L2, RWA).' },
      { label: 'Eksperymenty / moonshot', percentage: 15, description: 'Małe pozycje na wczesnym etapie – tylko edukacyjnie.' }
    ],
    notes: [
      'Profil agresywny = większa zmienność i ryzyko obsunięć.',
      'Pamiętaj o limicie na pojedynczą pozycję i płynność wyjścia.',
      'Scenariusze są edukacyjne – wykonaj własny research (DYOR).'
    ]
  }
};

export function getPortfolioMix(style: PortfolioStyle): PortfolioRecommendation {
  return mixes[style];
}
