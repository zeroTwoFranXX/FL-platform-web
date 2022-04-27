import { request } from '../request'

// 获取项目详情
export const ProjectDetails = (data) => {
    return request({
        url: '/api/pc/project/getProjectDetail',
        method: 'POST',
        data
    })
}
// 获取模型列表
export const ModelList = (data) => {
    return request({
        url: '/api/mc/model/getModelListPaging',
        method: 'POST',
        data
    })
}
// 获取应用详情
export const AppDetails = (data) => {
    return request({
        url: '/api/ac/app/getAppDetail',
        method: 'POST',
        data
    })
}
// 获取数据集详情
export const DataDetails = (data) => {
    return request({
        url: '/api/dc/datasetCenter/getDatasetCenterDetail',
        method: 'POST',
        data
    })
}
// 获取参与机构轮播图信息
export const RotChart = (projectId) => {
    return request({
        url: `/api/pc/project/getProjectParticipateOrgInfoList/${projectId}`,
        method: 'POST'
    })
}
// 申请加入
export const ApplyJoin = (data) => {
    return request({
        url: `/api/msg/message/application`,
        method: 'POST',
        data
    })
}
