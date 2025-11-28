# Enigma AI – Crypto OS

## Etap 0: analiza + pełny plan prac (z modułem dziennych raportów AI)
Niniejszy dokument opisuje architekturę i plan wdrożenia aplikacji „Enigma AI – Crypto OS” w 6–7 iteracyjnych etapach, uwzględniając moduł automatycznych predykcji publikowanych codziennie o 7:00 (raport AI z ukrytym promptem deep-research).

## Etap 1: szkielet UI + warstwa prawna (realizacja)
- Utworzono projekt Next.js + TypeScript + Tailwind z App Routerem.
- Dodano globalny layout z topbarem, dockiem 9 silników i stałym bannerem disclaimer.
- Przygotowano kokpit (dashboard) z placeholderami metryk, sekcją „Dzisiejsze spostrzeżenia” oraz skrótami do silników.
- Dodano podstronę „Zastrzeżenia i ryzyka” z jasnymi komunikatami o charakterze edukacyjnym i braku rekomendacji inwestycyjnych.

## Etap 2: Market Intelligence + Narrative Scanner (realizacja)
- Dodano moduł `Market Intelligence Engine` z realnym poborem metryk (Coingecko global cap, dominacja BTC, indeks Fear & Greed) i heurystyczną oceną sentymentu (edukacyjną, bez rekomendacji).
- Dodano moduł `Narrative Scanner` z filtrowalnymi statusami narracji (mock na start) i hookiem na przyszłe źródła news/social/on-chain.
- Ulepszono wygląd (gradientowe tło, karty z efektem blur) dla czytelniejszego, nowszego UI.

## Etap 3: Token Analyzer Pro + Portfolio Architect + Risk Master (realizacja)
- Dodano `Token Analyzer Pro` z formularzem token/ticker + wyborem narracji, generującym checklistę tokenomics i ryzyk (tryb edukacyjny, hook na `generateTokenAnalysisSummary`).
- Dodano `Portfolio Architect` – koszyki procentowe dla stylów defensywny / zbalansowany / agresywny z opisami edukacyjnymi i własnymi polami horyzontu/tolerancji ryzyka.
- Dodano `Risk Master Engine` – formularz ekspozycji kapitału i pojedynczych projektów, heurystyczne alerty (koncentracja, niska poduszka stable), komunikaty EDU/DYOR.
- Odświeżono karty (gradient, blur) dla spójniejszego, nowocześniejszego UI.

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

## Etap 5: AI-Driven Market Scenarios + warstwa chatu (realizacja)
- Dodano panel `AI-Driven Market Scenarios` z wyborem horyzontu, obszarów obserwacji i generowaniem edukacyjnych scenariuszy (AI) na podstawie LLM.
- Wprowadzono wspólny komponent `ChatPanel` umożliwiający przełączanie 9 trybów silnika, historię wiadomości i komunikaty EDU/DYOR.
- Dodano abstrakcję LLM: `lib/llmClient.ts`, mapę promptów `lib/llmPrompts.ts` oraz endpoint `app/api/llm/route.ts` (OpenAI, model `gpt-4o-mini`). Brak klucza → tryb mock/demonstracyjny z komunikatem edukacyjnym.
- Zaktualizowano `index.html` (podgląd GitHub Pages) o sekcję chatu i scenariuszy AI, aby pokazać nowe UI online bez builda.

### Jak skonfigurować klucz OpenAI (do chatu/scenariuszy)
1. Utwórz plik `.env.local` w katalogu głównym.
2. Dodaj zmienną: `OPENAI_API_KEY=twój_klucz`. (Klucz nie jest commitowany; endpoint używa go serwerowo.)
3. Uruchom `npm run dev` i przetestuj chat/scenariusze. Brak klucza = tryb demo (mockowane odpowiedzi edukacyjne).

### Testy manualne (Etap 5)
- `/engines/ai-scenarios`: wybierz horyzont (1-3 dni / tygodnie / miesiące), zaznacz obszary obserwacji, kliknij „Wygeneruj scenariusze AI” → powinieneś dostać scenariusze w sekcjach (Możliwy scenariusz, Co obserwować, Potencjalne ryzyka) z komunikatem EDU/DYOR.
- W tym samym widoku uruchom chat: przełącz tryb silnika (9 trybów), wyślij wiadomość. Bez klucza OpenAI zobaczysz tryb demo; z kluczem otrzymasz odpowiedź z modelu.
- Sprawdź, że w razie błędu API pojawia się komunikat edukacyjny zamiast stack trace.

### Uruchomienie projektu (dev)
1. `npm install`
2. `npm run dev`
3. Otwórz `http://localhost:3000` – zobaczysz kokpit, dock 9 silników i stały banner disclaimer.

### Szybki podgląd online (GitHub Pages)
- Dodano statyczny plik `index.html` (Tailwind z CDN), który odwzorowuje kokpit, dock 9 silników, sekcję zastrzeżeń i przykładowy widget raportu AI 7:00.
- Wystarczy opublikować repo na GitHub Pages (gałąź `main` → ustaw jako źródło Pages); przeglądarka pokaże `index.html` bez potrzeby uruchamiania builda.

### Testy manualne (Etap 1)
- Wejdź na `/` i sprawdź:
  - widoczność bannera ostrzegawczego,
  - topbar z nazwą i tagline,
  - sekcję „Dzisiejsze spostrzeżenia” (statyczne placeholdery),
  - karty metryk (sentyment, dominacja BTC, global cap – poglądowe wartości).
- Kliknij link „Zastrzeżenia” w topbarze lub bannerze – strona powinna jasno komunikować edukacyjny charakter.
- W docku przełączaj 9 silników – każda strona `/engines/[id]` wyświetla placeholder modułu i przypomnienia DYOR.

### Testy manualne (Etap 2)
- Wejdź na `/engines/market-intelligence` i sprawdź, czy metryki ładują się poprawnie (global cap, dominacja BTC, Fear & Greed). W razie niedostępności API zobaczysz komunikat edukacyjny zamiast błędu.
- Sprawdź heurystyczną ocenę rynku (byczy/neutralny/niedźwiedzi) i listę racjonalizacji – upewnij się, że jest opatrzona komunikatem o charakterze edukacyjnym.
- Wejdź na `/engines/narrative-scanner`, użyj filtrów statusu (wszystkie/rośnie/stabilna/gaśnie) i zobacz szczegóły „Na co patrzeć”.
- Zweryfikuj, że wszystkie treści przypominają o DYOR i braku rekomendacji inwestycyjnych.

### Testy manualne (Etap 3)
- `/engines/token-analyzer`: uzupełnij token + narrację, dodaj notatki; po wygenerowaniu checklisty sprawdź sekcje tokenomics, status narracji i listę ryzyk (etykiety EDU/DYOR).
- `/engines/portfolio-architect`: przełączaj style (defensywny/zbalansowany/agresywny) i edytuj horyzont/tolerancję; zweryfikuj koszyki procentowe i notatki edukacyjne.
- `/engines/risk-master`: wprowadź wartości kapitału, stable, ekspozycje na projekty (dodaj kilka pozycji). Sprawdź, czy alerty sygnalizują koncentrację >25%, niską poduszkę stable i wysoki udział krypto w kapitale. Wszystkie komunikaty muszą być edukacyjne.

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

**ETAP 3 ZROBIONY (kokpit + Market Intelligence + Narrative Scanner + Token Analyzer Pro + Portfolio Architect + Risk Master).**

## Etap 4: On-Chain Detective + DeFi Navigator + NFT & Social Token Lens (realizacja)
- Dodano `On-Chain Detective` z sekcją sygnałów/whale moves (placeholdery), lokalną watchlistą adresów i czytelnymi komunikatami EDU/DYOR; zostawiono hook na integrację z publicznymi feedami on-chain.
- Dodano `DeFi Navigator` – katalog wybranych protokołów z filtrami po sieci/typie, opisami use case i ryzyk (bez rekomendacji APY).
- Dodano `NFT & Social Token Lens` – kategorie NFT/social tokens z listą „co sprawdzić” i typowymi ryzykami, z filtrami po sieci/typie.
- Utrzymano nowocześniejszy wygląd kart i sekcji, aby UI było bardziej spójne.

### Testy manualne (Etap 4)
- `/engines/on-chain-detective`: dodaj adres do watchlisty, sprawdź, że zapisuje się lokalnie w sesji i wyświetla etykietę DYOR; zapoznaj się z placeholderem whale moves i opisem hooków API.
- `/engines/defi-navigator`: filtruj po sieci i typie, sprawdź karty protokołów z ryzykami; brak błędów przy pustych filtrach.
- `/engines/nft-lens`: filtruj po sieci/typie, sprawdź sekcje „Sprawdź” i „Typowe ryzyka”; komunikaty edukacyjne bez rekomendacji.

**ETAP 5 ZROBIONY (AI scenariusze + chat 9 trybów).**
