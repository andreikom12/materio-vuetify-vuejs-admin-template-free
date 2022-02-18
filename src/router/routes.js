import { routes as auth} from "@/modules/auth";
import { routes as search} from "@/modules/search";
import { routes as profile} from "@/modules/profile";

export default[
  ...auth,
  ...search,
  ...profile,
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    }
  },
  {
    path: '*',
    redirect: 'error-404',
  }
]
