import fs from 'fs/promises';
import path from 'path';
import { DailyAiReport, TokenFinding } from '@/types/reports';
import { applyVolumeFilters } from './volumeFilters';
import { dailyReportPrompt } from './llmPrompts';

const STORAGE_PATH = path.join(process.cwd(), 'data', 'dailyReports.json');

async function readStoredReports(): Promise<DailyAiReport[]> {
  try {
    const raw = await fs.readFile(STORAGE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

async function writeStoredReports(reports: DailyAiReport[]) {
  await fs.writeFile(STORAGE_PATH, JSON.stringify(reports, null, 2));
}

export async function getLatestDailyReport(): Promise<DailyAiReport | null> {
  const reports = await readStoredReports();
  if (reports.length === 0) return null;
  return reports[0];
}

function buildMockReport(): DailyAiReport {
  return {
    generatedAt: new Date().toISOString(),
    asOfRange: 'Ostatnie 48h',
    topTokens: applyVolumeFilters([
      {
        name: 'NeuraLink AI',
        symbol: 'NEURA',
        priceChangePct: 28,
        price: 0.59,
        volumeUsd: 1_120_000,
        liquidityUsd: 120_000,
        link: 'https://www.coingecko.com/en/coins/neuralink-ai',
        newsStatus: 'CryptoPanic / Reddit / Telegram – rosnące zainteresowanie AI infra',
        recommendationLabel: '✅ Obserwuj',
        riskScore: 6
      },
      {
        name: 'BaseYield',
        symbol: 'BYLD',
        priceChangePct: 24,
        price: 1.18,
        volumeUsd: 840_000,
        liquidityUsd: 78_000,
        link: 'https://www.coingecko.com/en/coins/baseyield',
        newsStatus: 'Wzmianki na Threads/Twitter, memy o yield',
        recommendationLabel: '🚀 Scenariusz edukacyjny',
        riskScore: 7
      },
      {
        name: 'Orbit L2',
        symbol: 'ORBT',
        priceChangePct: 19,
        price: 0.35,
        volumeUsd: 460_000,
        liquidityUsd: 52_000,
        link: 'https://www.coingecko.com/en/coins/orbit-l2',
        newsStatus: 'GitHub commits + wątki deweloperów',
        recommendationLabel: '✅ Obserwuj',
        riskScore: 5
      },
      {
        name: 'Datavault',
        symbol: 'DVAULT',
        priceChangePct: 38,
        price: 0.09,
        volumeUsd: 540_000,
        liquidityUsd: 33_000,
        link: 'https://www.coingecko.com/en/coins/datavault',
        newsStatus: 'Short-form video hype, mało on-chain dev',
        recommendationLabel: '⚠️ Ignoruj',
        riskScore: 8
      },
      {
        name: 'SolanaDrive',
        symbol: 'DRIVE',
        priceChangePct: 20,
        price: 2.11,
        volumeUsd: 1_450_000,
        liquidityUsd: 210_000,
        link: 'https://www.coingecko.com/en/coins/solanadrive',
        newsStatus: 'Twitter Spaces + małe partnerstwo L2',
        recommendationLabel: '🚀 Scenariusz edukacyjny',
        riskScore: 6
      }
    ]),
    topOpportunity: {
      title: 'Top 48 h Opportunity',
      thesis: 'AI + DePIN na mniejszych chainach, niski cap i rosnący social buzz.',
      triggers: [
        'Partnerstwa infra i wzmianki w mediach technicznych',
        'TVL rosnący na Base/Arbitrum w niszowych protokołach',
        'Brak flag FakeVolume/Benford po weryfikacji'
      ],
      narrativeAlignment: 'AI infra + DePIN + L2 niche',
      caution: 'Scenariusz edukacyjny. Zweryfikuj LP i ryzyka smart contract. Brak rekomendacji inwestycyjnych.'
    },
    riskNotes: [
      'Tokeny z FAKE_VOLUME/Benford wykluczone przed rankingiem.',
      'Materiał edukacyjny – nie stanowi porady inwestycyjnej.',
      'Zawsze wykonaj własny research (DYOR) i oceń ryzyka płynności/regulacji.'
    ],
    narrativesToWatch: ['AI infra tooling', 'DePIN na Base/Arbitrum', 'SocialFi + gaming'],
    methodologyNote:
      'Raport generowany z ukrytego promptu deep research (news/social/on-chain) + filtry FakeVolumeDetector i BenfordFakeVolumeFilter. '
  };
}

function normalizeTokens(tokens: TokenFinding[]) {
  return tokens
    .map((t) => ({
      ...t,
      recommendationLabel: t.recommendationLabel || '✅ Obserwuj'
    }))
    .slice(0, 5);
}

async function callOpenAiForReport(now: Date): Promise<DailyAiReport | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = dailyReportPrompt;
  const userMessage = `Wygeneruj raport 7:00 (czas: ${now.toISOString()}) w formacie JSON dla ostatnich 48h. Pamiętaj: brak rekomendacji, tylko scenariusze edukacyjne.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    })
  });

  if (!response.ok) return null;
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    const parsed: DailyAiReport = JSON.parse(content);
    parsed.topTokens = normalizeTokens(applyVolumeFilters(parsed.topTokens || []));
    return parsed;
  } catch (error) {
    return null;
  }
}

export async function generateDailyAiReport(forceMock = false): Promise<DailyAiReport> {
  const now = new Date();
  if (forceMock) return buildMockReport();

  const aiResult = await callOpenAiForReport(now);
  if (aiResult) {
    await writeStoredReports([aiResult]);
    return aiResult;
  }

  const fallback = buildMockReport();
  await writeStoredReports([fallback]);
  return fallback;
}

export async function refreshDailyReport() {
  return generateDailyAiReport(false);
}
