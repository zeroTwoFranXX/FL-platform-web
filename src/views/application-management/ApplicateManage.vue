<template>
    <Card>
        <div class="content-main-con">
            <Form ref="search" :model="search" :label-width="120">
                <div class="main-con-top">
                    <Row type="flex" justify="space-between">
                        <Col span="5">
                            <FormItem label="应用名称：" prop="appName">
                                <Input v-model="search.appName" placeholder="输入关键字"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="所选模型：" prop="modelName">
                                <Input v-model="search.modelName" placeholder="输入关键字"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="创建人：" prop="creatorUserName">
                                <Input v-model="search.creatorUserName" placeholder="输入关键字"></Input>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <Button
                                @click="handleSearch"
                                type="primary"
                                style="margin-left: 60px"
                                >查询</Button
                            >
                            <Button
                                @click="handleCancel"
                                type="primary"
                                style="margin-left: 20px"
                                >重置</Button
                            >
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <div>
            <Table border :columns="columns" :data="data"></Table>
            <Row type="flex" justify="end">
                <Page
                  :current="currentPageNum"
                  :total="dataCount"
                  :page-size="pageSize"
                  @on-change="handlePageChange"
                  show-elevator
                  show-total
                  style="padding: 10px"
                ></Page>
              </Row>
        </div>
        <!-- 创建编辑 -->
        <Modal
            v-model="onAddEdit"
            @on-ok="AddEditConfirm()"
            title="创建/编辑"
            class-name="vertical-center-modal"
            :loading="loading"
        >
            <div class="model">
                <Form
                    :label-width="120"
                    label-position="right"
                    ref="addForm"
                    :model="addForm"
                    :rules="ruleValidate"
                    >
                    <FormItem label='应用名称：' prop="appName">
                        <Input v-model="addForm.appName" style="width: 100%;color:#888baf" placeholder="请输入应用名称"></Input>
                    </FormItem>
                    <FormItem label='应用类型：' prop="appType">
                        <Select  v-model="addForm.appType" placeholder="请选择应用类型">
                            <Option v-for="item in dataChooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label='应用描述：' prop="appDesc">
                       <Input v-model="addForm.appDesc" type="textarea" :rows="5" style="width: 100%;" placeholder="请输入应用描述"></Input>
                    </FormItem>
                    <FormItem label='应用图片：' prop="file">
                        <Upload
                            :before-upload="handleBeforeUpload"
                            action=""
                        >
                            <Button icon="ios-cloud-upload-outline">图片上传</Button>
                        </Upload>
                         <img v-if="imgPath != null || imgPath != ''" style="height:62px" :src="this.imgPath">
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <!-- 模型应用       -->
        <application-prediction ref="application" ></application-prediction>
        <!-- 删除弹窗 -->
        <Modal
            v-model="deletOne"
            @on-ok="handleDelet()"
            class-name="vertical-center-modal"
        >
            <div>
            <p
                slot="header"
                style="text-indent: 10px; font-size: 20px; margin: 10px 0"
            >
                <Icon
                type="ios-alert"
                size="26"
                color="#FF9900"
                style="margin: 0 5px"
                ></Icon>
                <span>提示</span>
            </p>
            <p style="text-indent: 4em">确认要删除【{{ form.appName }}】吗？</p>
            </div>
        </Modal>
    </Card>
</template>

<script>
import { getAppList, deleteApp, modifyApp, offApp, onlineApp } from '@/services/api/app'
import { handleRequestParams } from '@/common/helpers/params'
import { BASE_URL } from '@/public/configs/config.js'
import { ListModelPredictions } from '@/views/model-management/modelFile/modelConfig'
import ApplicationPrediction from './components/ApplicationPrediction'
export default {
    components: {
        ApplicationPrediction
    },
    data () {
        return {
            dataCount: 0,
            currentPageNum: 1,
            pageSize: 10,
            searchBy: '',
            searchContent: '',
            deletOne: false,
            onAddEdit: false,
            loading: true,
            files: [],
            imgPath: '',
            appId: '',
            search: {
                id: '',
                appName: '',
                modelName: '',
                creatorUserName: ''
            },
            addForm: {
                id: '',
                appName: '',
                appDesc: '',
                appType: '',
                modelName: '',
                appImage: ''
            },
            form: {
                appName: '',
                modelName: '',
                estimateData: '',
                appDesc: ''
            },
            data: [],
            modelPredictions: ListModelPredictions(),
            dataChooseList: [
                {
                    value: 1,
                    label: '应用类型一'
                },
                {
                    value: 2,
                    label: '应用类型二'
                },
                {
                    value: 3,
                    label: '应用类型三'
                },
                {
                    value: 4,
                    label: '应用类型四'
                },
                {
                    value: 5,
                    label: '应用类型五'
                }
            ],
            columns: [
                {
                    title:'序号',
                    render: (h, params) => {
                        return h(
                        "span",
                        params.index + (this.currentPageNum - 1) * this.pageSize + 1
                        );
                    },
                    align:'center',
                    width: 80
                },
                {
                    title: '应用名称',
                    key: 'appName',
                    align: 'center'
                },
                {
                    title: '所选模型',
                    key: 'modelName',
                    align: 'center'
                },
                {
                    title: '应用类型',
                    key: 'appType',
                    align: 'center'
                },
                {
                    title: '创建人',
                    key: 'creatorUserName',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'mobile',
                    align: 'center'
                },
                {
                    title: '邮箱',
                    key: 'mail',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '状态',
                    key: 'appStatus',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (params.row.appStatus === 0) {
                            return h(
                                'div',
                                {
                                    props: {
                                        value: params.row.appStatus
                                    },
                                    style: 'color:#00C267'
                                },
                                '● 已发布'
                            )
                        } else if (params.row.appStatus === 1) {
                            return h(
                                'div',
                                {
                                    props: {
                                        value: params.row.appStatus
                                    },
                                    style: 'color:#F1B314'
                                },
                                '● 未发布'
                            )
                        }
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    slot: 'action',
                    width: 280,
                    render: (h, params) => {
                        return h('div', [
                            (params.row.relativeType === 1) && h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEdit(params.row.id, params.index)
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            (params.row.relativeType === 1) && (params.row.appStatus === 0) && h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRemove(params.row.id)
                                        }
                                    }
                                },
                                '下架'
                            ),
                            (params.row.relativeType === 1) && (params.row.appStatus === 1) && h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleOnline(params.row.id)
                                        }
                                    }
                                },
                                '发布'
                            ),
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDetail(params.row.id)
                                        }
                                    }
                                },
                                '结果详情'
                            ),
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px',
                                        color: '#ff9900'
                                    },
                                    on: {
                                        click: () => {
                                            this.initPredictionData(params.row)
                                        }
                                    }
                                },
                                '应用'
                            ),
                            (params.row.relativeType === 1) && h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px',
                                        color: 'red'
                                    },
                                    on: {
                                        click: () => {
                                            this.modelData(params.row.id, params.index)
                                            this.deletOne = true
                                        }
                                    }
                                },
                                '删除'
                            )
                        ])
                    }
                }
            ],
            // 创建编辑校验
            ruleValidate: {
                appName: [{ required: true, message: '名称不为空', trigger: 'blur' }],
                appType: [{ required: true, message: '类型不为空', trigger: 'blur' }],
                appDesc: [{ required: true, message: '备注不为空', trigger: 'blur' }]
            }
        }
    },
    created () {
        this.getList()
        this.getDataSet()
    },
    methods: {
        // 获取列表(调列表接口)
        getList () {
            getAppList({
                searchBy: this.searchBy,
                searchContent: this.searchContent,
                logic: 'and',
                page: this.currentPageNum,
                limit: this.pageSize,
                orderBy: '',
                order: ''
            })
                .then((response) => {
                    this.dataCount = response.data.data.totalCount
                    this.data = response.data.data.list
                })
        },
        // 获取数据集(调弹窗数据集接口)
        getDataSet () {

        },
        // 创建空应用弹窗
        handleAdd () {
            if (this.addForm) {
                this.$refs.addForm.resetFields()
            }
            this.onAddEdit = true
            this.addForm.id = ''
            this.addForm.appImage = ''
            this.imgPath = ''
        },
        // 编辑空应用
        handleEdit (id, index) {
            this.addForm.id = id
            this.addForm = this.data[index]
            this.imgPath = BASE_URL + this.data[index].appImage
            this.onAddEdit = true
        },
        handleBeforeUpload (file) {
            this.files = [file]
            this.imgPath = window.webkitURL.createObjectURL(file)
            return false
        },
        AddEditConfirm () {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.onAddEdit = false
                    this.Commit()
                } else {
                    this.$Message.error('校验出错')
                    this.loading = false
                }
            })
        },
        Commit () {
            let formData = new FormData()
            if (!this.addForm.id) {
                formData.append('appName', this.addForm.appName)
                formData.append('appDesc', this.addForm.appDesc)
                formData.append('appType', this.addForm.appType)
            } else {
                formData.set('id', this.addForm.id)
                formData.set('appName', this.addForm.appName)
                formData.set('appDesc', this.addForm.appDesc)
                formData.set('appType', this.addForm.appType)
            }
            // 多个文件上传
            for (let i = 0; i < this.files.length; i++) {
                formData.append('file', this.files[i]) // 文件对象
            }
            modifyApp(formData).then(response => {
                if (response.data.code === 200) {
                    if (!this.addForm.id) {
                        this.$Message.success('创建应用成功')
                    } else {
                        this.$Message.success('编辑应用成功')
                    }
                    this.getList()
                }
            })
        },
        // 下架
        handleRemove (id) {
            offApp(id)
                .then((response) => {
                    this.$Message.success(response.data.msg)
                    this.getList()
                })
        },
        // 发布
        handleOnline (id) {
            onlineApp(id)
                .then((response) => {
                    this.$Message.success(response.data.msg)
                    this.getList()
                })
        },
        // 删除(调删除接口)
        handleDelet () {
            deleteApp(this.appId)
                .then((response) => {
                    this.$Message.success(response.data.msg)
                    this.getList()
                })
        },
        // 查询
        handleSearch () {
            this.searchBy = handleRequestParams(this.search).searchBy
            this.searchContent = handleRequestParams(this.search).searchContent
            this.currentPageNum = 1
            this.getList()
        },
        modelData (id, index) {
            this.form.appName = this.data[index].appName
            this.appId = id
        },
        // 重置
        handleCancel () {
            this.search = {}
            this.searchBy = ''
            this.searchContent = ''
            this.currentPageNum = 1
            this.getList()
        },
        // 结果详情跳转到任务监控
        handleDetail () {
            // window.location.href = 'http://192.168.179.185:8080'
            window.location.href = 'http://192.168.179.183:8080'
        },
        // initPredictionData 初始化应用数据
        initPredictionData (data) {
            this.$refs.application.InitPredictionsData(data)
        },
        // 分页
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.getList()
        }
    }
}

</script>
<style  lang="less"  scoped>
    .main-con-top{
        margin-top: 10px;
    }
    .model{
        padding:0 20px 0 0;
    }
</style>
