import { riskTypeByLevel } from '@shared/consts';
import { appLocale, t } from '@shared/utils/i18n';

export function getDurationValue(maturityDate: string): number {
  const now = Date.now();
  const target = new Date(maturityDate).getTime();
  const diff = target - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days / 30;
}

const formatUnit = (count: number, unit: 'month' | 'day') =>
  new Intl.NumberFormat(appLocale(), { style: 'unit', unit, unitDisplay: 'long' }).format(count);

export function formatMonths(count: number): string {
  return formatUnit(count, 'month');
}

export function getDuration(maturityDate: string): string {
  const monthsDecimal = getDurationValue(maturityDate);
  if (monthsDecimal >= 1) {
    return formatMonths(Math.floor(monthsDecimal));
  }
  const days = Math.max(0, Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  return formatUnit(days, 'day');
}

export function describeMonths(min: number | null, max: number | null): string | null {
  if (min != null && max != null && min > max) {
    return null;
  }
  if (min != null && max != null) {
    return t('bonds.filters.between', { min: formatMonths(min), max: formatMonths(max) });
  }
  if (min != null) {
    return t('bonds.filters.atLeast', { months: formatMonths(min) });
  }
  if (max != null) {
    return t('bonds.filters.atMost', { months: formatMonths(max) });
  }
  return null;
}

export function riskSummary(levels: number[]): string {
  const names = [...levels]
    .sort((a, b) => a - b)
    .map((level) => riskTypeByLevel[level])
    .filter(Boolean);
  if (!names.length) {
    return t('bonds.filters.anyRisk');
  }
  return t('bonds.filters.riskSummary', { levels: names.join(', ') });
}
