import { request } from '@/libs/util'
import { MOCK_BASE_URL } from '@/common/constants/mock'

// 查询模型列表
export const QueryChildDatas = (params) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/childDatas',
        method: 'get',
        params
    })
}

// 创建模型
export const CreateChildData = (data) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/ChildDatas',
        method: 'post',
        data
    })
}

// 查询模型
export const GetChildData = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/ChildDatas/${id}`,
        method: 'get'
    })
}

// 修改模型
export const UpdateChildData = (data) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/ChildDatas/`,
        method: 'put',
        data
    })
}

// 删除模型
export const RemoveChildData = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/ChildDatas/${id}`,
        method: 'delete'
    })
}
