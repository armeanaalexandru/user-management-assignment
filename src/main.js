import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'
import App from './App.vue'

import { withProviders, UIComponentLibraryProvider, SystemMessageProvider } from './providers'

import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './assets/main.scss'

const app = createApp(App)

withProviders(app).provide(new UIComponentLibraryProvider()).provide(new SystemMessageProvider())

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
