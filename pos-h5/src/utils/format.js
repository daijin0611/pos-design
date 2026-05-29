// src/utils/format.js

export function formatMoney(amount, withSymbol = true) {
  const formatted = amount.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return withSymbol ? `¥ ${formatted}` : formatted
}

export function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-')
  return `${year}年${parseInt(month)}月`
}

export function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return { text: '凌晨好', emoji: '🌙' }
  if (hour < 12) return { text: '早上好', emoji: '☀️' }
  if (hour < 14) return { text: '中午好', emoji: '🌤' }
  if (hour < 18) return { text: '下午好', emoji: '⛅' }
  return { text: '晚上好', emoji: '🌙' }
}

export function formatDaysUntil(days) {
  if (days === 0) return '今天'
  if (days === 1) return '明天'
  if (days === 2) return '后天'
  return `${days}天后`
}