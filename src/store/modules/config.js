
import {
    getComponentTypeByNodeId,
    getVueNameByNodeId
} from '@/views/model-console/bussiness/nodesData'
import SelectNodeName from "@/views/model-console/bussiness/SelectNodeName";

const config = {
    namespaced: true,
    state: {
        currentNode: '',
        //除Fate外其他引擎使用的组件id
        componentId:0
    },
    mutations: {
        setCurrentNodeId (state, nodeId) {
            state.currentNode = nodeId
            console.log("currentNode:",state.currentNode)
        },
        setComponentId(state,id){
            state.componentId = id
            console.log(state.componentId)
        }
    },
    getters: {
        currentNodeId: state => {
            return state.currentNode
        },
        currentComponentType: state => {
            return getComponentTypeByNodeId(state.currentNode)
        },
        currentVueName: state => {
            console.log(getVueNameByNodeId(state.currentNode))
            return getVueNameByNodeId(state.currentNode)
        },
        getComponentId: state=>{
            return state.componentId
        },
        getVueName: state =>{
            console.log(SelectNodeName.getVueName(state.componentId))
            return SelectNodeName.getVueName(state.componentId)
        }
    }
}

export default config
