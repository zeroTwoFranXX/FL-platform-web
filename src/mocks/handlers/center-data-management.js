import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { MOCK_BASE_URL } from '@/common/constants/mock'

let counter = 1
const getCounter = () => {
    counter++
    return counter
}

let centerDatas = [
    {
        id: uuidv4(),
        people: '张安康',
        name: `CenterName ${getCounter()}`
    },
    {
        id: uuidv4(),
        people: '张安康',
        name: `CenterName ${getCounter()}`
    },
    {
        id: uuidv4(),
        people: '张安康',
        name: `CenterName ${getCounter()}`
    }
]
// 获得中央数据列表
export const QueryCenterDatas = rest.get(`${MOCK_BASE_URL}/centerDatas`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [...centerDatas],
            total: centerDatas.length
        })
    )
})

export const QueryUserCenterData = rest.get(`${MOCK_BASE_URL}/centerDatas/:proName`, (req, res, ctx) => {
    const { proName } = req.params
    console.log(req)
    const data = centerDatas.find(item => item.proName === proName)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})

// 创建中央数据列表
export const CreateCenterData = rest.post(`${MOCK_BASE_URL}/centerDatas`, (req, res, ctx) => {
    let centerData = {
        id: uuidv4(),
        name: req.body.name
    }
    centerDatas.push(centerData)

    return res(
        ctx.status(201),
        ctx.json({
            message: '创建成功'
        })
    )
})
// 查询某一特定列表
export const GetCenterData = rest.get(`${MOCK_BASE_URL}/centerDatas/:id`, (req, res, ctx) => {
    const { id } = req.params
    const data = centerDatas.find(item => item.id === id)

    return res(
        ctx.status(200),
        ctx.json({
            ...data
        })
    )
})
// 更新数据列表
export const UpdateCenterData = rest.put(`${MOCK_BASE_URL}/centerDatas`, (req, res, ctx) => {
    let targetId = req.body.id
    centerDatas = centerDatas.map(item => {
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
// 删除数据列表
export const RemoveCenterData = rest.delete(`${MOCK_BASE_URL}/centerDatas/:id`, (req, res, ctx) => {
    const { id } = req.params

    centerDatas = centerDatas.filter(item => {
        return item.id !== id
    })
    return res(
        ctx.status(200),
        ctx.json({
            message: '删除成功'
        })
    )
})

export const CenterDataAPI = [QueryCenterDatas, CreateCenterData, GetCenterData, UpdateCenterData, RemoveCenterData, QueryUserCenterData]
