import Vue from 'vue'
import App from './app.vue'
import byStore from 'biyi-store'
// 导入 ViewUI
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// 导入比翼UI
import biyiUI from 'biyi-ui'
import 'biyi-ui/src/biyi-ui.css'
import util from './libs/util'
import router from './router/router'
import store from './store/store'
import VueI18n from 'vue-i18n'
import localeI18n from './i18n/index'
import { ButtonLimited } from 'biyi-admin'
import { Tree, Tooltip,Upload,Button,Select } from 'element-ui'
import { setStoreCache } from '@/common/helpers/store'
// import { runMock } from '@/mocks/mock'
// runMock()
Vue.config.productionTip = false

Vue.prototype.$util = util
Vue.prototype.$http = util.http

Vue.use(byStore)
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper)
Vue.use(Tree)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Select)
Vue.use(iView, {
    i18n: function (path, options) {
        let value = i18n.t(path, options)
        if (value !== null && value !== undefined) {
            return value
        }
        return ''
    }
})
Vue.use(biyiUI)

Vue.component('Button', ButtonLimited)

Vue.locale = () => {}

const i18n = new VueI18n(localeI18n)

const vm = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

// 页面刷新时缓存 vue store 信息
setStoreCache(vm)

export default vm
