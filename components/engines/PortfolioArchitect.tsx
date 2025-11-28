'use client';

import { useMemo, useState } from 'react';
import { getPortfolioMix } from '@/lib/portfolio';
import { PortfolioRecommendation, PortfolioStyle } from '@/types/portfolio';

const styleLabels: Record<PortfolioStyle, string> = {
  defensive: 'Defensywny',
  balanced: 'Zbalansowany',
  aggressive: 'Agresywny'
};

export default function PortfolioArchitectPanel() {
  const [style, setStyle] = useState<PortfolioStyle>('balanced');
  const [horizon, setHorizon] = useState('6-12 miesięcy');
  const [riskTolerance, setRiskTolerance] = useState('Średnia');

  const recommendation: PortfolioRecommendation = useMemo(() => getPortfolioMix(style), [style]);

  return (
    <div className="flex flex-col gap-4">
      <div className="card border border-slate-800/80 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/90">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Portfolio Architect</p>
            <h2 className="text-lg font-semibold">Koszyki procentowe (edukacyjnie)</h2>
          </div>
          <p className="text-xs text-amber-200">Brak konkretnych tickerów. Używaj jako ramy do DYOR.</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Field label="Styl portfela">
            <div className="flex flex-wrap gap-2">
              {(['defensive', 'balanced', 'aggressive'] as PortfolioStyle[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setStyle(option)}
                  className={`px-3 py-2 rounded-lg border text-sm transition ${
                    style === option
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-slate-800 bg-slate-900/50 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {styleLabels[option]}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Horyzont (edukacyjny)">
            <input
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
            />
          </Field>

          <Field label="Tolerancja ryzyka (opis)">
            <input
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
            />
          </Field>
        </div>
      </div>

      <div className="card border border-slate-800/80 bg-slate-900/70">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Edukacyjny układ</p>
            <h3 className="text-lg font-semibold">{styleLabels[recommendation.style]}</h3>
            <p className="text-sm text-slate-400">Horyzont: {horizon || recommendation.horizon}</p>
            <p className="text-sm text-slate-400">Tolerancja ryzyka: {riskTolerance || recommendation.riskTolerance}</p>
          </div>
          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Koszyki % – brak rekomendacji</span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {recommendation.buckets.map((bucket) => (
            <div key={bucket.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{bucket.label}</p>
                <span className="text-sm font-semibold text-brand-primary">{bucket.percentage}%</span>
              </div>
              <p className="text-sm text-slate-300">{bucket.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Dlaczego tak?</p>
            <ul className="mt-2 text-sm text-slate-300 space-y-2 list-disc list-inside">
              {recommendation.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Twoje obserwacje</p>
            <p className="text-sm text-slate-400">Dodaj własne limity, sprawdź płynność i narracje – nic z tego nie jest poradą inwestycyjną.</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-4">Portfel to rama edukacyjna. Nie zawiera tickerów ani rekomendacji. DYOR.</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-200">{label}</p>
      {children}
    </div>
  );
}
