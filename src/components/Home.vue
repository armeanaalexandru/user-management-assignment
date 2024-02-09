<template>
  <div class="container">
    <div class="grid">
      <div class="col-12">
        <div class="flex flex-column align-items-center justify-content-center">
          <h1>User Management System</h1>
          <div class="card">
            <p>Welcome! Please log into your account or create an account if you don't have one!</p>
            <div class="flex justify-content-center gap-3">
              <router-link to="/authentication/login">
                <Button class="btn__primary" label="Login" />
              </router-link>
              <router-link to="/authentication/register">
                <Button class="btn__ternary" label="Register" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
