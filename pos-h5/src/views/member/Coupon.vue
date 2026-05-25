<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const coupons = ref([
  { id: 1, name: '肩颈调理8折券', discount: '8折', condition: '满200可用', expire: '2026-06-30', type: 'discount', status: 'available', color: '#2CB5A0' },
  { id: 2, name: '新客专享50元抵扣', discount: '¥50', condition: '满300可用', expire: '2026-06-15', type: 'cash', status: 'available', color: '#E8A849' },
  { id: 3, name: '全身SPA体验券', discount: '免费', condition: '无门槛', expire: '2026-07-31', type: 'gift', status: 'available', color: '#F5A0B5' },
])

const usedCoupons = ref([
  { id: 4, name: '面部护理7折券', discount: '7折', condition: '满150可用', expire: '2026-04-30', type: 'discount', status: 'used', color: '#CCC' },
])

const expiredCoupons = ref([
  { id: 5, name: '足疗减免30元', discount: '¥30', condition: '满100可用', expire: '2026-03-31', type: 'cash', status: 'expired', color: '#CCC' },
])
</script>

<template>
  <div class="page">
    <van-nav-bar title="我的优惠券" left-arrow @click-left="$router.back()" />

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab :title="`可使用(${coupons.length})`">
        <div class="coupon-list">
          <div v-for="item in coupons" :key="item.id" class="coupon-card">
            <div class="coupon-left" :style="{ background: item.color }">
              <span class="coupon-value">{{ item.discount }}</span>
              <span class="coupon-condition">{{ item.condition }}</span>
            </div>
            <div class="coupon-right">
              <h4>{{ item.name }}</h4>
              <p>有效期至 {{ item.expire }}</p>
              <van-button size="mini" round type="primary" class="use-btn">立即使用</van-button>
            </div>
          </div>
          <van-empty v-if="!coupons.length" description="暂无可用优惠券" :image-size="80" />
        </div>
      </van-tab>

      <van-tab title="已使用">
        <div class="coupon-list">
          <div v-for="item in usedCoupons" :key="item.id" class="coupon-card disabled">
            <div class="coupon-left" style="background: #CCC">
              <span class="coupon-value">{{ item.discount }}</span>
              <span class="coupon-condition">{{ item.condition }}</span>
            </div>
            <div class="coupon-right">
              <h4>{{ item.name }}</h4>
              <p>有效期至 {{ item.expire }}</p>
              <van-tag type="default" size="medium">已使用</van-tag>
            </div>
          </div>
          <van-empty v-if="!usedCoupons.length" description="暂无已使用优惠券" :image-size="80" />
        </div>
      </van-tab>

      <van-tab title="已过期">
        <div class="coupon-list">
          <div v-for="item in expiredCoupons" :key="item.id" class="coupon-card disabled">
            <div class="coupon-left" style="background: #CCC">
              <span class="coupon-value">{{ item.discount }}</span>
              <span class="coupon-condition">{{ item.condition }}</span>
            </div>
            <div class="coupon-right">
              <h4>{{ item.name }}</h4>
              <p>有效期至 {{ item.expire }}</p>
              <van-tag type="default" size="medium">已过期</van-tag>
            </div>
          </div>
          <van-empty v-if="!expiredCoupons.length" description="暂无过期优惠券" :image-size="80" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.coupon-list {
  padding: 12px 16px;
}

.coupon-card {
  display: flex;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: var(--shadow-card);
}

.coupon-card.disabled {
  opacity: 0.6;
}

.coupon-left {
  width: 110px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

.coupon-left::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-primary);
}

.coupon-value {
  font-size: 24px;
  font-weight: 700;
}

.coupon-condition {
  font-size: 10px;
  opacity: 0.8;
  margin-top: 2px;
}

.coupon-right {
  flex: 1;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupon-right h4 {
  font-size: 14px;
  font-weight: 600;
}

.coupon-right p {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.use-btn {
  margin-top: 8px;
  align-self: flex-start;
}
</style>
