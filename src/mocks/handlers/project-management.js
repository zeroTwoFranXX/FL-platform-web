import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { MOCK_BASE_URL } from '@/common/constants/mock'
let counter = 1
const getCounter = () => {
    counter++
    return counter
}

let projects = [
    {
        proNumber: uuidv4(),
        proName: `Name${getCounter()}`,
        proType: '123',
        proCreator: '123',
        creatorPost: '123',
        proOrganization: `${getCounter()}大学`
    },
    {
        proNumber: uuidv4(),
        proName: `Name${getCounter()}`,
        proType: '456',
        proCreator: '456',
        creatorPost: '456',
        proOrganization: `${getCounter()}大学`
    },
    {
        proNumber: uuidv4(),
        proName: `Name${getCounter()}`,
        proType: '789',
        proCreator: '789',
        creatorPost: '789',
        proOrganization: `${getCounter()}大学`
    }
]

export const QueryProjects = rest.get(`${MOCK_BASE_URL}/projects`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [...projects],
            total: projects.length
        })
    )
})

export const CreateProject = rest.post(`${MOCK_BASE_URL}/projects`, (req, res, ctx) => {
    let project = {
        proNumber: uuidv4(),
        proName: req.body.proName,
        proType: req.body.proType,
        proCreator: req.body.proCreator,
        creatorPost: req.body.creatorPost,
        proOrganization: req.body.proOrganization

    }
    projects.push(project)

    return res(
        ctx.status(201),
        ctx.json({
            message: '创建成功'
        })
    )
})

export const GetProject = rest.get(`${MOCK_BASE_URL}/projects/:proNumber`, (req, res, ctx) => {
    const { proNumber } = req.params
    console.log(req)
    const data = projects.find(item => item.proNumber === proNumber)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

export const QueryUserProject = rest.get(`${MOCK_BASE_URL}/projects/:proName`, (req, res, ctx) => {
    const { proName } = req.params
    console.log(req)
    const data = projects.find(item => item.proName === proName)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

export const UpdateProject = rest.put(`${MOCK_BASE_URL}/projects`, (req, res, ctx) => {
    let targetId = req.body.proNumber
    projects = projects.map(item => {
        if (item.proNumber === targetId) {
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

export const RemoveProject = rest.delete(`${MOCK_BASE_URL}/projects/:proNumber`, (req, res, ctx) => {
    const { proNumber } = req.params
    projects = projects.filter(item => {
        return item.proNumber !== proNumber
    })

    return res(
        ctx.status(200),
        ctx.json({
            message: '删除成功'
        })
    )
})

export const GetSearchProject = rest.get(`${MOCK_BASE_URL}/projects/:proNumber`, (req, res, ctx) => {
    const { proNumber } = req.params
    console.log(req)
    const data = projects.find(item => item.proNumber === proNumber)

    return res(
        ctx.status(200),
        ctx.json({
            ...data

        })
    )
})

export const ProjectAPI = [GetSearchProject, QueryProjects, CreateProject, GetProject, UpdateProject, RemoveProject, QueryUserProject]
