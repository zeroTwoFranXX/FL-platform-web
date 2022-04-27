import axios from 'axios'
import vm from '../main'
import { BASE_URL } from '@/public/configs/config'
import { getToken, setToken } from '@/common/helpers/token'

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 10,
    headers: {
        'Content-Type': 'application/json'
    }
})
let isRefreshToken = false // 标记是否正在刷新token
let requests = [] // 存储等待重发的数组

const refreshToken = () => {
    return instance.request({
        headers: { 'Authorization': getToken('refresh_token') },
        method: 'POST',
        url: '/api/uc/refreshToken'
    })
}
// http 请求拦截
instance.interceptors.request.use(config => {
    let tokenKey = config.url.includes('refreshToken') ? 'refresh_token' : 'access_token'
    let token = getToken(tokenKey)
    if (token) config.headers.Authorization = token
    return config
})

// http 响应拦截
instance.interceptors.response.use(response => {
    return response
}, error => {
    if (!error.response) {
        return Promise.reject(error)
    }
    if (error.response.status === 401 && !error.config.url.includes('uc/refreshToken')) {
        // 正在刷新 token 未执行 resolve 的 Promise
        if (isRefreshToken) {
            return new Promise(resolve => {
                requests.push(() => {
                    config.headers.Authorization = getToken('access_token')
                    resolve(instance(config))
                })
            })
        }
        // 未刷新 token
        isRefreshToken = true
        const { config } = error
        return refreshToken().then(res => {
            setToken('access_token', res.data.data.access_token)
            setToken('refresh_token', res.data.data.refresh_token)
            config.headers.Authorization = getToken('access_token')
            requests.forEach((cb) => cb())
            requests = []
            return instance(config)
        }).catch(err => {
            vm.$router.push({ name: 'login' })
            console.error('登陆状态已失效，请重新登陆')
            return Promise.reject(err)
        }).finally(() => {
            isRefreshToken = false
        })
    }
    return Promise.reject(error)
})

export const request = instance
