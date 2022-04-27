import { request } from './request'

// 查询节点列表
export const QueryMessageList = (data) => {
    return request({
        url: '/api/msg/message/getMessage',
        method: 'POST',
        data
    })
}

// 删除消息
export const RemoveMessage = (messageId) => {
    return request({
        url: `/api/msg/message/deleteMsg/${messageId}`,
        method: 'DELETE'
    })
}


// 处理用户消息
// export const AuthorizationBatchMessage=(data)=>{
//     return request({
//         url:`/api/msg/message/invitationBatch`,
//         method:'POST',
//         data
//
//     })
// }
export const AuthorizationBatchMessage=(data)=>{
    return request({
        url:`/api/msg/message/applyAuth`,
        method:'POST',
        data

    })
}

// 查询消息
export const GetMessage = (messageId) => {
    return request({
        url: `/api/msg/message/messageDetail/${messageId}`,
        method: 'POST'
    })
}
