<template>
  <Toast />
  <RouterView />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import { createSystemMessagingSubscribers } from '@/domain/system/store/subscribers'
import { logoutUser } from '@/domain/auth/helper/index'

const inactivityTimer = ref(null)

//log out user for 5 minutes of inactivity
const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer.value)

  inactivityTimer.value = setTimeout(
    () => {
      logoutUser('inactivity')
    },
    5 * 60 * 1000
  )
}

const handleUserInteraction = () => {
  resetInactivityTimer()
}

createSystemMessagingSubscribers()

//listeners for user interaction
onMounted(() => {
  window.addEventListener('mousemove', handleUserInteraction)
  window.addEventListener('keypress', handleUserInteraction)
  resetInactivityTimer()
})

//clean up event listeners when the component is unmounted
onBeforeUnmount(() => {
  console.log('clean')
  window.removeEventListener('mousemove', handleUserInteraction)
  window.removeEventListener('keypress', handleUserInteraction)
  clearTimeout(inactivityTimer.value)
})
</script>
