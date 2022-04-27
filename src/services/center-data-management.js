import { request } from '@/libs/util'
import { MOCK_BASE_URL } from '@/common/constants/mock'

// 查询数据列表
export const QueryCenterDatas = (params) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/CenterDatas',
        method: 'get',
        params
    })
}

// 创建数据
export const CreateCenterData = (data) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: '/CenterDatas',
        method: 'post',
        data
    })
}

// 查询数据
export const GetCenterData = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/CenterDatas/${id}`,
        method: 'get'
    })
}

// 根据用户名查询登陆用户的项目
export const QueryUserCenterDatas = (proName) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/CenterDatas/${proName}`,
        method: 'get'
    })
}

// // 修改数据
// export const UpdateCenterData = (data) => {
//     return request({
//         baseURL: MOCK_BASE_URL,
//         url: `/CenterDatas/`,
//         method: 'put',
//         data
//     })
// }

// 删除数据
export const RemoveCenterData = (id) => {
    return request({
        baseURL: MOCK_BASE_URL,
        url: `/CenterDatas/${id}`,
        method: 'delete'
    })
}
