import { request } from '../request'

// 注册
export const CreateUser = (data) => {
    return request({
        url: '/api/uc/users',
        method: 'POST',
        data
    })
}
