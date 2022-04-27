import util from '../libs/util'
import { updatePaswd } from 'biyi-admin'

/**
 * 配置静态路由
 * 分为两种路由：
 * 1.路由出口在App.vue
 * 2.路由出口在main.vue
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 */

// 1.路由出口在App.vue
const singleRoutes = [
    {
    // 设置初始页面
        path: '',
        redirect: '/home'
    },
    {
        path: '/projectDetails/',
        name: 'projectDetails',
        component: () => import('../views/project-management/projectDetails')
    },
    {
        path: '/applicationResultDetail/',
        name: 'applicationResultDetail',
        component: () => import('../views/application-management/components/applicationResultDetail')
    },
    {
        path: '/Invitation-information/',
        name: 'Invitation-information',
        component: () => import('../views/project-management/components/Invitation-information')
    },
    {
        path: '/metadata-configuration/',
        name: 'metadata-configuration',
        component: () => import('../views/child-data-preparation/metadata-configuration')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/system-page/login/login.vue'),
        meta: {
            // 密码规则校验开关
            validatePaswd: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/system-page/register/index.vue')
    },
    {
        path: '/RegisterSuccess',
        name: 'RegisterSuccess',
        component: () => import('../views/system-page/register/register-success.vue')
    },
    {
        path: '/update-password',
        name: 'update-password',
        component: updatePaswd
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/error-pages/404.vue')
    },
    {
        path: '/ProjectDisplay',
        name: 'ProjectDisplay',
        title: '项目展示',
        component: () => import('../views/application-market/ProjectDisplay.vue')
    },
    {
        path: '/ApplicationDisplay',
        name: 'ApplicationDisplay',
        title: '应用展示',
        component: () => import('../views/application-market/ApplicationDisplay.vue')
    },
    {
        path: '/DataDisplay',
        name: 'DataDisplay',
        title: '数据展示',
        component: () => import('../views/application-market/DataDisplay.vue')
    },
    {
        path: '/details',
        name: 'details',
        component: () => import('../views/details/details.vue')
    },
    {
        path: '/appDetails',
        name: 'appDetails',
        component: () => import('../views/details/appDetails.vue')
    },
    {
        path: '/dataDetails',
        name: 'dataDetails',
        component: () => import('../views/details/dataDetails.vue')
    }
]
/**
 * 路由出口在main.vue，包括了菜单项和非菜单页面
 * 若该页面属于菜单页面，需要添加type: 'menu'属性
 */
const staticTree = [
    // 联邦学习平台
    {
        path: '/main-console',
        name: 'main-console',
        title: '联邦学习平台',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                title: '个人中心',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/console-home/home.vue')
            }
        ]
    },
    // 项目管理
    {
        path: '/main',
        name: 'main-project',
        icon: 'ios-paper',
        type: 'menu',
        title: '项目管理',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/project-management',
                name: 'project-management',
                title: '项目管理',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/project-management/index')
            }
        ]
    },
    // 数据管理
    {
        path: '/main',
        name: 'main-project',
        icon: 'ios-paper',
        type: 'menu',
        title: '数据管理',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/centralDataset',
                name: 'centralDataset',
                title: '数据管理',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/dataPreparation/central-dataset/centralDataset.vue'),
                children: [
                    {
                        children: [
                            {
                                path: '/metaDetails',
                                name: 'metaDetails',
                                title: '元数据详情',
                                icon: 'ios-paper',
                                type: 'non-menu',
                                component: () => import('../views/dataPreparation/central-dataset/metaDetails.vue')
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // 模型管理
    {
        path: '/main-model',
        name: 'main-model',
        icon: 'ios-paper',
        type: 'menu',
        meta: {
            keepAlive: true
        },
        title: '模型管理',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/model-management',
                name: 'model-management',
                title: '模型管理',
                icon: 'ios-paper',
                type: 'menu',
                meta: {
                    keepAlive: true
                },
                component: () => import('../views/model-management/index.vue')
            },
            {
                path: '/model-console',
                name: 'model-console',
                title: '模型控制台',
                icon: 'ios-paper',
                meta: {
                    keepAlive: true
                },
                component: () => import('../views/model-console/index.vue')
            }
        ]
    },
    // 应用管理
    {
        path: '/main',
        name: 'application-manage',
        title: '应用管理',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/application-management',
                name: 'application-management',
                title: '应用管理',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/application-management/ApplicateManage.vue')
            }
        ]
    },
    // 运行监控
    {
        path: '/main',
        name: 'main-monitoring',
        title: '运行监控',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/node-monitoring',
                name: 'node-monitoring',
                title: '节点管理',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/node-management/index.vue')
            },
            {
                path: '/message',
                name: 'message',
                title: '消息中心',
                icon: 'ios-paper',
                type: 'non-menu',
                component: () => import('../views/message-center/index.vue')
            },
            // {
            //     path: '/subscribed-data',
            //     name: 'subscribed-data',
            //     title: '我订阅的数据',
            //     icon: 'ios-paper',
            //     type: 'menu',
            //     component: () => import('../views/personal-center/subscribed-data.vue')
            // },
            // {
            //     path: '/subscribed-application',
            //     name: 'subscribed-application',
            //     title: '我订阅的应用',
            //     icon: 'ios-paper',
            //     type: 'menu',
            //     component: () => import('../views/personal-center/subscribed-application.vue')
            // }
            {
                path: '/message-center',
                name: 'message-center',
                title: '消息中心',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/message-center/index.vue')
            }
        ]
    },
    // 系统管理
    {
        path: '/main',
        name: 'main-home',
        title: '系统管理',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/personal-information',
                name: 'personal-information',
                title: '个人基本信息',
                icon: 'ios-paper',
                component: () => import('/node_modules/biyi-admin/src/system-page/own-space/self-edit.vue')
            }
            // {
            //     path: '/real-name-authentication',
            //     name: 'real-name-authentication',
            //     title: '实名认证',
            //     icon: 'ios-paper',
            //     type: 'menu',
            //     component: () => import('../views/child-data-preparation/index.vue')
            // },
            // {
            //     path: '/user-management',
            //     name: 'user-management',
            //     title: '用户管理',
            //     icon: 'ios-paper',
            //     type: 'menu',
            //     component: () => import('../views/child-data-preparation/index.vue')
            // }
        ]
    },
    // 认证管理
    {
        path: '/main',
        name: 'main-auth',
        title: '认证管理',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/main/main.vue'),
        children: [
            {
                path: '/real-name-authentication',
                name: 'real-name-authentication',
                title: '实名认证',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/certification-management/personal.vue')
            },
            {
                path: '/enterprise-certification',
                name: 'enterprise-certification',
                title: '企业认证',
                icon: 'ios-paper',
                type: 'menu',
                component: () => import('../views/certification-management/enterprise.vue')
            }
        ]
    }
]
const staticMenuList = util.getMenuList(staticTree)
const staticMainRoutes = util.getMenuRoutes(staticTree)

// 汇总所有的路由
const staticRoutes = [...staticMainRoutes, ...singleRoutes]

export { staticRoutes, staticMenuList, staticTree }
