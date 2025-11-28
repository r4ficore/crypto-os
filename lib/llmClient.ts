import { EngineId } from '@/data/engines';
import { ChatMessage } from '@/types/chat';

export type LlmResponse = {
  reply: string;
  source: 'mock' | 'openai';
};

export async function callLLM(engineId: EngineId, messages: ChatMessage[]): Promise<LlmResponse> {
  const res = await fetch('/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ engineId, messages })
  });

  if (!res.ok) {
    const fallback: LlmResponse = {
      reply:
        'Nie udało się połączyć z usługą AI. Spróbuj ponownie później lub zweryfikuj konfigurację API. To narzędzie ma charakter edukacyjny (DYOR).',
      source: 'mock'
    };
    return fallback;
  }

  return res.json();
}
