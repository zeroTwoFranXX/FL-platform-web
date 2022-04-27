<template>
    <div>
        <!--  搜索区域   -->
        <Card :dis-hover="true">
            <Form inline :model="queryParams" :label-width="100">
                <Form-item label="数据源名称：">
                    <Input v-model="queryParams.proName" placeholder="请输入数据源名称查询..." style="width: 300px" />
                </Form-item>
                <Form-item :label-width="0">
                    <Button type="primary" icon="ios-search" @click="handleSearch"  style="margin-right: 5px">搜索</Button>
                    <Button type="primary" icon="ios-refresh"  @click="handleReset">重置</Button>
                </Form-item>
            </Form>
        </Card>
<!--        <Row style="margin: 8px;text-align:right"  >-->
<!--            <Button @click="handleCreate" type="primary" >新增</Button>-->
<!--        </Row>-->
        <!-- 表格区域   -->
        <Table  :columns="columns" :data="data" >
            <!--        <Table  v-for="data in searchData" :key="data" >-->
            <template slot-scope="{ row }" slot="proName">
                <strong>{{ row.proName }}</strong>
            </template>
            <template slot-scope="{ row }" slot="proType">
                <strong>{{ row.proType }}</strong>
            </template>
            <template slot-scope="{ row }" slot="proCreator">
                <strong>{{ row.proCreator }}</strong>
            </template>
            <template slot-scope="{ row }" slot="creatorPost">
                <strong>{{ row.creatorPost }}</strong>
            </template>
            <template slot-scope="{ row }" slot="proOrganization">
                <strong>{{ row.proOrganization }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action" style="margin-right: 25px">
                <Button type="primary" style="margin-right: 5px" @click="handleQuery(row.proNumber)">项目详情</Button>
                <Button type="primary" style="margin-right: 5px" @click="Invitation(row.proNumber)">邀请</Button>
                <Button type="primary" style="margin-right: 5px" @click="handleUpdate(row.proNumber)">编辑</Button>
                <Poptip
                    confirm
                    transfer
                    title="确定删除?"
                    @on-ok="handleRemove(row.proNumber)">
                    <Button>删除</Button>
                </Poptip>
            </template>
        </Table>
        <!-- 分页区域 -->
        <Col style='text-align: right; padding: 8px 0'>
            <Page  show-total show-elevator  show-sizer :current='queryParams.page + 1' :page-size='queryParams.size' :total='total' @on-change="handlePageChange" @on-page-size-change='handlePageSizeChange'></Page>
        </Col>
        <!--- 模型编辑弹窗 --->
        <form-editor ref="editor" @on-ok="queryList"></form-editor>
        <invitation-information ref="invite" @on-ok="queryList"></invitation-information>

    </div>
</template>

<script>
import { GetSearchProject, QueryProjects, QueryUserProjects, RemoveProject } from '@/services/project-management'
import InvitationInformation from '../project-management/components/Invitation-information'
import FormEditor from '../project-management/components/FormEditor'
export default {
    name: 'Subscribed-project.vue',
    components: {
        FormEditor, InvitationInformation
    },
    data () {
        return {
            input: '',
            newsList: '',
            queryParams: {
                proName: '',
                proType: '',
                projectCreator: '',
                creatorPost: '',
                page: 0, // 分页页码
                size: 10 // 分页页数
            },
            columns: [ // 表格配置
                {
                    title: '项目编号',
                    key: 'proNumber'
                },
                {
                    title: '项目名称',
                    slot: 'proName'
                },
                {
                    title: '项目类型',
                    key: 'proType',
                    slot: 'proType'
                    // key:'proNumber'
                },
                {
                    title: '创建人',
                    key: 'proCreator'
                    // slot: 'proCreator'
                    // key:'proNumber'
                },
                {
                    title: '职务',
                    slot: 'creatorPost'
                    // key:'proNumber'
                },
                {
                    title: '所属机构',
                    key: 'proOrganization'
                    // key:'proNumber'
                },
                {
                    title: '联系电话',
                    key: 'creatorPhone'
                    // key:'proNumber'
                },
                {
                    title: '邮箱',
                    key: 'creatorEmail'
                    // key:'proNumber'
                },
                {
                    title: '公开程度',
                    key: 'proOpenness'
                    // key:'proNumber'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 500
                }
            ],
            data: [ // 表格数据
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                }
            ],
            total: 0 // 分页合计

        }
    },

    methods: {

        // 模糊搜索模型
        handleSearch () {
            this.name = this.queryParams.proName
            // console.log(this.name)
            GetSearchProject(this.name).then((response) => {
                if (response.status === 200) {
                    this.data = response.data
                }
                // console.log(response)
            })
        },
        // 创建模型
        handleCreate () {
            this.$refs.editor.CreateProject()
        },
        // 修改模型
        handleUpdate (proNumber) {
            this.$refs.editor.UpdateProject(proNumber)
        },
        // 删除模型
        handleRemove (proNumber) {
            RemoveProject(proNumber).then(res => {
                if (res.status === 200) {
                    this.$Message.success({
                        content: '删除成功'
                    })
                    this.queryList()
                }
            })
        },
        // 查询模型
        handleQuery (proNumber) {
            this.$router.push({ path: '/projectDetails/', query: { id: proNumber } })
        },
        // 邀请
        Invitation (id) {
            this.$refs.invite.QueryProject(id)
        },
        // 分页页码变化
        handlePageChange () {
        },
        // 分页条数变化
        handlePageSizeChange () {
        },
        // 重置搜索条件
        handleReset () {
            this.input = ''
            this.queryList()
        },
        // 请求列表
        queryList () {
            QueryUserProjects({ ...this.searchParams }).then((response) => {
                if (response.status === 200) {
                    this.data = response.data.data
                    this.total = response.data.total
                }
            })
        }
        // 请求列表
        // queryList () {
        //     QueryProjects({ ...this.searchParams }).then((response) => {
        //         if (response.status === 200) {
        //             this.data = response.data.data
        //             this.total = response.data.total
        //         }
        //     })
        // }
    },

    created () {
        this.queryList()
    }
}
</script>

<style scoped>

</style>
