# 会员个人主页 + 底部导航优化 设计文档

> 日期：2026-06-07
> 状态：已批准

## 背景

当前 `member-home.html` 底部 tab-bar 有 4 项（首页、预约、优惠券、我的），其中「我的」没有链接到任何页面。右上角 `page-nav` 已提供页面跳转能力，底部 tab 中预约和优惠券功能与首页宫格入口重复。

## 决策

1. **底部导航栏简化为 2 项**：只保留「首页」和「我的」
2. **新建 `member-profile.html` 个人主页**

## 设计详情

### 底部导航栏修改（member-home.html）

- 移除「预约」和「优惠券」tab
- 保留：首页（active，链接 member-home.html）、我的（链接 member-profile.html）
- tab-bar 样式不变，沿用 design-system.css

### 个人主页（member-profile.html）

#### 页面结构（自上而下）

1. **page-nav**（右上角浮动导航，与其他页面一致）
2. **渐变头部**
   - 绿色渐变背景 `var(--primary-gradient)`
   - 居中布局：圆形头像（56px，`van-icon-user-o`）+ 白色文字
   - 昵称「张小姐」18px 半粗白
   - 副标题「金卡会员 · LD20260001」12px 75% 透明度白
   - 底部圆角过渡（与首页 header-area 一致）
3. **统计横栏**
   - 白色卡片，margin-top -24px 上浮，圆角 14px，阴影
   - 4 列等分：余额（绿色）、积分（金色）、优惠券（粉色）、消费次数（灰色）
   - 每列：数值 18px 粗体 + 标签 10px 灰
   - 点击跳转对应页面（余额→member-balance、积分→member-points、优惠券→member-coupon）
4. **功能菜单列表**
   - 白色圆角卡片
   - 列表项：收货地址、联系客服、意见反馈、关于我们、设置
   - 每行：左侧 Vant 图标（32px 彩色圆形背景）+ 文字 + 右侧灰色箭头
   - 行间细分隔线
5. **底部 tab-bar**
   - 2 项：首页 + 我的，「我的」高亮
6. **safe-bottom**

#### 设计规范

- 复用 `design-system.css` 全部变量
- 图标统一使用 Vant Icon
- 头部渐变与首页 `header-area` 样式一致
- 配色：primary 绿 / accent 金 / secondary 粉 / 灰色

## 涉及文件

| 文件 | 操作 |
|------|------|
| `prototype/pages/member-home.html` | 修改底部 tab-bar 从 4 项改为 2 项 |
| `prototype/pages/member-profile.html` | 新建 |
