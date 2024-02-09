import { defineStore } from 'pinia'
import { state } from './state'
import { getters } from './getters'
import { actions } from './actions'
export const useSessionStore = defineStore('session', {
  state: () => state,
  getters: getters,
  actions: actions
})
