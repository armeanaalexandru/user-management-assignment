import ToastService from 'primevue/toastservice'

export default class SystemMessageProvider {
  provide(app) {
    app.use(ToastService)
  }
}
