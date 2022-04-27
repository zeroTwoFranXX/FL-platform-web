import { request } from '../request'

// 通过密码登陆
export const LoginByPassword = (data, headers) => {
    return request({
        url: '/api/uc/login',
        method: 'post',
        data: {
            ...data,
            'grantType': 'password'
        },
        headers
    })
}
