<script setup>
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import { formatMoney } from '../../utils/format'

const router = useRouter()
const store = useStaffStore()
</script>

<template>
  <div class="salary-card" v-if="store.currentSalary" @click="router.push('/staff/salary')">
    <div class="salary-left">
      <div class="salary-month-label">
        {{ store.currentSalary.month.split('-')[0] }}年{{ parseInt(store.currentSalary.month.split('-')[1]) }}月
      </div>
      <div class="salary-amount">{{ formatMoney(store.currentSalary.total) }}</div>
      <div class="salary-breakdown">
        <span v-for="cat in store.currentSalary.categories.slice(0, 3)" :key="cat.key">
          {{ cat.name }} {{ formatMoney(cat.amount, false) }}
        </span>
      </div>
    </div>
    <div class="salary-arrow">
      <van-icon name="arrow" color="#999" />
    </div>
  </div>
</template>

<style scoped>
.salary-card {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.salary-left { flex: 1; }

.salary-month-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.salary-amount {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 4px;
}

.salary-breakdown {
  display: flex;
  gap: 12px;
  margin-top: 6px;
  font-size: 11px;
  color: var(--text-secondary);
}

.salary-arrow {
  flex-shrink: 0;
  padding: 8px;
}
</style>
