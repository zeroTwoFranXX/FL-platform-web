<template>
    <div>
        <div class="form-header">
            <Form :label-width="100" :model="queryParams" label-colon>
                <Row :gutter="16">
                    <i-col span="6">
                        <FormItem label='数据集编号' prop="number">
                            <Input v-model="queryParams.number"  placeholder="请输入数据集编号"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label='数据集名称' prop="name">
                            <Input v-model="queryParams.name"  placeholder="请输入数据集名称"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label='创建人' prop="creator">
                            <Input v-model="queryParams.creator"  placeholder="请输入创建人"/>
                        </FormItem>
                    </i-col>
                    <div class="search">
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button style="margin-left: 16px;" @click="reset">重置</Button>
                    </div>
                </Row>
            </Form>
        </div>
        <div class='table'>
            <div class="table-action">
                <Button type="primary" @click="handleSelectAll(true)">设置全选</Button>
                <Button @click="handleSelectAll(false)">取消选择</Button>
                <Button type="primary" class="search" @click="handleCreate">创建子节点</Button>
            </div>
            <Table ref='selection' :columns='columns' :data='data'>
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }"  slot="action">
                    <Button type="primary" style="margin-right: 5px" @click="handleQuery(row.id)">详情</Button>
                    <Button type="primary" style="margin-right: 5px" @click="handleUpdate(row.id)">编辑</Button>
                    <Button type="primary" style="margin-right: 5px" @click="centralDataRegistration(row.id)">中央数据注册</Button>
                    <Button type="primary" style="margin-right: 5px" @click="metadataConfiguration(row.id)">元数据配置</Button>
                    <Button type="primary"><Upload action="" style="margin-right: 5px">导入CSV</Upload></Button>
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
        <!--- 子数据集编辑弹窗 --->
        <form-editor ref="editor" @on-ok="queryList"></form-editor>
        <register-dataset ref="register" @on-ok="queryList"></register-dataset>
    </div>
</template>

<script>
import FormEditor from './components/FormEditor'
import RegisterDataset from './components/register-dataset'
import { QueryChildDatas, RemoveChildData } from '@/services/child-data-management.js'
export default {
    name: 'index.vue',
    components: {
        FormEditor, RegisterDataset
    },
    data () {
        return {
            total: 0, // 分页合计
            queryParams: {
                name: '',
                number: '',
                creator: '',
                page: 0, // 分页页码
                size: 10 // 分页条数
            },
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
                    width: 180,
                    slot: 'name'
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
            ]
        }
    },
    created () {
        this.queryList()
    },
    methods: {
        // 中央数据注册
        centralDataRegistration (id) {
            this.$refs.register.QueryCenterData(id)
        },
        // 查询子数据节点
        handleQuery (id) {
            this.$refs.editor.QueryChildData(id)
        },
        // 修改子数据节点
        handleUpdate (id) {
            this.$refs.editor.UpdateChildData(id)
        },
        // 模糊搜索模型
        handleSearch () {
            this.queryList()
        },
        // 重置搜索
        reset () {
            this.queryParams.name = ''
            this.queryParams.number = ''
            this.queryParams.creator = ''
        },
        // 设置全选
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status)
        },
        // 创建子数据节点
        handleCreate () {
            this.$refs.editor.CreateChildData()
        },
        // 删除子数据节点
        handleRemove (id) {
            RemoveChildData(id).then(res => {
                if (res.status === 200) {
                    this.$Message.success({
                        content: '删除成功'
                    })
                    this.queryList()
                }
            })
        },
        // 分页页码变化
        handlePageChange () {},
        // 分页条数变化
        handlePageSizeChange () {},
        // 请求列表
        queryList () {
            QueryChildDatas({ ...this.searchParams }).then((response) => {
                if (response.status === 200) {
                    this.data = response.data.data
                    this.total = response.data.total
                }
            })
        },
        // 元数据配置列表
        metadataConfiguration (id) {
            this.$router.push({ path: '/metadata-configuration/', query: { id: id } })
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
