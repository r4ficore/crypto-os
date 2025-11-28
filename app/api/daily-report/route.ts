import { NextResponse } from 'next/server';
import { generateDailyAiReport, getLatestDailyReport } from '@/lib/dailyReport';

export async function GET() {
  const latest = await getLatestDailyReport();
  if (latest) return NextResponse.json({ report: latest, source: 'stored' });

  const fallback = await generateDailyAiReport(true);
  return NextResponse.json({ report: fallback, source: 'mock' });
}

export async function POST() {
  const report = await generateDailyAiReport();
  return NextResponse.json({ report, source: 'generated' });
}
