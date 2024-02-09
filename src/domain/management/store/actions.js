import { supabase } from '@/lib/supabaseClient'

export const actions = {
  async fetchUserSession() {
    try {
      const sessionResponse = await supabase.auth.getSession()
      if (sessionResponse.data) {
        this.saveUserSession(sessionResponse.data)
      } else {
        console.error(sessionResponse.error)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  },

  saveUserSession(sessionObject) {
    this.userSession = sessionObject
  }
}
