import { FounderEntry, WeeklySummary } from '@/types/reports';
import { NarrativeItem } from '@/types/narrative';

function formatDate(date: Date) {
  return date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function composeWeeklySummary(entries: FounderEntry[], narratives: NarrativeItem[]): WeeklySummary {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const windowEntries = entries
    .filter((item) => new Date(item.timestamp) >= weekAgo)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const narrativeCounts = new Map<string, number>();
  windowEntries.forEach((item) => {
    const prev = narrativeCounts.get(item.narrative) ?? 0;
    narrativeCounts.set(item.narrative, prev + 1);
  });
  const topNarratives = [...narrativeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => `${name} – ${count} wzmianek (edukacyjne scenariusze)`);

  const narrativeShifts = narratives.map((n) =>
    `${n.name}: status ${n.status === 'rising' ? '⬆️ rośnie' : n.status === 'cooling' ? '⚠️ gaśnie' : '➡️ stabilny'}. ${n.notes}`
  );

  const highlightedScenarios = windowEntries.slice(0, 4).map((item) =>
    `${item.title} (${item.narrative}) – ${item.scenario} [Ryzyka: ${item.riskNotes ?? 'do samodzielnej oceny'}]`
  );

  const riskReminders = [
    'Brak rekomendacji inwestycyjnych – traktuj wpisy jako inspirację do własnego researchu.',
    'Sprawdź płynność, tokenomics i koncentrację ryzyka zanim podejmiesz decyzje.',
    'Uwzględnij zmienność rynku w krótkim horyzoncie – scenariusze mogą się zmieniać.'
  ];

  const watchNextWeek = [
    ...topNarratives,
    'Monitoring nowych adresów w On-Chain Detective (manualnie dodawane).',
    'Narracje AI/DePIN oraz RWA – obserwuj TVL i wiadomości regulacyjne.',
    'Zmiany statusów narracji w Narrative Scanner – ręcznie odświeżane mock dane.'
  ];

  return {
    weekRange: `${formatDate(weekAgo)} – ${formatDate(now)}`,
    narrativeShifts,
    highlightedScenarios: highlightedScenarios.length
      ? highlightedScenarios
      : ['Brak nowych wpisów w tym tygodniu – dodaj scenariusz w Founder Radar.'],
    riskReminders,
    watchNextWeek,
    methodologyNote:
      'Podsumowanie generowane heurystycznie na bazie wpisów Founder Radar i statusów narracji. Charakter wyłącznie edukacyjny; brak rekomendacji inwestycyjnych.'
  };
}
