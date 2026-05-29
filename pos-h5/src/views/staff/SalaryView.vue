<script setup>
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import { formatMoney, formatMonth } from '../../utils/format'

const router = useRouter()
const store = useStaffStore()

function prevMonth() {
  const idx = store.salaryMonths.indexOf(store.currentMonth)
  if (idx < store.salaryMonths.length - 1) store.setMonth(store.salaryMonths[idx + 1])
}

function nextMonth() {
  const idx = store.salaryMonths.indexOf(store.currentMonth)
  if (idx > 0) store.setMonth(store.salaryMonths[idx - 1])
}

function goDetail(category) {
  router.push(`/staff/salary/${category}`)
}
</script>

<template>
  <div class="staff-page">
    <van-nav-bar title="工资查询" left-arrow @click-left="router.back()" />

    <div class="month-selector">
      <span class="month-arrow" @click="prevMonth">◀</span>
      <span class="month-text">{{ formatMonth(store.currentMonth) }}</span>
      <span class="month-arrow" @click="nextMonth">▶</span>
    </div>

    <div class="total-card" v-if="store.currentSalary">
      <div class="total-label">本月总工资</div>
      <div class="total-amount">{{ formatMoney(store.currentSalary.total) }}</div>
      <div class="total-compare">
        较上月
        <span :class="store.currentSalary.compareLastMonth >= 0 ? 'compare-up' : 'compare-down'">
          {{ store.currentSalary.compareLastMonth >= 0 ? '↑' : '↓' }}
          {{ formatMoney(Math.abs(store.currentSalary.compareLastMonth), false) }}
        </span>
      </div>
    </div>

    <div class="category-grid" v-if="store.currentSalary">
      <div v-for="cat in store.currentSalary.categories" :key="cat.key" class="category-card" @click="cat.key !== 'other' && goDetail(cat.key)">
        <div class="cat-header">
          <span class="cat-dot" :style="{ background: cat.color }"></span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
        <div class="cat-amount">{{ formatMoney(cat.amount) }}</div>
        <div v-if="cat.key !== 'other'" class="cat-link">点击查看明细 ›</div>
        <div v-else class="cat-link" style="color: #ccc;">暂无明细</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-selector { display: flex; justify-content: flex-end; align-items: center; gap: 8px; padding: 12px 16px; }
.month-arrow { font-size: 12px; color: #999; padding: 4px 8px; cursor: pointer; }
.month-text { font-size: 14px; font-weight: 500; color: var(--primary); }
.total-card { background: linear-gradient(135deg, #2CB5A0, #3DD5B5); border-radius: 12px; padding: 20px; margin: 0 16px 16px; color: white; }
.total-label { font-size: 12px; opacity: 0.8; }
.total-amount { font-size: 32px; font-weight: 700; margin-top: 4px; }
.total-compare { font-size: 12px; margin-top: 6px; opacity: 0.9; }
.compare-up { color: #FFE082; }
.compare-down { color: #FFCDD2; }
.category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 16px; }
.category-card { background: white; border-radius: 12px; padding: 14px; box-shadow: var(--shadow-card); cursor: pointer; }
.category-card:active { background: #fafafa; }
.cat-header { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.cat-dot { width: 6px; height: 6px; border-radius: 50%; }
.cat-name { font-size: 11px; color: var(--text-tertiary); }
.cat-amount { font-size: 20px; font-weight: 700; color: var(--text-primary); }
.cat-link { font-size: 10px; color: var(--primary); margin-top: 4px; }
</style>
