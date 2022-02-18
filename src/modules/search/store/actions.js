import services from '@/services'
import * as types from './mutation-types'

export const ActionFind = ({ commit }, payload) => {
  return new Promise(async (resolve, reject) => {
    try{
      await services.search.find(payload).then(res => {
        commit(types.SET_SEARCH, res.data)
      })

      resolve()
    }catch(err){
      reject(err)
    }
  })
}
