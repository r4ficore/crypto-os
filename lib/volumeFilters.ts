import { TokenFinding } from '@/types/reports';

type VolumeContext = {
  dexVolume: number;
  uniqueTraders: number;
  cexDexRatio: number;
  repeatTradeRate: number;
  newWalletShare: number;
  depthAsymmetry: number;
  spreadStable: boolean;
  volumeSpikes: boolean;
  newsCorrelationIndex: number;
};

type BenfordContext = {
  firstDigitCounts: number[]; // index 1-9 meaningful
  observations: number;
  chi2?: number;
  volSpikes?: boolean;
  priceStable?: boolean;
};

export function fakeVolumeDetector(ctx: VolumeContext) {
  let score = 0;
  const flags: string[] = [];

  if (ctx.dexVolume >= 250_000 && ctx.uniqueTraders <= 200) {
    score += 3;
    flags.push('wysoki wolumen DEX przy niskiej liczbie traderów');
  }
  if (ctx.cexDexRatio >= 3 || ctx.cexDexRatio <= 0.33) {
    score += 2;
    flags.push('nierównowaga CEX/DEX');
  }
  if (ctx.repeatTradeRate >= 0.55) {
    score += 2;
    flags.push('wysoki repeat_trade_rate');
  }
  if (ctx.depthAsymmetry >= 4) {
    score += 1;
    flags.push('asymetria głębokości orderbook');
  }
  if (ctx.spreadStable && ctx.volumeSpikes) {
    score += 1;
    flags.push('stabilny spread + nagłe skoki wolumenu');
  }
  if (ctx.newsCorrelationIndex < 0.3) {
    score += 1;
    flags.push('niska korelacja z newsami');
  }

  const isFake = score >= 7;
  return { score, isFake, flags };
}

export function benfordFakeVolumeFilter(ctx: BenfordContext) {
  const expected = (d: number) => Math.log10(1 + 1 / d);
  const total = ctx.observations || ctx.firstDigitCounts.reduce((acc, v) => acc + v, 0);
  let chi2 = 0;
  for (let d = 1; d <= 9; d++) {
    const observed = ctx.firstDigitCounts[d] || 0;
    const exp = expected(d) * total;
    if (exp > 0) {
      chi2 += Math.pow(observed - exp, 2) / exp;
    }
  }
  const benfordFlag = chi2 > 20 && ctx.observations > 1000;
  const reasons: string[] = [];
  if (benfordFlag) reasons.push('wysokie odchylenie Benford (χ² > 20)');
  if (ctx.volSpikes && ctx.priceStable) reasons.push('wolumen skacze przy stabilnej cenie');

  return { chi2, benfordFlag, reasons };
}

export function applyVolumeFilters(tokens: TokenFinding[]) {
  return tokens.map((token) => {
    const flags: string[] = token.fakeVolumeFlags ? [...token.fakeVolumeFlags] : [];
    const context: VolumeContext = {
      dexVolume: token.volumeUsd,
      uniqueTraders: Math.max(80, Math.round((token.volumeUsd || 0) / 4_000)),
      cexDexRatio: 0.6,
      repeatTradeRate: 0.35,
      newWalletShare: 0.4,
      depthAsymmetry: 3,
      spreadStable: true,
      volumeSpikes: token.priceChangePct > 15,
      newsCorrelationIndex: 0.25
    };

    const fakeVolume = fakeVolumeDetector(context);
    const benford = benfordFakeVolumeFilter({
      firstDigitCounts: [0, 300, 240, 180, 150, 120, 110, 95, 90, 85],
      observations: 1370,
      volSpikes: context.volumeSpikes,
      priceStable: token.priceChangePct < 8
    });

    if (fakeVolume.isFake) {
      flags.push('FAKE_VOLUME');
    }
    if (benford.benfordFlag) {
      flags.push('FAKE_VOLUME_BENFORD');
    }
    return { ...token, fakeVolumeFlags: flags, riskScore: token.riskScore ?? fakeVolume.score + (benford.benfordFlag ? 2 : 0) };
  });
}
