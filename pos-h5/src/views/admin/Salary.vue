<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const staffSalary = ref([
  { name: '张技师', role: '高级技师', base: 4000, commission: 3200, bonus: 800, total: 8640, status: 'partial' },
  { name: '李技师', role: '高级技师', base: 4000, commission: 2600, bonus: 600, total: 7800, status: 'partial' },
  { name: '王技师', role: '技师', base: 3500, commission: 2200, bonus: 400, total: 6500, status: 'pending' },
  { name: '赵技师', role: '技师', base: 3500, commission: 1800, bonus: 300, total: 6000, status: 'pending' },
  { name: '刘技师', role: '初级技师', base: 3000, commission: 1200, bonus: 200, total: 4800, status: 'pending' },
])

const salarySummary = ref({
  totalPayroll: 33740,
  avgSalary: 6748,
  highest: 8640,
})
</script>

<template>
  <div class="page">
    <van-nav-bar title="员工工资" left-arrow @click-left="$router.back()" />

    <!-- Summary -->
    <div class="summary-bar">
      <div class="summary-item">
        <span class="summary-value">¥ {{ salarySummary.totalPayroll.toLocaleString() }}</span>
        <span class="summary-label">本月总薪资</span>
      </div>
      <div class="summary-item">
        <span class="summary-value">¥ {{ salarySummary.avgSalary.toLocaleString() }}</span>
        <span class="summary-label">人均工资</span>
      </div>
      <div class="summary-item">
        <span class="summary-value">¥ {{ salarySummary.highest.toLocaleString() }}</span>
        <span class="summary-label">最高工资</span>
      </div>
    </div>

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="工资列表">
        <div class="salary-list">
          <div v-for="item in staffSalary" :key="item.name" class="salary-item">
            <div class="salary-item-top">
              <div class="salary-user">
                <div class="user-avatar">
                  <van-icon name="manager-o" size="20" color="var(--primary)" />
                </div>
                <div>
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.role }}</p>
                </div>
              </div>
              <div class="salary-total-area">
                <span class="salary-total">¥ {{ item.total.toLocaleString() }}</span>
                <van-tag :type="item.status === 'partial' ? 'success' : 'warning'" size="mini" round>
                  {{ item.status === 'partial' ? '已发放' : '待发放' }}
                </van-tag>
              </div>
            </div>
            <div class="salary-breakdown">
              <span>基本 ¥{{ item.base.toLocaleString() }}</span>
              <span>提成 ¥{{ item.commission.toLocaleString() }}</span>
              <span>奖金 ¥{{ item.bonus.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="工资排名">
        <div class="rank-list">
          <div v-for="(item, idx) in [...staffSalary].sort((a, b) => b.total - a.total)" :key="item.name" class="rank-item">
            <span class="rank-num" :class="idx < 3 ? ['gold', 'silver', 'bronze'][idx] : 'normal'">
              {{ idx + 1 }}
            </span>
            <div class="rank-info">
              <span class="rank-name">{{ item.name }} · {{ item.role }}</span>
            </div>
            <span class="rank-value">¥ {{ item.total.toLocaleString() }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.summary-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: linear-gradient(135deg, #1A1A2E, #2D2D44);
  padding: 20px 16px;
  text-align: center;
}

.summary-item {
  color: white;
}

.summary-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.summary-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.salary-list {
  padding: 12px 16px;
}

.salary-item {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 10px;
  box-shadow: var(--shadow-card);
}

.salary-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.salary-user h4 {
  font-size: 15px;
  font-weight: 600;
}

.salary-user p {
  font-size: 11px;
  color: var(--text-tertiary);
}

.salary-total-area {
  text-align: right;
}

.salary-total {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.salary-breakdown {
  display: flex;
  gap: 16px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-light);
  font-size: 12px;
  color: var(--text-tertiary);
}

.rank-list {
  padding: 12px 16px;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: white;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  box-shadow: var(--shadow-card);
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

.rank-info { flex: 1; }

.rank-name {
  font-size: 14px;
  font-weight: 500;
}

.rank-value {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
}
</style>
