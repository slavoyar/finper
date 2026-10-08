export const BOND_FILTERS_KEY = 'finper:bond-filters';

export type BondSortField = 'yield' | 'duration';
export type BondSortOrder = 'ascend' | 'descend';

export type BondFilters = {
  selectedRisks: number[];
  sortField: BondSortField;
  sortOrder: BondSortOrder;
  minDuration: number | null;
  maxDuration: number | null;
};

const RISK_LEVELS = new Set([1, 2, 3]);

export const defaultBondFilters = (): BondFilters => ({
  selectedRisks: [1],
  sortField: 'yield',
  sortOrder: 'descend',
  minDuration: null,
  maxDuration: null,
});

const asRisks = (value: unknown): number[] => {
  if (!Array.isArray(value)) {
    return [1];
  }
  return value.filter((level): level is number => typeof level === 'number' && RISK_LEVELS.has(level));
};

const asDuration = (value: unknown): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return value;
};

export const parseBondFilters = (raw: string | null): BondFilters => {
  const defaults = defaultBondFilters();
  if (!raw) {
    return defaults;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return defaults;
    }
    const data = parsed as Record<string, unknown>;
    return {
      selectedRisks: asRisks(data.selectedRisks),
      sortField: data.sortField === 'duration' ? 'duration' : 'yield',
      sortOrder: data.sortOrder === 'ascend' ? 'ascend' : 'descend',
      minDuration: asDuration(data.minDuration),
      maxDuration: asDuration(data.maxDuration),
    };
  } catch {
    return defaults;
  }
};

export const loadBondFilters = (): BondFilters => {
  try {
    return parseBondFilters(localStorage.getItem(BOND_FILTERS_KEY));
  } catch {
    return defaultBondFilters();
  }
};

export const orderDuration = (min: number | null, max: number | null) => {
  if (min != null && max != null && min > max) {
    return { min: max, max: min };
  }
  return { min, max };
};

export const saveBondFilters = (filters: BondFilters) => {
  try {
    localStorage.setItem(BOND_FILTERS_KEY, JSON.stringify(filters));
  } catch {
    // Storage can be unavailable in private mode.
  }
};

const demo = () => {
  const broken = parseBondFilters('{');
  console.assert(broken.sortField === 'yield' && broken.selectedRisks[0] === 1, 'bad json falls back');

  const empty = parseBondFilters(null);
  console.assert(empty.sortOrder === 'descend' && empty.minDuration === null, 'null uses defaults');

  const parsed = parseBondFilters(
    JSON.stringify({
      selectedRisks: [2, 9, 'x'],
      sortField: 'duration',
      sortOrder: 'ascend',
      minDuration: 6,
      maxDuration: 0,
    })
  );
  console.assert(parsed.sortField === 'duration' && parsed.sortOrder === 'ascend', 'sort is kept');
  console.assert(parsed.selectedRisks.length === 1 && parsed.selectedRisks[0] === 2, 'risks are sanitized');
  console.assert(parsed.minDuration === 6 && parsed.maxDuration === null, 'duration is sanitized');
  console.assert(parseBondFilters('[]').sortField === 'yield', 'non-object falls back');

  const swapped = orderDuration(24, 6);
  console.assert(swapped.min === 6 && swapped.max === 24, 'months swap when min is higher');
  console.assert(orderDuration(6, 24).min === 6 && orderDuration(null, 4).max === 4, 'ordered range stays');
};

const entry = (globalThis as { process?: { argv?: string[] } }).process?.argv?.[1];
if (entry?.replace(/\\/g, '/').endsWith('bond-filters.ts')) {
  demo();
}
