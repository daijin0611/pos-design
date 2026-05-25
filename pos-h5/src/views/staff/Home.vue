<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('staff_home')

const todayStats = ref([
  { label: '今日预约', value: 6, color: '#4A6CF7' },
  { label: '已完成', value: 4, color: '#2CB5A0' },
  { label: '待跟进', value: 2, color: '#E8A849' },
])

const quickEntries = [
  { icon: 'balance-list-o', label: '工资查询', bg: '#EBF0FF', color: '#4A6CF7', to: '/staff/salary' },
  { icon: 'bell', label: '会员提醒', bg: '#ECF8F4', color: '#2CB5A0', to: '/staff/reminders' },
  { icon: 'gift-card-o', label: '生日提醒', bg: '#FEF0F4', color: '#F5A0B5', to: '/staff/reminders' },
  { icon: 'search', label: '会员查询', bg: '#EBF3FB', color: '#5B9BD5', to: '' },
  { icon: 'star-o', label: '满意度', bg: '#F8EFE1', color: '#E8A849', to: '' },
  { icon: 'cash-back-record', label: '手机收银', bg: '#F0E8F8', color: '#8B5CF6', to: '' },
  { icon: 'chart-trending-o', label: '我的业绩', bg: '#ECF8F4', color: '#2CB5A0', to: '' },
  { icon: 'setting-o', label: '设置', bg: '#EBF3FB', color: '#5B9BD5', to: '' },
]

const reminders = ref([
  { id: 1, name: '李女士', desc: '肩颈调理回访', detail: '上次服务：5月18日', time: '2小时前', type: 'follow', avatar: 'user-circle-o' },
  { id: 2, name: '王女士', desc: '明天生日', detail: 'VIP会员 · 可发送生日优惠券', time: '待处理', type: 'birthday', avatar: 'gift-card-o' },
  { id: 3, name: '陈女士', desc: '全身SPA回访', detail: '上次服务：5月15日 · 满意度4.8', time: '昨天', type: 'follow', avatar: 'user-circle-o' },
])
</script>

<template>
  <div class="page page-with-tabbar">
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="greeting">
            <h2>张技师，早上好</h2>
            <p>今天是你在刘丽德的第 386 天</p>
          </div>
          <van-tag type="primary" size="medium" round class="role-tag">高级技师</van-tag>
        </div>
      </div>
    </div>

    <!-- Today Stats -->
    <div class="stats-row fade-in">
      <div v-for="stat in todayStats" :key="stat.label" class="stat-card">
        <span class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Quick Entries -->
    <div class="entries-grid fade-in">
      <div
        v-for="entry in quickEntries"
        :key="entry.label"
        class="entry-item"
        @click="entry.to && router.push(entry.to)"
      >
        <div class="entry-icon" :style="{ background: entry.bg }">
          <van-icon :name="entry.icon" size="22" :color="entry.color" />
        </div>
        <span class="entry-label">{{ entry.label }}</span>
      </div>
    </div>

    <!-- Salary Card -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">本月工资</span>
        <span class="section-more" @click="router.push('/staff/salary')">查看详情
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card salary-card">
        <div>
          <span class="salary-month">2026年5月（截至25日）</span>
          <span class="salary-amount">¥ 8,640.00</span>
        </div>
        <van-tag type="success" size="medium" round>已发放部分</van-tag>
      </div>
    </div>

    <!-- Reminders -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">今日待跟进</span>
        <span class="section-more" @click="router.push('/staff/reminders')">全部提醒
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card reminder-list">
        <div v-for="item in reminders" :key="item.id" class="reminder-item">
          <div class="reminder-avatar" :class="item.type">
            <van-icon :name="item.avatar" size="20" />
          </div>
          <div class="reminder-info">
            <h4>{{ item.name }} — {{ item.desc }}</h4>
            <p>{{ item.detail }}</p>
          </div>
          <span class="reminder-time">{{ item.time }}</span>
        </div>
      </div>
    </div>

    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item icon="wap-home-o" to="/staff/home">工作台</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/staff/reminders">会员</van-tabbar-item>
      <van-tabbar-item icon="bell" to="/staff/reminders">提醒</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/staff/home">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #4A6CF7, #6B8AFF);
  padding-bottom: 16px;
  position: relative;
}

.header::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  right: 0;
  height: 32px;
  background: var(--bg-primary);
  border-radius: 20px 20px 0 0;
}

.header-content {
  padding: 48px 20px 0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greeting h2 {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.greeting p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}

.role-tag {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: transparent !important;
  color: white !important;
  font-size: 12px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px 16px 8px;
  position: relative;
  z-index: 1;
}

.stat-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px 12px;
  text-align: center;
  box-shadow: var(--shadow-card);
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.entries-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
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

.salary-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary-month {
  display: block;
  font-size: 12px;
  color: var(--text-tertiary);
}

.salary-amount {
  display: block;
  font-size: 26px;
  font-weight: 700;
  margin-top: 4px;
}

.reminder-list {
  padding: 8px 16px;
}

.reminder-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.reminder-item + .reminder-item {
  border-top: 1px solid var(--border-light);
}

.reminder-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reminder-avatar.follow {
  background: var(--primary-light);
  color: var(--primary);
}

.reminder-avatar.birthday {
  background: var(--accent-light);
  color: var(--accent);
}

.reminder-info {
  flex: 1;
  min-width: 0;
}

.reminder-info h4 {
  font-size: 14px;
  font-weight: 500;
}

.reminder-info p {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.reminder-time {
  font-size: 11px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}
</style>
