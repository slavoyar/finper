import { escapeMarkdownV2, quotationToNumber } from '@common/utils';
import { Bond } from '@prisma/client';

import { ListBuilder } from '../builders/list.builder';

export function getDurationValue(maturityDate: string): number {
  const now = Date.now();
  const target = new Date(maturityDate).getTime();
  const diff = target - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days / 30;
}

export function getDuration(maturityDate: string): string {
  const monthsDecimal = getDurationValue(maturityDate);
  if (monthsDecimal >= 1) {
    const months = Math.floor(monthsDecimal);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const days = Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''}`;
  }
}

export const getBondList = (bonds: Bond[]) => {
  const builder = new ListBuilder('Список облигаций', bonds, (bond, index) => {
    const price = quotationToNumber(bond.lastPrice?.price);
    const nominal = quotationToNumber(bond.initialNominal);
    if (!price || !nominal) {
      return '';
    }
    const currentPrice = Math.round(price * nominal) / 100;

    const currency = bond.currency;

    const url = `https://www.tbank.ru/invest/bonds/${bond.ticker}/`;

    const yieldValue = Math.round(bond.yield! * 10000) / 100;

    const duration = getDuration(bond.maturityDate!.toString());

    const text = `${index + 1}. [${bond.name}](${url}) - \`${yieldValue}\`% - ${currentPrice} ${currency} - ${duration}`;

    return escapeMarkdownV2(text);
  });

  return builder.build();
};
