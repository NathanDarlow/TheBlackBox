// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import VueScrollTo from 'vue-scrollto'
import store from './store'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'


 const EventBus = new Vue();

 export default EventBus;

 const vuetifyOptions = { }
 Vue.use(Vuetify, {
  theme: {
    primary: '#000',
    secondary: '#29B6F6',
    anyColor: '#0000'
}
 })

Vue.use(VeeValidate)
Vue.use(VueScrollTo)
Vue.config.productionTip = false
sync(store, router) // done. Returns an unsync callback fn


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify: new Vuetify(vuetifyOptions),
  components: { App },
  template: '<App/>'
})
