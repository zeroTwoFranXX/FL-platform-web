import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import shake from './modules/shake'
import config from './modules/config'
import model from './modules/model'
import dataset from './modules/dataset'
import FateConfStore from "@/store/modules/Fate/FateConfStore";
import FateDslStore from "@/store/modules/Fate/FateDslStore";
import FedMLConfigStore from "@/store/modules/FedML/FedMLConfigStore";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        shake,
        config,
        model,
        dataset,
        FateConfStore,
        FateDslStore,
        FedMLConfigStore
    }
})
