import { defineStore } from 'pinia'
import { useSessionStore } from '@/domain/management/store/session'
import { useSystemStore } from '@/domain/system/store/system'

export const useRootStore = defineStore('store', () => {
  const sessionStore = useSessionStore()
  const systemStore = useSystemStore()

  return {
    sessionStore,
    systemStore
  }
})
