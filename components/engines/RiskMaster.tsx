'use client';

import { useMemo, useState } from 'react';
import { evaluateRiskProfile } from '@/lib/risk';
import { Exposure, RiskAlert } from '@/types/risk';

const badgeByLevel: Record<RiskAlert['level'], string> = {
  info: 'bg-slate-800 border-slate-700 text-slate-200',
  warning: 'bg-amber-500/10 border-amber-400/40 text-amber-100',
  critical: 'bg-rose-500/10 border-rose-500/50 text-rose-100'
};

export default function RiskMasterPanel() {
  const [totalCapital, setTotalCapital] = useState(0);
  const [cryptoTotal, setCryptoTotal] = useState(0);
  const [stableValue, setStableValue] = useState(0);
  const [exposures, setExposures] = useState<Exposure[]>([{ name: '', amount: 0 }]);

  const alerts = useMemo(
    () =>
      evaluateRiskProfile({
        totalCapital: totalCapital || 0,
        cryptoTotal: cryptoTotal || 0,
        stableValue: stableValue || 0,
        exposures: exposures.filter((exp) => exp.name.trim())
      }),
    [totalCapital, cryptoTotal, stableValue, exposures]
  );

  const updateExposure = (index: number, key: keyof Exposure, value: string) => {
    const next = exposures.map((exp, i) => (i === index ? { ...exp, [key]: key === 'amount' ? Number(value) || 0 : value } : exp));
    setExposures(next);
  };

  const addExposure = () => setExposures((prev) => [...prev, { name: '', amount: 0 }]);

  return (
    <div className="flex flex-col gap-4">
      <div className="card border border-slate-800/80 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/90">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Risk Master Engine</p>
            <h2 className="text-lg font-semibold">Alerty ryzyka (edukacyjne)</h2>
          </div>
          <p className="text-xs text-amber-200">Scenariusze do przemyślenia – nie porady inwestycyjne.</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <NumberInput label="Kapitał całkowity (USD)" value={totalCapital} onChange={setTotalCapital} />
          <NumberInput label="Kapitał w krypto (USD)" value={cryptoTotal} onChange={setCryptoTotal} />
          <NumberInput label="Stablecoiny (USD)" value={stableValue} onChange={setStableValue} />
        </div>

        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-200">Ekspozycja na pojedyncze projekty</p>
            <button
              onClick={addExposure}
              className="text-xs px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:border-brand-primary hover:text-brand-primary transition"
            >
              Dodaj projekt
            </button>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {exposures.map((exp, idx) => (
              <div key={`${exp.name}-${idx}`} className="flex gap-2">
                <input
                  value={exp.name}
                  onChange={(e) => updateExposure(idx, 'name', e.target.value)}
                  placeholder="Nazwa projektu"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
                <input
                  value={exp.amount || ''}
                  onChange={(e) => updateExposure(idx, 'amount', e.target.value)}
                  placeholder="$"
                  type="number"
                  className="w-32 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Dane lokalne – nic nie jest wysyłane na zewnątrz. Wyniki mają charakter edukacyjny.</p>
        </div>
      </div>

      <div className="card border border-slate-800/80 bg-slate-900/70">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Alerty</p>
            <h3 className="text-lg font-semibold">Potencjalne ryzyka / do przemyślenia</h3>
          </div>
          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Edukacyjne scenariusze</span>
        </div>

        <div className="mt-4 grid gap-2">
          {alerts.map((alert, idx) => (
            <div key={`${alert.message}-${idx}`} className={`rounded-lg border px-4 py-3 text-sm ${badgeByLevel[alert.level]}`}>
              {alert.message}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 mt-4">
          Ryzyka są heurystyczne i mają zachęcić do własnych obliczeń płynności, koncentracji i scenariuszy wyjścia. Brak rekomendacji.
        </p>
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-200">{label}</p>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        placeholder="0"
        className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
      />
    </div>
  );
}
