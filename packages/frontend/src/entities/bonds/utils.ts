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
