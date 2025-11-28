"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { engines, EngineId } from '@/data/engines';

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (engineId: EngineId) =>
    engineId === 'dashboard' ? pathname === '/' : pathname?.includes(engineId);

  return (
    <aside className="w-full md:w-64 border-r border-slate-800 bg-slate-950/60 backdrop-blur">
      <div className="p-4 border-b border-slate-800">
        <p className="text-sm text-slate-400">Silniki / tryby</p>
      </div>
      <nav className="flex flex-row md:flex-col overflow-auto divide-x md:divide-x-0 md:divide-y divide-slate-800">
        {engines.map((engine) => (
          <Link
            key={engine.id}
            href={engine.id === 'dashboard' ? '/' : `/engines/${engine.id}`}
            className={`flex-1 md:flex-none px-4 py-3 text-sm transition hover:bg-slate-900/80 ${
              isActive(engine.id) ? 'bg-slate-900 text-brand-accent' : 'text-slate-200'
            }`}
          >
            <p className="font-semibold">{engine.name}</p>
            <p className="text-xs text-slate-400">{engine.description}</p>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
