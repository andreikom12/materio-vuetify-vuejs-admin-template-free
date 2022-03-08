export default[
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('@/modules/auth/pages/Confirm.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/modules/auth/pages/ErrorConfirm.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/modules/auth/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
]
