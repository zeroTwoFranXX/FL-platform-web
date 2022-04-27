import { cloneDeep } from 'lodash'
import {getData} from "@/views/model-console/bussiness/nodesData";

let dslData = new Map()

let DslJson = cloneDeep(dslData)

export default {
    initData () {
        DslJson = cloneDeep(dslData)
    },
    getData () {
        return cloneDeep(DslJson)
    },

    setData (data) {
        DslJson = cloneDeep(data)
    },

    //修改节点信息
    addComponents (nodeName,nodeData) {
        DslJson.set(nodeName,nodeData)
    },

    //删除节点信息
    deleteComponent(nodeName){
        DslJson.delete(nodeName)
        console.log(DslJson)
    }


}
