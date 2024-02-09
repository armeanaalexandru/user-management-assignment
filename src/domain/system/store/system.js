import { defineStore } from 'pinia'
import { state } from './state'
import { getters } from './getters'
import { actions } from './actions'
export const useSystemStore = defineStore('system', {
  state: () => state,
  getters: getters,
  actions: actions
})
