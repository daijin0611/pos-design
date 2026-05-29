<script setup>
import { useStaffStore } from '../../stores/staff'
import { getGreeting } from '../../utils/format'

const store = useStaffStore()
const greeting = getGreeting()
</script>

<template>
  <div class="greeting-header">
    <div class="greeting-text">
      <h2>{{ store.info.name }}，{{ greeting.text }} {{ greeting.emoji }}</h2>
      <p>{{ store.info.store }} · {{ store.info.role }}</p>
    </div>
    <span class="greeting-role-tag">{{ store.info.role }}</span>
  </div>
</template>

<style scoped>
.greeting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greeting-text h2 {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.greeting-text p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}

.greeting-role-tag {
  padding: 4px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  color: white;
  white-space: nowrap;
}
</style>
