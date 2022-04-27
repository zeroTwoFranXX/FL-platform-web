<template>
    <div>
        <!--搜索区域-->
        <div class="form-header">
            <Form :label-width="100" label-colon>
                <Row :gutter="16">
                    <i-col span="5">
                        <FormItem label='应用编号' prop="appNumber">
                            <Input v-model="data.appNumber"  placeholder="请输入应用编号"/>
                        </FormItem>
                    </i-col>
                    <i-col span="5">
                        <FormItem label='应用名称' prop="appName">
                            <Input v-model="data.appName"  placeholder="请输入应用名称"/>
                        </FormItem>
                    </i-col>
                    <i-col span="5">
                        <FormItem label='所选模型' prop="modelName">
                            <Input v-model="data.modelName"  placeholder="请输入所选模型"/>
                        </FormItem>
                    </i-col>
                    <i-col span="5">
                        <FormItem label='创建人' prop="creator">
                            <Input v-model="data.appCreator"  placeholder="请输入应用创建人"/>
                        </FormItem>
                    </i-col>
                    <div class="search">
                        <Button type="primary">搜索</Button>
                        <Button style="margin-left: 16px;" @click="reset">重置</Button>
                    </div>

                </Row>
            </Form>
        </div>
        <div class='table'>
<!--            <div class="table-action">-->
<!--                &lt;!&ndash;    <Button type="primary" class="search" @click="modal=true">创建应用</Button>&ndash;&gt;-->
<!--                <Button type="primary" class="search" @click="createNewApplication">创建应用</Button>-->
<!--            </div>-->
            <!--填写子节点信息弹窗
            <Modal v-model="modal">
                <p slot="header" style="text-align:center">
                    <span>创建新应用</span>
                </p>
                <div>
                    <Form label-position="left" :label-width="100">
                        <FormItem label='应用名称'>
                            <Input placeholder="请输入新应用名称"  v-model="formItem.appName"/>
                        </FormItem>
                        <FormItem label='所选模型'>
                            <Select  v-model="formItem.modelName">
                                <Option v-for="item in modelChooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='待评估数据集'>
                            <Select  v-model="formItem.estimateData">
                                <Option v-for="item in dataChooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='应用创建人'>
                            <Input placeholder="请输入对应用的描述"  v-model="formItem.appCreator"/>
                        </FormItem>
                        <FormItem label='创建人电话'>
                            <Input placeholder="请输入创建人电话"  v-model="formItem.iphone"/>
                        </FormItem>
                        <FormItem label='创建人邮箱'>
                            <Input placeholder="请输入创建人邮箱"  v-model="formItem.email"/>
                        </FormItem>
                        <FormItem label='应用任务状态'>
                            <Select  v-model="formItem.appStatus">
                                <Option v-for="item in chooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='应用所属机构'>
                            <Input placeholder="请输入应用所属机构"  v-model="formItem.appOrganization"/>
                        </FormItem>
                        <FormItem label='应用创建时间'>
                            <div>
                                <Time :time="time" type="date" v-model="formItem.time"/>
                            </div>
                        </FormItem>
                        <FormItem label='应用描述'>
                            <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入对应用的描述"  v-model="formItem.description"/>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button @click="reset">取消</Button>
                    <Button type="primary" @click="createChild()">创建</Button>
                </div>
            </Modal>-->
            <!--应用数据展示-->
            <Table stripe ref='selection' :columns='columns' :data='data'>
                <template slot-scope="{ row }"  slot="action">
                    <Button type="primary" style="margin-right: 5px" @click="show(row.id)">应用结果详情</Button>
                    <Poptip
                        confirm
                        transfer
                        title="确定删除?"
                        @on-ok="remove(row.id)">
                        <Button>删除</Button>
                    </Poptip>
                </template>
            </Table>
            <!-- 分页区域 -->
            <Col style='text-align: right; padding: 8px 0'>
                <!--current当前页码，page-size煤业显示条目个数，total总条数-->
                <Page  show-total show-elevator  show-sizer
                       :current='queryParams.page + 1'
                       :page-size='queryParams.size'
                       :total='total+data.length'
                       @on-change="handlePageChange"
                       @on-page-size-change='handlePageSizeChange'>
                </Page>
            </Col>
        </div>
        <application-result-detail ref="resultdetail" @on-ok="queryList"></application-result-detail>
        <new-application ref="newapplication" @on-ok="queryList"></new-application>
    </div>
</template>

<script>
import ApplicationResultDetail from '@/views/application-management/components/applicationResultDetail'
import NewApplication from '@/views/application-management/components/newApplication'
import { QueryApplications, RemoveApplication, QueryUserApplications } from '@/services/application-management'

export default {
    name: 'subscribed-application.vue',
    components: {
        ApplicationResultDetail, NewApplication
    },
    data () {
        return {
            // 当前时间
            time: (new Date().toLocaleString().split('/').join('-').substring(0, 10)),
            data: [],
            total: 0, // 分页合计
            queryParams: {
                // name: '',
                page: 0, // 分页页码
                size: 10, // 分页条数
                currentPage: 1
            },
            columns: [
                {
                    title: '应用编号',
                    key: 'id',
                    align: 'center',
                    width: 140
                },
                {
                    title: '应用名称',
                    key: 'name',
                    align: 'center',
                    width: 180
                },
                {
                    title: '所选模型',
                    key: 'modelName',
                    align: 'center',
                    width: 180
                },
                {
                    title: '待评估数据集',
                    key: 'estimateData',
                    align: 'center',
                    width: 140
                },
                {
                    title: '应用描述',
                    key: 'description',
                    align: 'center',
                    width: 180
                },
                {
                    title: '应用创建人',
                    key: 'appCreator',
                    align: 'center',
                    width: 110
                },
                {
                    title: '应用所属机构',
                    key: 'appOrganization',
                    align: 'center',
                    width: 140
                },
                {
                    title: '创建人联系电话',
                    key: 'iphone',
                    align: 'center',
                    width: 140
                },
                {
                    title: '创建人邮箱',
                    key: 'email',
                    align: 'center',
                    width: 180
                },
                {
                    title: '应用任务状态',
                    key: 'appStatus',
                    align: 'center',
                    width: 140
                },
                {
                    title: '创建时间',
                    key: 'time',
                    align: 'center',
                    width: 140
                },
                {
                    title: '操作',
                    // key: 'description',
                    align: 'center',
                    slot: 'action'
                }
            ]
        }
    },
    created () {
        this.queryList()
    },
    methods: {
        // // 请求列表
        // queryList () {
        //     QueryApplications({ ...this.searchParams }).then((response) => {
        //         if (response.status === 200) {
        //             this.data = response.data.data
        //             this.total = response.data.total
        //         }
        //     })
        // },

        // 请求列表
        queryList () {
            QueryUserApplications({ ...this.searchParams }).then((response) => {
                if (response.status === 200) {
                    this.data = response.data.data
                    this.total = response.data.total
                }
            })
        },

        // 分页页码变化
        handlePageChange () {},

        // 分页条数变化
        handlePageSizeChange () {},
        // 重置搜索
        reset () {
            this.data.appName = ''
            this.data.appNumber = ''
            this.data.appCreator = ''
            this.data.modelName = ''
        },
        // 删除
        remove (id) {
            RemoveApplication(id).then(res => {
                if (res.status === 200) {
                    this.$Message.success({
                        content: '删除成功'
                    })
                    this.queryList()
                }
            })
        },
        //
        // // 创建新应用
        // createNewApplication(){
        //     this.$refs.newapplication.CreateApplication()
        // },
        // 详情
        show (appNumber) {
            this.$refs.resultdetail.QueryApplication(appNumber)
        }

    }
}

</script>

<style lang="less" scoped>
.form-header{
    padding: 10px;
    .ivu-col{
        display: flex;
        justify-content: center;
    }
    .ivu-form-item{
        width: 100%;
    }
    .search{
        width: 210px;
        float:right;
        .expand-all{
            display: inline-block;
            color:#2d8cf0;
            margin-left: 16px;
            cursor: pointer;
        }
    }
}
.search {
    width: 130px;
    float: right;
    text-align: center;
}
.font {
    font-size: 150%;
    font-weight: bold;
}
.size{
    width: 120px;
    float: left;
    background: #2b85e4;
}
.size2{
    width: 20px;
    float: right;
    background: #ed4014;
}
</style>
