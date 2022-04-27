const ENABLE_MOCK_MODE = true

// 是否是开发环境
export const IS_DEV = () => {
    return process.env.NODE_ENV === 'development'
}

// 是否是开发状态下MOCK环境
export const IS_MOCK = () => {
    return IS_DEV() && ENABLE_MOCK_MODE
}
