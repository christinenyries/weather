import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import BaseAnimatedPlaceholder from '@/components/base/BaseAnimatedPlaceholder.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BaseSuspense from '@/components/base/BaseSuspense.vue'

const app = createApp(App)

app.use(router)
app.component('BaseAnimatedPlaceholder', BaseAnimatedPlaceholder)
app.component('BaseModal', BaseModal)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseSuspense', BaseSuspense)

app.mount('#app')
