<template>
    <div>
        <div style="height:48px; line-height:48px">HeteroLogisticRegression</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >

            <FormItem label="penalty 惩罚方法:" prop="penalty">
                <Select v-model="formData.penalty">
                    <Option v-for="(item,index) in penaltySet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="tol 收敛的容忍度:" prop="tol">
                <InputNumber :max="1" :min="0.00001" :step="0.0001" v-model="formData.tol" style="width:100%"></InputNumber>
                <p style="color: red;font-size: 10px">*最大值为1,默认为0.0001</p>
            </FormItem>

            <FormItem label="alpha 正则化强度系数:" prop="alpha">
                <InputNumber :max="10" :min="0" :step="0.01" v-model="formData.alpha" style="width:100%"></InputNumber>
                <p style="color: red;font-size: 10px">*默认为1.0</p>
            </FormItem>

            <FormItem label="optimizer 优化方法:" prop="optimizer">
                <Select v-model="formData.optimizer">
                    <Option v-for="(item,index) in OptimizerSet" :key="index" :value="item">{{item}}</Option>
                </Select>
                <p style="color: red;font-size: 10px">*默认为rmsprop</p>
            </FormItem>

            <FormItem label="batch_strategy 生成批处理数据的方法:" prop="batch_strategy">
                <Select v-model="formData.batch_strategy">
                    <Option v-for="(item,index) in batch_strategySet" :key="index" :value="item">{{item}}</Option>
                </Select>
                <p style="color: red;font-size: 10px">*full：使用完整数据生成batch_data，batch_nums每次迭代都是ceil（data_size/batch_size）</p>
                <p style="color: red;font-size: 10px">random：从完整数据中随机选择数据，每次迭代batch_num为1</p>
            </FormItem>

            <FormItem label="batch_size 更新模型的批处理大小:" prop="batch_size">
                <div v-if="formData.batch_size !=0">
                    <InputNumber  :max="1000" :min="-1" :step="1" v-model="formData.batch_size" style="width:100%"></InputNumber>
                </div>
                <div v-if="formData.batch_size == 0">
                    <alert>不能输入0，请重新输入</alert>
                    <InputNumber  :max="1000" :min="-1" :step="1" v-model="formData.batch_size" style="width:100%"></InputNumber>
                </div>
                <p style="color: red;font-size: 10px">*整数类型</p>
                <p style="color: red;font-size: 10px">-1表示使用批处理中的所有数据，即不使用小批量策略</p>
            </FormItem>

            <FormItem label="shuffle 批次数据将在每次迭代中洗牌:" prop="shuffle">
                <Select v-model="formData.shuffle">
                    <Option v-for="(item,index) in shuffleSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="masked_rate 屏蔽数据:" prop="masked_rate">
                <InputNumber  :max="10" :min="1" :step="1" v-model="formData.masked_rate" style="width:100%"></InputNumber>
                <p style="color: red;font-size: 10px">*整数类型 使用屏蔽数据增强异质逻辑回归的安全性</p>
            </FormItem>

            <FormItem label="learning_rate  学习率:" prop="learning_rate">
                <InputNumber  :max="1" :min="0.00001" :step="0.00001" v-model="formData.learning_rate" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="max_iter  迭代次数:" prop="max_iter">
                <InputNumber  :max="999" :min="1" :step="1" v-model="formData.max_iter" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="early_stop  判断是否收敛的方法:" prop="early_stop">
                <Select v-model="formData.early_stop">
                    <Option v-for="(item,index) in early_stopSet" :key="index" :value="item">{{item}}</Option>
                </Select>
                <p style="color: red;font-size: 10px">*diff:使用两次迭代之间的损失差来判断是否收敛</p>
                <p style="color: red;font-size: 10px">weight_diff:使用两次连续迭代的权重差</p>
                <p style="color: red;font-size: 10px">abs：使用损失的绝对值来判断是否收敛。即，如果损失< eps，则收敛</p>
            </FormItem>

            <FormItem label="decay  衰变率:" prop="decay">
                <InputNumber  :max="10" :min="0.001" :step="0.001" v-model="formData.decay" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="decay_sqrt:" prop="decay_sqrt">
                <Select v-model="formData.decay_sqrt">
                    <Option v-for="(item,index) in decay_sqrtSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <!--二级表格-->
            <div>
                <FormItem label="init_method:">

                    <Select  v-model="formData.init_param.init_method" placeholder="111">
                        <Option v-for="(item,index) in init_methodSet" :key="index" :value="item">{{item}}</Option>
                    </Select>
                </FormItem>
                <div v-if="formData.init_param.init_method=='const'">
                    <FormItem label="init_const:">
                        <InputNumber  :max="100" :min="1" :step="1" v-model="formData.decay" style="width:100%"></InputNumber>
                        <p style="color: red;font-size: 10px">*当init_method为const时设置</p>
                    </FormItem>
                </div>
                <FormItem label="fit_intercept  是否初始化拦截:">
                    <Select v-model="formData.init_param.fit_intercept">
                        <Option v-for="(item,index) in fit_interceptSet" :key="index" :value="item">{{item}}</Option>
                    </Select>
                </FormItem>
            </div>

            <FormItem label="key_length  此加密方法中密钥的长度:">
                <InputNumber  :max="10000" :min="100" :step="1" v-model="formData.encrypt_param.key_length" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="n_splits:">
                <InputNumber  :max="10" :min="1" :step="1" v-model="formData.cv_param.n_splits" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="role  角色:">
                <Select v-model="formData.cv_param.role">
                    <Option v-for="(item,index) in roleSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="shuffle:">
                <Select v-model="formData.cv_param.shuffle">
                    <Option v-for="(item,index) in shuffleSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="random_seed:">
                <InputNumber  :max="100" :min="1" :step="1" v-model="formData.cv_param.random_seed" style="width:100%"></InputNumber>
            </FormItem>

            <FormItem label="need_cv:">
                <Select v-model="formData.cv_param.need_cv">
                    <Option v-for="(item,index) in need_cvSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="output_fold_history:">
                <Select v-model="formData.cv_param.output_fold_history">
                    <Option v-for="(item,index) in output_fold_historySet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem label="history_value_type:">
                <Select v-model="formData.cv_param.history_value_type">
                    <Option v-for="(item,index) in history_value_typeSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click='handleOk' style="text-align: center">确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {mapGetters} from "vuex";
import confDataGenerate from "@/views/model-console/FlowChart/Fate/confDataGenerate";
import confDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
export default {
    name: "HeteroLogisticRegression",
    data(){
        return{
            formData:{
                //注意
                penalty:'L2',
                tol:0.0001,
                alpha:1.0,
                optimizer:'rmsprop',
                batch_strategy:'full',
                batch_size:-1,
                //注意
                shuffle:true,
                masked_rate:5,
                learning_rate:0.0001,
                max_iter:100,
                early_stop:'diff',
                decay:1.0,
                decay_sqrt:true,

                init_param:{
                    init_method:'',
                    init_const:1,
                    fit_intercept:true
                },
                //注意
                encrypt_param:{
                    method:'Paillier',
                    key_length:1024
                },
                cv_param:{
                    n_splits:5,
                    mode:'Hetero',
                    role:'Guest',
                    shuffle:true,
                    random_seed:1,
                    need_cv:false,
                    output_fold_history:true,
                    history_value_type:'score'
                },
            },
            formRules:{

            },
            penaltySet:['L2','L1','None'],
            OptimizerSet:['rmsprop', 'sgd', 'adam', 'nesterov_momentum_sgd', 'adagrad'],
            batch_strategySet:['full','random'],
            shuffleSet:[true,false],
            early_stopSet:['diff', 'weight_diff', 'abs'],
            decay_sqrtSet:[true,false],
            init_methodSet:['random_uniform','random_normal','ones','zeros','const'],
            fit_interceptSet:[true,false],
            roleSet:['Guest','Host','Arbiter'],
            need_cvSet:[true,false],
            output_fold_historySet: [true,false],
            history_value_typeSet:['score','instance']
        }
    },
    computed: {
        ...mapGetters('config', [
            'currentNodeId',
        ]),
        ...mapGetters('FateConfStore',[
            'ConfData'
        ])
    },
    created() {
        //获取该组件的名字
        let NodeName = confDataGenerate.getNameById(this.currentNodeId)
        //从后端获取数据之后用于更新默认值
        if (this.ConfData.component_parameters.common) {

            for (const key in this.ConfData.component_parameters.common) {
                console.log(key + '-------' + this.ConfData.component_parameters.common[key])
                if (NodeName == key) {
                    this.formData = this.ConfData.component_parameters.common[key]
                }
            }
        }

    },
    methods:{
        handleOk(){
            if (this.formData.batch_size != 0){
                let nodeName = confDataGenerate.getNameById(this.currentNodeId)
                confDataGenerate.setNodeConf(nodeName,this.formData)
                confDataGenerate.initConfData()
            }
            else{
                alert("batch_size不能为0")
            }
        }

    }
}
</script>

<style scoped>

</style>
