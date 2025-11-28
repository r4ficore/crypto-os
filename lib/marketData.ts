import { MarketMood, MarketSnapshot } from '@/types/market';

const COINGECKO_GLOBAL_URL = 'https://api.coingecko.com/api/v3/global';
const FEAR_GREED_URL = 'https://api.alternative.me/fng/';

async function fetchCoingeckoSnapshot() {
  const response = await fetch(COINGECKO_GLOBAL_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Coingecko unavailable');
  const payload = (await response.json()) as any;
  const data = payload?.data;
  return {
    globalCapUsd: typeof data?.total_market_cap?.usd === 'number' ? data.total_market_cap.usd : null,
    btcDominance: typeof data?.market_cap_percentage?.btc === 'number' ? data.market_cap_percentage.btc : null,
    capChange24h:
      typeof data?.market_cap_change_percentage_24h_usd === 'number'
        ? data.market_cap_change_percentage_24h_usd
        : null
  };
}

async function fetchFearGreed() {
  const response = await fetch(FEAR_GREED_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Fear & Greed unavailable');
  const payload = (await response.json()) as any;
  const first = payload?.data?.[0];
  const value = typeof first?.value === 'string' ? Number(first.value) : null;
  return { fearGreedIndex: Number.isFinite(value) ? value : null };
}

export async function fetchMarketSnapshot(): Promise<{ snapshot: MarketSnapshot; error?: string }> {
  try {
    const [cgResult, fngResult] = await Promise.allSettled([fetchCoingeckoSnapshot(), fetchFearGreed()]);
    const globalCapUsd = cgResult.status === 'fulfilled' ? cgResult.value.globalCapUsd : null;
    const btcDominance = cgResult.status === 'fulfilled' ? cgResult.value.btcDominance : null;
    const capChange24h = cgResult.status === 'fulfilled' ? cgResult.value.capChange24h : null;
    const fearGreedIndex = fngResult.status === 'fulfilled' ? fngResult.value.fearGreedIndex : null;

    const snapshot: MarketSnapshot = {
      globalCapUsd,
      btcDominance,
      capChange24h,
      fearGreedIndex,
      fetchedAt: new Date().toISOString(),
      source: globalCapUsd || btcDominance ? 'coingecko' : 'fallback'
    };

    const errorMessages = [] as string[];
    if (cgResult.status === 'rejected') errorMessages.push('Metryki globalne chwilowo niedostępne (Coingecko).');
    if (fngResult.status === 'rejected') errorMessages.push('Indeks Fear & Greed chwilowo niedostępny.');

    return { snapshot, error: errorMessages.length ? errorMessages.join(' ') : undefined };
  } catch (error) {
    const snapshot: MarketSnapshot = {
      globalCapUsd: null,
      btcDominance: null,
      capChange24h: null,
      fearGreedIndex: null,
      fetchedAt: new Date().toISOString(),
      source: 'fallback'
    };
    return {
      snapshot,
      error:
        'Dane rynkowe są chwilowo niedostępne. Traktuj ten moduł wyłącznie edukacyjnie i zweryfikuj w zewnętrznych źródłach (DYOR).'
    };
  }
}

export function deriveMarketMood(snapshot: MarketSnapshot): MarketMood {
  const btc = snapshot.btcDominance ?? 50;
  const capChange = snapshot.capChange24h ?? 0;
  const fear = snapshot.fearGreedIndex ?? 50;

  let score = 0;
  const rationale: string[] = [];

  if (capChange > 1.5) {
    score += 1;
    rationale.push('Globalna kapitalizacja rośnie >1.5% (krótkoterminowy plus).');
  } else if (capChange < -1.5) {
    score -= 1;
    rationale.push('Globalna kapitalizacja spada < -1.5% (ostrożność).');
  } else {
    rationale.push('Zmiana kapitalizacji blisko neutralnej, brak silnego impulsu.');
  }

  if (btc < 48 && capChange > 0) {
    score += 1;
    rationale.push('Dominacja BTC niższa, kapitał może płynąć do altów (edukacyjnie).');
  } else if (btc > 52 && capChange < 0) {
    score -= 1;
    rationale.push('Wyższa dominacja BTC przy spadkach – defensywny układ.');
  } else {
    rationale.push('Dominacja BTC w strefie równowagi.');
  }

  if (fear >= 60) {
    score += 1;
    rationale.push('Indeks Fear & Greed wskazuje na apetyt na ryzyko.');
  } else if (fear <= 30) {
    score -= 1;
    rationale.push('Niska wartość Fear & Greed – sentyment ostrożny.');
  } else {
    rationale.push('Fear & Greed neutralny – brak jednoznacznego sygnału.');
  }

  let label: MarketMood['label'] = 'neutralny';
  if (score >= 2) label = 'byczy';
  if (score <= -2) label = 'niedźwiedzi';

  const note =
    'Heurystyczna ocena rynku – ma charakter edukacyjny i nie stanowi rekomendacji inwestycyjnej. Zawsze wykonaj własny research (DYOR).';

  return { label, note, rationale };
}

export function formatCurrency(value: number | null): string {
  if (value === null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2, style: 'currency', currency: 'USD' }).format(value);
}

export function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) return '—';
  return `${value.toFixed(2)}%`;
}
