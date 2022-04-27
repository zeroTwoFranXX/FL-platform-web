import { request } from '../request'

// 创建数据集(边缘节点)
export const CreateDataset = (data) => {
    return request({
        url: '/api/dc/datasetEdge/createEdgeDataset',
        method: 'POST',
        data
    })
}

//  CSV文件上传(边缘节点)
export const UploadFile = (data) => {
    return request({
        url: '/api/dc/datasetEdge/importCsv',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

// 中央数据注册(边缘节点)
export const RegisterCenData = (data) => {
    return request({
        url: '/api/dc/datasetEdge/registerToCenterDataset',
        method: 'POST',
        data
    })
}

// 列表查询(边缘节点)
export const GetList = (data) => {
    return request({
        url: '/api/dc/datasetEdge/getEdgeDatasetList',
        method: 'POST',
        data
    })
}

// 列表查询(中央节点)
export const GetListData = (data) => {
    return request({
        url: '/api/dc/datasetCenter/getDatasetCenterList',
        method: 'POST',
        data
    })
}

// 获取数据集详情和元数据列表(中央节点)
export const MetaData = (data) => {
    return request({
        url: '/api/dc/datasetCenter/getDatasetCenterListDetail',
        method: 'POST',
        data
    })
}

// 上传图片(中央节点)
export const UploadImg = (data) => {
    return request({
        url: '/api/dc/datasetCenter/upDatasetPicture',
        method: 'POST',
        data
    })
}

// 获取未授权用户列表(中央节点)
export const UnauthorizedList = (data) => {
    return request({
        url: '/api/msg/message/getUserList',
        method: 'POST',
        data
    })
}

// 获取已授权用户列表(中央节点)
export const AuthorizedList = (data) => {
    return request({
        url: '/api/msg/message/getJoinedUserList',
        method: 'POST',
        data
    })
}

// 授权操作(中央端)
export const Empower = (data) => {
    return request({
        url: '/api/msg/message/authorizationBatch',
        method: 'POST',
        data
    })
}

// 取消授权操作(中央端)
export const CancelEmpower = (data) => {
    return request({
        url: '/api/msg/message/unAuthorizationBatch',
        method: 'POST',
        data
    })
}