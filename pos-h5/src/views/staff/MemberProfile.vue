<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStaffStore } from '../../stores/staff'
import { formatMoney } from '../../utils/format'

const router = useRouter()
const route = useRoute()
const store = useStaffStore()

const profile = computed(() => store.getMemberProfile(Number(route.params.id)))

function callMember() {
  if (profile.value) window.location.href = `tel:${profile.value.phone}`
}
</script>

<template>
  <div class="staff-page" v-if="profile">
    <van-nav-bar :title="profile.name" left-arrow @click-left="router.back()" />

    <div class="profile-header">
      <div class="profile-avatar">👩</div>
      <div class="profile-main">
        <div class="profile-name">{{ profile.name }}</div>
        <div class="profile-phone">{{ profile.phone }}</div>
      </div>
      <div class="profile-tags">
        <span class="staff-tag staff-tag-primary">{{ profile.vipLevel }}</span>
        <span class="staff-tag" style="background: #f5f5f5; color: #999;">{{ profile.cardNo }}</span>
      </div>
    </div>

    <div class="asset-grid">
      <div class="asset-item">
        <div class="asset-value">{{ formatMoney(profile.balance) }}</div>
        <div class="asset-label">当前余额</div>
      </div>
      <div class="asset-item">
        <div class="asset-value">{{ formatMoney(profile.totalSpent) }}</div>
        <div class="asset-label">累计消费</div>
      </div>
      <div class="asset-item">
        <div class="asset-value">{{ profile.points.toLocaleString() }}</div>
        <div class="asset-label">积分</div>
      </div>
    </div>

    <div class="staff-section-header">
      <span class="staff-section-title">最近服务</span>
    </div>
    <div class="service-list">
      <div v-for="(svc, idx) in profile.recentServices" :key="idx" class="service-item">
        <div class="service-name">{{ svc.project }}</div>
        <div class="service-meta">{{ svc.date }} · {{ svc.staff }}</div>
      </div>
    </div>

    <div style="padding: 24px 16px;">
      <van-button type="primary" block round @click="callMember">📞 拨打电话</van-button>
    </div>
  </div>

  <div v-else class="staff-page">
    <van-nav-bar title="会员档案" left-arrow @click-left="router.back()" />
    <van-empty description="未找到该会员信息" />
  </div>
</template>

<style scoped>
.profile-header { display: flex; align-items: center; gap: 12px; padding: 16px; background: white; }
.profile-avatar { width: 48px; height: 48px; border-radius: 50%; background: #E8F8F5; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.profile-main { flex: 1; }
.profile-name { font-size: 16px; font-weight: 600; }
.profile-phone { font-size: 13px; color: var(--text-tertiary); margin-top: 2px; }
.profile-tags { display: flex; gap: 4px; }
.asset-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 16px; }
.asset-item { background: white; border-radius: 10px; padding: 14px 10px; text-align: center; }
.asset-value { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.asset-label { font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }
.service-list { padding: 0 16px; }
.service-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: white; border-radius: 10px; margin-bottom: 8px; }
.service-name { font-size: 14px; font-weight: 500; }
.service-meta { font-size: 11px; color: var(--text-tertiary); }
</style>
