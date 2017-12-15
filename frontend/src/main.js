// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import "@/assets/styles/main.scss"
import VueResource from 'vue-resource'


Vue.prototype.$axios = axios;

import Mock from './mock'
Mock.init()

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})