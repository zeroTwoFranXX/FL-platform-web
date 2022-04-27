import { request } from './request'

// 查询节点列表
export const QueryNodes = (data) => {
    return request({
        // url: '/api/nc/node/myNodeList',
        url:'/api/nc/node/searchByMyList',
        method: 'POST',
        data
    })
}

// 删除节点
export const RemoveNode = (Ids) => {
    return request({
        method: 'POST',
        url: `/api/nc/node/delete/${Ids}`
    })
}
// 查询节点
export const GetNode = (nodeId) => {
    return request({
        url: `api/nc/node/details`,
        method: 'get',
        params: {
            nodeId
        }
    })
}

// 创建节点
export const CreateNode = (data) => {
    return request({
        url: '/api/nc/node/save',
        method: 'POST',
        data
    })
}

// 修改节点
export const UpdateNode = (data) => {
    return request({
        url: `/api/nc/node/updateInfo`,
        method: 'POST',
        data
    })
}
