'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { engines } from '@/data/engines';

export function Topbar() {
  const pathname = usePathname();
  const activeEngine = engines.find((engine) => pathname?.includes(engine.id));
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center font-bold text-slate-950 shadow-lg">
            EA
          </div>
          <div>
            <p className="text-lg font-semibold">Enigma AI – Crypto OS</p>
            <p className="text-sm text-slate-400">System operacyjno-analityczny bez FOMO, wyłącznie edukacyjny.</p>
          </div>
        </div>
        {activeEngine && (
          <p className="text-xs text-slate-400">
            Aktywny moduł: <span className="text-slate-100">{activeEngine.name}</span> – {activeEngine.description}
          </p>
        )}
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/" className="hover:text-brand-accent">Kokpit</Link>
        <Link href="/disclaimers" className="hover:text-brand-accent">Zastrzeżenia</Link>
      </nav>
    </header>
  );
}
