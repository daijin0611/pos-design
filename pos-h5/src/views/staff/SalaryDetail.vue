<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import { formatMoney, formatDate } from '../../utils/format'

const router = useRouter()
const route = useRoute()
const store = useStaffStore()

const category = computed(() => route.params.category)
const categoryName = computed(() => {
  const map = { labor: '劳动工资', product: '产品提成', card: '开卡提成', other: '其他' }
  return map[category.value] || '工资明细'
})
const details = computed(() => store.getSalaryDetail(category.value))
const total = computed(() => details.value.reduce((sum, d) => sum + d.amount, 0))
</script>

<template>
  <div class="staff-page">
    <van-nav-bar :title="categoryName + '明细'" left-arrow @click-left="router.back()" />
    <div class="detail-total">
      <span class="detail-total-label">合计</span>
      <span class="detail-total-amount">{{ formatMoney(total) }}</span>
    </div>
    <div class="detail-list">
      <div v-for="item in details" :key="item.id" class="detail-item">
        <div class="detail-left">
          <div class="detail-project">{{ item.project }}</div>
          <div class="detail-meta">{{ formatDate(item.date) }} · {{ item.member }}</div>
        </div>
        <div class="detail-amount">+{{ formatMoney(item.amount, false) }}</div>
      </div>
    </div>
    <van-empty v-if="!details.length" description="暂无明细记录" />
  </div>
</template>

<style scoped>
.detail-total { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: white; margin-bottom: 8px; }
.detail-total-label { font-size: 14px; color: var(--text-secondary); }
.detail-total-amount { font-size: 18px; font-weight: 700; color: var(--primary); }
.detail-list { padding: 0 16px; }
.detail-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f5f5f5; }
.detail-project { font-size: 14px; font-weight: 500; }
.detail-meta { font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }
.detail-amount { font-size: 15px; font-weight: 600; color: var(--primary); flex-shrink: 0; }
</style>
