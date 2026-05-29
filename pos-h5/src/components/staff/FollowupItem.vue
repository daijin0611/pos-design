<script setup>
import { useRouter } from 'vue-router'
import { formatDate } from '../../utils/format'

const props = defineProps({
  item: { type: Object, required: true },
})

const router = useRouter()

function goDetail() {
  router.push(`/staff/member/${props.item.memberId}`)
}
</script>

<template>
  <div class="followup-item" @click="goDetail">
    <div class="staff-avatar" style="background: #E8F8F5;">👩</div>
    <div class="followup-info">
      <div class="followup-name">{{ item.memberName }} · {{ item.serviceType }}回访</div>
      <div class="followup-desc">上次服务 {{ formatDate(item.lastServiceDate) }} · 建议周期{{ item.cycleDays }}天</div>
    </div>
    <span v-if="item.status === 'overdue'" class="staff-tag staff-tag-danger">超期{{ item.overdueDays }}天</span>
    <span v-else-if="item.status === 'pending'" class="staff-tag staff-tag-primary">待跟进</span>
    <span v-else class="staff-tag" style="background: #f5f5f5; color: #999;">已完成</span>
  </div>
</template>

<style scoped>
.followup-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: white;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
}

.followup-item:active { background: #f9f9f9; }

.followup-info { flex: 1; min-width: 0; }

.followup-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.followup-desc {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
