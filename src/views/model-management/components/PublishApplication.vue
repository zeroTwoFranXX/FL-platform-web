<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <FormItem label="应用名称：" prop="appName">
                <Input v-model="data.appName" style="width: 100%;color:#888baf" placeholder="请输入应用名称"></Input>
            </FormItem>
            <FormItem label="应用描述：" prop="appDesc">
                <Input v-model="data.appDesc" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width: 100%;" placeholder="请输入应用描述"></Input>
            </FormItem>
            <FormItem label='应用图片：' prop="file">
                <img v-if="imgPath" style="height:62px" :src="this.imgPath">
                <Upload
                    :before-upload="handleBeforeUpload"
                    action=""
                >
                    <Button icon="ios-cloud-upload-outline">图片上传</Button>
                </Upload>
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
import { CreateApplication } from '@/services/api/app'

export default {
    name: 'FormEditor',
    data () {
        return {
            title: '',
            type: 'create', // 弹窗编辑状态(query/create/update)，默认为查询
            show: false, // 弹窗开关
            data: {}, // 表单数据
            imgPath: null,
            data_default: {
                appName: '',
                appDesc: '',
                modelId: null,
                file: null
            },
            rules: { // 表单规则
                appName: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {

        // 新增模型
        CreateApplication (modelId) {
            this.type = 'create'
            this.title = '发布应用'
            this.resetData()
            this.openEditor()
            this.data.modelId = modelId
        },
        handleBeforeUpload (file) {
            this.data.file = file
            this.imgPath = window.webkitURL.createObjectURL(file)
            return false
        },
        // 查询状态点击确定
        handleOKQuery () {
            this.closeEditor()
        },
        // 编辑修改状态时点击确定
        handleOK () {
            this.$refs.form.validate((valid) => {
                CreateApplication({ ...this.data }).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.$Message.success({
                            content: res.data.msg
                        })
                        this.closeEditor()
                        this.refreshTable()
                    } else if (res.data && res.data.code === 500) {
                        this.$Message.error({
                            content: res.data.msg
                        })
                    }
                })
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
