"use client";

import { useEffect, useState } from 'react';
import { loadFounderEntries } from '@/lib/founderRadar';
import { composeWeeklySummary } from '@/lib/weeklySummary';
import { getNarratives } from '@/lib/narratives';
import { WeeklySummary as WeeklySummaryType } from '@/types/reports';

export default function WeeklySummaryPage() {
  const [summary, setSummary] = useState<WeeklySummaryType | null>(null);

  const regenerate = () => {
    const entries = loadFounderEntries();
    const narratives = getNarratives();
    const generated = composeWeeklySummary(entries, narratives);
    setSummary(generated);
  };

  useEffect(() => {
    regenerate();
  }, []);

  if (!summary) return null;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Weekly Summary</h1>
        <p className="text-slate-400 text-sm max-w-3xl">
          Podsumowanie tygodnia bazujące na wpisach Founder Radar i statusach narracji. Charakter wyłącznie edukacyjny – brak rekomendacji inwestycyjnych.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-yellow-200 bg-slate-900/70 border border-yellow-500/40 px-3 py-1 rounded-full w-fit">
          <span>Disclaimer:</span>
          <span>DYOR, brak obietnic wyników.</span>
        </div>
      </header>

      <section className="card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-slate-400">Zakres</p>
            <h2 className="text-lg font-semibold">{summary.weekRange}</h2>
          </div>
          <button onClick={regenerate} className="btn-secondary" aria-label="Odśwież podsumowanie">
            Odśwież podsumowanie
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <CardList title="Zmiany narracji" items={summary.narrativeShifts} />
          <CardList title="Scenariusze z ostatniego tygodnia" items={summary.highlightedScenarios} />
          <CardList title="Na co uważać" items={summary.riskReminders} />
          <CardList title="Co obserwować w kolejnym tygodniu" items={summary.watchNextWeek} />
        </div>
        <p className="text-xs text-slate-400 mt-3">{summary.methodologyNote}</p>
      </section>
    </div>
  );
}

function CardList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card border-slate-800/70 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-[11px] text-yellow-200">Edukacyjne scenariusze</span>
      </div>
      <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
