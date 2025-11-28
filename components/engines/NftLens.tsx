'use client';

import { useMemo, useState } from 'react';
import { nftCategories } from '@/data/nft';
import { NftCategory } from '@/types/nft';

const networks = ['Wszystkie', ...Array.from(new Set(nftCategories.map((n) => n.network)))];
const types = ['Wszystkie', ...Array.from(new Set(nftCategories.map((n) => n.type)))];

export default function NftLensPanel() {
  const [networkFilter, setNetworkFilter] = useState<string>('Wszystkie');
  const [typeFilter, setTypeFilter] = useState<string>('Wszystkie');

  const filtered = useMemo(() => {
    return nftCategories.filter((item: NftCategory) => {
      const matchesNetwork = networkFilter === 'Wszystkie' || item.network.includes(networkFilter);
      const matchesType = typeFilter === 'Wszystkie' || item.type === typeFilter;
      return matchesNetwork && matchesType;
    });
  }, [networkFilter, typeFilter]);

  return (
    <div className="card space-y-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">NFT & Social Token Lens</p>
          <h2 className="text-xl font-semibold">Na co patrzeć zanim wejdziesz</h2>
          <p className="text-sm text-slate-400">Filtruj po sieci/typie. Wszystko ma charakter edukacyjny (DYOR).</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
          >
            {networks.map((network) => (
              <option key={network}>{network}</option>
            ))}
          </select>
          <select
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <article key={item.name} className="border border-slate-800 rounded-lg p-4 bg-slate-900/70 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{item.network}</span>
              <span className="px-2 py-1 rounded-full border border-slate-800 bg-slate-950/70 text-[11px]">{item.type}</span>
            </div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <div>
              <p className="text-xs uppercase text-slate-400">Sprawdź</p>
              <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                {item.whatToCheck.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Typowe ryzyka</p>
              <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                {item.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              Wskazówka: zweryfikuj płynność, reputację zespołu oraz strukturę opłat/royalties. Zero obietnic zysków.
            </p>
          </article>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400">Brak wpisów dla wybranych filtrów.</p>}
      </div>
    </div>
  );
}
