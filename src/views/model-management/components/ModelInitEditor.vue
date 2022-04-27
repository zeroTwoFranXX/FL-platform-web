<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="150"
            :rules="rules"
            style="height:260px"
        >
            <FormItem label="训练配置文件：" prop="name">
                <Select v-model="data.name" placeholder="请选择：" style="width: 100%;">
                    <Option v-for="(type, index) in modelInitTypes" :key="index" :value="type.value">{{type.name}}</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer" >
            <div>
                <Button @click="handleCancel">取消</Button>
                <Button type="primary" @click="handleOk">保存</Button>
                <Button type="primary" @click="handleRun">运行</Button>
                <Button type="primary" @click="handleMonitor">监控</Button>
            </div>
        </div>
    </Modal>
</template>

<script>
import { getModelInitFile, ListModelInitTypes } from '@/views/model-management/modelFile/modelConfig'
import { SaveDslFile, SaveConfFile, SaveDagFile, RunModel } from '@/services/api/model-console'

export default {
    name: 'ModelInitEditor',
    data () {
        return {
            title: '请选择支持的模型进行初始化',
            show: false, // 弹窗开关
            data: {
                name: null
            }, // 表单数据
            modelId: null,
            modelInitTypes: [],
            rules: { // 表单规则
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        InitModel (modelId) {
            this.show = true
            this.modelId = modelId
            this.data = { name: null }
            this.modelInitTypes = ListModelInitTypes()
        },
        handleCancel () {
            this.show = false
        },
        handleOk () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log('getModelInitFile', getModelInitFile(this.data.name))
                    let { dag, dsl, conf } = getModelInitFile(this.data.name)
                    Promise.all([
                        SaveDagFile(this.modelId, dag),
                        SaveDslFile(this.modelId, dsl),
                        SaveConfFile(this.modelId, conf)
                    ]).then(responses => {
                        // console.log(responses)
                        if (responses.every(res => res.data && res.data.code === 200)) {
                            this.$Message.success('保存成功')
                            this.show = false
                            this.$emit('on-ok')
                        }
                    })
                }
            })
        },
        handleRun () {
            RunModel(this.modelId).then(res => {
                console.log('runModel', res)
                if (res && res.data && res.data.code === 200) {
                    try {
                        let jobId = res.data.result.split('jobId')[1].substring(4, 26)
                        if (jobId) {
                            this.$Message.success({
                                content: `运行成功：JobId  - ${jobId}`,
                                duration: 3
                            })
                        } else {
                            this.$Message.success(res.data.msg)
                        }
                    } catch (e) {
                        this.$Message.error(e.message)
                    }
                    this.show = false
                    this.$emit('on-ok')
                }
            })
        },
        handleMonitor () {
            window.open('http://192.168.179.183:8080')
        }
    }
}
</script>

<style scoped>

</style>
