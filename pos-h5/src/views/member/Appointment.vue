<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const appointments = ref([
  { id: 1, service: '肩颈调理', time: '2026-05-26 14:00', staff: '张技师', store: '万达店', status: 'confirmed', price: 298 },
  { id: 2, service: '全身精油SPA', time: '2026-05-28 10:00', staff: '李技师', store: '万达店', status: 'pending', price: 498 },
])

const historyAppointments = ref([
  { id: 3, service: '面部护理', time: '2026-05-18 15:00', staff: '王技师', store: '万达店', status: 'completed', price: 198 },
  { id: 4, service: '肩颈调理', time: '2026-05-10 14:00', staff: '张技师', store: '万达店', status: 'completed', price: 298 },
  { id: 5, service: '足疗', time: '2026-05-03 11:00', staff: '赵技师', store: '万达店', status: 'cancelled', price: 128 },
])

function statusTag(status) {
  const map = {
    confirmed: { type: 'success', text: '已确认' },
    pending: { type: 'warning', text: '待确认' },
    completed: { type: '', text: '已完成' },
    cancelled: { type: 'danger', text: '已取消' },
  }
  return map[status] || { type: '', text: status }
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="我的预约" left-arrow @click-left="$router.back()" />

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="即将到来">
        <div class="apt-list">
          <div v-for="item in appointments" :key="item.id" class="apt-card">
            <div class="apt-header">
              <h3>{{ item.service }}</h3>
              <van-tag :type="statusTag(item.status).type" size="medium" round>
                {{ statusTag(item.status).text }}
              </van-tag>
            </div>
            <div class="apt-details">
              <div class="apt-detail-row">
                <van-icon name="clock-o" size="16" color="#999" />
                <span>{{ item.time }}</span>
              </div>
              <div class="apt-detail-row">
                <van-icon name="manager-o" size="16" color="#999" />
                <span>{{ item.staff }} · {{ item.store }}</span>
              </div>
              <div class="apt-detail-row">
                <van-icon name="gold-coin-o" size="16" color="#999" />
                <span>¥ {{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <div class="apt-actions">
              <van-button size="small" round plain type="primary" icon="phone-o">联系门店</van-button>
              <van-button size="small" round plain type="danger" icon="cross">取消预约</van-button>
            </div>
          </div>

          <van-empty v-if="!appointments.length" description="暂无预约" :image-size="80" />
        </div>

        <div class="bottom-action">
          <van-button type="primary" block round icon="calendar-o">新建预约</van-button>
        </div>
      </van-tab>

      <van-tab title="历史记录">
        <div class="apt-list">
          <div v-for="item in historyAppointments" :key="item.id" class="apt-card">
            <div class="apt-header">
              <h3>{{ item.service }}</h3>
              <van-tag :type="statusTag(item.status).type" size="medium" round>
                {{ statusTag(item.status).text }}
              </van-tag>
            </div>
            <div class="apt-details">
              <div class="apt-detail-row">
                <van-icon name="clock-o" size="16" color="#999" />
                <span>{{ item.time }}</span>
              </div>
              <div class="apt-detail-row">
                <van-icon name="manager-o" size="16" color="#999" />
                <span>{{ item.staff }} · {{ item.store }}</span>
              </div>
            </div>
          </div>

          <van-empty v-if="!historyAppointments.length" description="暂无历史记录" :image-size="80" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.apt-list {
  padding: 12px 16px;
}

.apt-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-card);
}

.apt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.apt-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.apt-details {
  margin-bottom: 12px;
}

.apt-detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  padding: 4px 0;
}

.apt-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}

.bottom-action {
  padding: 16px;
}
</style>
