<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref(0)
const phone = ref('')
const code = ref('')
const password = ref('')
const countdown = ref(0)
let timer = null

function sendCode() {
  if (countdown.value > 0 || !phone.value) return
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

function onLogin() {
  userStore.setRole('member')
  router.replace('/member/home')
}

function onWxLogin() {
  userStore.setRole('member')
  router.replace('/member/home')
}

function goPage(role) {
  userStore.setRole(role)
  const map = { member: '/member/home', staff: '/staff/home', admin: '/admin/home' }
  router.replace(map[role])
}
</script>

<template>
  <div class="login-page">
    <div class="login-header">
      <div class="logo-icon">
        <van-icon name="shop-o" size="36" color="#2CB5A0" />
      </div>
      <h1 class="logo-name">刘丽德健康</h1>
      <p class="logo-subtitle">LILIUDE HEALTH MANAGEMENT</p>
    </div>

    <div class="login-body">
      <van-tabs v-model:active="activeTab" animated>
        <van-tab title="验证码登录">
          <div class="form-area">
            <van-cell-group :border="false">
              <van-field
                v-model="phone"
                type="tel"
                label="+86"
                placeholder="请输入手机号"
                maxlength="11"
                clearable
              />
              <van-field
                v-model="code"
                type="digit"
                placeholder="请输入验证码"
                maxlength="6"
              >
                <template #button>
                  <van-button
                    size="small"
                    type="primary"
                    plain
                    round
                    :disabled="countdown > 0 || !phone"
                    @click="sendCode"
                  >
                    {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                  </van-button>
                </template>
              </van-field>
            </van-cell-group>

            <van-button
              type="primary"
              block
              round
              class="login-btn"
              @click="onLogin"
            >
              登录
            </van-button>
          </div>
        </van-tab>

        <van-tab title="密码登录">
          <div class="form-area">
            <van-cell-group :border="false">
              <van-field
                v-model="phone"
                type="tel"
                label="+86"
                placeholder="请输入手机号"
                maxlength="11"
                clearable
              />
              <van-field
                v-model="password"
                type="password"
                placeholder="请输入密码"
              />
            </van-cell-group>

            <van-button
              type="primary"
              block
              round
              class="login-btn"
              @click="onLogin"
            >
              登录
            </van-button>
          </div>
        </van-tab>
      </van-tabs>

      <div class="divider">
        <span>其他方式</span>
      </div>

      <van-button
        block
        round
        class="wx-btn"
        @click="onWxLogin"
      >
        <van-icon name="wechat" size="20" />
        微信一键登录
      </van-button>

      <!-- Dev shortcuts -->
      <div class="dev-shortcuts">
        <p class="dev-label">开发调试 · 快速进入</p>
        <div class="dev-roles">
          <van-button size="small" plain round type="primary" @click="goPage('member')">
            <van-icon name="friends-o" /> 会员端
          </van-button>
          <van-button size="small" plain round type="primary" @click="goPage('staff')">
            <van-icon name="manager-o" /> 员工端
          </van-button>
          <van-button size="small" plain round type="primary" @click="goPage('admin')">
            <van-icon name="bar-chart-o" /> 管理端
          </van-button>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <p>登录即表示同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a></p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--bg-white);
  display: flex;
  flex-direction: column;
}

.login-header {
  padding: 72px 32px 36px;
  text-align: center;
  background: var(--primary-gradient);
  border-radius: 0 0 28px 28px;
}

.logo-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 4px 20px rgba(44, 181, 160, 0.25);
}

.logo-name {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.logo-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}

.login-body {
  flex: 1;
  padding: 24px 20px 0;
}

.form-area {
  padding-top: 16px;
}

.login-btn {
  margin-top: 28px;
  height: 44px;
  font-size: 16px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 28px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.divider span {
  font-size: 12px;
  color: var(--text-tertiary);
}

.wx-btn {
  height: 44px;
  background: #07C160;
  border-color: #07C160;
  color: white;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.dev-shortcuts {
  margin-top: 36px;
  text-align: center;
}

.dev-label {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-bottom: 10px;
}

.dev-roles {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.login-footer {
  text-align: center;
  padding: 16px;
}

.login-footer p {
  font-size: 11px;
  color: var(--text-tertiary);
}

.login-footer a {
  color: var(--primary);
}
</style>
