<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const staffRanking = ref([
  { rank: 1, name: '张技师', role: '高级技师 · 肩颈调理', revenue: 18600, count: 62, satisfaction: 4.9 },
  { rank: 2, name: '李技师', role: '高级技师 · 全身SPA', revenue: 15200, count: 48, satisfaction: 4.8 },
  { rank: 3, name: '王技师', role: '技师 · 面部护理', revenue: 12800, count: 44, satisfaction: 4.7 },
  { rank: 4, name: '赵技师', role: '技师 · 足疗', revenue: 10400, count: 40, satisfaction: 4.6 },
  { rank: 5, name: '刘技师', role: '初级技师 · 身体护理', revenue: 8200, count: 36, satisfaction: 4.5 },
])

const projectRanking = ref([
  { rank: 1, name: '肩颈调理', revenue: 25628, count: 86, rate: '98%', avgPrice: 298 },
  { rank: 2, name: '全身精油SPA', revenue: 30876, count: 62, rate: '96%', avgPrice: 498 },
  { rank: 3, name: '面部护理', revenue: 14400, count: 48, rate: '95%', avgPrice: 300 },
  { rank: 4, name: '足疗', revenue: 8320, count: 52, rate: '94%', avgPrice: 160 },
  { rank: 5, name: '身体护理', revenue: 6960, count: 36, rate: '93%', avgPrice: 193 },
])

const salaryRanking = ref([
  { rank: 1, name: '张技师', role: '高级技师', salary: 8640 },
  { rank: 2, name: '李技师', role: '高级技师', salary: 7800 },
  { rank: 3, name: '王技师', role: '技师', salary: 6500 },
  { rank: 4, name: '赵技师', role: '技师', salary: 6000 },
  { rank: 5, name: '刘技师', role: '初级技师', salary: 4800 },
])

function rankClass(rank) {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return 'normal'
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="排名" left-arrow @click-left="$router.back()" />

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="员工业绩">
        <div class="ranking-list">
          <div v-for="item in staffRanking" :key="item.rank" class="ranking-card">
            <div class="rank-left">
              <span class="rank-badge" :class="rankClass(item.rank)">{{ item.rank }}</span>
              <div class="rank-user">
                <h4>{{ item.name }}</h4>
                <p>{{ item.role }}</p>
              </div>
            </div>
            <div class="rank-data">
              <span class="rank-revenue">¥{{ item.revenue.toLocaleString() }}</span>
              <span class="rank-detail">{{ item.count }}次 · {{ item.satisfaction }}分</span>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="项目排名">
        <div class="ranking-list">
          <div v-for="item in projectRanking" :key="item.rank" class="ranking-card">
            <div class="rank-left">
              <span class="rank-badge" :class="rankClass(item.rank)">{{ item.rank }}</span>
              <div class="rank-user">
                <h4>{{ item.name }}</h4>
                <p>客单价 ¥{{ item.avgPrice }} · 好评 {{ item.rate }}</p>
              </div>
            </div>
            <div class="rank-data">
              <span class="rank-revenue">¥{{ item.revenue.toLocaleString() }}</span>
              <span class="rank-detail">{{ item.count }}次</span>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="工资排名">
        <div class="ranking-list">
          <div v-for="item in salaryRanking" :key="item.rank" class="ranking-card">
            <div class="rank-left">
              <span class="rank-badge" :class="rankClass(item.rank)">{{ item.rank }}</span>
              <div class="rank-user">
                <h4>{{ item.name }}</h4>
                <p>{{ item.role }}</p>
              </div>
            </div>
            <div class="rank-data">
              <span class="rank-revenue">¥{{ item.salary.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.ranking-list {
  padding: 12px 16px;
}

.ranking-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: var(--radius-lg);
  margin-bottom: 10px;
  box-shadow: var(--shadow-card);
}

.rank-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-badge {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.rank-badge.gold { background: linear-gradient(135deg, #F5D060, #E8A849); }
.rank-badge.silver { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); }
.rank-badge.bronze { background: linear-gradient(135deg, #CD7F32, #B8860B); }
.rank-badge.normal { background: var(--bg-primary); color: var(--text-tertiary); }

.rank-user h4 {
  font-size: 15px;
  font-weight: 600;
}

.rank-user p {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.rank-data {
  text-align: right;
}

.rank-revenue {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
}

.rank-detail {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}
</style>
