import { notFound } from 'next/navigation';
import Link from 'next/link';
import { engines } from '@/data/engines';
import MarketIntelligencePanel from '@/components/engines/MarketIntelligence';
import NarrativeScannerPanel from '@/components/engines/NarrativeScanner';
import TokenAnalyzerProPanel from '@/components/engines/TokenAnalyzer';
import PortfolioArchitectPanel from '@/components/engines/PortfolioArchitect';
import RiskMasterPanel from '@/components/engines/RiskMaster';
import OnChainDetectivePanel from '@/components/engines/OnChainDetective';
import DeFiNavigatorPanel from '@/components/engines/DeFiNavigator';
import NftLensPanel from '@/components/engines/NftLens';

interface EnginePageProps {
  params: { id: string };
}

const educationalNote =
  'Wszystkie treści mają charakter edukacyjno-analityczny i nie stanowią rekomendacji inwestycyjnej. Traktuj je jako inspirację do własnego researchu (DYOR).';

export default function EnginePage({ params }: EnginePageProps) {
  const engine = engines.find((item) => item.id === params.id);
  if (!engine) return notFound();

  const renderContent = () => {
    switch (engine.id) {
      case 'market-intelligence':
        return <MarketIntelligencePanel />;
      case 'narrative-scanner':
        return <NarrativeScannerPanel />;
      case 'token-analyzer':
        return <TokenAnalyzerProPanel />;
      case 'portfolio-architect':
        return <PortfolioArchitectPanel />;
      case 'risk-master':
        return <RiskMasterPanel />;
      case 'on-chain-detective':
        return <OnChainDetectivePanel />;
      case 'defi-navigator':
        return <DeFiNavigatorPanel />;
      case 'nft-lens':
        return <NftLensPanel />;
      default:
        return <PlaceholderModule />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide">Silnik</p>
        <h1 className="text-2xl font-semibold">{engine.name}</h1>
        <p className="text-sm text-slate-400">{engine.description}</p>
      </div>
      {renderContent()}
      <div className="card bg-slate-900/60 border-dashed border-slate-700">
        <h3 className="font-semibold text-sm">Plan na ten moduł</h3>
        <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
          <li>Dodanie dedykowanego UI i logiki zgodnej z założeniami kolejnych etapów.</li>
          <li>Utrzymanie jasnego komunikatu o charakterze edukacyjnym (brak porad inwestycyjnych).</li>
          <li>Integracja z czatem/LLM tam, gdzie to przewidziane (po dostarczeniu kluczy API).</li>
        </ul>
        <p className="text-xs text-slate-500 mt-3">Pełny opis etapów znajdziesz w kokpicie i README.</p>
        <Link href="/" className="text-xs underline mt-2 inline-block">Wróć do kokpitu</Link>
      </div>
    </div>
  );
}

function PlaceholderModule() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold">Przestrzeń robocza</h2>
      <p className="text-sm text-slate-400 mt-2">
        Placeholder modułu. Logika i interfejs zostaną rozbudowane w kolejnych etapach. {educationalNote}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-200">
        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Tryb edukacyjny</span>
        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Brak rekomendacji inwestycyjnych</span>
        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">Zawsze DYOR</span>
      </div>
    </div>
  );
}
