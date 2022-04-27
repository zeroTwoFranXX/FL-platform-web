import { request } from '../request'

// 查询模型列表
export const ListModels = (params) => {
    return request({
        url: '/api/mc/model/myModelList',
        method: 'GET',
        params
    })
}

// 创建模型
export const CreateModel = (data) => {
    return request({
        url: '/api/mc/model/save',
        method: 'POST',
        data
    })
}

// 查询模型
export const GetModel = (modelId) => {
    return request({
        url: `api/mc/model/details`,
        method: 'get',
        params: {
            modelId
        }
    })
}

// 修改模型
export const UpdateModel = (data) => {
    return request({
        url: `/api/mc/model/updateInfo`,
        method: 'POST',
        data
    })
}

// 删除模型
export const RemoveModel = (ids) => {
    return request({
        method: 'DELETE',
        url: `/api/mc/model/delete`,
        data: [...ids]
    })
}
