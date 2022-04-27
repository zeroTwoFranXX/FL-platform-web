<template>
    <Modal v-model="show" :title="title" width="1130"  type="info">
        <div>
            <div class="div1">
                <Form
                    class="form"
                    :model="data"
                    ref="form"
                    :label-width="96"
                    :rules="rules"
                    :disabled="type==='query'">
                    <FormItem label="任务ID" prop="proName" >
                        <Input v-model="data.proName" style="width: 200%;color:#f0f0f0"></Input>
                    </FormItem>
                    <FormItem label="用户ID" prop="proType" >
                        <Input v-model="data.proType" style="width: 200%;color:#888baf" ></Input>
                    </FormItem>
                    <FormItem label="任务状态" prop="proCreator" >
                        <Input v-model="data.proCreator" style="width: 200%;color:#888baf" ></Input>
                    </FormItem>
                    <FormItem label="角色" prop="creatorPost" >
                        <Input v-model="data.creatorPost" style="width: 200%;color:#888baf" ></Input>
                    </FormItem>
                    <FormItem label="数据集" prop="proOrganization" >
                        <Input v-model="data.proOrganization" style="width: 200%;color:#888baf" ></Input>
                    </FormItem>

                </Form>

            </div>
            <div class="div2" type="任务描述">
                <Form
                    class="form2"
                    :model="data"
                    ref="form"
                    :label-width="110"
                    :rules="rules"
                    :disabled="type==='query'">
                    <FormItem label="任务提交时间" prop="proName" >
                        <Input v-model="data.proName" style="width: 200%;color:#f0f0f0"></Input>
                    </FormItem>
                    <FormItem label="任务开始时间" prop="proType" >
                        <Input v-model="data.proType" style="width: 200%;color:#888baf"></Input>
                    </FormItem>
                    <FormItem label="任务结束时间" prop="proCreator" >
                        <Input v-model="data.proCreator" style="width: 200%;color:#888baf"></Input>
                    </FormItem>
                    <FormItem label="创任务持续时间" prop="creatorPost" >
                        <Input v-model="data.creatorPost" style="width: 200%;color:#888baf"></Input>
                    </FormItem>
                </Form>
            </div>
        </div>
        <!--应用结果详情-->
        <div>
            <Table border ref="selection" :columns="columns" :data="data1" height="250" width="1090"></Table>
        </div>
        <div slot="footer">
            <Row justify="space-between">
                <Button type="primary" @click="handleOKQuery">打印结果详情</Button>
                <Button @click="exportData()">导出表格</Button>
            </Row>
        </div>
    </Modal>
</template>
<script>
import { GetApplication } from '@/services/application-management'
export default {
    name: 'FormEditor',
    data () {
        return {
            data: {},
            dataName: '',
            IS_DEV: true,
            title: '',
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            show: false, // 弹窗开关
            // data: {}, // 表单数据
            columns: [

                {
                    title: '编号',
                    key: 'number',
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
        QueryApplication (porNumber) {
            this.type = 'query'
            this.title = '应用结果详情'
            this.resetData()
            this.getApplication(porNumber)
            this.openEditor()
        },
        // 导出表格
        exportData () {
            this.$ref.selection.exportCsv({
                filename: '测试结果数据'
            })
        },
        // // 新增项目
        // CreateApplication () {
        //     this.type = 'create'
        //     this.title = '创建应用'
        //     this.resetData()
        //     this.openEditor()
        // },

        handleSelectAll (status) {
            this.$refs.selection.selectAll(status)
        },
        // 模糊搜索模型
        handleSearch () {

        },
        // 搜索框重置

        handleReset () {
            this.dataName = ''
            this.resetData()
        },
        // 查询项目状态
        async getApplication (id) {
            let { data } = await GetApplication(id)
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
        // handleOK () {
        //     this.$refs.form.validate((valid) => {
        //         if (valid) {
        //             if (this.type === 'create') {
        //                 CreateProject({ ...this.data }).then((res) => {
        //                     console.log(res)
        //                     if (res.status === 201) {
        //                         this.$Message.success({
        //                             content: '创建成功'
        //                         })
        //                         this.closeEditor()
        //                         this.refreshTable()
        //                     }
        //                 })
        //             } else if (this.type === 'update') {
        //                 UpdateProject({ ...this.data }).then(res => {
        //                     if (res.status === 200) {
        //                         this.$Message.success({
        //                             content: '修改成功'
        //                         })
        //                         this.closeEditor()
        //                         this.refreshTable()
        //                     }
        //                 })
        //             }
        //         }
        //     })
        // },

        // 新增修改状态时点击取消
        handleCancel () {
            this.closeEditor()
        },

        // 关闭弹窗
        closeEditor () {
            this.show = false
        },
        // 打开弹窗
        openEditor () {
            this.show = true
        },

        // 刷新外部表格
        refreshTable () {
            this.$emit('on-ok')
        },
        // 初始化表单数据
        resetData () {
            this.data = {
                name: ''
            }
        }
    },
    created () {
        this.resetData()
    }
}
</script>

<style scoped>

.div2{
    width: 55%;
    float: left;
}
.form{
    float: left;
}
.form2{
    float: right;
}

</style>
