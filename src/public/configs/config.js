/**
 * 配置规则：
 * （1）'$'符号开头的合法变量名
 * （2）配置环境变量固定变量名为：$env
 * （3）如果变量的值为null,undefined,''或0，则不会进行属性的添加（覆盖）
 */
// $env = ''
// $baseUrl = ''

//
// export const BASE_URL = 'http://192.168.179.185:8989' // 集成内网 API
// export const BASE_URL = 'http://flp.free.svipss.top'// 集成内网穿透API
// export const BASE_URL = 'http://10.28.182.57:8989' // 冯煜内网API
// export const BASE_URL = 'http://flp.free.svipss.top' // 郑州内网穿透API
// export const USER_URL = 'http://192.168.179.185:8000' // 用户中心
// export const MODEL_URL = 'http://8.140.135.129:14559' // 模型中心
// export const PROJECT_URL = 'http://8.140.135.129:9090' // 项目管理
// export const BASE_URL='http://192.168.44.64:8989'
// export const BASE_URL='http://192.168.45.202:8989'
// export const BASE_URL = 'http://8.140.137.208:10999' // 阿里 API
// export const BASE_URL = 'http://8.140.135.129:8989' // 阿里 API中央端


export const BASE_URL = 'http://10.112.216.104:8989' // 服务器1号
// export const BASE_URL = 'http://10.128.246.155:8989' // 本地
