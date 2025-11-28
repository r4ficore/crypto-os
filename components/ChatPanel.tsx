'use client';

import { useEffect, useMemo, useState } from 'react';
import { engines, EngineId } from '@/data/engines';
import { callLLM } from '@/lib/llmClient';
import { ChatMessage } from '@/types/chat';

export default function ChatPanel({ defaultEngine = 'ai-scenarios' as EngineId }) {
  const [engineId, setEngineId] = useState<EngineId>(defaultEngine);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const activeEngine = useMemo(() => engines.find((e) => e.id === engineId), [engineId]);

  useEffect(() => {
    setMessages([]);
    setInput('');
  }, [engineId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    const optimistic = [...messages, userMsg];
    setMessages(optimistic);
    setInput('');
    setLoading(true);

    const response = await callLLM(engineId, optimistic);
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: response.reply,
      timestamp: new Date().toISOString()
    };
    setMessages([...optimistic, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="card space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">Tryb AI</p>
          <h3 className="text-lg font-semibold">Chat 9 silników</h3>
          <p className="text-xs text-yellow-200">Edukacyjny charakter odpowiedzi. Brak porad inwestycyjnych. Zawsze DYOR.</p>
          {activeEngine && (
            <p className="text-[11px] text-slate-400 mt-1">Kontekst: {activeEngine.name} – {activeEngine.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Silnik</label>
          <select
            value={engineId}
            onChange={(e) => setEngineId(e.target.value as EngineId)}
            className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm"
          >
            {engines
              .filter((e) => e.id !== 'dashboard')
              .map((engine) => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 max-h-[420px] overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-slate-400">
            Zadaj pytanie w kontekście wybranego silnika. Odpowiedź będzie miała formę scenariuszy i ryzyk (edukacja, nie rekomendacja).
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-wide text-slate-500">{msg.role === 'user' ? 'Użytkownik' : 'Asystent AI'}</span>
              <span className="text-[10px] text-slate-500">{new Date(msg.timestamp || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div
              className={`p-3 rounded-lg border text-slate-100 whitespace-pre-wrap ${msg.role === 'user' ? 'border-slate-700 bg-slate-900/70' : 'border-emerald-700/50 bg-emerald-900/20'}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zadaj pytanie w trybie edukacyjnym (np. scenariusze dla rynku, pytania o ryzyka)..."
          className="w-full rounded-md border border-slate-700 bg-slate-900/70 p-2 text-sm"
          rows={3}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-brand-primary text-slate-950 font-semibold disabled:opacity-60"
          >
            {loading ? 'Ładowanie...' : 'Wyślij edukacyjną odpowiedź'}
          </button>
          <p className="text-[11px] text-slate-400">Odpowiedzi to scenariusze i analizy ryzyka – nie traktuj ich jako rekomendacji. DYOR.</p>
        </div>
      </div>
    </div>
  );
}
