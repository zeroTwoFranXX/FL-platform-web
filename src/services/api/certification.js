import { request } from '../request'

// 获取用户实名认证信息（实名认证页面显示使用）
export const GetInfo = (data) => {
    return request({
        url: '/api/uc/getUserAuthenticationInfo',
        method: 'POST',
        data
    })
}

// 用户实名认证
export const IdVerification = (data) => {
    return request({
        url: '/api/uc/userAuthentication',
        method: 'POST',
        data
    })
}

// 获取企业实名认证信息
export const GetOrgInfo = (data) => {
    return request({
        url: '/api/uc/orgInfo',
        method: 'POST',
        data
    })
}

// 企业实名认证
export const EnterCertification = (data) => {
    return request({
        url: '/api/uc/orgRegisterOrupdate',
        method: 'POST',
        data
    })
}
