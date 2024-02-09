<template>
  <div class="container my-5">
    <div class="grid">
      <div class="col-12 md:col-6 md:col-offset-3">
        <div class="card">
          <form @submit.prevent="onSubmitLogIn(!v$.$invalid)">
            <div class="grid">
              <div class="col-12">
                <p class="mt-0 mb-2 text-4xl font-bold">Log In</p>
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="flex flex-column p-float-label">
                  <InputText
                    id="loginEmail"
                    class="w-full"
                    v-model="v$.userEmail.$model"
                    :class="{
                      'p-invalid': v$.userEmail.$invalid && submitted
                    }"
                  />
                  <label for="loginEmail">Email Address</label>
                </span>
                <small
                  v-if="
                    (v$.userEmail.required.$invalid && submitted) || v$.userEmail.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.userEmail.required.$message }}</small
                >
                <small
                  v-else-if="
                    (v$.userEmail.email.$invalid && submitted) || v$.userEmail.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.userEmail.email.$message }}</small
                >
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="p-float-label">
                  <span class="p-float-label">
                    <Password
                      v-model="v$.userPassword.$model"
                      inputId="loginPassword"
                      :feedback="false"
                      toggleMask
                      :class="{
                        'p-invalid': v$.userPassword.$invalid && submitted
                      }"
                    />
                    <label for="loginPassword">Password</label>
                  </span>
                  <small
                    v-if="
                      (v$.userPassword.$invalid && submitted) || v$.userPassword.$pending.$response
                    "
                    class="p-error"
                    >{{ v$.userPassword.required.$message }}</small
                  >
                </span>
              </div>
              <div class="col-12">
                <Button type="submit" class="btn__primary" label="Login" />
              </div>
              <div class="col-12 text-center text-xs">
                Don't have an account? Create one
                <router-link to="/authentication/register">here</router-link>.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { required, helpers, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { loginUser } from '@/domain/auth/helper/index'

export default {
  setup() {
    const submitted = ref(false)
    const formFields = reactive({
      userEmail: '',
      userPassword: ''
    })

    const formRules = {
      userEmail: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('A valid email is required. For example: qwe@abc.xyz', email)
      },
      userPassword: { required: helpers.withMessage(`Password field is required`, required) }
    }

    const v$ = useVuelidate(formRules, formFields)

    const onSubmitLogIn = (isFormValid) => {
      submitted.value = true
      if (!isFormValid) {
        return
      }

      loginUser(formFields.userEmail, formFields.userPassword)
    }

    return { formFields, formRules, v$, submitted, onSubmitLogIn }
  }
}
</script>
