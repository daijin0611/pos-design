<script setup>
import { ref } from 'vue'
import { showDialog, showSuccessToast } from 'vant'

const hasPassword = ref(false)
const formData = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function onSubmit() {
  if (!formData.value.newPassword) return
  if (formData.value.newPassword !== formData.value.confirmPassword) {
    showDialog({ title: '提示', message: '两次密码输入不一致' })
    return
  }
  showSuccessToast('密码设置成功')
  hasPassword.value = true
}

function onReset() {
  showDialog({
    title: '重置密码',
    message: '确认要通过短信验证码重置密码吗？',
    showCancelButton: true,
  })
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="密码设置" left-arrow @click-left="$router.back()" />

    <div class="form-section">
      <template v-if="hasPassword">
        <van-cell-group inset>
          <van-field
            v-model="formData.oldPassword"
            type="password"
            label="当前密码"
            placeholder="请输入当前密码"
          />
          <van-field
            v-model="formData.newPassword"
            type="password"
            label="新密码"
            placeholder="请输入6-20位新密码"
          />
          <van-field
            v-model="formData.confirmPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入新密码"
          />
        </van-cell-group>

        <div class="form-actions">
          <van-button type="primary" block round @click="onSubmit">确认修改</van-button>
        </div>
      </template>

      <template v-else>
        <div class="empty-state">
          <van-icon name="lock" size="48" color="#CCC" />
          <p class="empty-title">尚未设置密码</p>
          <p class="empty-desc">设置密码后可使用密码方式登录</p>
        </div>

        <van-cell-group inset>
          <van-field
            v-model="formData.newPassword"
            type="password"
            label="设置密码"
            placeholder="请输入6-20位密码"
          />
          <van-field
            v-model="formData.confirmPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
          />
        </van-cell-group>

        <div class="form-actions">
          <van-button type="primary" block round @click="onSubmit">确认设置</van-button>
        </div>
      </template>

      <div class="bottom-link" v-if="hasPassword">
        <span @click="onReset">忘记密码？通过短信重置</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  padding-top: 16px;
}

.form-actions {
  padding: 24px 16px;
}

.empty-state {
  text-align: center;
  padding: 40px 0 24px;
}

.empty-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 16px;
}

.empty-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.bottom-link {
  text-align: center;
  padding: 8px;
}

.bottom-link span {
  font-size: 13px;
  color: var(--primary);
  cursor: pointer;
}
</style>
