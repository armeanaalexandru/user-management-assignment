<template>
  <div class="container">
    <div class="grid">
      <div class="col-12">
        <div class="flex flex-column align-items-center justify-content-center">
          <h1>Unauthorized Access</h1>
          <div class="card">
            <p>Please log into your account to access this page!</p>
            <div class="flex justify-content-center">
              <router-link to="/authentication/login">
                <Button class="btn__primary" label="Login" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
