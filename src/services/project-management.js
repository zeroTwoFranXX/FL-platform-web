import { request } from './request'

// 查询模型列表
export const QueryProjects = (data) => {
    return request({
        url: '/api/pc/project/getProjectListByLogonUserPaging',
        method: 'POST',
        // params
        data
    })
}

// 获取项目类型列表
export const ProjectTypeList = (data) => {
    return request({
        url: '/api/pc/projectType/getAllProjectType',
        method: 'POST',
        data
    })
}
// 创建项目
export const CreateProject = (data) => {
    return request({

        url: '/api/pc/project/updateOrCreatProject',
        method: 'POST',
        data
    })
}

// 根据用户名查询登陆用户的项目
export const QueryUserProjects = (proName) => {
    return request({

        url: `/api/projects/${proName}`,
        method: 'get'
    })
}

// 查询项目
export const GetProject = (id) => {
    return request({
        url: `/api/pc/project/updateOrCreatProject`,
        method: 'POST',
        data: {
            id
        }
    })
}

// // 检索项目
export const GetSearchProject = (data) => {
    return request({
        url: `/api/pc/project/getProjectListByLogonUserPaging`,
        method: 'POST',
        data
    })
}

// 修改项目
export const UpdateProject = (data) => {
    return request({
        url: `/api/pc/project/updateOrCreatProject`,
        method: 'put',
        data
    })
}

// 删除项目
export const RemoveProject = (projectId) => {
    return request({
        url: `/api/pc/project/deleteProject/${projectId}`,
        method: 'POST'
    })
}

// 退出项目
export const ExitProject=(data)=>{
    return request({
        url: `/api/msg/message/application`,
        method: 'POST',
        data

    })
}

// 邀请用户加入项目
export const ProjectInvitationBatch = (data) => {
    return request({
        url: `/api/msg/message/invitationBatch`,
        method: 'POST',
        data

    })
}

// 获取成员列表
export const userList = (data) => {
    return request({
        url: '/api/msg/message/getUserList',
        method: 'POST',
        data
    })
}
