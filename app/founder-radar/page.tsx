"use client";

import { useEffect, useMemo, useState } from 'react';
import { availableNarratives, loadFounderEntries, saveFounderEntries, sampleFounderEntries } from '@/lib/founderRadar';
import { FounderEntry } from '@/types/reports';

const defaultForm: Omit<FounderEntry, 'id' | 'timestamp'> = {
  title: '',
  narrative: availableNarratives()[0] ?? 'AI & DePIN',
  tags: [],
  scenario: '',
  riskNotes: '',
  confidence: 'średnie'
};

export default function FounderRadarPage() {
  const [entries, setEntries] = useState<FounderEntry[]>(sampleFounderEntries);
  const [form, setForm] = useState(defaultForm);
  const [filter, setFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');

  useEffect(() => {
    setEntries(loadFounderEntries());
  }, []);

  useEffect(() => {
    saveFounderEntries(entries);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchNarrative = filter ? entry.narrative === filter : true;
      const matchTag = tagFilter ? entry.tags.includes(tagFilter) : true;
      return matchNarrative && matchTag;
    });
  }, [entries, filter, tagFilter]);

  const submit = () => {
    if (!form.title || !form.scenario) return;
    const newEntry: FounderEntry = {
      ...form,
      id: `entry-${Date.now()}`,
      timestamp: new Date().toISOString(),
      tags: form.tags
    };
    setEntries([newEntry, ...entries]);
    setForm({ ...defaultForm, narrative: form.narrative });
  };

  const tagsPool = Array.from(new Set(entries.flatMap((e) => e.tags))).filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Founder Radar</h1>
        <p className="text-slate-400 text-sm max-w-3xl">
          Dodawaj edukacyjne scenariusze 1–2x dziennie. Zapisy są lokalne (localStorage). Wpisy NIE są rekomendacją inwestycyjną.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-yellow-200 bg-slate-900/70 border border-yellow-500/40 px-3 py-1 rounded-full w-fit">
          <span>Disclaimer:</span>
          <span>Scenariusze edukacyjne, DYOR, brak obietnic wyników.</span>
        </div>
      </header>

      <section className="card">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm text-slate-400">Dodaj scenariusz (lokalnie)</p>
            <h2 className="text-lg font-semibold">Nowy wpis founder radar</h2>
          </div>
          <div className="text-xs text-slate-400">Zapisywane w przeglądarce – widoczne tylko dla Ciebie.</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="space-y-3">
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Tytuł scenariusza</span>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="np. AI infra przyspiesza na Base"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Narracja</span>
              <select
                className="input"
                value={form.narrative}
                onChange={(e) => setForm({ ...form, narrative: e.target.value })}
              >
                {availableNarratives().map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Tagi (przecinkami)</span>
              <input
                className="input"
                value={form.tags.join(', ')}
                onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                placeholder="AI, infra, L2"
              />
            </label>
          </div>
          <div className="space-y-3">
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Scenariusz edukacyjny</span>
              <textarea
                className="input min-h-[120px]"
                value={form.scenario}
                onChange={(e) => setForm({ ...form, scenario: e.target.value })}
                placeholder="Opis obserwacji, co może zadziałać jako trigger, co sprawdzić dalej."
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Ryzyka / notatki</span>
              <textarea
                className="input min-h-[80px]"
                value={form.riskNotes}
                onChange={(e) => setForm({ ...form, riskNotes: e.target.value })}
                placeholder="Potencjalne ryzyka, niska płynność, ryzyko regulacyjne itp."
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-sm text-slate-300">Pewność obserwacji (heurystyczna)</span>
              <select
                className="input"
                value={form.confidence}
                onChange={(e) => setForm({ ...form, confidence: e.target.value as FounderEntry['confidence'] })}
              >
                <option value="niskie">Niskie</option>
                <option value="średnie">Średnie</option>
                <option value="wysokie">Wysokie</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
          <p className="text-xs text-slate-400 max-w-xl">
            Wpisy są wyłącznie materiałem edukacyjnym. Przypomnienie: brak rekomendacji inwestycyjnych, zawsze wykonaj własny research.
          </p>
          <button onClick={submit} className="btn-primary" aria-label="Zapisz scenariusz">
            Zapisz scenariusz
          </button>
        </div>
      </section>

      <section className="card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Ostatnie wpisy</h2>
            <p className="text-sm text-slate-400">Filtruj po narracji i tagach. Dane lokalne, brak synchronizacji serwerowej.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">Narracja: wszystkie</option>
              {availableNarratives().map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select className="input" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
              <option value="">Tag: wszystkie</option>
              {tagsPool.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {filteredEntries.map((entry) => (
            <article key={entry.id} className="card border-slate-800/70">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-slate-400">{new Date(entry.timestamp).toLocaleString('pl-PL')}</p>
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                </div>
                <span className="badge">{entry.narrative}</span>
              </div>
              <p className="text-sm text-slate-200 mt-2 whitespace-pre-wrap">{entry.scenario}</p>
              <p className="text-xs text-slate-400 mt-2">Ryzyka: {entry.riskNotes || 'uzupełnij ręcznie'}</p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-300">
                {entry.tags.map((tag) => (
                  <span key={tag} className="pill">#{tag}</span>
                ))}
                {entry.confidence && <span className="pill pill-ghost">Pewność: {entry.confidence}</span>}
              </div>
              <p className="text-[11px] text-yellow-200 mt-3">Edukacyjne scenariusze – brak rekomendacji inwestycyjnych.</p>
            </article>
          ))}
        </div>
        {!filteredEntries.length && (
          <div className="text-sm text-slate-400">Brak wpisów dla wybranych filtrów – dodaj scenariusz powyżej.</div>
        )}
      </section>
    </div>
  );
}
