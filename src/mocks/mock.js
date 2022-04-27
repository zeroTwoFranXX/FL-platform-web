import { setupWorker } from 'msw'
import { UserApi } from '@/mocks/handlers/user'
import { ModelConsoleAPI } from '@/mocks/handlers/model-console'
import { ProjectAPI } from '@/mocks/handlers/project-management'
import { ChildDataAPI } from '@/mocks/handlers/child-data-management'
import { CenterDataAPI } from '@/mocks/handlers/center-data-management'
import { ApplicationAPI } from '@/mocks/handlers/application-management'
const IS_MOCK = false

export const worker = setupWorker(
    ...UserApi,
    ...ModelConsoleAPI,
    ...ProjectAPI,
    ...CenterDataAPI,
    ...ChildDataAPI,
    ...ApplicationAPI
)

export const runMock = () => {
    if (IS_MOCK) {
        worker.start({
            onUnhandledRequest: 'bypass', //  // 对于没有 mock 的接口直接通过，避免异常
            serviceWorker: {
                // options: {
                //     scope: '/#/model-console' // Note: 仅在 该路径下启用 msw
                // }
            }
        })
    }
}
