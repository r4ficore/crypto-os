'use client';

import { useMemo, useState } from 'react';
import { getNarratives } from '@/lib/narratives';
import { NarrativeItem, NarrativeStatus } from '@/types/narrative';

const statusLabel: Record<NarrativeStatus, string> = {
  rising: 'rośnie',
  stable: 'stabilna',
  cooling: 'gaśnie'
};

const statusColor: Record<NarrativeStatus, string> = {
  rising: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/40',
  stable: 'text-blue-200 bg-blue-500/10 border-blue-500/40',
  cooling: 'text-amber-200 bg-amber-500/10 border-amber-500/40'
};

export default function NarrativeScannerPanel() {
  const [filter, setFilter] = useState<NarrativeStatus | 'all'>('all');
  const narratives = useMemo(() => getNarratives(), []);

  const filtered = filter === 'all' ? narratives : narratives.filter((n) => n.status === filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Narrative Scanner</p>
            <h2 className="text-lg font-semibold">Statusy głównych narracji</h2>
          </div>
          <p className="text-xs text-yellow-200">Edukacyjny przegląd trendów – brak rekomendacji</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {['all', 'rising', 'stable', 'cooling'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item as NarrativeStatus | 'all')}
              className={`px-3 py-1 rounded-full border transition ${
                filter === item ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {item === 'all' ? 'Wszystkie' : statusLabel[item as NarrativeStatus]}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filtered.map((narrative) => (
            <NarrativeCard key={narrative.name} narrative={narrative} />
          ))}
        </div>

        <p className="text-[11px] text-slate-500 mt-3">
          Statusy są ręczne / heurystyczne. Używaj jako inspiracji do własnego researchu (DYOR). Automatyczny import newsów i social
          zostanie dodany w kolejnych etapach.
        </p>
      </div>

      <div className="card bg-slate-900/60 border-dashed border-slate-700">
        <h3 className="font-semibold text-sm">Skąd to się bierze? (hook na przyszłość)</h3>
        <p className="text-sm text-slate-300 mt-2">
          Dane mogą być wzbogacone o źródła social/news/on-chain po podłączeniu feedów lub modeli AI. Obecnie statusy są mockowane w celach edukacyjnych.
        </p>
      </div>
    </div>
  );
}

function NarrativeCard({ narrative }: { narrative: NarrativeItem }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{narrative.name}</p>
          <p className="text-xs text-slate-400">Narracja edukacyjna</p>
        </div>
        <span className={`px-3 py-1 rounded-full border text-xs ${statusColor[narrative.status]}`}>
          {statusLabel[narrative.status]}
        </span>
      </div>
      <p className="text-sm text-slate-300 mt-3">{narrative.notes}</p>
      {narrative.watchFactors && narrative.watchFactors.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-slate-400">Na co patrzeć</p>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            {narrative.watchFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-[11px] text-slate-500 mt-3">
        Ten moduł nie stanowi rekomendacji. Traktuj jako radar do własnego researchu.
      </p>
    </div>
  );
}
