<script setup>
import { useStaffStore } from '../../stores/staff'
import { formatMoney } from '../../utils/format'

const store = useStaffStore()

function formatValue(metric) {
  if (metric.unit === '元') return formatMoney(metric.value, false)
  return metric.value
}
</script>

<template>
  <div class="today-overview">
    <div class="today-overview__title">今日数据</div>
    <div class="today-overview__grid">
      <div
        v-for="metric in store.todayOverview"
        :key="metric.key"
        class="today-metric"
      >
        <div class="today-metric__icon" :style="{ background: metric.bg }">
          <van-icon :name="metric.icon" size="18" :color="metric.color" />
        </div>
        <div class="today-metric__content">
          <span class="today-metric__value" :style="{ color: metric.color }">
            {{ formatValue(metric) }}
          </span>
          <span class="today-metric__unit" v-if="metric.unit !== '元'">{{ metric.unit }}</span>
        </div>
        <span class="today-metric__label">{{ metric.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-overview {
  margin: 0 16px;
  background: white;
  border-radius: 14px;
  padding: 14px 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.today-overview__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  padding-left: 2px;
}

.today-overview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 8px;
}

.today-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 4px;
  border-radius: 10px;
  background: var(--bg-primary);
}

.today-metric__icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.today-metric__content {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.today-metric__value {
  font-size: 16px;
  font-weight: 700;
}

.today-metric__unit {
  font-size: 10px;
  color: var(--text-tertiary);
}

.today-metric__label {
  font-size: 10px;
  color: var(--text-tertiary);
}
</style>
