import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less' // 全局加载样式
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible' // css px适配rem

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
