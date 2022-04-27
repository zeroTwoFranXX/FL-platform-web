import { request } from '../request'
// 请求模型数据
export const getModelData = () => {
    return request({
        url: '/mock/modelData',
        method: 'get'
    })
}

// 请求模型算法组件组件
export const GetModelComponentsTreeData = () => {
    return request({
        url: '/api/mc/model-component/list/tree',
        method: 'GET'
    })
}

// 获取模型配置的配置枚举
export const GetModelParamsEnumList = () => {
    return request({
        url: '/api/mc/modelParam/myModelParamEnumList',
        method: 'GET'
    })
}

// 保存模型 dag 文件
export const SaveDagFile = (modelId, data) => {
    return request({
        method: 'POST',
        url: '/api/mc/model/saveDagFile',
        params: {
            modelId,
            IP: `192.168.179.183`
        },
        data
    })
}

// 获取模型 dag 文件
export const GetDagFile = (modelId) => {
    return request({
        method: 'POST',
        url: 'api/mc/model/getDagFile',
        data: {
            modelId
        }
    })
}

// 保存模型 conf 文件
export const SaveConfFile = (modelId, engineType, data) => {
    return request({
        method: 'POST',
        url: '/api/mc/model/saveConfFile',
        params: {
            modelId,
            engineType
            // IP: `192.168.179.183`
        },
        data
    })
}

// 获取模型 conf 文件
export const GetConfFile = (modelId) => {
    return request({
        method: 'POST',
        url: 'api/mc/model/getConfFile',
        data: {
            modelId
        }
    })
}

// 保存 dsl 文件
export const SaveDslFile = (modelId, data) => {
    return request({
        method: 'POST',
        url: '/api/mc/model/saveDslFile',
        params: {
            modelId,
            IP: `192.168.179.183`
        },
        data
    })
}

// 查看 dsl 文件
export const GetDslFile = (modelId) => {
    return request({
        method: 'POST',
        url: '/api/mc/model/getDslFile',
        data: {
            modelId
        }
    })
}

// 模型运行
export const RunModel = (modelId) => {
    return request({
        method: 'POST',
        url: '/api/mc/model/runModel',
        data: {
            modelId,
            ip: `192.168.179.183`
        }
    })
}

//获取数据集
export const getDataSet = ()=>{
    return request({
        method:'GET',
        url:'port/api/dc/datasetCenter/getLoginUserDatasetList'
    })
}
