// src/stores/staff.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  staffInfo,
  salaryData,
  remindersData,
  birthdaysData,
  memberProfiles,
  todayOverviewData,
} from '../mock/staff'

export const useStaffStore = defineStore('staff', () => {
  const info = ref(staffInfo)

  const currentMonth = ref('2026-05')
  const salaryMonths = computed(() =>
    Object.keys(salaryData).sort().reverse()
  )
  const currentSalary = computed(
    () => salaryData[currentMonth.value] || null
  )

  function setMonth(month) {
    currentMonth.value = month
  }

  function getSalaryDetail(category) {
    const salary = salaryData[currentMonth.value]
    if (!salary) return []
    return salary.details[category] || []
  }

  const reminders = ref([...remindersData])

  const pendingReminders = computed(() =>
    reminders.value.filter((r) => r.status === 'pending')
  )
  const overdueReminders = computed(() =>
    reminders.value.filter((r) => r.status === 'overdue')
  )
  const completedReminders = computed(() =>
    reminders.value.filter((r) => r.status === 'completed')
  )

  const topReminders = computed(() => {
    const overdue = overdueReminders.value
    const pending = pendingReminders.value
    return [...overdue, ...pending].slice(0, 3)
  })

  function completeReminder(id, note = '') {
    const item = reminders.value.find((r) => r.id === id)
    if (item) {
      item.status = 'completed'
      item.overdueDays = 0
      item.completedAt = new Date().toLocaleString('zh-CN')
      item.note = note
    }
  }

  const birthdays = ref(birthdaysData)

  const thisWeekBirthdays = computed(() =>
    birthdays.value.filter((b) => b.section === 'thisWeek')
  )
  const thisMonthBirthdays = computed(() =>
    birthdays.value.filter((b) => b.section === 'thisMonth')
  )

  function getMemberProfile(memberId) {
    return memberProfiles[memberId] || null
  }

  const todayTodoCount = computed(() => {
    const overdue = overdueReminders.value.length
    const pending = pendingReminders.value.length
    const birthday = thisWeekBirthdays.value.length
    return overdue + pending + birthday
  })

  const todayDoneCount = computed(() => completedReminders.value.length)

  const todayOverview = ref(todayOverviewData.metrics)

  return {
    info,
    currentMonth,
    salaryMonths,
    currentSalary,
    setMonth,
    getSalaryDetail,
    reminders,
    pendingReminders,
    overdueReminders,
    completedReminders,
    topReminders,
    completeReminder,
    birthdays,
    thisWeekBirthdays,
    thisMonthBirthdays,
    getMemberProfile,
    todayTodoCount,
    todayDoneCount,
    todayOverview,
  }
})