// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueJsonp from 'vue-jsonp'
import components from './components/'
import './assets/font/iconfont.css'
import './assets/style/common.css'

Vue.use(VueJsonp)

Vue.config.productionTip = false
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
