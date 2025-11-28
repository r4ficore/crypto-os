import { TokenChecklist, TokenFormState } from '@/types/token';

const baseQuestions = [
  'Jaka jest inflacja/deflacja supply i harmonogram emisji?',
  'Kto kontroluje kluczowe klucze/upgrade? (centralizacja)',
  'Jak wyglądają unlocki vestingu w najbliższych 3-6 miesiącach?',
  'Czy istnieje realny produkt/użyteczność czy tylko narracja hype?',
  'Jak wygląda płynność na głównych DEX/CEX i slippage dla większych zleceń?',
  'Czy audyty smart kontraktów są dostępne i aktualne?'
];

export function buildTokenChecklist(form: TokenFormState): TokenChecklist {
  const narrativeNotes = [
    'Sprawdź, czy projekt realnie dostarcza produkt w ramach wybranej narracji.',
    'Zweryfikuj roadmapę i kamienie milowe – czy są osiągane?',
    'Obserwuj sentyment i wolumeny w ramach narracji (EDU, nie rekomendacja).'
  ];

  return {
    title: `${form.name} – edukacyjna analiza`,
    narrative: form.narrative,
    narrativeStatus: 'Manualna ocena narracji (do uzupełnienia)',
    narrativeNotes,
    tokenomicsQuestions: baseQuestions,
    userNotes: form.userNotes || ''
  };
}
