import router from '@/router'
import { useRootStore } from '@/stores/store'
import { supabase } from '@/lib/supabaseClient'

const registerUser = async (email, password, firstName, lastName, userRole) => {
  const store = useRootStore()
  const role = userRole === 'admin' ? 'service_role' : 'authenticated'
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        user_role: userRole
      }
    },
    role: role
  })
  if (error) {
    store.systemStore.addToastMessage('ERROR', error)
    console.error(error)
  } else {
    store.systemStore.addToastMessage('SUCCESS', 'Successfully created account')
    router.push('/authentication/login')
  }
}

const loginUser = async (email, password) => {
  const store = useRootStore()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) {
    store.systemStore.addToastMessage('ERROR', error)
    console.error(error)
  } else {
    store.systemStore.addToastMessage('SUCCESS', 'Successfully logged in')
    router.push('/dashboard')
  }
}

const logoutUser = async (logoutType) => {
  const store = useRootStore()
  const { error } = await supabase.auth.signOut()
  if (error) {
    store.systemStore.addToastMessage('ERROR', error)
    console.error(error)
  } else {
    switch (logoutType) {
      case 'logout':
        store.systemStore.addToastMessage('SUCCESS', 'Successfully logged out')
        break
      case 'passwordChange':
        store.systemStore.addToastMessage(
          'INFO',
          'Your password has been changed. Please login again'
        )
        break
      case 'inactivity':
        store.systemStore.addToastMessage('ERROR', 'You have been logged out for inactivity')
        break
    }
    router.push('/')
  }
}

const changeUserPassword = async (newPassword) => {
  const store = useRootStore()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  if (error) {
    store.systemStore.addToastMessage('ERROR', error)
    console.error(error)
  } else {
    logoutUser('passwordChange')
  }
}

export { registerUser, loginUser, logoutUser, changeUserPassword }
