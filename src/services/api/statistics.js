import { request } from '../request'

// 运行状态
export const getRunStatus = (data) => {
    return request({
        url: `/api/sc/statistics/statisticsResults`,
        method: 'GET',
        data
    })
}

// 用户应用
export const getUserApplicate = (data) => {
    return request({
        url: `/api/sc/statistics/appStatistics`,
        method: 'GET',
        data
    })
}
