<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()
const user = userStore.userInfo

const actions = [
  { icon: 'balance-o', label: '余额查询', color: '#2CB5A0', bg: '#ECF8F4', to: '/member/balance' },
  { icon: 'calendar-o', label: '预约', color: '#F5A0B5', bg: '#FEF0F4', to: '/member/appointment' },
  { icon: 'coupon-o', label: '优惠券', color: '#E8A849', bg: '#F8EFE1', to: '/member/coupon' },
  { icon: 'location-o', label: '门店', color: '#5B9BD5', bg: '#EBF3FB', to: '' },
  { icon: 'qr', label: '二维码', color: '#2CB5A0', bg: '#ECF8F4', to: '' },
  { icon: 'star-o', label: '积分', color: '#E8A849', bg: '#F8EFE1', to: '' },
  { icon: 'gift-o', label: '兑换', color: '#F5A0B5', bg: '#FEF0F4', to: '' },
  { icon: 'gold-coin-o', label: '充值', color: '#2CB5A0', bg: '#ECF8F4', to: '' },
]

const appointments = ref([
  { id: 1, service: '肩颈调理', time: '明天 14:00', staff: '张技师', store: '万达店', status: 'confirmed' },
])

const transactions = ref([
  { id: 1, name: '肩颈调理', date: '05-20', store: '万达店', amount: -298, type: 'expense' },
  { id: 2, name: '余额充值', date: '05-15', store: '微信支付', amount: 2000, type: 'income' },
  { id: 3, name: '全身精油SPA', date: '05-10', store: '万达店', amount: -498, type: 'expense' },
  { id: 4, name: '积分兑换 · 面部护理', date: '05-05', store: '', amount: -500, type: 'points' },
])

function formatAmount(item) {
  if (item.type === 'points') return `- ${Math.abs(item.amount)}积分`
  return `${item.amount > 0 ? '+' : '-'} ¥${Math.abs(item.amount).toFixed(2)}`
}

const activeTab = ref('member_home')
</script>

<template>
  <div class="page page-with-tabbar">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="greeting">
            <h2>你好，{{ user.name }}</h2>
            <p>欢迎来到刘丽德健康</p>
          </div>
          <div class="header-right">
            <van-icon name="bell" size="22" color="white" badge="2" @click="$router.push('')" />
          </div>
        </div>

        <div class="balance-card fade-in">
          <div class="balance-main">
            <span class="balance-label">账户余额（元）</span>
            <span class="balance-amount">{{ user.balance.toFixed(2) }}</span>
          </div>
          <div class="balance-stats">
            <div class="stat-item">
              <span class="stat-value points">{{ user.points }}</span>
              <span class="stat-label">积分</span>
            </div>
            <div class="stat-item">
              <span class="stat-value coupons">{{ user.coupons }}</span>
              <span class="stat-label">优惠券</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notice -->
    <van-notice-bar
      left-icon="volume-o"
      text="本周新上架「肩颈深度调理」项目，会员专享8折优惠"
      color="#D49530"
      background="#F8EFE1"
    />

    <!-- Quick Actions -->
    <div class="actions-grid fade-in">
      <div
        v-for="item in actions"
        :key="item.label"
        class="action-item"
        @click="item.to && router.push(item.to)"
      >
        <div class="action-icon" :style="{ background: item.bg }">
          <van-icon :name="item.icon" size="24" :color="item.color" />
        </div>
        <span class="action-label">{{ item.label }}</span>
      </div>
    </div>

    <!-- My Appointments -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">我的预约</span>
        <span class="section-more" @click="router.push('/member/appointment')">查看全部
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card" v-if="appointments.length">
        <div v-for="apt in appointments" :key="apt.id" class="apt-item">
          <div class="apt-info">
            <h4>{{ apt.service }}</h4>
            <p>{{ apt.time }} · {{ apt.staff }} · {{ apt.store }}</p>
          </div>
          <van-tag type="success" size="medium" round>已确认</van-tag>
        </div>
      </div>
      <van-empty v-else description="暂无预约" :image-size="64" />
    </div>

    <!-- Recent Transactions -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">最近消费</span>
        <span class="section-more" @click="router.push('/member/balance')">查看全部
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card">
        <div
          v-for="tx in transactions"
          :key="tx.id"
          class="tx-item"
        >
          <div class="tx-info">
            <h4>{{ tx.name }}</h4>
            <p>{{ tx.date }} · {{ tx.store }}</p>
          </div>
          <span
            class="tx-amount"
            :class="tx.type"
            :style="tx.type === 'points' ? 'color: var(--accent)' : ''"
          >
            {{ formatAmount(tx) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Tab Bar -->
    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item icon="wap-home-o" to="/member/home">首页</van-tabbar-item>
      <van-tabbar-item icon="calendar-o" to="/member/appointment">预约</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/member/coupon">优惠券</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/member/home">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.header {
  background: var(--primary-gradient);
  padding-bottom: 32px;
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
  margin-bottom: 20px;
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

.balance-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 24px rgba(44, 181, 160, 0.15);
  position: relative;
  z-index: 1;
}

.balance-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.balance-amount {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-top: 4px;
}

.balance-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.stat-value.points { color: var(--accent); }
.stat-value.coupons { color: var(--secondary); }

.stat-label {
  font-size: 10px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 24px 16px 8px;
  position: relative;
  z-index: 1;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.apt-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.apt-info h4 {
  font-size: 15px;
  font-weight: 600;
}

.apt-info p {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.tx-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.tx-item + .tx-item {
  border-top: 1px solid var(--border-light);
}

.tx-info h4 {
  font-size: 14px;
  font-weight: 500;
}

.tx-info p {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.tx-amount {
  font-size: 14px;
  font-weight: 600;
}

.tx-amount.expense { color: var(--text-primary); }
.tx-amount.income { color: var(--primary); }
</style>
