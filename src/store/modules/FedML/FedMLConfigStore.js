//FedML  config配置文件

const FedMLConfigStore = {
    namespaced:true,
    state:{
        configData:{}
    },
    mutations:{
        setFedMLConfig(state,data){
            state.configData = data
        },
        clearFedMLConfig(state) {
            state.configData = {}
        }
    },
    getters:{
        FedMLConfig: state =>{
            return state.configData
        }
    }
}

export default FedMLConfigStore
