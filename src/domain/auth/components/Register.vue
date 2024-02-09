<template>
  <div class="container my-5">
    <div class="grid">
      <div class="col-12 md:col-6 md:col-offset-3">
        <div class="card">
          <form @submit.prevent="onSubmitRegister(!v$.$invalid)">
            <div class="grid">
              <div class="col-12">
                <p class="mt-0 mb-2 text-4xl font-bold">Register a new account</p>
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="p-float-label">
                  <InputText
                    id="registerFirstName"
                    class="w-full"
                    v-model="v$.registerFirstName.$model"
                    :class="{
                      'p-invalid': v$.registerFirstName.$invalid && submitted
                    }"
                  />
                  <label for="registerFirstName">First Name</label>
                </span>
                <small
                  v-if="
                    (v$.registerFirstName.required.$invalid && submitted) ||
                    v$.registerFirstName.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerFirstName.required.$message }}</small
                >
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="p-float-label">
                  <InputText
                    id="registerLastName"
                    class="w-full"
                    v-model="v$.registerLastName.$model"
                    :class="{
                      'p-invalid': v$.registerLastName.$invalid && submitted
                    }"
                  />
                  <label for="registerLastName">Last Name</label>
                </span>
                <small
                  v-if="
                    (v$.registerLastName.required.$invalid && submitted) ||
                    v$.registerLastName.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerLastName.required.$message }}</small
                >
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="p-float-label">
                  <InputText
                    id="registerEmail"
                    class="w-full"
                    v-model="v$.registerEmail.$model"
                    :class="{
                      'p-invalid': v$.registerEmail.$invalid && submitted
                    }"
                  />
                  <label for="registerEmail">Email Address</label>
                </span>
                <small
                  v-if="
                    (v$.registerEmail.required.$invalid && submitted) ||
                    v$.registerEmail.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerEmail.required.$message }}</small
                >
                <small
                  v-else-if="
                    (v$.registerEmail.email.$invalid && submitted) ||
                    v$.registerEmail.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerEmail.email.$message }}</small
                >
              </div>
              <div class="col-12 sm:col-6 mt-3">
                <span class="p-float-label">
                  <Password
                    v-model="v$.registerPassword.$model"
                    inputId="registerPassword"
                    :feedback="false"
                    toggleMask
                    :class="{
                      'p-invalid': v$.registerPassword.$invalid && submitted
                    }"
                  />
                  <label for="registerPassword">Password</label>
                </span>
                <small
                  v-if="
                    (v$.registerPassword.required.$invalid && submitted) ||
                    v$.registerPassword.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerPassword.required.$message }}</small
                >
                <small
                  v-else-if="
                    (v$.registerPassword.minLength.$invalid && submitted) ||
                    v$.registerPassword.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.registerPassword.minLength.$message }}</small
                >
              </div>
              <div class="col-12 mt-3">
                <span class="p-float-label">
                  <Dropdown
                    id="userRole"
                    v-model="v$.userRole.$model"
                    :options="userRoles"
                    optionLabel="name"
                    placeholder="Select user role"
                    class="w-full"
                    :class="{
                      'p-invalid': v$.userRole.$invalid && submitted
                    }"
                  />

                  <label for="userRole">User Role</label>
                </span>
                <small
                  v-if="
                    (v$.userRole.required.$invalid && submitted) || v$.userRole.$pending.$response
                  "
                  class="p-error"
                  >{{ v$.userRole.required.$message }}</small
                >
              </div>
              <div class="col-12 mt-3">
                <Button type="submit" class="btn__primary" label="Register account" />
              </div>
              <div class="col-12 text-center text-xs">
                Already have an account? Log in
                <router-link to="/authentication/login">here</router-link>.
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
import { required, helpers, email, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { registerUser } from '@/domain/auth/helper/index'
export default {
  setup() {
    const submitted = ref(false)
    const formFields = reactive({
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      registerPassword: '',
      userRole: ''
    })

    const formRules = {
      registerFirstName: { required: helpers.withMessage('First name is required', required) },
      registerLastName: { required: helpers.withMessage('Last name is required', required) },
      registerEmail: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('A valid email is required. For example: qwe@abc.xyz', email)
      },
      registerPassword: {
        required: helpers.withMessage(`Password field is required`, required),
        minLength: helpers.withMessage('Password must have at least 8 characters', minLength(8))
      },
      userRole: { required: helpers.withMessage(`Please select a role`, required) }
    }

    const v$ = useVuelidate(formRules, formFields)

    const userRoles = ref([
      { name: 'User', code: 'user' },
      { name: 'Admin', code: 'admin' }
    ])

    const onSubmitRegister = (isFormValid) => {
      submitted.value = true
      if (!isFormValid) {
        return
      }

      registerUser(
        formFields.registerEmail,
        formFields.registerPassword,
        formFields.registerFirstName,
        formFields.registerLastName,
        formFields.userRole.name
      )
    }

    return {
      formFields,
      formRules,
      v$,
      submitted,
      onSubmitRegister,
      userRoles
    }
  }
}
</script>
