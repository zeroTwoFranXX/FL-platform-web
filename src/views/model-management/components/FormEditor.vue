<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <Row style="margin-bottom: 12px" v-if="IS_DEV">
                Test:
                <Button @click="DEV_CREATE()">增加数据</Button>
            </Row>
            <FormItem label="模型名称：" prop="modelName">
                <Input v-model="data.modelName" style="width: 100%;color:#888baf" placeholder="请输入模型名称"></Input>
            </FormItem>
            <FormItem label="所属项目：" prop="projectId">
                <Select v-model="data.projectId" placeholder="请选择所属项目" style="width: 100%;">
                    <Option v-for="item in projectLists" :key="item.id" :value="item.id">{{ item.projName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="模型描述：" prop="modelDesc">
                <Input v-model="data.modelDesc" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width: 100%;" placeholder="请输入模型描述"></Input>
            </FormItem>
        </Form>
        <div slot="footer" >
            <Row justify="space-between">
                <Button v-if="type==='query'" type="primary"  @click="handleOKQuery">确定</Button>
                <template v-else>
                    <div>
                        <Button @click="handleCancel">取消</Button>
                        <Button type="primary"  @click="handleOK">确认</Button>
                    </div>
                </template>
            </Row>
        </div>
    </Modal>
</template>

<script>

import { CreateModel, GetModel, RemoveModel, UpdateModel } from '@/services/api/model-management.js'
import { mapGetters } from 'vuex'
export default {
    name: 'FormEditor',
    data () {
        return {
            IS_DEV: false, // 开发辅助控制
            title: '',
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            show: false, // 弹窗开关
            data: {}, // 表单数据
            data_default: {
                modelName: '',
                modelDesc: '',
                projectId: null,
                projectName: ''
            },
            rules: { // 表单规则
                modelName: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                projectId: [
                    { required: true, message: '所属项目不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters('model', [
            'projectLists'
        ])
    },
    methods: {
        // 查看模型
        QueryModel (id) {
            this.type = 'query'
            this.title = '新增模型'
            this.resetData()
            this.getModel(id)
            this.openEditor()
        },

        // 新增模型
        CreateModel () {
            console.log('新增模型')
            this.type = 'create'
            this.title = '创建模型'
            this.resetData()
            this.openEditor()
        },

        // 修改模型
        UpdateModel (id) {
            this.type = 'update'
            this.title = '修改模型'
            this.resetData()
            this.getModel(id)
            this.openEditor()
        },
        // 删除模型
        RemoveModel (id) {
            this.removeModel(id)
        },

        // 查询模型状态
        async getModel (id) {
            let { data } = await GetModel(id)

            if (data && data.code === 200) {
                let model = data.page.list[0] || {}
                this.data.modelId = model.modelId
                this.data.modelName = model.modelName
                this.data.projectId = model.projectId + '' // iview 特殊处理
                this.data.projectName = model.projectName
                this.data.modelDesc = model.modelDesc
            }
        },
        // 删除模型
        async removeModel (id) {
            let { data } = await RemoveModel([id])
            console.log('remove data: ' + data)
            if (data && data.code === 200) {
                this.$Message.success({
                    content: data.msg
                })
                this.refreshTable()
            }
        },

        // 查询状态点击确定
        handleOKQuery () {
            this.closeEditor()
        },

        // 编辑修改状态时点击确定
        handleOK () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.type === 'create') {
                        CreateModel({ ...this.data }).then((res) => {
                            if (res.data && res.data.code === 200) {
                                this.$Message.success({
                                    content: res.data.msg
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    } else if (this.type === 'update') {
                        UpdateModel({ ...this.data }).then(res => {
                            if (res.data && res.data.code === 200) {
                                this.$Message.success({
                                    content: res.data.msg
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
            this.data = { ...this.data_default }
        }
    },
    created () {
        this.resetData()
    }
}
</script>

<style scoped>

</style>
