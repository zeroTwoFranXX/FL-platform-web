<template>
    <div>
        <div class="form-header">
            <Form :label-width="100" v-model="formItem" label-colon>
                <Row :gutter="16">
                    <i-col span="6">
                        <FormItem label='数据集编号' prop="number">
                            <Input v-model="formItem.id"  placeholder="请输入数据集编号"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label='数据集名称' prop="name">
                            <Input v-model="formItem.name"  placeholder="请输入数据集名称"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label='创建人' prop="creator">
                            <Input v-model="formItem.creator"  placeholder="请输入创建人"/>
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
            <div class="table-action">
                <Button type="primary" @click="handleSelectAll(true)">设置全选</Button>
                <Button @click="handleSelectAll(false)">取消选择</Button>
            </div>
            <Table stripe ref='selection' :columns='columns' :data='data'>
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }"  slot="action">
                    <Button type="primary" style="margin-right: 5px" @click="handleQuery(row.id)">详情</Button>
                    <Button type="primary" style="margin-right: 5px" @click="centralDataRegistration(row.id)">查看授权人列表</Button>
                    <Button type="primary" style="margin-right: 5px" @click="metadataDetail(row.id)">元数据详情</Button>
                    <Poptip
                        confirm
                        transfer
                        title="确定删除?"
                        @on-ok="handleRemove(row.id)">
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
                       :total='total'
                       @on-change="handlePageChange"
                       @on-page-size-change='handlePageSizeChange'>
                </Page>
            </Col>
        </div>
        <show-center-data-detial ref="centerdatadetial" @on-ok="queryList"></show-center-data-detial>
        <authorized-person-list ref="authorizedpersonlist" @on-ok="queryList"></authorized-person-list>
    </div>
</template>

<script>
import axios from 'axios'
import { RemoveCenterData, QueryCenterDatas, QueryUserCenterDatas } from '@/services/center-data-management'
import ShowCenterDataDetial from '../central-data-preparation/components/showCenterDataDetail'
import AuthorizedPersonList from '../central-data-preparation/components/authorizedPersonList'
export default {
    // name: 'index.vue',
    name: 'subscribed-data.vue',
    components: {
        ShowCenterDataDetial,
        AuthorizedPersonList
    },
    data () {
        return {
            total: 0, // 分页合计
            queryParams: {
                // name: '',
                page: 0, // 分页页码
                size: 10, // 分页条数
                currentPage: 1
            },
            modal: false,
            formItem: [{
                name: '',
                id: '',
                creator: '',
                value: ''
            }],
            datasetlists: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '编号',
                    key: 'id',
                    align: 'center',
                    width: 140
                },
                {
                    title: '数据集名称',
                    key: 'name',
                    align: 'center',
                    width: 180
                },
                {
                    title: '数据集描述',
                    key: 'description',
                    align: 'center',
                    width: 180
                },
                {
                    title: '数据集创建人',
                    key: 'creator',
                    align: 'center',
                    width: 140
                },
                {
                    title: '创建人联系方式',
                    key: 'iphone',
                    align: 'center',
                    width: 140
                },
                {
                    title: '数据源类型',
                    key: 'type',
                    align: 'center',
                    width: 140
                },
                {
                    title: '公开程度',
                    key: 'openness',
                    align: 'center',
                    width: 140
                },
                {
                    title: '操作',
                    // key: 'description',
                    align: 'center',
                    slot: 'action'
                    // render: (h, params) => {
                    //     return h('div', {
                    //         class: ['table-action-btns']
                    //     }, [
                    //         h(
                    //             'div',
                    //             {
                    //                 class: ['table-action-btn'],
                    //                 on: {
                    //                     click: () => {
                    //                         this.show(params.index)
                    //                     }
                    //                 }
                    //             },
                    //             '详情'
                    //         ),
                    //         h('div', { class: ['table-action-divider'] }),
                    //         h('div', {
                    //             class: ['table-action-btn'],
                    //             on: {
                    //                 click: () => {
                    //                     this.remove(params.index)
                    //                 }
                    //             }
                    //         },
                    //         '删除'
                    //         ),
                    //         h('div', { class: ['table-action-divider'] }),
                    //         h('div', { class: ['table-action-btn'],
                    //             on: {
                    //                 click: () => {
                    //                     this.centralDataRegistration(params.index)
                    //                 }
                    //             } },
                    //         '查看授权人列表'
                    //         ),
                    //         h('div', { class: ['table-action-divider'] }),
                    //         h('div', { class: ['table-action-btn'],
                    //             on: {
                    //                 click: () => {
                    //                 }
                    //             }
                    //         },
                    //         '元数据详情'
                    //         )
                    //     ])
                    // }
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
            data: [
                {
                    id: '0231355',
                    people: '张安康',
                    name: '这里是一段描述',
                    description: 28,
                    creator: '冯煜',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    id: '1254635',
                    people: '张安康',
                    name: '这里是二段描述',
                    description: 45,
                    creator: '张光卫',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    id: '6589475',
                    people: '张安康',
                    name: '这里是三段描述',
                    description: 30,
                    creator: '张安康',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                },
                {
                    id: '3215483',
                    people: '张安康',
                    name: '这里是四段描述',
                    description: 26,
                    creator: '孙江枫',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '项目可见'
                },
                {
                    id: '0231546',
                    people: '张安康',
                    name: '这里是五段描述',
                    description: 28,
                    creator: '于勰',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '公开'
                },
                {
                    id: '0135879',
                    people: '张安康',
                    name: '这里是六段描述',
                    description: 45,
                    creator: '马云',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '项目可见'
                },
                {
                    id: '0132654',
                    people: '张安康',
                    name: '这里是七段描述',
                    description: 30,
                    creator: '马化腾',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '公开'
                },
                {
                    id: '6542153',
                    people: '张安康',
                    name: '这里是八段描述',
                    description: 26,
                    creator: '马克思',
                    iphone: '18703621498',
                    type: 'CSV',
                    openness: '仅自己可见'
                }
            ]
        }
    },
    created () {
        this.queryList()
    },
    methods: {
        // 元数据详情
        metadataDetail (id) {
            this.$router.push({ path: '/metadata-configuration/', query: { id: id } })
        },
        // 删除中央数据集
        handleRemove (id) {
            RemoveCenterData(id).then(res => {
                if (res.status === 200) {
                    this.$Message.success({
                        content: '删除成功'
                    })
                    this.queryList()
                }
            })
        },
        // 请求用户数据集列表
        queryList () {
            QueryUserCenterDatas({ ...this.searchParams }).then((response) => {
                if (response.status === 200) {
                    this.data = response.data.data
                    this.total = response.data.total
                }
            })
        },
        // 中央数据集详情展示
        handleQuery (id) {
            this.$refs.centerdatadetial.QueryCenterData(id)
        },
        // 重置搜索
        reset () {
            this.formItem.name = ''
            this.formItem.id = ''
            this.formItem.creator = ''
        },
        // 全选
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status)
        },
        // 分页页码变化
        handlePageChange () {},

        // 分页条数变化
        handlePageSizeChange () {},
        // 被授权人或单位列表
        centralDataRegistration (id) {
            this.$refs.authorizedpersonlist.QueryCenterData(id)
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
</style>

<!--<template>-->
<!--    <div></div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    name: 'subscribed-data.vue'-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
