import { rest } from 'msw'
import { modelData } from '@/mocks/data/model-console'
import { cloneDeep } from 'lodash'
import { MOCK_BASE_URL } from '@/common/constants/mock'
export const getModelData = rest.get(`${MOCK_BASE_URL}/mock/modelData`, (req, res, ctx) => {
    return res(
        ctx.json(cloneDeep(modelData))
    )
})

export const ModelConsoleAPI = [getModelData]
