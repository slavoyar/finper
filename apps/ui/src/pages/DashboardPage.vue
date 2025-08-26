<template>
  <a-layout class="budget-dashboard">
    <a-page-header title="Budget Dashboard" sub-title="Monthly & Yearly limits — Telegram user" />

    <a-card style="margin: 16px">
      <a-space style="width: 100%" direction="vertical">
        <a-row :gutter="16" align="top">
          <a-col :span="24">
            <a-space style="width: 100%">
              <a-space>
                <label>View</label>
                <a-segmented :options="['This month', 'This year']" v-model:value="viewMode" />
              </a-space>

              <a-space>
                <label>Period</label>
                <a-date-picker v-if="viewMode === 'This month'" :style="{ width: '100%' }" />
                <a-select v-else v-model:value="pickedYear" :style="{ width: '100%' }">
                  <a-select-option v-for="y in years" :key="y" :value="y">{{ y }}</a-select-option>
                </a-select>
              </a-space>

              <a-button type="primary" @click="refreshMock">Refresh mock</a-button>
            </a-space>
          </a-col>
        </a-row>

        <a-row :gutter="16" align="top">
          <a-col :span="16">
            <a-card title="Spending vs Limit">
              <div class="spend-summary">
                <div class="summary-item">
                  <a-space direction="vertical" style="width: 100%">
                    <a-flex justify="space-between">
                      <div>
                        <div>Income</div>
                        <a-typography :level="3" class="large-income">
                          {{ income }}
                        </a-typography>
                      </div>
                      <div>
                        <div>Expenses</div>
                        <a-typography :level="3" class="large-income">
                          {{ currency }}{{ formatted(totalSpent) }}
                        </a-typography>
                      </div>
                      <div>
                        <div>Net</div>
                        <a-typography :level="3" class="net-value">
                          {{ currency }}{{ formatted(netForView) }}
                        </a-typography>
                      </div>
                    </a-flex>

                    <div>
                      <div class="small-label">Spent of income</div>
                      <a-progress
                        :percent="percentOfIncome"
                        :status="percentOfIncome > 100 ? 'exception' : 'active'"
                      />
                    </div>
                    <div>
                      <div class="small-label">Budget limit</div>
                      <a-progress
                        :percent="totalPercent"
                        :status="totalPercent > 100 ? 'exception' : 'active'"
                      />
                    </div>
                  </a-space>
                </div>

                <div class="summary-item">
                  <div ref="pieChart" class="chart" />
                </div>
              </div>
            </a-card>
          </a-col>

          <a-col :span="8">
            <a-card title="Alerts">
              <a-list :data-source="alerts">
                <a-list-item v-for="(item, index) in alerts" :key="index">
                  <a-list-item-meta :title="item.title" :description="item.desc" />
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
        </a-row>
      </a-space>
    </a-card>

    <a-row :gutter="16" style="margin: 16px">
      <a-col :span="16">
        <a-card title="Spending trend">
          <div ref="lineChart" style="height: 320px"></div>
        </a-card>

        <a-card title="Top transactions" style="margin-top: 16px">
          <a-table
            :columns="txColumns"
            :data-source="topTransactions"
            :pagination="{ pageSize: 5 }"
            row-key="id"
          />
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card title="Category breakdown">
          <a-list>
            <a-list-item v-for="cat in categories" :key="cat.id">
              <a-space style="width: 100%" align="center" direction="vertical">
                <div style="width: 100%" class="cat-row">
                  <div class="cat-meta">
                    <div class="cat-name">{{ cat.name }}</div>
                    <div class="cat-values">
                      {{ currency }}{{ formatted(cat.spentThisMonth) }} / {{ currency
                      }}{{ formatted(cat.limitMonthly) }}
                    </div>
                  </div>
                  <div style="flex: 1">
                    <a-progress
                      :percent="percentFor(cat)"
                      :status="percentFor(cat) > 100 ? 'exception' : 'active'"
                    />
                  </div>
                </div>
              </a-space>
            </a-list-item>
          </a-list>
        </a-card>

        <a-card title="Quick actions" style="margin-top: 16px">
          <a-space direction="vertical">
            <a-button @click="simulateExpense">Simulate expense</a-button>
            <a-button @click="resetMock">Reset mock data</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from 'ant-design-vue/es/table';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { computed, onMounted, ref, watch } from 'vue';

// Mock data shape — later replace with API calls
const currency = '₽'; // change to your currency

const viewMode = ref<'This month' | 'This year'>('This month');
const pickedYear = ref(dayjs().year());
const years = [dayjs().year() - 1, dayjs().year(), dayjs().year() + 1];

const pieChart = ref<HTMLDivElement | null>(null);
const lineChart = ref<HTMLDivElement | null>(null);
let pieInstance: echarts.ECharts | null = null;
let lineInstance: echarts.ECharts | null = null;

// Simple mock generator
function baseMock() {
  // categories with monthly and yearly limits and spent values
  return {
    categories: [
      {
        id: 'food',
        name: 'Food',
        limitMonthly: 25000,
        limitYearly: 300000,
        spentThisMonth: 22000,
        spentYtd: 110000,
      },
      {
        id: 'transport',
        name: 'Transport',
        limitMonthly: 8000,
        limitYearly: 90000,
        spentThisMonth: 9000,
        spentYtd: 42000,
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        limitMonthly: 7000,
        limitYearly: 80000,
        spentThisMonth: 2000,
        spentYtd: 16000,
      },
      {
        id: 'bills',
        name: 'Utility bills',
        limitMonthly: 15000,
        limitYearly: 180000,
        spentThisMonth: 15000,
        spentYtd: 90000,
      },
      {
        id: 'shopping',
        name: 'Shopping',
        limitMonthly: 12000,
        limitYearly: 150000,
        spentThisMonth: 6000,
        spentYtd: 35000,
      },
    ],
    transactions: [
      {
        id: 1,
        date: dayjs().date(3).format('YYYY-MM-DD'),
        merchant: 'Grocery Express',
        amount: 12000,
        category: 'food',
      },
      {
        id: 2,
        date: dayjs().date(7).format('YYYY-MM-DD'),
        merchant: 'Metro',
        amount: 350,
        category: 'transport',
      },
      {
        id: 3,
        date: dayjs().date(9).format('YYYY-MM-DD'),
        merchant: 'Cinema',
        amount: 800,
        category: 'entertainment',
      },
      {
        id: 4,
        date: dayjs().date(11).format('YYYY-MM-DD'),
        merchant: 'Electricity Co',
        amount: 15000,
        category: 'bills',
      },
      {
        id: 5,
        date: dayjs().date(13).format('YYYY-MM-DD'),
        merchant: 'Mall',
        amount: 6000,
        category: 'shopping',
      },
    ],
    income: {
      month: 120000,
      ytd: 900000,
    },
    trend: (() => {
      // last 12 months
      const labels: string[] = [];
      const values: number[] = [];
      for (let i = 11; i >= 0; i--) {
        labels.push(dayjs().subtract(i, 'month').format('MMM YYYY'));
        // random-ish values using categories base
        values.push(Math.round(40000 + (Math.random() - 0.5) * 15000));
      }
      return { labels, values };
    })(),
  };
}

const mock = ref(baseMock());

const categories = computed(() => mock.value.categories);
const transactions = computed(() => mock.value.transactions);

const totalIncomeMonth = computed(() => mock.value.income?.month ?? 0);
const totalIncomeYtd = computed(() => mock.value.income?.ytd ?? 0);

const income = computed(() => {
  if (viewMode.value === 'This month') return `${currency}${formatted(totalIncomeMonth.value)}`;
  return `${currency}${formatted(totalIncomeYtd.value)}`;
});

const netForView = computed(() => {
  if (viewMode.value === 'This month') return totalIncomeMonth.value - totalSpent.value;
  return totalIncomeYtd.value - totalSpent.value;
});

const percentOfIncome = computed(() => {
  const income = viewMode.value === 'This month' ? totalIncomeMonth.value : totalIncomeYtd.value;
  if (!income) return 0;
  return Math.round((totalSpent.value / income) * 100);
});

const totalSpent = computed(() => {
  if (viewMode.value === 'This month') return categories.value.reduce((s, c) => s + c.spentThisMonth, 0);
  return categories.value.reduce((s, c) => s + c.spentYtd, 0);
});

const totalLimit = computed(() => {
  if (viewMode.value === 'This month') return categories.value.reduce((s, c) => s + c.limitMonthly, 0);
  return categories.value.reduce((s, c) => s + c.limitYearly, 0);
});

const totalPercent = computed(() => Math.round((totalSpent.value / Math.max(totalLimit.value, 1)) * 100));

const alerts = computed(() => {
  return categories.value
    .map((c) => {
      const spent = viewMode.value === 'This month' ? c.spentThisMonth : c.spentYtd;
      const limit = viewMode.value === 'This month' ? c.limitMonthly : c.limitYearly;
      if (spent > limit) {
        return {
          title: `${c.name} limit exceeded`,
          desc: `${currency}${formatted(spent)} / ${currency}${formatted(limit)}`,
        };
      }
      if (spent > limit * 0.9) {
        return {
          title: `${c.name} nearly at limit`,
          desc: `${currency}${formatted(spent)} / ${currency}${formatted(limit)}`,
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{ title: string; desc: string }>;
});

function percentFor(cat: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const spent = viewMode.value === 'This month' ? cat.spentThisMonth : cat.spentYtd;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const limit = viewMode.value === 'This month' ? cat.limitMonthly : cat.limitYearly;
  return Math.round((spent / Math.max(limit as number, 1)) * 100);
}

// Top transactions
const topTransactions = computed(() => transactions.value.slice(0, 10));

const txColumns: ColumnsType = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Merchant', dataIndex: 'merchant', key: 'merchant' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    customRender: ({ value }) => `${currency}${formatted(value as number)}`,
  },
];

// Charts rendering
function renderPie() {
  if (!pieChart.value) return;
  if (!pieInstance) pieInstance = echarts.init(pieChart.value);
  const data = categories.value.map((c) => ({
    name: c.name,
    value: viewMode.value === 'This month' ? c.spentThisMonth : c.spentYtd,
  }));
  const option = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Spending',
        type: 'pie',
        radius: '50%',
        data,
      },
    ],
  };
  pieInstance.setOption(option);
}

function renderLine() {
  if (!lineChart.value) return;
  if (!lineInstance) lineInstance = echarts.init(lineChart.value);
  const { labels, values } = mock.value.trend;
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: [{ name: 'Spend', type: 'line', data: values }],
  };
  lineInstance.setOption(option);
}

onMounted(() => {
  renderPie();
  renderLine();
  window.addEventListener('resize', () => {
    pieInstance?.resize();
    lineInstance?.resize();
  });
});

watch([categories, viewMode], () => {
  renderPie();
});

// Utilities & interactions
function formatted(n: number) {
  return n.toLocaleString();
}

function refreshMock() {
  mock.value = baseMock();
}

function simulateExpense() {
  // simulate a new random transaction and update categories
  const c = categories.value[Math.floor(Math.random() * categories.value.length)];
  const amount = Math.round(100 + Math.random() * 20000);
  transactions.value.unshift({
    id: Date.now(),
    date: dayjs().format('YYYY-MM-DD'),
    merchant: 'Simulated Tx',
    amount,
    category: c.id,
  });
  // update spent
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const idx = mock.value.categories.findIndex((x: any) => x.id === c.id);
  if (idx >= 0) {
    mock.value.categories[idx].spentThisMonth += amount;
    mock.value.categories[idx].spentYtd += amount;
  }
}

function resetMock() {
  mock.value = baseMock();
}
</script>

<style scoped>
.budget-dashboard {
  padding: 8px;
}
.spend-summary {
  display: flex;
  gap: 16px;
  align-items: center;
}
.summary-item {
  flex: 1;
}
.chart {
  height: 220px;
}
.cat-row {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}
.cat-meta {
  width: 180px;
}
.cat-name {
  font-weight: 600;
}
.cat-values {
  font-size: 12px;
  color: #666;
}
.income-row {
  display: flex;
  gap: 24px;
  margin-bottom: 8px;
}
.net-value {
  font-size: 24px;
  font-weight: 600;
  color: #1890ff;
}
.large-income {
  font-size: 24px;
  font-weight: 600;
}
</style>
