import store from "../store"

export default async (to, from, next) => {
  var global_pages = [
    'search',
  ]

  if(global_pages.indexOf(to.name) >= 0){
    try {
      await store.dispatch('auth/ActionCheckToken')
    } catch (err) { }

    next()
  }else{
    var auth_pages = [
      'login',
      'register'
    ]
    if (auth_pages.indexOf(to.name) < 0 && !store.getters['auth/hasToken']) {
      try {
        await store.dispatch('auth/ActionCheckToken')

        next({ path: to.path })
      } catch (err) {
        next({ name: 'search' })
      }
    } else {
      if (auth_pages.indexOf(to.name) >= 0 && store.getters['auth/hasToken']) {
        next({ name: '' })
      } else {
        next()
      }
    }
  }
}
