<template>
<div>
    <div style="height:36px; line-height:36px">EngineInput</div>
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
import { validateName } from '@/common/helpers/validate'
import confDataGenerate from "@/views/model-console/FlowChart/Fate/confDataGenerate";
import { cloneDeep } from 'lodash'
import {mapGetters} from "vuex";

export default {
    name: 'EngineInput',
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
    computed: {
        ...mapGetters('config', [
            'currentNodeId',
        ])
    },
    watch: {
        nodeId (newVal, oldVal) {
            // console.log(newVal)
            this.getNodeData(newVal)
        }
    },
    methods: {
        handleOk () {
            let nodeName = confDataGenerate.getNameById(this.currentNodeId)
            confDataGenerate.setNodeConf(nodeName,this.formData)
            // this.$refs['form'].validate(valid => {
            //     if (valid) {
            //         console.log('clicked ok', this.nodeId, cloneDeep(this.formData))
            //     } else {
            //         this.$Message.error('请输入正确配置')
            //     }
            // })
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
