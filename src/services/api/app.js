import { request } from '../request'

// 应用列表兼查询
export const getAppList = (data) => {
    return request({
        url: `/api/ac/app/getListApp`,
        method: 'POST',
        data
    })
}
// 应用删除
export const deleteApp = (appId) => {
    return request({
        url: `/api/ac/app/deleteApp/${appId}`,
        method: 'POST'
    })
}
// 创建修改(上传照片)
export const modifyApp = (data) => {
    return request({
        url: '/api/ac/app/createOrUpdateApp',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
// 下架
export const offApp = (appId) => {
    return request({
        url: `/api/ac/app/updateAppStatusOff/${appId}`,
        method: 'POST'
    })
}
// 发布
export const onlineApp = (appId) => {
    return request({
        url: `/api/ac/app/updateAppStatusOn/${appId}`,
        method: 'POST'
    })
}

// 保存应用中模型预测 conf 文件
export const SaveAppConfFile = (appId, data) => {
    return request({
        url: `/api/ac/app/saveConfFile`,
        params: {
            appId,
            IP: `192.168.179.183`
        },
        method: 'POST',
        data
    })
}

// 保存应用中模型预测 dsl 文件
export const SaveAppDslFile = (appId, data) => {
    return request({
        url: `/api/ac/app/saveDslFile`,
        params: {
            appId,
            IP: `192.168.179.183`
        },
        method: 'POST',
        data
    })
}

// 运行模型预测任务
export const RunModelPrediction = (appId) => {
    return request({
        url: `/api/ac/app/predictModel`,
        method: 'POST',
        data: {
            appId,
            ip: `192.168.179.183`
        }
    })
}

// 模型管理中应用
export const CreateApplication = (data) => {
    let formData = new FormData()
    Object.keys(data).forEach(key => {
        formData.append(key, data[key])
    })
    return request({
        url: '/api/mc/model/publishModel',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}
