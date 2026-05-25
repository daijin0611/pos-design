<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
const dateRange = ref('month')

const overview = ref([
  { label: '本月营业额', value: '¥ 86,400', change: '+15.2%', icon: 'chart-trending-o' },
  { label: '本月客流', value: '486', change: '+38', icon: 'friends-o' },
  { label: '客单价', value: '¥ 178', change: '+¥12', icon: 'gold-coin-o' },
])

const staffPerformance = ref([
  { name: '张技师', role: '高级技师', revenue: 18600, count: 62, avgPrice: 300, satisfaction: 4.9 },
  { name: '李技师', role: '高级技师', revenue: 15200, count: 48, avgPrice: 317, satisfaction: 4.8 },
  { name: '王技师', role: '技师', revenue: 12800, count: 44, avgPrice: 291, satisfaction: 4.7 },
  { name: '赵技师', role: '技师', revenue: 10400, count: 40, avgPrice: 260, satisfaction: 4.6 },
  { name: '刘技师', role: '初级技师', revenue: 8200, count: 36, avgPrice: 228, satisfaction: 4.5 },
])

const projectPerformance = ref([
  { name: '肩颈调理', revenue: 25628, count: 86, rate: '98%' },
  { name: '全身精油SPA', revenue: 30876, count: 62, rate: '96%' },
  { name: '面部护理', revenue: 14400, count: 48, rate: '95%' },
  { name: '足疗', revenue: 8320, count: 52, rate: '94%' },
  { name: '身体护理', revenue: 6960, count: 36, rate: '93%' },
])
</script>

<template>
  <div class="page">
    <van-nav-bar title="业绩查询" left-arrow @click-left="$router.back()" />

    <!-- Date selector -->
    <div class="date-bar">
      <van-button-group>
        <van-button size="small" :type="dateRange === 'week' ? 'primary' : 'default'" round @click="dateRange = 'week'">本周</van-button>
        <van-button size="small" :type="dateRange === 'month' ? 'primary' : 'default'" round @click="dateRange = 'month'">本月</van-button>
        <van-button size="small" :type="dateRange === 'quarter' ? 'primary' : 'default'" round @click="dateRange = 'quarter'">本季度</van-button>
      </van-button-group>
    </div>

    <!-- Overview cards -->
    <div class="overview-grid">
      <div v-for="item in overview" :key="item.label" class="overview-card">
        <div class="ov-label">
          <van-icon :name="item.icon" size="14" />
          {{ item.label }}
        </div>
        <div class="ov-value">{{ item.value }}</div>
        <div class="ov-change">{{ item.change }}</div>
      </div>
    </div>

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="员工维度">
        <div class="perf-list">
          <div v-for="(item, idx) in staffPerformance" :key="item.name" class="perf-item">
            <div class="perf-rank">{{ idx + 1 }}</div>
            <div class="perf-info">
              <h4>{{ item.name }} <span class="perf-role">{{ item.role }}</span></h4>
              <div class="perf-stats">
                <span>营业额 <b>¥{{ item.revenue.toLocaleString() }}</b></span>
                <span>服务 {{ item.count }} 次</span>
                <span>满意度 {{ item.satisfaction }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="项目维度">
        <div class="perf-list">
          <div v-for="(item, idx) in projectPerformance" :key="item.name" class="perf-item">
            <div class="perf-rank">{{ idx + 1 }}</div>
            <div class="perf-info">
              <h4>{{ item.name }}</h4>
              <div class="perf-stats">
                <span>营业额 <b>¥{{ item.revenue.toLocaleString() }}</b></span>
                <span>{{ item.count }} 次</span>
                <span>好评 {{ item.rate }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.date-bar {
  padding: 12px 16px;
  background: white;
  display: flex;
  justify-content: center;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 12px 16px;
}

.overview-card {
  background: white;
  border-radius: var(--radius-md);
  padding: 12px;
  box-shadow: var(--shadow-card);
}

.ov-label {
  font-size: 11px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.ov-value {
  font-size: 18px;
  font-weight: 700;
  margin-top: 6px;
}

.ov-change {
  font-size: 11px;
  color: var(--success);
  margin-top: 2px;
}

.perf-list {
  padding: 8px 16px;
}

.perf-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: white;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  box-shadow: var(--shadow-card);
}

.perf-rank {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.perf-item:nth-child(1) .perf-rank { background: linear-gradient(135deg, #F5D060, #E8A849); color: white; }
.perf-item:nth-child(2) .perf-rank { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); color: white; }
.perf-item:nth-child(3) .perf-rank { background: linear-gradient(135deg, #CD7F32, #B8860B); color: white; }

.perf-info {
  flex: 1;
}

.perf-info h4 {
  font-size: 14px;
  font-weight: 600;
}

.perf-role {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-tertiary);
}

.perf-stats {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.perf-stats b {
  color: var(--primary);
  font-weight: 600;
}
</style>
