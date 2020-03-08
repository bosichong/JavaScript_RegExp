//导入Vue
import Vue from "vue";

import App from "./components/App.vue";

// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);

// 引入Vuetify组件
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
// vuetify 自定义配置
var vuetify = new Vuetify({})


var vm = new Vue({
    el: '#app',
    render: c => c(App),
    vuetify

});

