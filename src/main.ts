import Vue from 'vue'
import App from './App.vue'
import {i18n, loadLanguageAsync} from './i18n'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
