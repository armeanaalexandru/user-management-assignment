<template>
  <div>
    <div class="container">
      <div class="flex justify-content-between card">
        <div class="flex gap-3">
          <router-link class="no-underline font-medium" to="/dashboard">Dashboard</router-link>
        </div>
        <div class="flex gap-3">
          <span
            >Hello, <b>{{ accountInfo.session?.user.user_metadata.first_name }}</b></span
          >
          <span class="cursor-pointer" @click="logoutUser('logout')">Log out</span>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>User Dashboard</h1>
      <div class="card">
        <p><b>Role:</b> {{ accountInfo.session?.user.user_metadata.user_role }}</p>
        <p>
          <b>Name:</b> {{ accountInfo.session?.user.user_metadata.first_name }}
          {{ accountInfo.session?.user.user_metadata.last_name }}
        </p>
        <p><b>Email:</b> {{ accountInfo.session?.user.email }}</p>
        <p><b>Change Your Password</b></p>
        <form @submit.prevent="onSubmitChangePassword(!v$.$invalid)">
          <div class="mt-4 flex gap-3">
            <div class>
              <span class="p-float-label">
                <Password
                  v-model="v$.userPassword.$model"
                  inputId="password"
                  :feedback="false"
                  toggleMask
                  :class="{
                    'p-invalid': v$.userPassword.$invalid && submitted
                  }"
                />
                <label for="password">New Password</label>
              </span>
              <small
                v-if="
                  (v$.userPassword.required.$invalid && submitted) ||
                  v$.userPassword.$pending.$response
                "
                class="p-error"
                >{{ v$.userPassword.required.$message }}</small
              >
              <small
                v-else-if="
                  (v$.userPassword.minLength.$invalid && submitted) ||
                  v$.userPassword.$pending.$response
                "
                class="p-error"
                >{{ v$.userPassword.minLength.$message }}</small
              >
            </div>
            <div class="">
              <Button type="submit" class="btn__primary" label="Change" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRootStore } from '@/stores/store'
import { ref, onMounted, computed, reactive } from 'vue'
import { required, helpers, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { logoutUser, changeUserPassword } from '@/domain/auth/helper/index'

export default {
  setup() {
    onMounted(() => {
      store.sessionStore.fetchUserSession()
    })
    const store = useRootStore()
    const accountInfo = computed(() => store.sessionStore.getUserSession)
    const submitted = ref(false)
    const formFields = reactive({
      userPassword: ''
    })

    const formRules = {
      userPassword: {
        required: helpers.withMessage(`Please fill a new password`, required),
        minLength: helpers.withMessage('Password must have at least 8 characters', minLength(8))
      }
    }

    const v$ = useVuelidate(formRules, formFields)

    const onSubmitChangePassword = (isFormValid) => {
      submitted.value = true
      if (!isFormValid) {
        return
      }

      changeUserPassword(formFields.userPassword)
    }

    return { logoutUser, accountInfo, formFields, formRules, v$, submitted, onSubmitChangePassword }
  }
}
</script>
