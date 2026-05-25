<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const transactions = ref([
  { id: 1, name: '肩颈调理', date: '2026-05-20 14:30', store: '万达店', amount: -298, type: 'expense' },
  { id: 2, name: '余额充值', date: '2026-05-15 10:20', store: '微信支付', amount: 2000, type: 'income' },
  { id: 3, name: '全身精油SPA', date: '2026-05-10 16:00', store: '万达店', amount: -498, type: 'expense' },
  { id: 4, name: '积分兑换 · 面部护理', date: '2026-05-05 11:00', store: '', amount: -500, type: 'points' },
  { id: 5, name: '足疗加钟', date: '2026-05-03 15:30', store: '万达店', amount: -128, type: 'expense' },
  { id: 6, name: '余额充值', date: '2026-04-28 09:10', store: '微信支付', amount: 3000, type: 'income' },
  { id: 7, name: '肩颈调理', date: '2026-04-25 14:00', store: '万达店', amount: -298, type: 'expense' },
  { id: 8, name: '面部护理', date: '2026-04-20 10:00', store: '万达店', amount: -198, type: 'expense' },
])

function formatAmount(item) {
  if (item.type === 'points') return `- ${Math.abs(item.amount)}积分`
  return `${item.amount > 0 ? '+' : '-'} ¥${Math.abs(item.amount).toFixed(2)}`
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="消费余额" left-arrow @click-left="$router.back()" />

    <div class="balance-header">
      <div class="balance-card">
        <span class="balance-label">当前余额（元）</span>
        <span class="balance-amount">3,280.00</span>
        <div class="balance-actions">
          <van-button type="primary" size="small" round icon="gold-coin-o">充值</van-button>
          <van-button size="small" round plain icon="description" type="primary">明细</van-button>
        </div>
      </div>
    </div>

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="全部">
        <div class="tx-list">
          <div v-for="item in transactions" :key="item.id" class="tx-item">
            <div class="tx-left">
              <div class="tx-icon" :class="item.type">
                <van-icon :name="item.type === 'income' ? 'add-o' : item.type === 'points' ? 'gift-o' : 'minus'" size="18" />
              </div>
              <div class="tx-info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.date }}<template v-if="item.store"> · {{ item.store }}</template></p>
              </div>
            </div>
            <span class="tx-amount" :class="item.type" :style="item.type === 'points' ? 'color: var(--accent)' : ''">
              {{ formatAmount(item) }}
            </span>
          </div>
        </div>
      </van-tab>
      <van-tab title="消费">
        <div class="tx-list">
          <div v-for="item in transactions.filter(t => t.type === 'expense')" :key="item.id" class="tx-item">
            <div class="tx-left">
              <div class="tx-icon expense"><van-icon name="minus" size="18" /></div>
              <div class="tx-info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.date }} · {{ item.store }}</p>
              </div>
            </div>
            <span class="tx-amount expense">- ¥{{ Math.abs(item.amount).toFixed(2) }}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="充值">
        <div class="tx-list">
          <div v-for="item in transactions.filter(t => t.type === 'income')" :key="item.id" class="tx-item">
            <div class="tx-left">
              <div class="tx-icon income"><van-icon name="add-o" size="18" /></div>
              <div class="tx-info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.date }} · {{ item.store }}</p>
              </div>
            </div>
            <span class="tx-amount income">+ ¥{{ item.amount.toFixed(2) }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.balance-header {
  padding: 16px;
  background: white;
}

.balance-card {
  background: var(--primary-gradient);
  border-radius: var(--radius-xl);
  padding: 24px 20px;
  color: white;
}

.balance-label {
  font-size: 13px;
  opacity: 0.8;
}

.balance-amount {
  display: block;
  font-size: 36px;
  font-weight: 700;
  margin: 8px 0 16px;
}

.balance-actions {
  display: flex;
  gap: 10px;
}

.balance-actions .van-button {
  --van-button-default-height: 32px;
}

.tx-list {
  padding: 8px 16px;
}

.tx-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
}

.tx-item + .tx-item {
  border-top: 1px solid var(--border-light);
}

.tx-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tx-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx-icon.expense { background: #FFF0F0; color: var(--danger); }
.tx-icon.income { background: var(--primary-light); color: var(--primary); }
.tx-icon.points { background: var(--accent-light); color: var(--accent); }

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
  font-size: 15px;
  font-weight: 600;
}

.tx-amount.expense { color: var(--text-primary); }
.tx-amount.income { color: var(--primary); }
</style>
