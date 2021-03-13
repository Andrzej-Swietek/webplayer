import Vue from 'vue'
import App from './App.vue'
// store w całości zamieszczony w pliku index.js
import vuex from "./store/index"
Vue.config.productionTip = false

new Vue({
  store: vuex,
  render: h => h(App),
}).$mount('#app')
