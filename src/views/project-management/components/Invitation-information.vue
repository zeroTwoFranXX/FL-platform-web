<template>
    <Modal v-model="showInvite" :title="title" width="875">
        <div>
            <!--  数据集搜索区域   -->
            <Card :dis-hover="true">
                <Form inline  :label-width="100">
                    <Form-item label="用户姓名：">
                        <Input v-model="searchName" placeholder="请输入用户姓名" style="width: 300px" />
                    </Form-item>
                    <Form-item label="用户单位：">
                        <Input v-model="searchOrg" placeholder="请输入用户单位" style="width: 300px" />
                    </Form-item>
                    <Form-item :label-width="0">
                        <Button  type="primary" icon="ios-search"  @click="handleSearch" style="margin-right: 5px">搜索</Button>
                        <Button type="primary" icon="ios-refresh"  @click="handleReset">重置</Button>
                    </Form-item>
                </Form>
            </Card>
        <Table border ref="selection" :columns="columns" :data="data" height="280" @on-select="handleSelectUser" @on-select-all="handleSelectUserAll"></Table>
            <!-- 分页区域 -->
            <Col style='text-align: right; padding: 8px 0'>
                <Page  show-total
                       show-elevator
                       :current="currentPageNum"
                       :total="dataCount"
                       :page-size="pageSize"
                       @on-change="handlePageChange">
                </Page>
            </Col>
            <div slot="footer" >
            <Row justify="space-between">
<!--                <Button type="primary" @click="handleOKQuery">数据添加</Button>-->
                <Button @click="handleSelectAll(true)">全选</Button>
                <Button @click="handleSelectAll(false)">全部取消</Button>
            </Row>
        </div>
    </div>
        <div slot="footer" >
            <Row justify="space-between">
                <Button type="primary"  @click="sendInvitationBatch">发送邀请</Button>
            </Row>
        </div>
    </Modal>

</template>

<script>

import {
    CreateProject,
    GetProject,
    ProjectInvitationBatch, QueryProjects,
    UpdateProject, userList
} from '@/services/project-management.js'
import { handleRequestParams } from '@/common/helpers/params'
export default {
    name: 'FormEditor',
    data () {
        return {
            itemId: '',
            msgType: '',
            applyStatus: '',
            userBatchId: '',
            searchBy: '',
            searchContent: '',
            queryParams: {
                name: '',
                orgName: ''
            },
            Batch: [],
            searchName: '',
            searchOrg: '',
            data: [],
            dataCount: 0, // 分页合计
            currentPageNum: 1, // 分页页码
            pageSize: 5, // 分页页数
            // IS_DEV: true,
            title: '',
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            showInvite: false, // 弹窗开关
            // show1:false,
            // data: {}, // 表单数据
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户id',
                    key: 'id',
                    align: 'center',
                    width: 180
                },
                {
                    title: '用户姓名',
                    key: 'name',
                    align: 'center',
                    width: 180
                },
                {
                    title: '用户邮箱',
                    key: 'mail',
                    align: 'center',
                    width: 140
                },
                {
                    title: '用户电话',
                    key: 'mobile',
                    align: 'center',
                    width: 140
                },
                {
                    title: '用户工作单位',
                    key: 'orgName',
                    align: 'center',
                    width: 140
                }
            ],
            chooseList: [
                {
                    value: 'all',
                    label: '全部公开'
                },
                {
                    value: 'unall',
                    label: '项目内公开'
                },
                {
                    value: 'self',
                    label: '仅自己可见'
                }
            ],
            id: '',
            indexId: '',
            data1: [
                {
                    number: '0231355',
                    people: '张安康',
                    name: '这里是一段描述',
                    description: 28,
                    creator: '冯煜',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    number: '1254635',
                    people: '张安康',
                    name: '这里是二段描述',
                    description: 45,
                    creator: '张光卫',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    number: '6589475',
                    people: '张安康',
                    name: '这里是三段描述',
                    description: 30,
                    creator: '张安康',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    number: '3215483',
                    people: '张安康',
                    name: '这里是四段描述',
                    description: 26,
                    creator: '孙江枫',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '项目可见'
                },
                {
                    number: '0231546',
                    people: '张安康',
                    name: '这里是五段描述',
                    description: 28,
                    creator: '于勰',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '公开'
                },
                {
                    number: '0135879',
                    people: '张安康',
                    name: '这里是六段描述',
                    description: 45,
                    creator: '马云',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '项目可见'
                },
                {
                    number: '0132654',
                    people: '张安康',
                    name: '这里是七段描述',
                    description: 30,
                    creator: '马化腾',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '公开'
                },
                {
                    number: '6542153',
                    people: '张安康',
                    name: '这里是八段描述',
                    description: 26,
                    creator: '马克思',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                }
            ],
            rules: {
                proName: [
                    { required: true, message: '名称不能为空!', trigger: 'blur' }
                ]
            } // 表单规则
        }
    },
    methods: {
        // 查看项目
        // QueryProject (porNumber) {
        QueryProject (id) {
            this.type = 'showInvite'
            this.title = '邀请成员'
            this.indexId = id
            this.resetData()
            this.queryUserList(id)
            this.openEditor()
        },
        // 分页页码变化
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.queryUserList()
        },
        // 获取用户列表
        // handleGetList () {
        //     this.currentPageIndex = 0
        //     this.getList()
        // },
        // 发送邀请
        sendInvitationBatch () {

            ProjectInvitationBatch({
                itemId: this.indexId,
                msgType: 1,
                applyStatus: 12,
                userBatchId: this.Batch
            }).then((response) => {
                if (response.status == 200) {
                    // console.log(123)
                    // console.log(response)
                    this.$Message.success({
                        content: '已经发送邀请！！'
                    })
                    this.closeEditor()
                    this.refreshTable()
                    this.handleReset ()
                }
            })
            this.searchOrg = ' '
            this.searchName = ' '
            this.queryUserList()
        },
        // 获取用户数据列表
        queryUserList () {
            userList({
                page: this.currentPageNum,
                limit: this.pageSize,
                itemId: this.indexId,
                typeFlag: 1,
                logic: 'and',
                searchBy: this.searchBy,
                searchContent: this.searchContent
            }).then((response) => {
                if (response) {
                    this.dataCount = response.data.data.totalCount
                    this.data = response.data.data.list
                }
            })
            // this.closeEditor()
            // this.refreshTable()
        },

        // 新增项目
        CreateProject () {
            this.type = 'create'
            this.title = '创建模型'
            this.resetData()
            this.openEditor()
        },
        // 将选择的用户的Id写入数组中
        handleSelectUser (selection, row) {
            this.Batch.push(row.id)
            console.log(this.Batch)
            console.log(row)
        },
        // 全选发送
        handleSelectUserAll () {
            let selectedList = this.$refs.selection.getSelection()
            for (var i = 0; i < selectedList.length; i++) {
                if (selectedList[i].modelId == null) {
                    this.Batch.push(selectedList[i].modelId)
                }
            }
        },

        handleSelectAll (status) {
            this.$refs.selection.selectAll(status)
            console.log(status)
        },
        // 邀请模糊搜索用户
        handleSearch () {
            this.queryParams.name = this.searchName
            this.queryParams.orgName = this.searchOrg
            this.searchBy = handleRequestParams(this.queryParams).searchBy
            this.searchContent = handleRequestParams(this.queryParams).searchContent
            this.currentPageNum = 1
            this.queryUserList()
        },
        // 修改项目
        UpdateProject (proNumber) {
            this.type = 'update'
            this.title = '修改模型'
            this.resetData()
            this.getProject(proNumber)
            this.openEditor()
        },
        // 搜索框重置

        handleReset () {
            // this.dataName = ''
                this.searchOrg='',
                this.searchName='',
                this.searchBy='',
                this.searchContent=''
            // this.resetData()
            this.queryUserList()
        },
        // 查询项目状态
        async getProject (proNumber) {
            let { data } = await GetProject(proNumber)
            if (data) {
                this.data = data
            }
        },
        // 查询状态点击确定
        handleOKQuery () {
            this.dataName = ''
            this.closeEditor()
        },
        // 编辑修改状态时点击确定
        handleOK () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.type === 'create') {
                        CreateProject({ ...this.data }).then((res) => {
                            console.log(res)
                            if (res.status === 201) {
                                this.$Message.success({
                                    content: '创建成功'
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    } else if (this.type === 'update') {
                        UpdateProject({ ...this.data }).then(res => {
                            if (res.status === 200) {
                                this.$Message.success({
                                    content: '修改成功'
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    }
                }
            })
        },

        // 新增修改状态时点击取消
        handleCancel () {
            this.closeEditor()
        },

        // 关闭弹窗
        closeEditor () {
            this.showInvite = false
        },

        // 打开弹窗
        openEditor () {
            this.showInvite = true
        },

        // 刷新外部表格
        refreshTable () {
            this.$emit('on-ok')
        },

        // 初始化表单数据
        resetData () {
            this.queryUserList()
        }

    },
    created () {
        this.resetData()
        this.handleSelectAll()
        this.queryUserList()
    }
}
</script>

<style scoped>

</style>
