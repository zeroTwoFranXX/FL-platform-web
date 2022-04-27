<template>
    <Modal v-model="modal" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <FormItem label='被授权人'  prop="centerDataName">
                <Input v-model="data.people"/>
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
    name: 'authorizedPersonList.vue',
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
        // 查看被授权人
        QueryCenterData (id) {
            this.type = 'query'
            this.title = '被授权人列表'
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
        // 初始化被授权人表单数据
        resetData () {
            this.data = {
                name: ''
            }
        },
        // 打开弹窗
        openEditor () {
            this.modal = true
        },
        // 查询数据被授权人
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
