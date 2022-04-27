<template>
    <Card>
        <Tabs v-model="queryParams.relativeType" :animated="false" @on-click="handleSearch" style="margin-top:20px">
            <TabPane label="全部项目" nae="0"></TabPane>
            <TabPane label="我参与的项目" name="2"></TabPane>
            <TabPane label="我创建的项目" name="1"></TabPane>
        </Tabs>
        <!--  搜索区域   -->
        <Card :dis-hover="true">
            <Form inline :label-width="100">
                <Form-item label="项目名称：">
                    <Input v-model="searchName" placeholder="请输入项目名称" style="width: 300px"/>
                </Form-item>
                <FormItem label="项目类型：" prop="projTypeCode" >
                    <Select  placeholder="请选择"  v-model="searchTypeCode"   style="width: 300px">
                        <Option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code"></Option>
                    </Select>
                </FormItem>
                <Form-item label="项目创建人：">
                    <Input v-model="searchCreator" placeholder="请输入项目创建人" style="width: 300px"/>
                </Form-item>
                <Form-item :label-width="0">
                    <Button type="primary" icon="ios-search" @click="handleSearch"  style="margin-right: 5px">搜索</Button>
                    <Button type="primary" icon="ios-refresh"  @click="handleReset">重置</Button>
                </Form-item>
            </Form>
        </Card>
        <Row style="margin: 8px;text-align:right"  >
            <Button @click="handleCreate" type="primary" >新增</Button>
        </Row>
        <!-- 表格区域   -->
        <Table border :columns="columns" :data="data" >
<!--            <template slot-scope="{ row }" slot="id">-->
<!--                <strong>{{ row.id }}</strong>-->
<!--            </template>-->
            <template slot-scope="{ row }" slot="projName">
                <strong>{{ row.projName }}</strong>
            </template>
            <template slot-scope="{ row }" slot="projType">
                <strong>{{ row.projType }}</strong>
            </template>
            <template slot-scope="{ row }" slot="projCreator">
                <strong>{{ row.projCreator }}</strong>
            </template>
            <template slot-scope="{ row }" slot="createTime">
                <strong>{{ row.createTime }}</strong>
            </template>
            <template slot-scope="{ row }" slot="publicFlag">
                <strong v-if="row.publicFlag==0">不公开</strong>
                <strong v-if="row.publicFlag==1">公开</strong>
            </template>
            <template slot-scope="{ row }" slot="creatorMobile">
                <strong>{{ row.creatorMobile }}</strong>
            </template>
            <template slot-scope="{ row }" slot="creatorMail">
                <strong>{{ row.creatorMail }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action" style="margin-right: 25px">
                <Button  style="margin-right: 5px" @click="handleQuery(row.id)">项目详情</Button>
                <Button v-if="row.relativeType===1" type="primary" style="margin-right: 5px" @click="Invitation(row.id)">邀请</Button>
                <Button type="warning" style="margin-right: 5px" @click="handleUpdate(row)">编辑</Button>
                <Poptip
                    v-if="row.relativeType===1"
                    confirm
                    transfer
                    title="确定删除?"
                    @on-ok="handleRemove(row)">
                    <Button type="error">删除</Button>
                </Poptip>
                <Poptip
                    v-if="row.relativeType===2"
                    confirm
                    transfer
                    title="确定退出?"
                    @on-ok="handleExit(row)">
                    <Button type="error">退出</Button>
                </Poptip>

            </template>
        </Table>
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
        <!--- 模型编辑弹窗 --->
        <form-editor ref="editor" @on-ok="queryList"></form-editor>
        <invitation-information ref="invite"></invitation-information>

    </Card>
</template>

<script>
import {
    GetSearchProject,
    projectInvitationBatch,
    ProjectTypeList,
    QueryProjects
} from "../../services/project-management";
import InvitationInformation from './components/Invitation-information'
import FormEditor from './components/FormEditor'
import { handleRequestParams } from '@/common/helpers/params'

export default {
    name: 'ModelManagement',
    components: {
        FormEditor, InvitationInformation
    },
    data () {
        return {
            dataList: {},
            name: '',
            // dataList:{},
            searchName: '',
            searchTypeCode: '',
            searchCreator: '',
            searchBy: '',
            searchContent: '',
            queryParams: {
                name:'',
                projName: '',
                projTypeCode: '',
                projCreator:'',
                relativeType:'0'
            },
            columns: [ // 表格配置
                {
                    title: '序号',
                    type: 'index',
                    width: 80
                },
                {
                    title: '项目名称',
                    key: 'projName',
                    slot: 'projName'
                },
                {
                    title: '项目类型',
                    key: 'projType',
                    slot: 'projType'
                },
                {
                    title: '项目创建人',
                    key: 'projCreator',
                    slot: 'projCreator'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    slot: 'createTime'
                },
                {
                    title: '公开程度',
                    key: 'publicFlag',
                    slot: 'publicFlag'

                },
                {
                    title: '创建人电话',
                    key: 'creatorMobile',
                    slot: 'creatorMobile'
                },
                {
                    title: '创建人邮箱',
                    key: 'creatorMail',
                    slot: 'creatorMail'
                },

                {
                    title: '操作',
                    slot: 'action',
                    width: 320
                }
            ],
            data:[],
            dataCount: 0,// 分页合计
            currentPageNum: 1,// 分页页码
            pageSize: 10, // 分页页数



        }
    },
    methods: {
        getProjectList () {

            ProjectTypeList({ ...this.data }).then((response) => {
                if (response.data.code == 200) {
                    this.dataList = response.data.data
                }
            })
        },
        // 模糊搜索项目
        handleSearch () {
            console.log(this.queryParams.relativeType)
            if((this.queryParams.relativeType !== '1')&&(this.queryParams.relativeType !== '2')){
                this.queryParams.relativeType = ''
            }
            this.queryParams.projTypeCode = this.searchTypeCode
            this.queryParams.projName = this.searchName
            this.queryParams.projCreator = this.searchCreator
            this.searchBy = handleRequestParams(this.queryParams).searchBy
            this.searchContent = handleRequestParams(this.queryParams).searchContent
            this.currentPageNum = 1
            this.queryList()
        },

        // 请求列表
        queryList () {
            this.data=[]
            QueryProjects({
                searchBy: this.searchBy,
                searchContent: this.searchContent,
                logic: 'and',
                page: this.currentPageNum,
                limit: this.pageSize,
                orderBy: null,
                order: null
            }).then((response) => {
                if (response) {
                    this.dataCount = response.data.data.totalCount
                    this.data = response.data.data.list
                }
            })
        },

        // 创建项目
        handleCreate () {
            this.$refs.editor.CreateProject()
        },
        // 修改项目
        handleUpdate (e) {
            console.log(e)
            this.$refs.editor.UpdateProject(e)
        },
        // 删除项目
        handleRemove (row) {
            console.log('row========',row.id)
            this.$refs.editor.RemoveProject(row.id)
        },
        // 退出项目
        handleExit (row) {
            console.log('row========',row.id)
            this.$refs.editor.ExitProject(row.id)
        },
        // 详情项目
        handleQuery (id) {
            this.$router.push({
                name: 'details',
                params: {
                    id: id
                }
            })
        },
        // 邀请
        Invitation (id) {
            // this.$refs.invite.InvitationBatch(id)
            console.log(123)
            console.log(id)
            this.$refs.invite.QueryProject(id)

        },
        // 分页页码变化
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.queryList()
        },
        // 分页条数变化
        handlePageSizeChange () {
        },
        // 重置搜索条件
        handleReset () {
            this.searchName = ''
            this.searchCreator=''
            this.searchTypeCode=''
            this.searchBy=''
            this.searchContent=''
            this.queryList()
        }
    },
created () {
    this.queryList()
    this.getProjectList()
}
}
</script>

<style scoped>

</style>
