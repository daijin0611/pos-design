<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from './stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

function onTabSwitch(name) {
  const map = {
    member_home: '/member/home',
    member_appointment: '/member/appointment',
    member_coupon: '/member/coupon',
    member_profile: '/member/home',
    staff_home: '/staff/home',
    staff_members: '/staff/reminders',
    staff_reminders: '/staff/reminders',
    staff_profile: '/staff/home',
    admin_home: '/admin/home',
    admin_ranking: '/admin/ranking',
    admin_salary: '/admin/salary',
    admin_settings: '/admin/home',
  }
  if (map[name]) {
    router.push(map[name])
  }
}
</script>

<template>
  <router-view />
</template>

<style>
#app {
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  background: var(--bg-primary);
}
</style>
