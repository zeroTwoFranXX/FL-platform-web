<template>
    <Modal v-model="modal" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <FormItem label='数据集名称'  prop="centerDataName">
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
        </Form>
        <div slot="footer">
<!--            <Button @click="reset">取消</Button>-->
            <Button type="primary" @click="handleOK">确认</Button>
        </div>
    </Modal>
</template>

<script>
import { GetCenterData } from '@/services/center-data-management'

export default {
    name: 'showCenterDataDetail.vue',
    data () {
        return {
            // IS_DEV: false, // 开发辅助控制
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
            modal: false, // 弹窗开关
            data: {}, // 表单数据
            rules: {
                name: [
                    { required: true, message: '名称不能为空!', trigger: 'blur' }
                ]
            } // 表单规则
        }
    },
    methods: {
        // 查看数据集
        QueryCenterData (id) {
            this.type = 'query'
            this.title = '查看数据集'
            this.resetData()
            this.getCenterData(id)
            this.openEditor()
        },
        // 查看完详情之后的操作
        handleOK () {
            this.closeEditor()
        },
        // 关闭弹窗
        closeEditor () {
            this.modal = false
        },
        // 初始化表单数据
        resetData () {
            this.data = {
                name: ''
            }
        },
        // 打开弹窗
        openEditor () {
            this.modal = true
        },
        // 查询数据集状态
        async getCenterData (id) {
            let { data } = await GetCenterData(id)
            if (data) {
                this.data = data
            }
        }
    }
}
</script>

<style scoped>

</style>
