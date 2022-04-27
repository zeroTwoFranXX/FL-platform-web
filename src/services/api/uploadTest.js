import { request } from '../request'

// 注册
export const uploadTest = (data) => {
    return request({
        url: '/api/test/fileParamTest',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
// 上传照片
export const projUpload = (data) => {
    return request({
        url: '/api/pc/project/updateOrCreatProject',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
