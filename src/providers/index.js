import UIComponentLibraryProvider from './UIComponentLibraryProvider'
import SystemMessageProvider from './SystemMessageProvider'

class WithServiceProviders {
  constructor(app, providers) {
    this.app = app
  }
  provide(provider) {
    provider.provide(this.app)
    return this
  }
}

const withProviders = (app, providers) => {
  return new WithServiceProviders(app, providers)
}

export { withProviders, UIComponentLibraryProvider, SystemMessageProvider }
