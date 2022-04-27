import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { MOCK_BASE_URL } from '@/common/constants/mock'

let counter = 1
const getCounter = () => {
    counter++
    return counter
}

let applications = [
    {
        id: uuidv4(),
        name: `applicationName ${getCounter()}`,
        time: (new Date().toLocaleString().split('/').join('-').substring(0, 10))
    },
    {
        id: uuidv4(),
        name: `applicationName ${getCounter()}`,
        time: (new Date().toLocaleString().split('/').join('-').substring(0, 10))
    },
    {
        id: uuidv4(),
        name: `applicationName ${getCounter()}`,
        time: (new Date().toLocaleString().split('/').join('-').substring(0, 10))
    }
]
// 获得应用列表
export const QueryApplications = rest.get(`${MOCK_BASE_URL}/applications`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [...applications],
            total: applications.length
        })
    )
})

// 获得应用列表
export const QueryUserApplications = rest.get(`${MOCK_BASE_URL}/applications/:name`, (req, res, ctx) => {
    const { name } = req.params
    const data = applications.find(item => item.name === name)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

// 创建应用列表
export const CreateApplication = rest.post(`${MOCK_BASE_URL}/applications`, (req, res, ctx) => {
    let application = {
        id: uuidv4(),
        name: req.body.name,
        time: (new Date().toLocaleString().split('/').join('-').substring(0, 10))
    }
    applications.push(application)

    return res(
        ctx.status(201),
        ctx.json({
            message: '创建成功'
        })
    )
})
// 查询某一特定应用
export const GetApplication = rest.get(`${MOCK_BASE_URL}/applications/:id`, (req, res, ctx) => {
    const { id } = req.params
    const data = centerDatas.find(item => item.id === id)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})
// 更新应用列表
export const UpdateApplication = rest.put(`${MOCK_BASE_URL}/applications`, (req, res, ctx) => {
    let targetId = req.body.id
    applications = applications.map(item => {
        if (item.id === targetId) {
            return {
                ...req.body
            }
        }
        return item
    })
    return res(
        ctx.status(200),
        ctx.json({
            message: '修改成功'
        })
    )
})
// 删除应用列表
export const RemoveApplication = rest.delete(`${MOCK_BASE_URL}/applications/:id`, (req, res, ctx) => {
    const { id } = req.params

    applications = applications.filter(item => {
        return item.id !== id
    })
    return res(
        ctx.status(200),
        ctx.json({
            message: '删除成功'
        })
    )
})

export const ApplicationAPI = [QueryUserApplications, QueryApplications, CreateApplication, GetApplication, UpdateApplication, RemoveApplication]
