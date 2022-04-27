import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { MOCK_BASE_URL } from '@/common/constants/mock'
let counter = 1
const getCounter = () => {
    counter++
    return counter
}

let models = [
    {
        id: uuidv4(),
        name: `Name ${getCounter()}`
    },
    {
        id: uuidv4(),
        name: `Name ${getCounter()}`
    },
    {
        id: uuidv4(),
        name: `Name ${getCounter()}`
    }
]

export const QueryModels = rest.get(`${MOCK_BASE_URL}/models`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [...models],
            total: models.length
        })
    )
})

export const CreateModel = rest.post(`${MOCK_BASE_URL}/models`, (req, res, ctx) => {
    let model = {
        id: uuidv4(),
        name: req.body.name
    }
    models.push(model)

    return res(
        ctx.status(201),
        ctx.json({
            message: '创建成功'
        })
    )
})

export const GetModel = rest.get(`${MOCK_BASE_URL}/models/:id`, (req, res, ctx) => {
    const { id } = req.params
    const data = models.find(item => item.id === id)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

export const UpdateModel = rest.put(`${MOCK_BASE_URL}/models`, (req, res, ctx) => {
    let targetId = req.body.id
    models = models.map(item => {
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

export const RemoveModel = rest.delete(`${MOCK_BASE_URL}/models/:id`, (req, res, ctx) => {
    const { id } = req.params

    models = models.filter(item => {
        return item.id !== id
    })

    return res(
        ctx.status(200),
        ctx.json({
            message: '删除成功'
        })
    )
})

export const ModelAPI = [QueryModels, CreateModel, GetModel, UpdateModel, RemoveModel]
