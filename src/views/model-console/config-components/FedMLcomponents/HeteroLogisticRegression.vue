<template>
    <div>
        <div style="height:48px; line-height:48px">HeteroLogisticRegression</div>
        <Form ref="form" :model="formData" label-position="top">
            <FormItem label="训练轮数:" prop="round">
                <InputNumber :max="1000" :min="1" :step="1" v-model="formData.Round" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="迭代次数:" prop="epoch">
                <InputNumber :max="1000" :min="1" :step="1" v-model="formData.epoch" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="样本分批大小:" prop="batchSize">
                <InputNumber :max="1000" :min="1" :step="1" v-model="formData.batchSize" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="学习率:" prop="learningRate">
                <InputNumber :max="1" :min="0.00001" :step="0.00001" v-model="formData.lr" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="优化器:" prop="optimizer">
                <Select v-model="formData.clientOptimizer">
                    <Option v-for="(item,index) in OptimizerSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem label="CI:" prop="CI">
                <InputNumber :max="1" :min="0.01" :step="0.01" v-model="formData.ci" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem>
                <Button type="primary" @click='handleOk' style="text-align: center">确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import configDataGenerate from "@/views/model-console/FlowChart/FedML/configDataGenerate";

export default {
    name: "HeteroLogisticRegression",
    data(){
        return{
            componentId:2,
            formData:{
                Round:1,
                epoch:1,
                batchSize:2,
                lr:0.00001,
                clientOptimizer:'sgd',
                ci:0.05
            },
            OptimizerSet:['sgd','xxx']
        }
    },
    computed:{
        ...mapGetters('FedMLConfigStore',[
            'FedMLConfig'
        ])
    },
    created() {
        if (this.componentId == this.FedMLConfig.modelCode){
            this.formData = this.FedMLConfig.config
        }
    },
    methods:{
        handleOK(){
            configDataGenerate.setModelConf(this.formData)
        }
    }
}
</script>

<style scoped>

</style>
