'use client';

import { useMemo, useState } from 'react';
import { onChainSignals, starterWatchlist, whaleMoves } from '@/data/onchain';
import { WatchAddress } from '@/types/onchain';

export default function OnChainDetectivePanel() {
  const [watchlist, setWatchlist] = useState<WatchAddress[]>(starterWatchlist);
  const [form, setForm] = useState<WatchAddress>({ label: '', address: '', network: '', note: '' });

  const sortedMoves = useMemo(() => whaleMoves.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)), []);

  const addAddress = () => {
    if (!form.address.trim() || !form.label.trim()) return;
    setWatchlist((prev) => [...prev, { ...form }]);
    setForm({ label: '', address: '', network: '', note: '' });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="card lg:col-span-2 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-400 tracking-wide">On-Chain Detective</p>
            <h2 className="text-xl font-semibold">Szybkie sygnały i ruchy whale</h2>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/40">
            Edukacyjnie / read-only
          </span>
        </header>

        <div className="grid md:grid-cols-2 gap-3">
          {onChainSignals.map((signal) => (
            <div key={signal.title} className="border border-slate-800 rounded-lg p-3 bg-slate-900/60">
              <p className="text-xs text-slate-400">{signal.status === 'placeholder' ? 'Placeholder' : 'Info'}</p>
              <h3 className="font-semibold mt-1">{signal.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{signal.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Whale moves / duże transfery</h3>
            <p className="text-xs text-slate-400">
              Dane poglądowe – integracja z feedami on-chain w planie (bez kluczy użytkownika).
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {sortedMoves.map((move) => (
              <article key={move.label + move.timestamp} className="border border-slate-800 rounded-lg p-3 bg-slate-900/70">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{move.network}</span>
                  <span>{new Date(move.timestamp).toLocaleString()}</span>
                </div>
                <h4 className="font-semibold mt-1">{move.label}</h4>
                <p className="text-sm text-slate-200 mt-1">{move.summary}</p>
                {move.impact && (
                  <p className="text-xs text-emerald-200 mt-2">Możliwy wpływ: {move.impact}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="card flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">Watchlist</p>
          <h3 className="font-semibold text-lg">Adresy do obserwacji</h3>
          <p className="text-sm text-slate-300">
            Lokalny zapis (brak backendu). Dodaj adresy ręcznie z krótką notatką. Zawsze weryfikuj źródła (DYOR).
          </p>
        </div>

        <div className="space-y-2">
          <input
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            placeholder="Etykieta (np. fundusz L2)"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
          />
          <input
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            placeholder="Adres (np. 0x...)"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          />
          <input
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            placeholder="Sieć (Ethereum / Solana / Base)"
            value={form.network}
            onChange={(e) => setForm((f) => ({ ...f, network: e.target.value }))}
          />
          <textarea
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            placeholder="Notatka / dlaczego obserwujesz"
            rows={2}
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />
          <button
            type="button"
            onClick={addAddress}
            className="w-full py-2 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-accent transition"
          >
            Dodaj adres edukacyjnie
          </button>
        </div>

        <div className="border-t border-slate-800 pt-3 space-y-2">
          {watchlist.map((item, idx) => (
            <div key={item.address + idx} className="rounded-lg border border-slate-800 p-3 bg-slate-950/60">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{item.network || 'Sieć?'}</span>
                <span className="text-amber-300">DYOR</span>
              </div>
              <p className="font-semibold">{item.label}</p>
              <p className="text-xs text-slate-300 break-all">{item.address}</p>
              {item.note && <p className="text-sm text-slate-300 mt-1">{item.note}</p>}
            </div>
          ))}
          {watchlist.length === 0 && (
            <p className="text-sm text-slate-400">Brak adresów – dodaj pierwszy wpis.</p>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Funkcja edukacyjna. Nie prowadzimy automatycznego monitoringu ani nie używamy kluczy użytkownika. Hook na
          publiczne API (np. Etherscan read-only) zostawiony do przyszłej integracji.
        </p>
      </section>
    </div>
  );
}
