import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { MOCK_BASE_URL } from '@/common/constants/mock'
let counter = 1
const getCounter = () => {
    counter++
    return counter
}

let childDatas = [
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

export const QueryChildDatas = rest.get(`${MOCK_BASE_URL}/childDatas`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [...childDatas],
            total: childDatas.length
        })
    )
})

export const CreateChildData = rest.post(`${MOCK_BASE_URL}/childDatas`, (req, res, ctx) => {
    let childData = {
        id: uuidv4(),
        name: req.body.name
    }
    childDatas.push(childData)

    return res(
        ctx.status(201),
        ctx.json({
            message: '创建成功'
        })
    )
})

export const GetChildData = rest.get(`${MOCK_BASE_URL}/childDatas/:id`, (req, res, ctx) => {
    const { id } = req.params
    const data = childDatas.find(item => item.id === id)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

export const UpdateChildData = rest.put(`${MOCK_BASE_URL}/childDatas`, (req, res, ctx) => {
    let targetId = req.body.id
    childDatas = childDatas.map(item => {
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

export const RemoveChildData = rest.delete(`${MOCK_BASE_URL}/childDatas/:id`, (req, res, ctx) => {
    const { id } = req.params

    childDatas = childDatas.filter(item => {
        return item.id !== id
    })
    return res(
        ctx.status(200),
        ctx.json({
            message: '删除成功'
        })
    )
})

export const ChildDataAPI = [QueryChildDatas, CreateChildData, GetChildData, UpdateChildData, RemoveChildData]
