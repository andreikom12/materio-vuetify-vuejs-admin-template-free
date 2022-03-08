import store from "../store"

export default req => {
  return ({ status }) => {
    if(status == 401){
      window.Vue.$router.push({ name: 'login' })
      store.dispatch('ActionSignOut')
    }
  }
}
