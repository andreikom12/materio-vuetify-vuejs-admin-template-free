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
    path: '/register',
    name: 'register',
    component: () => import('@/modules/auth/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
]
