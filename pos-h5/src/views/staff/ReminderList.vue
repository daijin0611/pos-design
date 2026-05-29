<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import { formatDate } from '../../utils/format'
import ReminderActionSheet from '../../components/staff/ReminderActionSheet.vue'

const router = useRouter()
const store = useStaffStore()
const activeTab = ref('pending')

const tabs = computed(() => [
  { key: 'pending', label: '待回访', count: store.pendingReminders.length + store.overdueReminders.length, isDanger: store.overdueReminders.length > 0 },
  { key: 'completed', label: '已完成', count: store.completedReminders.length },
])

const filteredList = computed(() => {
  if (activeTab.value === 'pending') return [...store.overdueReminders, ...store.pendingReminders]
  return store.completedReminders
})

const showAction = ref(false)
const actionItem = ref(null)

function openAction(item) { actionItem.value = item; showAction.value = true }
function onConfirm({ id, note }) { store.completeReminder(id, note); showAction.value = false }
function callMember(phone) { window.location.href = `tel:${phone}` }
</script>

<template>
  <div class="staff-page">
    <van-nav-bar title="回访提醒" left-arrow @click-left="router.back()" />

    <div class="tab-bar">
      <div v-for="tab in tabs" :key="tab.key" class="tab-item"
        :class="{ 'tab-item--active': activeTab === tab.key, 'tab-item--danger': tab.isDanger && activeTab === tab.key }"
        @click="activeTab = tab.key">
        {{ tab.label }}({{ tab.count }})
      </div>
    </div>

    <div class="reminder-list">
      <div v-for="item in filteredList" :key="item.id" class="reminder-card" :class="{ 'reminder-card--overdue': item.status === 'overdue' }">
        <div class="reminder-top">
          <div class="staff-avatar" style="background: #E8F8F5;">👩</div>
          <div class="reminder-info" @click="router.push(`/staff/member/${item.memberId}`)">
            <div class="reminder-name">{{ item.memberName }} · {{ item.serviceType }}</div>
            <div class="reminder-desc">上次服务 {{ formatDate(item.lastServiceDate) }} · 建议周期{{ item.cycleDays }}天</div>
            <div v-if="item.status === 'overdue'" class="reminder-overdue-text">⚠ 已超期 {{ item.overdueDays }} 天</div>
          </div>
        </div>

        <div v-if="item.status === 'completed' && item.note" class="reminder-note">
          📝 {{ item.note }}
          <div class="reminder-note-time">{{ item.completedAt }}</div>
        </div>

        <div v-if="item.status !== 'completed'" class="reminder-actions">
          <van-button type="primary" size="small" round @click="openAction(item)">已联系</van-button>
          <van-button size="small" round plain @click="callMember(item.phone)">📞 拨打</van-button>
        </div>
      </div>
      <van-empty v-if="!filteredList.length" description="暂无待回访会员，休息一下吧 🎉" />
    </div>

    <ReminderActionSheet v-model:show="showAction" :member-name="actionItem?.memberName || ''" :reminder-id="actionItem?.id || 0" @confirm="onConfirm" />
  </div>
</template>

<style scoped>
.tab-bar { display: flex; gap: 8px; padding: 12px 16px; }
.tab-item { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: #F7F8FA; color: var(--text-tertiary); cursor: pointer; }
.tab-item--active { background: #E8F8F5; color: var(--primary); font-weight: 600; }
.tab-item--danger { background: #FFF0F0; color: var(--danger); }
.reminder-list { padding: 0 16px; }
.reminder-card { background: white; border-radius: 12px; padding: 14px; margin-bottom: 10px; box-shadow: var(--shadow-card); }
.reminder-card--overdue { border: 1px solid #FFD0D0; background: #FFF8F8; }
.reminder-top { display: flex; gap: 10px; align-items: flex-start; }
.reminder-info { flex: 1; cursor: pointer; }
.reminder-name { font-size: 14px; font-weight: 500; }
.reminder-desc { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }
.reminder-overdue-text { font-size: 11px; color: var(--danger); margin-top: 4px; }
.reminder-note { margin-top: 8px; padding: 8px; background: #F7F8FA; border-radius: 8px; font-size: 12px; color: var(--text-secondary); }
.reminder-note-time { font-size: 10px; color: var(--text-tertiary); margin-top: 4px; }
.reminder-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end; }
</style>
