# Enigma AI – Crypto OS

## Etap 0: analiza + pełny plan prac (z modułem dziennych raportów AI)
Niniejszy dokument opisuje architekturę i plan wdrożenia aplikacji „Enigma AI – Crypto OS” w 6–7 iteracyjnych etapach, uwzględniając moduł automatycznych predykcji publikowanych codziennie o 7:00 (raport AI z ukrytym promptem deep-research).

### Proponowany stack
- **Next.js 14 (App Router) + React + TypeScript** – SSR/ISR, czytelny routing i dobre DX.
- **Tailwind CSS** – utility-first styling, szybka iteracja.
- **Stan**: lokalne hooki React + ewentualnie lekki store (Zustand) dla wspólnych paneli.
- **Dane**: na start **LOCAL + mock API** (pliki w `data/` lub `lib/mockData.ts`), z opcją przełączenia na prosty backend (API Routes / Supabase) bez zmian w UI.

### Główne założenia produktowe i prawne
- Aplikacja jest **edukacyjno-analityczna**, nie udziela rekomendacji inwestycyjnych.
- Stały banner/sekcja „Zastrzeżenia”: „Enigma AI – Crypto OS ma charakter wyłącznie edukacyjno-analityczny i nie stanowi porady inwestycyjnej. Zawsze wykonaj własny research (DYOR). Nie składamy żadnych obietnic wyników ani zysków.”
- Wszystkie interpretacje jako scenariusze/ryzyka („możliwy scenariusz”, „potencjalne ryzyka”), bez „kup/sprzedaj”.

### Routing i layout (plan App Router)
- `app/layout.tsx` – globalny layout (topbar z nazwą + link do zastrzeżeń, sidebar/dock z 9 engine’ami, stały banner disclaimer).
- `app/page.tsx` – Kokpit (Dashboard) z widgetami sentymentu, dominacji BTC, dzisiejszych spostrzeżeń i skrótem raportu AI 7:00.
- `app/engines/[id]/page.tsx` – widoki 9 engine’ów (Market Intelligence, Narrative Scanner, Token Analyzer Pro, Portfolio Architect, Risk Master, On-Chain Detective, DeFi Navigator, NFT & Social Token Lens, AI-Driven Market Scenarios).
- `app/disclaimers/page.tsx` – pełna sekcja „Zastrzeżenia i ryzyka”.
- `app/daily-report/page.tsx` – pełny widok dziennego raportu AI (7:00) z sekcjami tabel/scenariuszy.
- `app/founder-radar/page.tsx`, `app/weekly-summary/page.tsx` – etapy późniejsze.

### Struktura katalogów
- `app/` – routy Next + layout.
- `components/` – wspólne UI: Topbar, Sidebar/Dock, Banner, Cards, Chat.
- `modules/engines/` – widoki/logika poszczególnych 9 engine’ów.
- `modules/reports/` – komponenty i logika raportów AI (7:00) + tygodniowych podsumowań.
- `lib/` – integracje i heurystyki: `marketData.ts`, `narratives.ts`, `riskHeuristics.ts`, `volumeFilters.ts`, `llmClient.ts`, `mockData.ts`.
- `data/` – mocki (narracje, DeFi katalog, NFT typy, przykładowe raporty AI).
- `types/` – interfejsy: `MarketSnapshot`, `Narrative`, `PredictionEntry`, `PortfolioProfile`, `RiskAlert`, `DailyAiReport`.

### Modele danych (start)
- **Raport dzienny AI (7:00)** – `DailyAiReport`:
  - `generatedAt`, `asOfRange`, `topTokens: TokenFinding[]`, `top48hOpportunity: TokenOpportunity`, `riskNotes`, `narrativesToWatch`, `methodologyNote`.
  - `TokenFinding`: `name`, `symbol`, `priceChangePct`, `price`, `volumeUsd`, `liquidityUsd`, `link`, `newsStatus`, `riskScore`, `recommendationLabel` (✅ Obserwuj / 🚀 Scenariusz edukacyjny / ⚠️ Ignoruj), `fakeVolumeFlags`.
- **Founder predictions (local/mock)** – `PredictionEntry`: `id`, `timestamp`, `title`, `narrative`, `tags`, `note`.
- **Market overview** – `MarketSnapshot`: `globalCapUsd`, `btcDominance`, `fearGreedIndex?`, `capChange24h?`, `fetchedAt`.

### Moduł dziennych raportów AI (7:00) – generowanie i prezentacja
- Ukryty prompt deep-research (podany w wymaganiach) osadzony w warstwie serwerowej `generateDailyAiReport()` w `lib/llmClient.ts`; użytkownik nie widzi promptu.
- Harmonogram: endpoint API (`app/api/daily-report/route.ts`) wywoływany przez cron/uptime ping o 7:00; zapis ostatniego raportu w lekkim storage (`data/daily-reports.json` lub lokalnie po stronie klienta z fallbackiem na fetch przy wejściu).
- Filtry jakości danych: `lib/volumeFilters.ts` z implementacją `FakeVolumeDetector` i `BenfordFakeVolumeFilter` (flagowanie FAKE_VOLUME / FAKE_VOLUME_BENFORD przed rankingiem Top 5).
- UI: widget w Kokpicie (skrót Top 5 + „Top 48 h Opportunity”) i pełna podstrona raportu z sekcjami: tabela, trigger points, narracje do obserwacji, ryzyka, metodologia. Wszystko oznaczone jako edukacyjne, bez rekomendacji inwestycyjnych.
- Klucze OpenAI przez `.env`; na koniec prac dodamy instrukcję dodania kluczy, aby całość działała bez ręcznych modyfikacji kodu.

### Etapy realizacji (zaktualizowane)
1. **Etap 0 – Analiza + plan (ten dokument).**
2. **Etap 1 – Szkielet UI + legal layer (disclaimery).** Layout kokpitu, dock 9 engine’ów, strona zastrzeżeń.
3. **Etap 2 – Market Intelligence + Narrative Scanner (basic).** Pobór danych rynkowych (publiczne API), heurystyka sentymentu, narracje mock.
4. **Etap 3 – Token Analyzer Pro + Portfolio Architect + Risk Master.** Formularze edukacyjne, checklisty, koszyki procentowe, alerty ryzyk.
5. **Etap 4 – On-Chain Detective + DeFi Navigator + NFT & Social Token Lens.** Katalogi/placeholdery z ryzykami, hooki pod integracje.
6. **Etap 5 – AI-Driven Market Scenarios + warstwa chatu (9 trybów).** Komponent chatu, system prompty, abstrakcja LLM.
7. **Etap 6 – Founder Radar + Weekly Summary.** Formularz scenariuszy właściciela (local/mock), generowanie tygodniowego raportu.
8. **Etap 7 – Dzienny raport AI 7:00 (deep research) – finalizacja.** Implementacja `generateDailyAiReport`, filtry wolumenowe, API cron, UI kokpit + podstrona, instrukcja dodania kluczy API. (Ujęte w planie wcześniej, realizowane w końcówce, by całość zadziałała po dostarczeniu kluczy.)

### UX jako „system operacyjny”
- **Główny kokpit**: karty metryk (global cap, BTC dominacja, sentyment), skrót raportu AI 7:00, dzisiejsze spostrzeżenia.
- **Dock/Sidebar**: 9 engine’ów z ikonami i opisami; pozwala przełączać tryby.
- **Panel roboczy**: centralny obszar dla aktywnego engine’u (chat/analityka).
- **Warstwa prawna**: stały banner + podstrona zastrzeżeń; przypomnienia DYOR w modułach.
- **Admin / Founder Radar**: zakładka do dodawania scenariuszy 1–2x dziennie; lokalny storage/mock backend.
- **Chat hub**: wspólny interfejs z wyborem engine’u; system prompty per tryb (scenariusze, ryzyka, brak rekomendacji).
- **Raport AI 7:00**: automatycznie publikowany, sekcyjny raport Top 5 + „Top 48 h Opportunity”, z filtrami FAKE_VOLUME/Benford; prezentowany w kokpicie i na dedykowanej stronie.

### Dane i bezpieczeństwo
- Tylko odczyt publicznych API (np. CoinGecko) i OpenAI do generacji tekstu. Brak kluczy tradingowych, brak orderów.
- Wszystkie treści formułowane jako scenariusze edukacyjne; zero obietnic zysków.

**ETAP 0 ZROBIONY (plan zaktualizowany o raport AI 7:00).**
