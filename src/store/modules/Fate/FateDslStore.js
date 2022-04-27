//FATE conf配置文件
const FateDslStore = {
    //命名空间使模块具有更高的封装性和复用性
    namespaced: true,
    state: {
        //组件参数
        dslData:{}
    },
    mutations: {
        //设置数据
        setDslData(state,data) {
            state.dslData = data
        },
        //清空数据
        clearDslData(state, data) {
            state.dslData = data
        }
    },
    getters:{
        DslData: state =>{
            return state.dslData
        }
    }

}

export default FateDslStore
