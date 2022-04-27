const dataset = {
    namespaced: true,
    state: {
        currentId: ''
    },
    mutations: {
        setCurrentId (state, id) {
            state.currentId = id
        }
    },
    getters: {
        currentId: state => {
            return state.currentId
        }
    }
}

export default dataset
