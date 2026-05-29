<script setup>
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'

const router = useRouter()
const store = useStaffStore()
</script>

<template>
  <div class="todo-summary">
    <div class="todo-stat todo-stat--danger" @click="router.push('/staff/reminder')">
      <span class="todo-value">{{ store.overdueReminders.length + store.pendingReminders.length }}</span>
      <span class="todo-label">待回访</span>
    </div>
    <div class="todo-stat todo-stat--pink" @click="router.push('/staff/birthday')">
      <span class="todo-value">{{ store.thisWeekBirthdays.length }}</span>
      <span class="todo-label">本周生日</span>
    </div>
    <div class="todo-stat todo-stat--success">
      <span class="todo-value">{{ store.todayDoneCount }}</span>
      <span class="todo-label">已完成</span>
    </div>
  </div>
</template>

<style scoped>
.todo-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 0 16px;
}

.todo-stat {
  background: white;
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.todo-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.todo-label {
  display: block;
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.todo-stat--danger .todo-value { color: var(--danger); }
.todo-stat--pink .todo-value { color: #F5A0B5; }
.todo-stat--success .todo-value { color: var(--primary); }
</style>
