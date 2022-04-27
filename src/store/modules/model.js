// 模型管理管理，模型控制台
import { GetModelParamsEnumList } from '@/services/api/model-console'
import { parseModelEnumType } from '@/common/helpers/model'
import { cloneDeep } from 'lodash'
import { QueryProjects } from '@/services/project-management'
const model = {
    namespaced: true,
    state: {
        currentModelId: '', // 当前的模型id
        paramsEnum: {}, // 模型控制台枚举类
        projectLists: [], // 项目列表
        dagData:{},  //dag数据
        engine:'',  //引擎变量
    },
    mutations: {
        setCurrentModelId (state, modelId) {
            state.currentModelId = modelId

        },
        setParamsEnum (state, paramsEnum) {
            paramsEnum = paramsEnum || {}
            state.paramsEnum = paramsEnum
        },
        setProjectLists (state, projectLists) {
            state.projectLists = projectLists || []
        },
        setDagData(state,data){
            state.dagData = data
            console.log("仓库里dag：",state.dagData)
        },
        clearDagData(state,data){
            state.dagData = data
        },
        setEngine(state,data){
            state.engine = data
        }
        //测试需不需要垃圾清理

    },
    getters: {
        currentModelId: state => {
            return state.currentModelId
        },
        evalTypes: state => {
            return parseModelEnumType(state.paramsEnum.eval_type)
        },
        methods: state => {
            return parseModelEnumType(state.paramsEnum.method)
        },
        objectives: state => {
            return parseModelEnumType(state.paramsEnum.objective)
        },
        taskTypes: state => {
            return parseModelEnumType(state.paramsEnum.task_type)
        },
        workModes: state => {
            return parseModelEnumType(state.paramsEnum.work_mode)
        },
        projectLists: state => {
            return cloneDeep(state.projectLists)
        },
        DagData: state =>{
            return state.dagData
        },
    },
    actions: {
        getModelParamsEnumList ({ dispatch, commit }) {
            return GetModelParamsEnumList().then(response => {
                // console.log('getModelParamsEnum', response)
                if (response && response.data && typeof response.data.Params === 'object') {
                    commit('setParamsEnum', response.data.Params)
                }
            })
        },
        getProjectList ({ dispatch, commit }) {
            return QueryProjects({
                searchBy: '',
                searchContent: '',
                logic: 'and',
                page: 1,
                limit: 10000,
                orderBy: null,
                order: null
            }).then((res) => {
                if (res && res.data && res.data.code === 200) {
                    commit('setProjectLists', res.data.data.list)
                }
            })
        }
    }
}

export default model
