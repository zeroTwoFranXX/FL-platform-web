<template>
    <Modal v-model="modalRegister" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <!--
            <Row style="margin-bottom: 12px" v-if="IS_DEV">
                Test:
                <Button @click="DEV_CREATE()">增加数据</Button>
            </Row>
            <FormItem label='数据集名称'  prop="childDataName">
                <Input placeholder="请输入新数据集名称"  v-model="data.name"/>
            </FormItem>
            <FormItem label='数据集描述' prop="childDataDescription">
                <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入对数据集的描述"  v-model="data.description"/>
            </FormItem>
            <FormItem label='数据集创建人' prop="childDataCreator">
                <Input placeholder="请输入对数据集的创建人"  v-model="data.creator"/>
            </FormItem>
            <FormItem label='创建人电话' prop="childDataCreatorIphone">
                <Input placeholder="请输入创建人电话"  v-model="data.iphone"/>
            </FormItem>
            <FormItem label='公开程度' prop="childDataOpenness">
                <Select  v-model="data.openness">
                    <Option v-for="item in chooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            -->
            <FormItem>
                确定要将数据集名称为{{data.name}}的数据集注册到中央数据集么？
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="reset">取消</Button>
            <Button type="primary" @click="registerOK">确认</Button>
        </div>
    </Modal>
</template>

<script>

import { GetChildData, RemoveChildData } from '@/services/child-data-management'
import { CreateCenterData } from '@/services/center-data-management'
export default {
    name: 'FormEditor',
    data () {
        return {
            IS_DEV: false, // 开发辅助控制
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
            title: '',
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            modalRegister: false, // 弹窗开关
            data: {}, // 表单数据
            rules: {
                name: [
                    { required: true, message: '名称不能为空!', trigger: 'blur' }
                ]
            } // 表单规则
        }
    },
    methods: {

        // 重置搜索
        reset () {
            this.data.name = ''
            this.data.number = ''
            this.data.creator = ''
            this.modalRegister = false
        },
        // 查看数据集
        QueryCenterData (id) {
            this.type = 'query'
            this.title = '中央数据注册'
            this.resetData()
            this.getChildData(id)
            this.openEditor()
        },

        // 修改模型
        UpdateChildData (id) {
            this.type = 'update'
            this.title = '修改数据集'
            this.resetData()
            this.getChildData(id)
            this.openEditor()
        },

        // 查询状态点击确定
        handleOKQuery () {
            this.closeEditor()
        },
        // 查询数据集状态
        async getChildData (id) {
            let { data } = await GetChildData(id)
            if (data) {
                this.data = data
            }
        },
        // 删除模型
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
        // 注册成功
        registerOK () {
            CreateCenterData({ ...this.data }).then((res) => {
                if (res.status === 201) {
                    this.$Message.success({
                        content: '创建成功'
                    })
                    this.closeEditor()
                    this.refreshTable()
                }
            })
        },
        // 新增修改状态时点击取消
        handleCancel () {
            this.closeEditor()
        },

        // 关闭弹窗
        closeEditor () {
            this.modalRegister = false
        },

        // 打开弹窗
        openEditor () {
            this.modalRegister = true
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
        },

        DEV_CREATE () {
            if (!this.IS_DEV) return
        }
    },
    created () {
        this.resetData()
    }
}
</script>

<style scoped>

</style>
