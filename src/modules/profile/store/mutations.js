import * as types from './mutation-types'

export default{
  [types.SET_SEARCH] (state, payload){
    state.search = payload
  }
}
