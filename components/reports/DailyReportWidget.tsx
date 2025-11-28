'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DailyAiReport } from '@/types/reports';

export function DailyReportWidget() {
  const [report, setReport] = useState<DailyAiReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/daily-report');
        const data = await res.json();
        setReport(data.report);
      } catch (e) {
        setReport(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const top = report?.topTokens?.[0];

  return (
    <div className="card h-full">
      <p className="text-sm text-slate-400">Raport AI 7:00</p>
      <p className="text-lg font-semibold mt-1">{loading ? 'Ładowanie...' : 'Gotowy podgląd edukacyjny'}</p>
      <p className="text-xs text-slate-400 mt-1">Automatyczny raport deep-research + filtry FAKE_VOLUME/Benford. Materiał edukacyjny.</p>
      {top && (
        <div className="mt-3">
          <p className="text-sm text-slate-200">Top sygnał: {top.name} ({top.symbol})</p>
          <p className="text-xs text-slate-400">Zmiana: {top.priceChangePct?.toFixed(1)}% · Wolumen: ${Math.round(top.volumeUsd || 0).toLocaleString('en-US')}</p>
          {top.fakeVolumeFlags?.length ? (
            <p className="text-[11px] text-yellow-200 mt-1">Flagowane: {top.fakeVolumeFlags.join(', ')}</p>
          ) : (
            <p className="text-[11px] text-emerald-200 mt-1">Brak flag wolumenowych</p>
          )}
        </div>
      )}
      <Link href="/daily-report" className="btn-primary mt-4 inline-flex justify-center">Otwórz pełny raport</Link>
    </div>
  );
}
