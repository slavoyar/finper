import { t } from '@shared/utils/i18n';

export const riskTypeByLevel: Record<number, string> = {
  1: t('bonds.riskLevel.low'),
  2: t('bonds.riskLevel.medium'),
  3: t('bonds.riskLevel.high'),
};
