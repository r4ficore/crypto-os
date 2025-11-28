'use client';

import { useMemo, useState } from 'react';
import { defiProtocols } from '@/data/defiProtocols';
import { DefiProtocol, ProtocolType } from '@/types/defi';

const networks = ['Wszystkie', ...Array.from(new Set(defiProtocols.map((p) => p.network)))];
const types: (ProtocolType | 'Wszystkie')[] = ['Wszystkie', 'DEX', 'Lending', 'Yield', 'Liquid Staking', 'Derivatives', 'Stablecoin'];

export default function DeFiNavigatorPanel() {
  const [networkFilter, setNetworkFilter] = useState<string>('Wszystkie');
  const [typeFilter, setTypeFilter] = useState<ProtocolType | 'Wszystkie'>('Wszystkie');

  const filtered = useMemo(() => {
    return defiProtocols.filter((protocol: DefiProtocol) => {
      const matchesNetwork = networkFilter === 'Wszystkie' || protocol.network.includes(networkFilter);
      const matchesType = typeFilter === 'Wszystkie' || protocol.type === typeFilter;
      return matchesNetwork && matchesType;
    });
  }, [networkFilter, typeFilter]);

  return (
    <div className="card space-y-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">DeFi Navigator</p>
          <h2 className="text-xl font-semibold">Katalog protokołów (edukacyjny)</h2>
          <p className="text-sm text-slate-400">
            Filtruj po sieci i typie. Opisy wskazują use case + ryzyka. Brak rekomendacji / APY shilling.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
          >
            {networks.map((net) => (
              <option key={net}>{net}</option>
            ))}
          </select>
          <select
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ProtocolType | 'Wszystkie')}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((protocol) => (
          <article key={protocol.name} className="border border-slate-800 rounded-lg p-4 bg-slate-900/70 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{protocol.network}</span>
              <span className="px-2 py-1 rounded-full border border-slate-800 bg-slate-950/70 text-[11px]">{protocol.type}</span>
            </div>
            <h3 className="font-semibold text-lg">{protocol.name}</h3>
            <p className="text-sm text-slate-300">Use case: {protocol.useCase}</p>
            <div>
              <p className="text-xs uppercase text-slate-400">Ryzyka do zbadania</p>
              <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                {protocol.risks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              Hint edukacyjny: Sprawdź płynność, audyty, TVL oraz aktualne komunikaty zespołu. Brak obietnic APY.
            </p>
            {protocol.links && (
              <div className="flex gap-3 text-xs text-brand-primary">
                {protocol.links.website && (
                  <a href={protocol.links.website} target="_blank" rel="noreferrer" className="underline">
                    Strona
                  </a>
                )}
                {protocol.links.docs && (
                  <a href={protocol.links.docs} target="_blank" rel="noreferrer" className="underline">
                    Dokumentacja
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400">Brak protokołów dla wybranych filtrów.</p>}
      </div>
    </div>
  );
}
