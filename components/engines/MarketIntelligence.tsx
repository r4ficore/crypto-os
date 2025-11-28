'use client';

import { useEffect, useState } from 'react';
import { deriveMarketMood, fetchMarketSnapshot, formatCurrency, formatPercent } from '@/lib/marketData';
import { MarketMood, MarketSnapshot } from '@/types/market';

export default function MarketIntelligencePanel() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [mood, setMood] = useState<MarketMood | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const { snapshot, error } = await fetchMarketSnapshot();
      if (!mounted) return;
      setSnapshot(snapshot);
      setMood(deriveMarketMood(snapshot));
      setError(error);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Market Intelligence</p>
            <h2 className="text-lg font-semibold">Szybkie metryki + heurystyka</h2>
          </div>
          <p className="text-xs text-yellow-200">Tryb edukacyjny – brak rekomendacji inwestycyjnych</p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 mt-4">Ładowanie danych rynkowych...</p>
        ) : (
          <div className="grid gap-3 mt-4 md:grid-cols-4">
            <Metric label="Global cap" value={formatCurrency(snapshot?.globalCapUsd ?? null)} tooltip="Orientacyjna kapitalizacja rynku. Zawsze weryfikuj w zewnętrznych źródłach." />
            <Metric label="Dominacja BTC" value={formatPercent(snapshot?.btcDominance ?? null)} tooltip="Wyższa dominacja oznacza defensywny rynek; niższa – większy udział altów." />
            <Metric label="Fear & Greed" value={snapshot?.fearGreedIndex ? snapshot.fearGreedIndex.toString() : '—'} tooltip="Indeks sentymentu – informacyjny, nie przesądza o kierunku rynku." />
            <Metric label="Zmiana global cap 24h" value={formatPercent(snapshot?.capChange24h ?? null)} tooltip="Dynamika 24h globalnej kapitalizacji." />
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-xs text-amber-100">
            {error}
          </div>
        )}

        {mood && (
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-400">Heurystyczna ocena rynku</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-semibold capitalize">{mood.label}</span>
              <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Scenariusz edukacyjny</span>
            </div>
            <ul className="mt-3 text-sm text-slate-300 space-y-1 list-disc list-inside">
              {mood.rationale.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-3">{mood.note}</p>
          </div>
        )}
      </div>

      <div className="card bg-slate-900/60 border-dashed border-slate-700">
        <h3 className="font-semibold text-sm">Szybkie scenariusze (edukacyjne)</h3>
        <ul className="mt-2 text-sm text-slate-300 space-y-1 list-disc list-inside">
          <li>Jeśli dominacja BTC spada przy rosnącej kapitalizacji, altcoiny mogą zyskiwać względnie szybciej (EDU – nie rekomendacja).</li>
          <li>Przy defensywnym sentymencie (wysoka dominacja + niski Fear & Greed) rynek preferuje płynność w głównych aktywach.</li>
          <li>Neutralne odczyty sugerują obserwację narracji i wolumenów zamiast pochopnych decyzji (DYOR).</li>
        </ul>
      </div>
    </div>
  );
}

function Metric({ label, value, tooltip }: { label: string; value: string; tooltip: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-[11px] text-slate-500 mt-1">{tooltip}</p>
    </div>
  );
}
