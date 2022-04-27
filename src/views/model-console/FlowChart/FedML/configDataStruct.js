import { cloneDeep } from 'lodash'

const configData = {
    federatedLearningAlgorithmCode:0,
    modelCode:0,
    dataset:0,
    datasetId:0,
    config:{}
}

let configJson = cloneDeep(configData)

export default {
    initData () {
        configJson = cloneDeep(configData)
    },
    getData () {
        return cloneDeep(configJson)
    },

    setData (data) {
        configJson = cloneDeep(data)
    },

    //添加模型具体参数
    setModelConf(data){
        configJson.config = data
    }
}
