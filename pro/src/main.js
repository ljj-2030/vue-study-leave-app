import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import "./assets/font_2920381_gl45iidscaw/iconfont.css"
import{Button,NavBar,Icon,Tab,Tabs,Divider,Calendar,Cell,Popup,Picker,Toast,
DatetimePicker,Switch,Field,Uploader,Checkbox,Dialog} from "vant"
Vue.use(Button).use(NavBar).use(Icon).use(Tab).use(Tabs).use(Divider).use(Calendar).use(Cell)
.use(Popup).use(Picker).use(Toast).use(DatetimePicker).use(Switch).use(Field).use(Uploader).use(Checkbox)
.use(Dialog)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
