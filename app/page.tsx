import Link from 'next/link';

const todaysInsights = [
  'Dominacja BTC utrzymuje się w trendzie bocznym – rynek szuka katalizatorów narracji.',
  'Stablecoiny pozostają powyżej średniej podaży, co może wspierać płynność wejść.',
  'Narracje AI i L2 utrzymują wzrost zainteresowania w mediach społecznościowych.'
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Kokpit (Dashboard)</h1>
        <p className="text-slate-400 text-sm">
          Edukacyjny przegląd kluczowych metryk rynku i szybki dostęp do 9 silników analitycznych. Żadnych rekomendacji inwestycyjnych.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-400">Heurystyczny sentyment</p>
          <p className="text-3xl font-semibold text-emerald-300">Neutralno-byczy</p>
          <p className="text-xs text-slate-400 mt-2">Ocena edukacyjna na bazie dominacji BTC + ogólnego nastroju. Nie jest rekomendacją.</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Dominacja BTC (szacunek)</p>
          <p className="text-3xl font-semibold">52.4%</p>
          <p className="text-xs text-slate-400 mt-2">Metryka informacyjna – samodzielnie zweryfikuj w ulubionym źródle (DYOR).</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Global cap (24h)</p>
          <p className="text-3xl font-semibold">$2.3T</p>
          <p className="text-xs text-slate-400 mt-2">Dane orientacyjne, służą wyłącznie do nauki interpretacji trendów.</p>
        </div>
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dzisiejsze spostrzeżenia (edukacyjne)</h2>
          <span className="text-xs text-yellow-200">Nie stanowi porady inwestycyjnej</span>
        </div>
        <ul className="mt-3 space-y-2 list-disc list-inside text-slate-200 text-sm">
          {todaysInsights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Raporty i scenariusze</h2>
            <p className="text-sm text-slate-400">Szybkie linki do Founder Radar, Weekly Summary i nadchodzącego raportu AI 7:00.</p>
          </div>
          <span className="text-[11px] text-yellow-200">Edukacyjne – brak rekomendacji</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3 mt-4">
          <EngineShortcut
            name="Founder Radar"
            href="/founder-radar"
            summary="Dodawaj własne scenariusze edukacyjne, lokalny zapis."
          />
          <EngineShortcut
            name="Weekly Summary"
            href="/weekly-summary"
            summary="Heurystyczne podsumowanie tygodnia z narracji + wpisów founder."
          />
          <EngineShortcut
            name="AI Raport 7:00"
            href="/daily-report"
            summary="W przygotowaniu: automatyczny raport AI z filtrami FAKE_VOLUME/Benford."
          />
        </div>
      </section>

      <section className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-lg font-semibold">Szybki dostęp do silników</h2>
          <p className="text-xs text-slate-400">Każdy moduł działa w trybie edukacyjnym – bez rekomendacji zakupu/sprzedaży.</p>
        </div>
        <div className="grid gap-3 mt-4 md:grid-cols-3">
          <EngineShortcut name="Market Intelligence" href="/engines/market-intelligence" summary="Metryki rynku + heurystyka sentymentu." />
          <EngineShortcut name="Narrative Scanner" href="/engines/narrative-scanner" summary="Statusy głównych narracji." />
          <EngineShortcut name="Token Analyzer Pro" href="/engines/token-analyzer" summary="Checklisty tokenomics i ryzyka." />
          <EngineShortcut name="Portfolio Architect" href="/engines/portfolio-architect" summary="Edukacyjne koszyki portfela." />
          <EngineShortcut name="Risk Master" href="/engines/risk-master" summary="Alerty potencjalnych ryzyk." />
          <EngineShortcut name="On-Chain Detective" href="/engines/on-chain-detective" summary="Adresy i placeholder whale moves." />
          <EngineShortcut name="DeFi Navigator" href="/engines/defi-navigator" summary="Katalog protokołów i ryzyk." />
          <EngineShortcut name="NFT & Social Token Lens" href="/engines/nft-lens" summary="Na co patrzeć przed wejściem w NFT/social." />
          <EngineShortcut name="AI-Driven Market Scenarios" href="/engines/ai-scenarios" summary="Scenariusze edukacyjne generowane przez AI." />
        </div>
      </section>
    </div>
  );
}

function EngineShortcut({ name, summary, href }: { name: string; summary: string; href: string }) {
  return (
    <Link href={href} className="card block hover:border-brand-primary/70 transition">
      <p className="font-semibold">{name}</p>
      <p className="text-xs text-slate-400 mt-1">{summary}</p>
      <p className="text-[11px] text-yellow-200 mt-2">Edukacyjne scenariusze – brak rekomendacji inwestycyjnych.</p>
    </Link>
  );
}
