<script setup>
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import BirthdayItem from '../../components/staff/BirthdayItem.vue'

const router = useRouter()
const store = useStaffStore()
</script>

<template>
  <div class="staff-page">
    <van-nav-bar title="🎂 生日提醒" left-arrow @click-left="router.back()">
      <template #right>
        <span style="font-size: 12px; color: #999;">本月共 {{ store.birthdays.length }} 位</span>
      </template>
    </van-nav-bar>

    <div v-if="store.thisWeekBirthdays.length" class="birthday-section">
      <div class="birthday-section-title birthday-section-title--pink">📆 本周</div>
      <div style="padding: 0 16px;">
        <BirthdayItem v-for="item in store.thisWeekBirthdays" :key="item.id" :item="item" section="thisWeek" />
      </div>
    </div>

    <div v-if="store.thisMonthBirthdays.length" class="birthday-section">
      <div class="birthday-section-title">📆 本月后续</div>
      <div style="padding: 0 16px;">
        <BirthdayItem v-for="item in store.thisMonthBirthdays" :key="item.id" :item="item" section="thisMonth" />
      </div>
    </div>

    <van-empty v-if="!store.birthdays.length" description="本月暂无会员过生日" />
  </div>
</template>

<style scoped>
.birthday-section { margin-bottom: 16px; }
.birthday-section-title { font-size: 12px; font-weight: 600; color: var(--text-tertiary); padding: 12px 16px 8px; }
.birthday-section-title--pink { color: #F5A0B5; }
</style>
