<template>
    <Card>
        <!--  搜索区域   -->
        <Card :dis-hover="true">
            <Form inline :label-width="100">
                <Form-item label="资源名称：">
                    <Input v-model="searchName" placeholder="请输入计算资源名称" style="width: 300px"/>
                </Form-item>
                <Form-item label="计算资源IP：">
                    <Input v-model="searchIp" placeholder="请输入计算资源IP" style="width: 300px"/>
                </Form-item>

                <Form-item label="创建人Id：">
                    <Input v-model="searchCreatorId" placeholder="请输入计算资源创建人Id" style="width: 300px"/>
                </Form-item>
                <Form-item :label-width="0">
                    <Button type="primary" icon="ios-search" @click="handleSearch"  style="margin-right: 5px">搜索</Button>
                    <Button type="primary" icon="ios-refresh"  @click="handleReset">重置</Button>
                </Form-item>
            </Form>
        </Card>
        <Row style="margin: 8px;text-align:right"  >
            <Button @click="handleCreate" type="primary" >添加新的节点</Button>
        </Row>
        <!-- 表格区域   -->
        <Table border :columns="columns" :data="data" >
            <template slot-scope="{ row }" slot="nodeName">
                <strong>{{ row.nodeName }}</strong>
            </template>
            <template slot-scope="{ row }" slot="nodeIp">
                <strong>{{ row.nodeIp }}</strong>
            </template>
            <template slot-scope="{ row }" slot="nodePort">
                <strong>{{ row.nodePort }}</strong>
            </template>
            <template slot-scope="{ row }" slot="creatorId">
                <strong>{{ row.creatorId }}</strong>
            </template>
            <template slot-scope="{ row }" slot="nodeStatus">
                <strong v-if="row.nodeStatus==0">未知</strong>
                <strong v-if="row.nodeStatus==1">正常</strong>
                <strong v-if="row.nodeStatus==2">异常</strong>
            </template>
            <template slot-scope="{ row }" slot="voidFlag">
                <strong v-if="row.voidFlag==0">未删除</strong>
                <strong v-if="row.voidFlag==1">删除</strong>
            </template>
<!--            <template slot-scope="{ row }" slot="createTime">-->
<!--                <strong>{{ row.createTime }}</strong>-->
<!--            </template>-->
<!--            <template slot-scope="{ row }" slot="updateTime">-->
<!--                <strong>{{ row.updateTime }}</strong>-->
<!--            </template>-->
            <template slot-scope="{ row }" slot="nodeDesc">
                <strong>{{ row.nodeDesc }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action" style="margin-right: 25px">
<!--                <Button type="primary" style="margin-right: 5px" @click="handleQuery(row.id)">查看</Button>-->
<!--                <Button type="primary" style="margin-right: 5px" @click="Invitation(row.id)">邀请</Button>-->
                <Button type="primary" style="margin-right: 5px" @click="handleUpdate(row)">编辑</Button>
                <Poptip
                    confirm
                    transfer
                    title="确定删除?"
                    @on-ok="handleRemove(row.id)">
                    <Button type="primary">删除</Button>
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
<!--        <invitation-information ref="invite" @on-ok="queryList"></invitation-information>-->

    </Card>
</template>

<script>
import { handleRequestParams } from '@/common/helpers/params'
import { QueryNodes } from '@/services/node-management'
import FormEditor from '@/views/node-management/components/FormEditor'

export default {
    name: 'index.vue',
    components: {
        FormEditor
    },
    data () {
        return {
            searchIp: '',
            searchName: '',
            searchCreatorId: '',
            data: [],
            dataCount: 0, // 分页合计
            currentPageNum: 1, // 分页页码
            pageSize: 10, // 分页页数
            queryParams: {
                nodeName: '',
                nodeIp: '',
                creatorId: '',
                updateTime: '',
                createTime: '',
                nodeStatus: ''
            },
            columns: [ // 表格配置
                {
                    title: '序号',
                    type: 'index',
                    width: 80
                },
                {
                    title: '计算资源名称',
                    key: 'nodeName',
                    slot: 'nodeName'
                },
                {
                    title: '计算资源IP',
                    key: 'nodeIp',
                    slot: 'nodeIp'
                },
                {
                    title: '端口号',
                    key: 'nodePort',
                    slot: 'nodePort',
                    width: 80
                },
                {
                    title: '创建人Id',
                    key: 'creatorId',
                    slot: 'creatorId',
                    width: 200
                },
                {
                    title: '节点状态',
                    key: 'nodeStatus',
                    slot: 'nodeStatus',
                    width: 100

                },
                {
                    title: '是否删除',
                    key: 'voidFlag',
                    slot: 'voidFlag',
                    width: 100
                },
                {
                    title: '计算资源描述',
                    key: 'nodeDesc',
                    slot: 'nodeDesc',
                    width: 200
                },

                {
                    title: '操作',
                    slot: 'action',
                    width: 200
                }
            ]
        }
    },
    methods: {
        // 模糊搜索项目
        handleSearch () {
            this.queryParams.nodeName = this.searchName
            this.queryParams.nodeIp = this.searchIp
            this.queryParams.creatorId = this.searchCreatorId
            this.searchBy = handleRequestParams(this.queryParams).searchBy
            this.searchContent = handleRequestParams(this.queryParams).searchContent
            this.currentPageNum = 1
            // this.queryList()
            this.searchQueryList()
        },

        // 查询计算资源
        handleQuery (id) {
            this.$refs.editor.QueryNode(id)
        },
        // 请求列表
        searchQueryList () {
            QueryNodes({
                page: 1,
                limit: 10,
                logic:'and',
                searchBy:this.searchBy,
                searchContent:this.searchContent
            }).then((response) => {
                if (response) {
                    console.log(response)
                    this.dataCount = response.data.data.totalCount
                    this.data = response.data.data.list
                }
            })
        },
        // 请求列表
        queryList () {
            QueryNodes({
                page: 1,
                limit: 10
            }).then((response) => {
                if (response) {
                    console.log(response)
                    this.dataCount = response.data.data.totalCount
                    this.data = response.data.data.list
                }
            })
        },
        // 重置搜索条件
        handleReset () {
            this.searchName = ''
            this.searchIp = ''
            this.searchCreatorId = ''
            this.searchBy = ''
            this.searchContent = ''
            this.queryList()
        },
        // 删除节点
        handleRemove (id) {
            console.log(id)
            this.$refs.editor.RemoveNode(id)
        },
        // 创建节点
        handleCreate () {
            this.$refs.editor.CreateNode()
        },

        // 刷新外部表格
        refreshTable () {
            this.$emit('on-ok')
        },
        // 分页页码变化
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.queryList()
        },
        // 修改项目
        handleUpdate (e) {
            this.$refs.editor.UpdateNode(e)
        }
    },
    created () {
        this.queryList()
    }
}
</script>

<style scoped>

</style>
