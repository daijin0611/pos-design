import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const role = ref(localStorage.getItem('user_role') || 'member')
  const userInfo = ref({
    name: '张小姐',
    phone: '138****8888',
    avatar: '',
    memberLevel: 'VIP',
    balance: 3280.00,
    points: 1560,
    coupons: 3,
  })

  const isAdmin = computed(() => role.value === 'admin')
  const isStaff = computed(() => role.value === 'staff')
  const isMember = computed(() => role.value === 'member')

  function setRole(r) {
    role.value = r
    localStorage.setItem('user_role', r)
  }

  function switchRole() {
    const roles = ['member', 'staff', 'admin']
    const idx = roles.indexOf(role.value)
    setRole(roles[(idx + 1) % roles.length])
  }

  return { role, userInfo, isAdmin, isStaff, isMember, setRole, switchRole }
})
