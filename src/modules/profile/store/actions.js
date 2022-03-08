import services from '@/services'
import * as types from './mutation-types'

export const ActionDoUpdate = ({ dispatch }, payload) => {
  return services.profile.update(payload).then(res => {
    return res.data
  })
}

export const ActionDoUpdateAnimal = ({ dispatch }, payload) => {
  return services.profile.updatePets(payload).then(res => {
    return res.data
  })
}

export const ActionInsertAnimal = ({ dispatch }, payload) => {
  return services.profile.insert(payload).then(res => {
    return res.data
  })
}

export const ActionDeleteAnimal = ({ dispatch }, payload) => {
  return services.profile.delete(payload).then(res => {
    return res.data
  })
}

export const ActionFindAnimals = ({ commit }) => {
  return new Promise(async (resolve, reject) => {
    try{
      await services.profile.find().then(res => {
        commit(types.SET_ANIMALS, res.data)
      })

      resolve()
    }catch(err){
      reject(err)
    }
  })
}

export const ActionFindAnimalDetail = ({ commit }, payload) => {
  return new Promise(async (resolve, reject) => {
    try{
      await services.profile.findDetails(payload).then(res => {
        commit(types.SET_ANIMAL_DETAILS, res.data)
      })

      resolve()
    }catch(err){
      reject(err)
    }
  })
}
