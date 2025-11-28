'use client';

import { FounderEntry } from '@/types/reports';
import { narrativesForSelect } from './narratives';

const STORAGE_KEY = 'founder-radar-entries';

export const sampleFounderEntries: FounderEntry[] = [
  {
    id: 'sample-1',
    timestamp: new Date().toISOString(),
    title: 'AI infra rośnie na Base',
    narrative: 'AI & DePIN',
    tags: ['AI', 'infra', 'Base'],
    scenario: 'Nowe wdrożenia AI infra mogą podbić wolumeny w L2; scenariusz edukacyjny – obserwuj TVL i koszty gazu.',
    riskNotes: 'Ryzyko: spadek płynności przy przeciążeniu sieci lub braku adopcji.',
    confidence: 'średnie'
  },
  {
    id: 'sample-2',
    timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    title: 'RWA pilot w regionie APAC',
    narrative: 'RWA & tokenizacja',
    tags: ['RWA', 'regulacje'],
    scenario: 'Pilotaż tokenizacji może zwiększyć zainteresowanie stable backed assetami; edukacyjnie obserwuj partnerstwa bankowe.',
    riskNotes: 'Ryzyko: opóźnienia regulacyjne, niska płynność wtórna.',
    confidence: 'niskie'
  }
];

export function loadFounderEntries(): FounderEntry[] {
  if (typeof window === 'undefined') return sampleFounderEntries;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as FounderEntry[];
      return parsed.length ? parsed : sampleFounderEntries;
    }
  } catch (error) {
    console.warn('Nie udało się wczytać wpisów founder radar, używam sample.', error);
  }
  return sampleFounderEntries;
}

export function saveFounderEntries(entries: FounderEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.warn('Nie udało się zapisać wpisów founder radar.', error);
  }
}

export function availableNarratives() {
  return narrativesForSelect();
}
