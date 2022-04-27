import { request } from '../request'

// 项目分类
export const getProjectType = (data) => {
    return request({
        url: `/api/pc/projectType/getAllProjectType`,
        method: 'POST',
        data
    })
}
// 项目列表
export const getProjectList = (data) => {
    return request({
        url: `/api/pc/project/getProjectListPaging`,
        method: 'POST',
        data
    })
}

// 应用列表
export const getApplicationList = (data) => {
    return request({
        url: `/api/ac/app/getAppListPaging`,
        method: 'POST',
        data
    })
}
// 数据列表
export const getDataList = (data) => {
    return request({
        url: `/api/dc/datasetCenter/getDatasetCenterListPaging`,
        method: 'POST',
        data
    })
}
// 申请加入
export const applyJoin = (data) => {
    return request({
        url: `/api/msg/message/application`,
        method: 'POST',
        data
    })
}
