<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const followReminders = ref([
  { id: 1, name: '李女士', phone: '138****1234', service: '肩颈调理', lastDate: '2026-05-18', daysAgo: 7, level: 'VIP', note: '建议调理周期已到，需回访确认' },
  { id: 2, name: '陈女士', phone: '139****5678', service: '全身SPA', lastDate: '2026-05-15', daysAgo: 10, level: '金卡', note: '上次满意度4.8分，推荐升级项目' },
  { id: 3, name: '孙先生', phone: '136****9012', service: '足疗', lastDate: '2026-05-10', daysAgo: 15, level: '普通', note: '已到回访周期' },
])

const birthdayReminders = ref([
  { id: 4, name: '王女士', birthday: '06-10', phone: '137****3456', level: 'VIP', daysUntil: 16 },
  { id: 5, name: '赵先生', birthday: '06-02', phone: '135****7890', level: '金卡', daysUntil: 8 },
])
</script>

<template>
  <div class="page">
    <van-nav-bar title="会员提醒" left-arrow @click-left="$router.back()" />

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="调理回访">
        <div class="reminder-list">
          <div v-for="item in followReminders" :key="item.id" class="reminder-card">
            <div class="reminder-top">
              <div class="reminder-user">
                <div class="user-avatar follow">
                  <van-icon name="user-circle-o" size="22" />
                </div>
                <div class="user-info">
                  <h4>
                    {{ item.name }}
                    <van-tag :type="item.level === 'VIP' ? 'warning' : 'primary'" size="mini" round>
                      {{ item.level }}
                    </van-tag>
                  </h4>
                  <p>{{ item.phone }}</p>
                </div>
              </div>
              <van-tag type="danger" size="medium" round plain>{{ item.daysAgo }}天未到店</van-tag>
            </div>
            <div class="reminder-detail">
              <div class="detail-row">
                <van-icon name="records-o" size="15" color="#999" />
                <span>上次服务：{{ item.service }}</span>
              </div>
              <div class="detail-row">
                <van-icon name="calendar-o" size="15" color="#999" />
                <span>服务日期：{{ item.lastDate }}</span>
              </div>
              <div class="detail-row note">
                <van-icon name="notes-o" size="15" color="#999" />
                <span>{{ item.note }}</span>
              </div>
            </div>
            <div class="reminder-actions">
              <van-button size="small" round icon="phone-o" type="primary" plain>电话回访</van-button>
              <van-button size="small" round icon="chat-o" type="primary" plain>发送消息</van-button>
              <van-button size="small" round icon="todo-list-o" type="primary" plain>标记完成</van-button>
            </div>
          </div>
          <van-empty v-if="!followReminders.length" description="暂无回访提醒" :image-size="80" />
        </div>
      </van-tab>

      <van-tab title="生日提醒">
        <div class="reminder-list">
          <div v-for="item in birthdayReminders" :key="item.id" class="reminder-card birthday">
            <div class="reminder-top">
              <div class="reminder-user">
                <div class="user-avatar birthday-avatar">
                  <van-icon name="gift-card-o" size="22" />
                </div>
                <div class="user-info">
                  <h4>
                    {{ item.name }}
                    <van-tag :type="item.level === 'VIP' ? 'warning' : 'primary'" size="mini" round>
                      {{ item.level }}
                    </van-tag>
                  </h4>
                  <p>{{ item.phone }} · 生日 {{ item.birthday }}</p>
                </div>
              </div>
              <van-tag type="warning" size="medium" round>{{ item.daysUntil }}天后</van-tag>
            </div>
            <div class="reminder-actions">
              <van-button size="small" round icon="coupon-o" type="warning" plain>发送优惠券</van-button>
              <van-button size="small" round icon="chat-o" type="primary" plain>发送祝福</van-button>
            </div>
          </div>
          <van-empty v-if="!birthdayReminders.length" description="暂无生日提醒" :image-size="80" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.reminder-list {
  padding: 12px 16px;
}

.reminder-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-card);
}

.reminder-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.reminder-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar.follow {
  background: var(--primary-light);
  color: var(--primary);
}

.birthday-avatar {
  background: var(--accent-light);
  color: var(--accent);
}

.user-info h4 {
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-info p {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.reminder-detail {
  padding: 10px 0;
  border-top: 1px solid var(--border-light);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  padding: 3px 0;
}

.detail-row.note {
  color: var(--text-tertiary);
  font-style: italic;
}

.reminder-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}
</style>
