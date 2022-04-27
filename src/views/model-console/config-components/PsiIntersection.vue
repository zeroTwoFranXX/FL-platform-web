<template>
    <div>
        <div style="height:36px; line-height:36px">PsiIntersection</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >
            <FormItem label="Name:" prop="name">
                <Input v-model="formData.name"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click='handleOk'>确定</Button>
                <Button style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { validateName } from '@/common/helpers/validate'

export default {
    name: 'PsiIntersection',
    data () {
        return {
            formData: {
                name: ''
            },
            formRules: {
                name: [
                    { required: true, message: '名称不能为空' },
                    { validator: validateName, trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        nodeId (newVal, oldVal) {
            // console.log(newVal)
            this.getNodeData(newVal)
        }
    },
    methods: {
        handleOk () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log('clicked ok', this.nodeId, cloneDeep(this.formData))
                } else {
                    this.$Message.error('请输入正确配置')
                }
            })
        },
        handleCancel () {

        },
        getNodeData (nodeId) {
            if (nodeId) console.log('getNodeData', this.nodeId)
        }
    }
}
</script>

<style scoped>

</style>
