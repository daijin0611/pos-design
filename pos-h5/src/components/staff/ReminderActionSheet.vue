<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  memberName: { type: String, default: '' },
  reminderId: { type: Number, default: 0 },
})

const emit = defineEmits(['update:show', 'confirm'])

const note = ref('')
const selectedTags = ref([])

const quickTags = ['效果好', '需继续', '已预约下次', '不满意']

function toggleTag(tag) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx === -1) {
    selectedTags.value.push(tag)
    note.value = note.value ? `${note.value}，${tag}` : tag
  } else {
    selectedTags.value.splice(idx, 1)
  }
}

function isTagSelected(tag) {
  return selectedTags.value.includes(tag)
}

function confirm() {
  emit('confirm', { id: props.reminderId, note: note.value })
  note.value = ''
  selectedTags.value = []
}
</script>

<template>
  <van-action-sheet
    :model-value="show"
    @update:model-value="$emit('update:show', $event)"
    title="记录回访"
  >
    <div class="action-content">
      <div class="action-member">回访会员：{{ memberName }}</div>

      <van-field v-model="note" type="textarea" placeholder="请输入回访备注..." rows="3" class="action-textarea" />

      <div class="action-tags">
        <div class="action-tags-label">快捷备注</div>
        <div class="action-tags-list">
          <span
            v-for="tag in quickTags"
            :key="tag"
            class="action-tag"
            :class="{ 'action-tag--active': isTagSelected(tag) }"
            @click="toggleTag(tag)"
          >{{ tag }}</span>
        </div>
      </div>

      <van-button type="primary" block round class="action-btn" @click="confirm">确认提交</van-button>
    </div>
  </van-action-sheet>
</template>

<style scoped>
.action-content { padding: 16px; }

.action-member {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.action-textarea {
  margin-bottom: 12px;
  background: #F7F8FA;
  border-radius: 8px;
}

.action-tags-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.action-tags-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.action-tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 14px;
  background: #F7F8FA;
  color: var(--text-secondary);
  cursor: pointer;
}

.action-tag--active {
  background: #E8F8F5;
  color: var(--primary);
}

.action-btn {
  --van-button-primary-background: #2CB5A0;
  --van-button-primary-border-color: #2CB5A0;
}
</style>
