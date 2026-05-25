<script setup>
import { ref } from 'vue'

const activeMonth = ref('2026-05')

const months = ['2026-05', '2026-04', '2026-03', '2026-02', '2026-01']

const salaryData = ref({
  total: 8640,
  base: 4000,
  commission: 3200,
  bonus: 800,
  deduction: -160,
  subsidy: 800,
  actual: 8480,
  status: 'partial',
})

const details = [
  { label: '基本工资', value: '+ ¥4,000.00', type: 'base' },
  { label: '业绩提成', value: '+ ¥3,200.00', type: 'commission' },
  { label: '绩效奖金', value: '+ ¥800.00', type: 'bonus' },
  { label: '交通补贴', value: '+ ¥800.00', type: 'subsidy' },
  { label: '社保公积金', value: '- ¥160.00', type: 'deduction' },
]

function onMonthChange() {}
</script>

<template>
  <div class="page">
    <van-nav-bar title="工资查询" left-arrow @click-left="$router.back()" />

    <div class="salary-header">
      <div class="month-selector">
        <van-icon name="arrow-left" size="16" color="white" />
        <span class="month-text">2026年5月</span>
        <van-icon name="arrow" size="16" color="white" />
      </div>
      <div class="total-card">
        <span class="total-label">应发工资（元）</span>
        <span class="total-amount">{{ salaryData.total.toFixed(2) }}</span>
        <van-tag type="success" size="medium" round v-if="salaryData.status === 'partial'">已发放部分</van-tag>
        <van-tag type="warning" size="medium" round v-else>待发放</van-tag>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">工资明细</span>
      </div>
      <div class="card">
        <div v-for="item in details" :key="item.label" class="detail-item">
          <span class="detail-label">{{ item.label }}</span>
          <span class="detail-value" :class="item.type">
            {{ item.value }}
          </span>
        </div>
        <div class="detail-total">
          <span>实发工资</span>
          <span class="total-value">¥ {{ salaryData.actual.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Monthly trend -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">工资趋势</span>
      </div>
      <div class="card">
        <div class="trend-chart">
          <div v-for="(m, i) in months" :key="m" class="trend-bar-group">
            <div class="trend-bar" :style="{ height: [60, 75, 55, 70, 85][i] + '%' }"></div>
            <span class="trend-label">{{ m.split('-')[1] }}月</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.salary-header {
  background: linear-gradient(135deg, #4A6CF7, #6B8AFF);
  padding: 16px 20px 32px;
  text-align: center;
  position: relative;
}

.salary-header::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  right: 0;
  height: 32px;
  background: var(--bg-primary);
  border-radius: 20px 20px 0 0;
}

.month-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 0;
}

.month-text {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.total-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-top: 12px;
}

.total-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.total-amount {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 8px 0 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.detail-item + .detail-item {
  border-top: 1px solid var(--border-light);
}

.detail-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
}

.detail-value.base,
.detail-value.commission,
.detail-value.bonus,
.detail-value.subsidy {
  color: var(--success);
}

.detail-value.deduction {
  color: var(--danger);
}

.detail-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  margin-top: 4px;
  border-top: 2px solid var(--border);
  font-weight: 600;
}

.total-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.trend-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 120px;
  padding: 0 8px;
}

.trend-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.trend-bar {
  width: 24px;
  background: var(--primary);
  border-radius: 6px 6px 0 0;
  opacity: 0.7;
  min-height: 8px;
}

.trend-bar-group:last-child .trend-bar {
  opacity: 1;
}

.trend-label {
  font-size: 10px;
  color: var(--text-tertiary);
}
</style>
