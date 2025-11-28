'use client';

import { useMemo, useState } from 'react';
import { narrativesForSelect } from '@/lib/narratives';
import { buildTokenChecklist } from '@/lib/tokenAnalysis';
import { TokenChecklist, TokenFormState } from '@/types/token';

const riskPills = [
  'Ryzyko regulacyjne',
  'Płynność / wolumen',
  'Centralizacja kluczowych elementów',
  'Ryzyko smart kontraktu / audytu',
  'Ryzyko narracyjne (hype vs fundamenty)',
  'Możliwa presja podaży (unlocki/vesting)'
];

export default function TokenAnalyzerProPanel() {
  const [form, setForm] = useState<TokenFormState>({
    name: '',
    narrative: '',
    userNotes: ''
  });
  const [result, setResult] = useState<TokenChecklist | null>(null);

  const options = useMemo(() => narrativesForSelect(), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checklist = buildTokenChecklist({
      name: form.name.trim() || 'Nieznany token',
      narrative: form.narrative || 'Brak narracji',
      userNotes: form.userNotes
    });
    setResult(checklist);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="card border border-slate-800/80 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Token Analyzer Pro</p>
            <h2 className="text-lg font-semibold">Checklisty tokenomics i ryzyk</h2>
          </div>
          <p className="text-xs text-amber-200">Tryb edukacyjny – brak rekomendacji inwestycyjnych (DYOR)</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Token / ticker</label>
            <input
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="np. ARB, SOL, PEPE"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Narracja</label>
            <select
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              value={form.narrative}
              onChange={(e) => setForm((prev) => ({ ...prev, narrative: e.target.value }))}
              required
            >
              <option value="">Wybierz narrację</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-slate-200">Notatki użytkownika</label>
            <textarea
              className="min-h-[100px] rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Co chcesz sprawdzić? Co budzi wątpliwości? (edukacyjnie)"
              value={form.userNotes}
              onChange={(e) => setForm((prev) => ({ ...prev, userNotes: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Checklisty edukacyjne</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Brak rekomendacji inwestycyjnych</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Możliwość podpięcia AI w kolejnych etapach</span>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition"
            >
              Wygeneruj checklistę
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="card border border-slate-800/80 bg-slate-900/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Wynik edukacyjny</p>
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-sm text-slate-400">Narracja: {result.narrative}</p>
            </div>
            <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Hook AI: generateTokenAnalysisSummary()</span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Section title="Tokenomics – pytania kontrolne" items={result.tokenomicsQuestions} />
            <Section title="Status narracji" items={[`Status: ${result.narrativeStatus}`, ...result.narrativeNotes]} />
            <Section title="Główne ryzyka" items={riskPills} highlight="To są obszary do samodzielnego zbadania (DYOR)." />
          </div>

          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-200 font-semibold">Twoje notatki</p>
            <p className="text-sm text-slate-300 mt-1 whitespace-pre-line">{form.userNotes || 'Brak notatek – dodaj swoje obserwacje.'}</p>
          </div>

          <p className="text-[11px] text-slate-500 mt-4">
            Ten moduł ma charakter edukacyjno-analityczny. Nie zawiera rekomendacji kupna/sprzedaży. Upewnij się, że wykonujesz własny research i weryfikujesz dane w wielu źródłach.
          </p>
        </div>
      )}
    </div>
  );
}

function Section({ title, items, highlight }: { title: string; items: string[]; highlight?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-2">
      <h4 className="font-semibold text-sm">{title}</h4>
      <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {highlight && <p className="text-[11px] text-slate-500">{highlight}</p>}
    </div>
  );
}
