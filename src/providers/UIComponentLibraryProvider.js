import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Password from 'primevue/password'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

export default class UIComponentLibraryProvider {
  components = [
    { name: 'Dropdown', component: Dropdown },
    { name: 'Button', component: Button },
    { name: 'InputText', component: InputText },
    { name: 'InputNumber', component: InputNumber },
    { name: 'Password', component: Password },
    { name: 'Menubar', component: Menubar },
    { name: 'Toast', component: Toast }
  ]
  provide(app) {
    this.components.map(({ name, component }) => app.component(name, component))
  }
}
