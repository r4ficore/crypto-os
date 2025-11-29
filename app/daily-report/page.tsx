'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DailyAiReport, TokenFinding } from '@/types/reports';

export default function DailyReportPage() {
  const [report, setReport] = useState<DailyAiReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/daily-report');
      if (!res.ok) throw new Error('Nie udało się pobrać raportu.');
      const data = await res.json();
      setReport(data.report);
    } catch (err) {
      setError('Brak połączenia z raportem AI. Wyświetlamy dane edukacyjne/mocked.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch('/api/daily-report', { method: 'POST' });
      if (!res.ok) throw new Error('Błąd generowania raportu AI.');
      const data = await res.json();
      setReport(data.report);
    } catch (err) {
      setError('Nie udało się wygenerować nowego raportu. Pokazujemy wersję edukacyjną.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const tokens: TokenFinding[] = report?.topTokens || [];

  return (
    <div className="flex flex-col gap-5">
      <div className="card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Raport AI 7:00</p>
            <h1 className="text-2xl font-semibold">Automatyczne predykcje (deep research)</h1>
            <p className="text-sm text-slate-300 mt-1">
              Codzienny raport z ukrytego promptu multi-source + filtry FAKE_VOLUME/Benford. Materiał edukacyjny – brak rekomendacji inwestycyjnych.
            </p>
          </div>
          <div className="card-ghost w-full md:w-72">
            <p className="text-xs text-slate-400">Status</p>
            <p className="text-sm text-slate-100">{loading ? 'Ładowanie danych...' : 'Ostatni raport: ' + (report?.generatedAt ? new Date(report.generatedAt).toLocaleString() : 'brak')}</p>
            <p className="text-[11px] text-yellow-200 mt-1">Zawsze DYOR. Tokeny z flagą FAKE_VOLUME są odrzucane.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={refresh} className="btn-primary" disabled={refreshing}>
            {refreshing ? 'Generowanie...' : 'Odśwież raport (API/OpenAI)'}
          </button>
          <Link href="/" className="btn-secondary text-sm">Wróć do kokpitu</Link>
          <span className="pill">Okno: {report?.asOfRange || 'Ostatnie 48h'}</span>
          <span className="pill pill-ghost">Edukacja, brak rekomendacji</span>
        </div>
        {error && <p className="text-sm text-yellow-200 mt-3">{error}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top 5 tokenów (po filtrach wolumenowych)</h2>
            <p className="text-[11px] text-yellow-200">FAKE_VOLUME/Benford = wykluczenie z shortlisty</p>
          </div>
          {loading && <p className="text-sm text-slate-400 mt-2">Ładuję dane...</p>}
          {!loading && (
            <div className="overflow-x-auto mt-3">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="py-2 pr-3">Token</th>
                    <th className="py-2 pr-3">Zmiana</th>
                    <th className="py-2 pr-3">Cena</th>
                    <th className="py-2 pr-3">Wolumen</th>
                    <th className="py-2 pr-3">LP</th>
                    <th className="py-2 pr-3">Status/ryzyko</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {tokens.map((t) => (
                    <tr key={t.symbol} className="align-middle">
                      <td className="py-2 pr-3">
                        <div className="flex flex-col">
                          <span className="font-semibold">{t.name}</span>
                          <span className="text-xs text-slate-400">{t.symbol}</span>
                          {t.link && (
                            <a href={t.link} target="_blank" rel="noreferrer" className="text-[11px] text-brand-primary">
                              Link / źródło
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-2 pr-3">{t.priceChangePct?.toFixed(1)}%</td>
                      <td className="py-2 pr-3">${t.price?.toFixed(2)}</td>
                      <td className="py-2 pr-3">${Math.round(t.volumeUsd || 0).toLocaleString('en-US')}</td>
                      <td className="py-2 pr-3">${Math.round(t.liquidityUsd || 0).toLocaleString('en-US')}</td>
                      <td className="py-2 pr-3">
                        <div className="flex flex-col gap-1">
                          <span className="pill text-[11px] w-fit">{t.recommendationLabel || '✅ Obserwuj'}</span>
                          {t.fakeVolumeFlags?.length ? (
                            <span className="pill pill-ghost text-[11px] text-yellow-200">{t.fakeVolumeFlags.join(', ')}</span>
                          ) : null}
                          {t.newsStatus && <p className="text-[11px] text-slate-400">{t.newsStatus}</p>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card h-full">
          <h3 className="text-lg font-semibold">Top 48 h Opportunity</h3>
          <p className="text-sm text-slate-300 mt-1">Scenariusz edukacyjny – weryfikuj samodzielnie (DYOR).</p>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <p className="font-semibold">{report?.topOpportunity?.thesis || 'Czekam na dane...'}</p>
            <div>
              <p className="text-xs text-slate-400 uppercase">Triggery</p>
              <ul className="list-disc list-inside space-y-1">
                {report?.topOpportunity?.triggers?.map((t) => (
                  <li key={t}>{t}</li>
                )) || <li>Brak danych</li>}
              </ul>
            </div>
            <p className="text-xs text-slate-400">Narracja: {report?.topOpportunity?.narrativeAlignment || '—'}</p>
            <p className="text-xs text-yellow-200">{report?.topOpportunity?.caution || 'Materiał edukacyjny. Brak rekomendacji.'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-semibold">Narracje do obserwacji</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {report?.narrativesToWatch?.map((n) => (
              <li key={n} className="pill inline-flex">{n}</li>
            )) || <li>Brak danych</li>}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Notatki o ryzyku</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {report?.riskNotes?.map((n) => (
              <li key={n} className="pill pill-ghost inline-flex">{n}</li>
            )) || <li>Brak danych</li>}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Metodologia</h3>
          <p className="text-sm text-slate-300 mt-2">
            {report?.methodologyNote ||
              'Raport tworzony z ukrytego promptu deep research (news/social/on-chain) i filtrów jakości wolumenu. Charakter wyłącznie edukacyjny.'}
          </p>
          <p className="text-[11px] text-yellow-200 mt-2">Tokeny z FAKE_VOLUME lub FAKE_VOLUME_BENFORD nie pojawiają się w Top 5.</p>
        </div>
      </div>
    </div>
  );
}
