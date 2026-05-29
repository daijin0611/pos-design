<script setup>
import { useRouter } from 'vue-router'
import { formatMoney, formatDaysUntil } from '../../utils/format'

const props = defineProps({
  item: { type: Object, required: true },
  section: { type: String, default: 'thisWeek' },
})

const router = useRouter()

function goDetail() {
  router.push(`/staff/member/${props.item.memberId}`)
}

function callMember() {
  window.location.href = `tel:${props.item.phone}`
}
</script>

<template>
  <div class="birthday-item" :class="{ 'birthday-item--highlight': section === 'thisWeek' }" @click="goDetail">
    <div class="staff-avatar" :style="{ background: section === 'thisWeek' ? '#FFF0E0' : '#E8F8F5' }">🎂</div>
    <div class="birthday-info">
      <div class="birthday-name">{{ item.memberName }}</div>
      <div class="birthday-desc">
        {{ formatDaysUntil(item.daysUntil) }} · {{ item.vipLevel }} · 累计消费{{ formatMoney(item.totalSpent, false) }}
      </div>
    </div>
    <div v-if="section === 'thisWeek'" class="birthday-action" @click.stop="callMember">📞 致电</div>
    <div v-else class="birthday-days">{{ item.daysUntil }}天后</div>
  </div>
</template>

<style scoped>
.birthday-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
}

.birthday-item--highlight { background: #FFF5F7; }
.birthday-item:not(.birthday-item--highlight) { background: #F7F8FA; }

.birthday-info { flex: 1; min-width: 0; }

.birthday-name { font-size: 13px; font-weight: 500; }

.birthday-desc {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.birthday-action {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  background: #F5A0B5;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.birthday-days {
  font-size: 10px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}
</style>
