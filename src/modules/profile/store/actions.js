import services from '@/services'
import * as types from './mutation-types'

export const ActionDoUpdate = ({ dispatch }, payload) => {
  return services.profile.update(payload).then(res => {
    return res.data
  })
}
