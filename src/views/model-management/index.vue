<template>
    <Card>
<!--        <h4>模型管理</h4>-->
        <!--  搜索区域   -->
<!--        <Card :dis-hover="true">-->
<!--            <Form inline :model="queryParams" :label-width="100">-->
<!--                <Form-item label="模型名称：">-->
<!--                    <Input v-model="name" placeholder="请输入模型名称查询..." style="width: 300px" />-->
<!--                </Form-item>-->
<!--                <Form-item :label-width="0">-->
<!--                    <Button type="primary" icon="ios-search"  @click="handleSearch" style="margin-right: 5px">搜索</Button>-->
<!--                    <Button type="primary" icon="ios-refresh"  @click="handleReset">重置</Button>-->
<!--                </Form-item>-->
<!--            </Form>-->
<!--        </Card>-->
        <Row style="margin: 8px;text-align:right"  >
            <Button @click="handleCreate" type="primary" >新增</Button>
        </Row>
        <!-- 表格区域   -->
        <Table border :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="modelName">
                <strong>{{ row.modelName }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button style="margin-right: 5px" @click="openInitModal(row.modelId)">初始化</Button>
                <Button style="margin-right: 5px" :disabled="row.modelStatus === 0" @click="exportModalFile(row.modelId)">导出配置</Button>
                <Button type="primary" style="margin-right: 5px" @click="openConsole(row.modelId)">控制台</Button>
                <Button type="info" style="margin-right: 5px" @click="handleQuery(row.modelId)">查看</Button>
                <Button type="warning" style="margin-right: 5px" @click="handleUpdate(row.modelId)">编辑</Button>
                <Button type="primary" style="margin-right: 5px" @click="publishApp(row.modelId)">发布</Button>
                <Poptip
                    confirm
                    transfer
                    title="确定删除?"
                    @on-ok="handleRemove(row.modelId)">
                    <Button type="error">删除</Button>
                </Poptip>
            </template>
        </Table>
        <!-- 分页区域 -->
        <Col style='text-align: right; padding: 8px 0'>
            <Page  show-total show-elevator  show-sizer :current='queryParams.page' :page-size='queryParams.size' :total='total' @on-change="handlePageChange" @on-page-size-change='handlePageSizeChange'></Page>
        </Col>
        <!--- 模型编辑弹窗 --->
        <form-editor ref="editor" @on-ok="queryList"></form-editor>
        <publish-application ref="appPublish" @on-ok="queryList"></publish-application>
        <model-init-editor ref="modelInitEditor" @on-ok="queryList"></model-init-editor>
    </Card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { ListModels } from '@/services/api/model-management'
import {GetConfFile, GetDagFile, GetDslFile, GetModelComponentsTreeData} from '@/services/api/model-console'
import FlowChartData from '@/views/model-console/FlowChart/model'
import FormEditor from './components/FormEditor'
import ModelInitEditor from './components/ModelInitEditor'
import PublishApplication from '@/views/model-management/components/PublishApplication'
import { saveJSON } from '@/common/helpers/file'
import {setComponentList} from "@/views/model-console/bussiness/componentList";
import {cloneDeep} from "lodash";
export default {
    name: 'ModelManagement',
    components: {
        FormEditor,
        ModelInitEditor,
        PublishApplication
    },
    data () {
        const modelStatus = [
            {
                // color: '#D8DCD6',
                label: '新创建'
            },
            {
                // color: '#C6FCFF',
                label: '已配置'
            },
            {
                // color: '#3E82FC',
                label: '已训练'
            },
            {
                // color: '#C85A53',
                label: '已发布'
            }
        ]
        return {
            name: '',
            queryParams: {
                page: 1, // 分页页码
                limit: 10 // 分页页数
            },
            columns: [ // 表格配置
                // {
                //     title: 'Id',
                //     key: 'modelId',
                //     width: 200
                // },
                {
                    title: '序号',
                    type: 'index',
                    width: 80
                },
                {
                    title: '名称',
                    slot: 'modelName'
                },
                // {
                //     title: '所属项目',
                //     key: 'projectName'
                // },
                // {
                //     title: '模型描述',
                //     key: 'modelDesc'
                // },
                {
                    title: '状态',
                    key: 'modelStatus',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        let index = params.row.modelStatus || 0
                        return h(
                            'div',
                            {
                                props: {
                                    value: params.row.modelStatus
                                },
                                style: `color:${modelStatus[index]['color']}`
                            },
                            modelStatus[index]['label']
                        )
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: 180
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 560
                }
            ],
            data: [],
            total: 0 // 分页合计
        }
    },
    watch:{
        //监听页面变化，刷新模型控制台
        '$route'(to, from) {
            if(to.path == "/model-console"){
                location.reload()
            }
        },
    },
    methods: {
        ...mapActions('model', [
            'getModelParamsEnumList',
            'getProjectList'
        ]),

        // 模糊搜索模型
        handleSearch () {
            this.queryList()
        },

        // 创建模型
        handleCreate () {
            this.getProjectList().then(() => {
                this.$refs.editor.CreateModel()
            })
        },

        // 修改模型
        handleUpdate (id) {
            this.getProjectList().then(() => {
                this.$refs.editor.UpdateModel(id)
            })
        },

        // 删除模型
        handleRemove (id) {
            this.$refs.editor.RemoveModel(id)
        },

        // 查询模型
        handleQuery (id) {
            this.getProjectList().then(() => {
                this.$refs.editor.QueryModel(id)
            })
        },
        // 跳转到控制台
        openConsole (id) {
            this.$store.commit('model/setCurrentModelId', id)
            this.getModelDagData(id).then(res => {
                this.$router.push({ name: 'model-console' })
            })
        },
        // 发布模型
        publishApp (id) {
            this.$refs.appPublish.CreateApplication(id)
        },
        // 导出配置
        exportModalFile (id) {
            GetDagFile(id).then(res => {
                if (res && res.data && res.data.code === 200) {
                    saveJSON(res.data.data, 'dag.json')
                }
            })
            GetConfFile(id).then(res => {
                if (res && res.data && res.data.code === 200) {
                    saveJSON(res.data.data, 'conf.json')
                }
            })
            GetDslFile(id).then(res => {
                if (res && res.data && res.data.code === 200) {
                    saveJSON(res.data.data, 'dsl.json')
                }
            })
        },
        getModelDagData (modelId) {
            //将dsl和conf数据存储到store中
            GetDslFile(modelId).then(res=>{
                //清理缓存
                this.$store.commit('FateDslStore/clearDslData',{})
                if(res && res.data &&res.data.code === 200){
                    // console.log("database  dsl：",res.data.data)
                    this.$store.commit('FateDslStore/setDslData',res.data.data)
                }
                console.log("DslData: ",res)
            })
            GetConfFile(modelId).then(res=>{
                //清理缓存
                this.$store.commit('FateConfStore/clearConfData',{})
                if(res && res.data &&res.data.code === 200){
                    console.log("res:",res.data.data)
                    this.$store.commit('FateConfStore/setConfData',res.data.data)
                }
                console.log("ConfData:  ",res)
            })

            return GetDagFile(modelId).then(res => {
                //清理缓存
                this.$store.commit('model/clearDagData',{})
                if (res && res.data && res.data.code === 200) {
                    console.log('DagData', res)
                    this.$Message.success('加载模型数据成功')

                    //将dag数据存放在store中
                    this.$store.commit('model/setDagData', res.data.data)

                } else if (res && res.data && res.data.code === 500) {
                    this.$Message.success('初始化模型')
                    FlowChartData.initData()
                }
                console.log('getModelDagData')
            })
        },
        // openInitModal 打开模型初始化
        openInitModal (id) {
            this.$refs.modelInitEditor.InitModel(id)
        },
        // refreshBrowser 强制刷新浏览器
        refreshBrowser () {
            window.location.reload()
        },

        // 分页页码变化
        handlePageChange (page) {
            console.log('page', page)
            this.queryParams.page = page
            this.queryList()
        },

        // 分页条数变化
        handlePageSizeChange (pageSize) {
            this.queryParams.limit = pageSize
            this.queryList()
        },

        // 重置搜索条件
        handleReset () {},

        // 请求列表
        queryList () {
            // console.log('params', this.queryParams)
            ListModels({ ...this.queryParams }).then((response) => {
                if (response && response.data && response.data.page) {
                    this.data = response.data.page.list
                    this.total = response.data.page.totalCount
                }
            })
        }
    },

    created () {
        //this.refreshBrowser()
        this.queryList()
        this.getProjectList()
    },
    mounted() {
        // window.location.reload()
    }
}
</script>

<style scoped>

</style>
