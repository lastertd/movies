import Vue from 'vue';
import router from "@/router";




import App from './App.vue';
import sssUI from "sss-ui";

Vue.config.productionTip = false;
Vue.use(sssUI);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
