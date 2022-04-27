<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="data"
            ref="form"
            :label-width="96"
            :rules="rules"
            style="height:260px"
        >
            <FormItem label="预测数据：" prop="name">
                <Select v-model="data.name" placeholder="请选择：" style="width: 100%;">
                    <Option v-for="(item, index) in modelPredictions" :key="index" :value="item.name">{{item.label}}</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer" >
            <div>
                <Button @click="handleCancel">取消</Button>
                <Button type="primary" @click="handleOk">保存</Button>
                <Button type="primary" @click="handleRun">运行</Button>
            </div>
        </div>
    </Modal>
</template>

<script>
import { GetPredictionsDataset, ListModelPredictions } from '@/views/model-management/modelFile/modelConfig'
import { RunModelPrediction, SaveAppConfFile, SaveAppDslFile } from '@/services/api/app'

export default {
    name: 'ApplicationPrediction',
    data () {
        return {
            title: '请选择支持的数据集进行预测',
            show: false, // 弹窗开关
            data: {
                name: null
            }, // 表单数据
            appId: null,
            modelPredictions: [],
            rules: { // 表单规则
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        InitPredictionsData (data) {
            this.show = true
            this.appId = data.id
            this.data = { name: null }
            this.modelPredictions = ListModelPredictions()
        },
        handleCancel () {
            this.show = false
        },
        handleOk () {
            console.log('this', this)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log('this1', this)
                    console.log('this data', this.data)
                    console.log('GetPredictionsDataset', GetPredictionsDataset(this.data.name))
                    // eslint-disable-next-line camelcase
                    let { predict_conf, predict_dsl } = GetPredictionsDataset(this.data.name)
                    Promise.all([
                        SaveAppDslFile(this.appId, predict_dsl),
                        SaveAppConfFile(this.appId, predict_conf)
                    ]).then(responses => {
                        // console.log(responses)
                        let isValid = responses.every(res => {
                            return res && res.data && res.data.code === 200
                        })
                        if (isValid) {
                            this.$Message.success('保存成功')
                        }
                    })
                }
            })
        },
        handleRun () {
            RunModelPrediction(this.appId).then(res => {
                console.log('runModel', res)
                if (res && res.data && res.data.code === 200) {
                    this.$Message.success(res.data.msg)
                    this.show = false
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
