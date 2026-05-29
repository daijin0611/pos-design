import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/staff/home',
  },
  {
    path: '/staff',
    children: [
      {
        path: '',
        redirect: '/staff/home',
      },
      {
        path: 'home',
        name: 'StaffHome',
        component: () => import('../views/staff/StaffHome.vue'),
        meta: { title: '员工工作台' },
      },
      {
        path: 'salary',
        name: 'StaffSalary',
        component: () => import('../views/staff/SalaryView.vue'),
        meta: { title: '工资查询' },
      },
      {
        path: 'salary/:category',
        name: 'StaffSalaryDetail',
        component: () => import('../views/staff/SalaryDetail.vue'),
        meta: { title: '工资明细' },
      },
      {
        path: 'reminder',
        name: 'StaffReminder',
        component: () => import('../views/staff/ReminderList.vue'),
        meta: { title: '回访提醒' },
      },
      {
        path: 'birthday',
        name: 'StaffBirthday',
        component: () => import('../views/staff/BirthdayList.vue'),
        meta: { title: '生日提醒' },
      },
      {
        path: 'member/:id',
        name: 'StaffMember',
        component: () => import('../views/staff/MemberProfile.vue'),
        meta: { title: '会员档案' },
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
