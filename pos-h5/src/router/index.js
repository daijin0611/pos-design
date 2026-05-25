import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/global/Login.vue'),
    meta: { title: '登录', showNav: false, showTab: false },
  },
  {
    path: '/',
    redirect: '/member/home',
  },
  {
    path: '/member',
    children: [
      {
        path: 'home',
        name: 'MemberHome',
        component: () => import('../views/member/Home.vue'),
        meta: { title: '刘丽德健康', showNav: false, showTab: true, tabRole: 'member' },
      },
      {
        path: 'balance',
        name: 'MemberBalance',
        component: () => import('../views/member/Balance.vue'),
        meta: { title: '消费余额', showNav: true, showTab: false },
      },
      {
        path: 'password',
        name: 'MemberPassword',
        component: () => import('../views/member/Password.vue'),
        meta: { title: '密码设置', showNav: true, showTab: false },
      },
      {
        path: 'appointment',
        name: 'MemberAppointment',
        component: () => import('../views/member/Appointment.vue'),
        meta: { title: '我的预约', showNav: true, showTab: true, tabRole: 'member' },
      },
      {
        path: 'coupon',
        name: 'MemberCoupon',
        component: () => import('../views/member/Coupon.vue'),
        meta: { title: '我的优惠券', showNav: true, showTab: true, tabRole: 'member' },
      },
    ],
  },
  {
    path: '/staff',
    children: [
      {
        path: 'home',
        name: 'StaffHome',
        component: () => import('../views/staff/Home.vue'),
        meta: { title: '工作台', showNav: false, showTab: true, tabRole: 'staff' },
      },
      {
        path: 'salary',
        name: 'StaffSalary',
        component: () => import('../views/staff/Salary.vue'),
        meta: { title: '工资查询', showNav: true, showTab: false },
      },
      {
        path: 'reminders',
        name: 'StaffReminders',
        component: () => import('../views/staff/Reminders.vue'),
        meta: { title: '会员提醒', showNav: true, showTab: false },
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'home',
        name: 'AdminHome',
        component: () => import('../views/admin/Home.vue'),
        meta: { title: '管理后台', showNav: false, showTab: true, tabRole: 'admin' },
      },
      {
        path: 'performance',
        name: 'AdminPerformance',
        component: () => import('../views/admin/Performance.vue'),
        meta: { title: '业绩查询', showNav: true, showTab: false },
      },
      {
        path: 'salary',
        name: 'AdminSalary',
        component: () => import('../views/admin/Salary.vue'),
        meta: { title: '员工工资', showNav: true, showTab: false },
      },
      {
        path: 'ranking',
        name: 'AdminRanking',
        component: () => import('../views/admin/Ranking.vue'),
        meta: { title: '排名', showNav: true, showTab: false },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = to.meta.title || '刘丽德健康'
})

export default router
