import * as types from './mutation-types'

export default{
  [types.SET_SEARCH] (state, payload){
    state.search = payload
  },
  [types.SET_ANIMALS] (state, payload){
    state.animals = payload
  },
  [types.SET_ANIMAL_DETAILS] (state, payload){
    state.animalDetails = payload
  }
}
