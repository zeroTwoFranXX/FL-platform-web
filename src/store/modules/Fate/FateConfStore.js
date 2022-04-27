//FATE conf配置文件
const FateConfStore = {
    //命名空间使模块具有更高的封装性和复用性
    namespaced: true,
    state: {
        //组件参数
        confData:{}
    },
    mutations: {
        //设置数据
        setConfData(state,data) {
            state.confData = data
        },
        //清空数据
        clearConfData(state, data) {
            state.confData = data
        }
    },
    getters:{
        ConfData: state =>{
            return state.confData
        }
    }

}

export default FateConfStore
