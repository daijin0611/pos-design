<script setup>
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import GreetingHeader from '../../components/staff/GreetingHeader.vue'
import TodayOverview from '../../components/staff/TodayOverview.vue'
import SalaryCard from '../../components/staff/SalaryCard.vue'
import FollowupItem from '../../components/staff/FollowupItem.vue'
import BirthdayItem from '../../components/staff/BirthdayItem.vue'

const router = useRouter()
const store = useStaffStore()

const quickEntries = [
  { icon: 'balance-list-o', label: '工资查询', bg: '#E8F8F5', color: '#2CB5A0', to: '/staff/salary' },
  { icon: 'bell', label: '回访提醒', bg: '#EBF3FB', color: '#5B9BD5', to: '/staff/reminder' },
  { icon: 'gift-card-o', label: '生日提醒', bg: '#FEF0F4', color: '#F5A0B5', to: '/staff/birthday' },
]
</script>

<template>
  <div class="staff-page">
    <div class="staff-header-gradient">
      <GreetingHeader />
    </div>

    <div style="margin-top: -10px; position: relative; z-index: 1; padding-top: 4px;">
      <TodayOverview />
    </div>

    <div class="staff-section-header" style="margin-top: 16px;">
      <span class="staff-section-title">本月工资</span>
      <span class="staff-section-more" @click="router.push('/staff/salary')">查看详情 →</span>
    </div>
    <SalaryCard />

    <div class="staff-section-header">
      <span class="staff-section-title">待跟进</span>
      <span class="staff-section-more" @click="router.push('/staff/reminder')">查看全部 →</span>
    </div>
    <div style="padding: 0 16px 4px;">
      <FollowupItem v-for="item in store.topReminders" :key="item.id" :item="item" />
      <BirthdayItem v-if="store.thisWeekBirthdays.length" :item="store.thisWeekBirthdays[0]" section="thisWeek" />
    </div>

    <div class="staff-section-header">
      <span class="staff-section-title">功能入口</span>
    </div>
    <div class="staff-card entries-grid">
      <div v-for="entry in quickEntries" :key="entry.label" class="entry-item" @click="router.push(entry.to)">
        <div class="entry-icon" :style="{ background: entry.bg }">
          <van-icon :name="entry.icon" size="22" :color="entry.color" />
        </div>
        <span class="entry-label">{{ entry.label }}</span>
      </div>
    </div>

    <div style="height: 24px;"></div>
  </div>
</template>

<style scoped>
.entries-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.entry-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.entry-label {
  font-size: 11px;
  color: var(--text-secondary);
}
</style>
