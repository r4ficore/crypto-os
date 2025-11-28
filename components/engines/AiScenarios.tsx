'use client';

import { useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import { callLLM } from '@/lib/llmClient';
import { ChatMessage } from '@/types/chat';

const horizons = ['1-3 dni', '1-3 tygodnie', '1-3 miesiące'];
const focusAreas = ['BTC trend', 'Narracje AI/L2', 'DeFi płynność', 'On-chain sygnały', 'Sentyment społeczności'];

export default function AiScenariosPanel() {
  const [horizon, setHorizon] = useState(horizons[2]);
  const [focus, setFocus] = useState<string[]>(['Narracje AI/L2', 'BTC trend']);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const toggleFocus = (item: string) => {
    setFocus((prev) => (prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]));
  };

  const generate = async () => {
    setLoading(true);
    const prompt = `Przygotuj 2-3 scenariusze edukacyjne dla rynku krypto na horyzont: ${horizon}. Kontekst: ${focus.join(', ')}. Dodaj sekcje: Mozliwy scenariusz, Co obserwować, Potencjalne ryzyka, Rekomendacja edukacyjna (bez kup/sprzedaj, przypomnij o DYOR).`;
    const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
    const response = await callLLM('ai-scenarios', messages);
    setResult(response.reply);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="card space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Scenariusze AI</p>
            <h2 className="text-xl font-semibold">AI-Driven Market Scenarios</h2>
            <p className="text-xs text-yellow-200">Edukacyjne scenariusze – brak rekomendacji inwestycyjnych. Zawsze DYOR.</p>
          </div>
          <div className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2">
            <p className="font-semibold text-[11px] text-slate-200">Ramka bezpieczeństwa</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Scenariusze, nie porady.</li>
              <li>Uwzględnij ryzyka i zmienność.</li>
              <li>Przypominaj o DYOR.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400">Horyzont</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {horizons.map((item) => (
                <button
                  key={item}
                  onClick={() => setHorizon(item)}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    horizon === item ? 'bg-brand-primary text-slate-950 border-brand-primary' : 'border-slate-700 text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 md:col-span-2">
            <p className="text-xs text-slate-400">Obszary do obserwacji</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {focusAreas.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleFocus(item)}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    focus.includes(item)
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100'
                      : 'border-slate-700 text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Wybierz, co AI powinno podkreślić (narracje, płynność, sygnały on-chain). Tryb edukacyjny – bez sygnałów tradingowych.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="text-sm text-slate-300">
            <p className="font-semibold">Etykiety scenariusza</p>
            <ul className="list-disc list-inside text-[13px] space-y-1 text-slate-400 mt-1">
              <li>Możliwy scenariusz (trend, trigger, czas).</li>
              <li>Co obserwować (metryki, narracje, adresy).</li>
              <li>Potencjalne ryzyka (płynność, regulacje, zmienność).</li>
            </ul>
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-brand-primary text-slate-950 font-semibold disabled:opacity-70"
          >
            {loading ? 'Generuję...' : 'Wygeneruj scenariusze AI'}
          </button>
        </div>

        {result && (
          <div className="bg-slate-950/70 border border-emerald-700/40 rounded-lg p-4 text-sm whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>

      <ChatPanel defaultEngine="ai-scenarios" />
    </div>
  );
}
