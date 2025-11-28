import { Exposure, RiskAlert, RiskInput } from '@/types/risk';

const MAX_SINGLE_EXPOSURE = 0.25; // 25%
const MIN_STABLE_SHARE = 0.15; // 15%

function normalizeNumber(value: number) {
  return Number.isFinite(value) ? value : 0;
}

function evaluateSingleExposure(exposure: Exposure, total: number): RiskAlert | null {
  if (!total) return null;
  const ratio = exposure.amount / total;
  if (ratio >= MAX_SINGLE_EXPOSURE) {
    return {
      level: 'critical',
      message: `Ekspozycja na ${exposure.name} przekracza ${(MAX_SINGLE_EXPOSURE * 100).toFixed()}% portfela. Rozważ dywersyfikację (EDU).`
    };
  }
  if (ratio >= 0.15) {
    return {
      level: 'warning',
      message: `${exposure.name} stanowi ~${(ratio * 100).toFixed(0)}% Twojego portfela. Sprawdź płynność i ryzyko narracyjne (DYOR).`
    };
  }
  return null;
}

export function evaluateRiskProfile(input: RiskInput): RiskAlert[] {
  const totalCapital = normalizeNumber(input.totalCapital);
  const cryptoTotal = normalizeNumber(input.cryptoTotal);
  const stableValue = normalizeNumber(input.stableValue);
  const exposures = input.exposures || [];

  const alerts: RiskAlert[] = [];

  if (!totalCapital) {
    alerts.push({ level: 'info', message: 'Uzupełnij wartość całkowitego kapitału, aby policzyć proporcje.' });
    return alerts;
  }

  const cryptoShare = cryptoTotal / totalCapital;
  const stableShare = stableValue / totalCapital;

  if (cryptoShare >= 0.7) {
    alerts.push({ level: 'warning', message: 'Wysoki udział krypto w całym kapitale (>70%). Zastanów się nad poduszką płynności (EDU).' });
  }

  if (stableShare < MIN_STABLE_SHARE) {
    alerts.push({ level: 'warning', message: 'Niska poduszka w stable (<15%). Może ograniczać możliwość reagowania na zmienność.' });
  }

  exposures.forEach((exp) => {
    const alert = evaluateSingleExposure(exp, cryptoTotal || totalCapital);
    if (alert) alerts.push(alert);
  });

  if (!alerts.length) {
    alerts.push({
      level: 'info',
      message: 'Brak wykrytych istotnych koncentracji. Nadal weryfikuj płynność, narracje i własne limity ryzyka (DYOR).'
    });
  }

  return alerts;
}
