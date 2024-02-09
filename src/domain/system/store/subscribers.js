import { useRootStore } from '@/stores/store'
import { useToast } from 'primevue/usetoast'
import { MutationType } from 'pinia'

const createSystemMessagingSubscribers = () => {
  const toast = useToast()

  useRootStore().systemStore.$subscribe((mutation, state) => {
    if (mutation.payload) {
      switch (mutation.payload.toastMessage.type) {
        case 'ERROR':
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `${mutation.payload.toastMessage.payload}`,
            life: 3000
          })
          break
        case 'SUCCESS':
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: `${mutation.payload.toastMessage.payload}`,
            life: 3000
          })
          break
        case 'INFO':
          toast.add({
            severity: 'info',
            summary: 'Info',
            detail: `${mutation.payload.toastMessage.payload}`,
            life: 3000
          })
          break
        default:
          break
      }
    }
  })
}

export { createSystemMessagingSubscribers }
