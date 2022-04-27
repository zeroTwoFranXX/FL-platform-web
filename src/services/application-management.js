import { request } from '@/libs/util'
import { MOCK_BASE_URL } from '@/common/constants/mock'

// 查询应用列表
export const QueryApplications = (params) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/Applications',
        method: 'get',
        params
    })
}

// 查询用户应用列表
export const QueryUserApplications = (name) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/Applications/${name}`,
        method: 'get'
        // params
    })
}

// 创建应用
export const CreateApplication = (data) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/Applications',
        method: 'post',
        data
    })
}

// 查询应用
export const GetApplication = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/Applications/${id}`,
        method: 'get'
    })
}

// 修改应用
export const UpdateApplication = (data) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/Applications/`,
        method: 'put',
        data
    })
}

// 删除应用
export const RemoveApplication = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/Applications/${id}`,
        method: 'delete'
    })
}
