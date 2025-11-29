import { NextResponse } from 'next/server';
import { llmPrompts, demoFallbackMessage } from '@/lib/llmPrompts';
import { EngineId } from '@/data/engines';

export async function POST(request: Request) {
  const { engineId, messages } = await request.json();
  const typedEngine = (engineId ?? 'ai-scenarios') as EngineId;
  const apiKey = process.env.OPENAI_API_KEY;
  const systemPrompt = llmPrompts[typedEngine];

  if (!systemPrompt) {
    return NextResponse.json(
      { reply: 'Brak zdefiniowanego promptu dla wybranego silnika.', source: 'mock' },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json({ reply: demoFallbackMessage, source: 'mock' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          reply: `Błąd API: ${errorText || response.statusText}. Tryb edukacyjny, spróbuj ponownie.`,
          source: 'mock'
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content ?? demoFallbackMessage;
    return NextResponse.json({ reply: message, source: 'openai' });
  } catch (error) {
    return NextResponse.json(
      { reply: 'Nieoczekiwany błąd podczas wywołania modelu AI. Tryb edukacyjny (mock).', source: 'mock' },
      { status: 500 }
    );
  }
}
