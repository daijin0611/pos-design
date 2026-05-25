<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('admin_home')

const dashCards = [
  { label: '今日营业额', value: '¥ 12,480', change: '+12.5%', up: true, icon: 'chart-trending-o' },
  { label: '今日客流', value: '28', change: '+8人', up: true, icon: 'friends-o' },
  { label: '平均满意度', value: '4.8', change: '+0.2', up: true, icon: 'star-o' },
  { label: '月目标完成', value: '73%', change: '¥86,400/¥120,000', up: true, icon: 'aim', color: 'var(--success)' },
]

const quickActions = [
  { icon: 'chart-trending-o', label: '业绩查询', bg: '#EBF0FF', color: '#4A6CF7', to: '/admin/performance' },
  { icon: 'balance-list-o', label: '工资查询', bg: '#ECF8F4', color: '#2CB5A0', to: '/admin/salary' },
  { icon: 'medal-o', label: '项目排名', bg: '#F8EFE1', color: '#E8A849', to: '/admin/ranking' },
  { icon: 'manager-o', label: '员工排名', bg: '#FEF0F4', color: '#F5A0B5', to: '/admin/ranking' },
]

const staffRanking = ref([
  { rank: 1, name: '张技师', role: '高级技师 · 肩颈调理', value: '¥ 18,600' },
  { rank: 2, name: '李技师', role: '高级技师 · 全身SPA', value: '¥ 15,200' },
  { rank: 3, name: '王技师', role: '技师 · 面部护理', value: '¥ 12,800' },
  { rank: 4, name: '赵技师', role: '技师 · 足疗', value: '¥ 10,400' },
  { rank: 5, name: '刘技师', role: '初级技师 · 身体护理', value: '¥ 8,200' },
])

const projectRanking = ref([
  { rank: 1, name: '肩颈调理', desc: '本月86次 · 好评率98%', value: '¥ 25,628' },
  { rank: 2, name: '全身精油SPA', desc: '本月62次 · 好评率96%', value: '¥ 30,876' },
  { rank: 3, name: '面部护理', desc: '本月48次 · 好评率95%', value: '¥ 14,400' },
])

function rankClass(rank) {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return 'normal'
}
</script>

<template>
  <div class="page page-with-tabbar">
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="greeting">
            <h2>管理后台</h2>
            <p>2026年5月25日 · 星期一</p>
          </div>
          <div class="store-selector">
            <van-icon name="shop-o" size="14" />
            <span>万达店</span>
            <van-icon name="arrow-down" size="10" />
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="dash-grid fade-in">
      <div v-for="card in dashCards" :key="card.label" class="dash-card">
        <div class="dash-label">
          <van-icon :name="card.icon" size="14" />
          {{ card.label }}
        </div>
        <div class="dash-value" :style="card.color ? `color: ${card.color}` : ''">{{ card.value }}</div>
        <div class="dash-change" :class="card.up ? 'up' : 'down'">{{ card.change }}</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="admin-actions fade-in">
      <div
        v-for="action in quickActions"
        :key="action.label"
        class="admin-action"
        @click="action.to && router.push(action.to)"
      >
        <div class="admin-action-icon" :style="{ background: action.bg }">
          <van-icon :name="action.icon" size="22" :color="action.color" />
        </div>
        <span class="admin-action-label">{{ action.label }}</span>
      </div>
    </div>

    <!-- Staff Ranking -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">员工业绩排名</span>
        <span class="section-more" @click="router.push('/admin/ranking')">查看全部
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card">
        <div v-for="item in staffRanking" :key="item.rank" class="rank-item">
          <span class="rank-num" :class="rankClass(item.rank)">{{ item.rank }}</span>
          <div class="rank-info">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-role">{{ item.role }}</span>
          </div>
          <span class="rank-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- Project Ranking -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">热门项目排名</span>
        <span class="section-more" @click="router.push('/admin/ranking')">查看全部
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="card">
        <div v-for="item in projectRanking" :key="item.rank" class="rank-item">
          <span class="rank-num" :class="rankClass(item.rank)">{{ item.rank }}</span>
          <div class="rank-info">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-role">{{ item.desc }}</span>
          </div>
          <span class="rank-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item icon="bar-chart-o" to="/admin/home">数据</van-tabbar-item>
      <van-tabbar-item icon="medal-o" to="/admin/ranking">排名</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/admin/salary">工资</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/admin/home">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #1A1A2E, #2D2D44);
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
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.store-selector {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  cursor: pointer;
}

.dash-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 20px 16px 8px;
  position: relative;
  z-index: 1;
}

.dash-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-card);
}

.dash-label {
  font-size: 12px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.dash-value {
  font-size: 24px;
  font-weight: 700;
  margin-top: 8px;
}

.dash-change {
  font-size: 11px;
  font-weight: 500;
  margin-top: 4px;
}

.dash-change.up { color: var(--success); }
.dash-change.down { color: var(--danger); }

.admin-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 16px;
}

.admin-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.admin-action-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-action-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.rank-item + .rank-item {
  border-top: 1px solid var(--border-light);
}

.rank-num {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.rank-num.gold { background: linear-gradient(135deg, #F5D060, #E8A849); }
.rank-num.silver { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); }
.rank-num.bronze { background: linear-gradient(135deg, #CD7F32, #B8860B); }
.rank-num.normal { background: var(--bg-primary); color: var(--text-tertiary); }

.rank-info {
  flex: 1;
}

.rank-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
}

.rank-role {
  font-size: 11px;
  color: var(--text-tertiary);
}

.rank-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}
</style>
