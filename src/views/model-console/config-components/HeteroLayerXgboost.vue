<template>
    <div>
        <div style="height:36px; line-height:36px">HeteroLayerXgboost</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >
            <FormItem label="Name:" prop="name">
                <Input v-model="formData.name"></Input>
            </FormItem>
            <FormItem label="task_type" prop="task_type">
                <Select v-model="formData.task_type" style="width:100%">
                    <Option v-for="item in taskTypes" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="目标损失函数" prop="objective">
                <Select v-model="formData.objective" style="width:100%">
                    <Option v-for="item in objectives" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="学习率" prop="learning_rate">
                <InputNumber :max="10" :min="0" :step="0.1" v-model="formData.learning_rate" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="集成最大决策树的个数" prop="num_trees">
                <InputNumber :max="100" :min="0" :step="1" v-model="formData.num_trees" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="决策树最大深度" prop="max_depth">
                <InputNumber :max="100" :min="0" :step="1" v-model="formData.max_depth" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="加密算法" prop="method">
                <Select v-model="formData.method" style="width:100%">
                    <Option v-for="item in methods" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="工作模式" prop="work_mode">
                <Select v-model="formData.work_mode" style="width:100%">
                    <Option v-for="item in workModes" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="发起方最后一棵树深度" prop="guest_depth">
                <InputNumber :max="100" :min="0" :step="1" v-model="formData.guest_depth" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="数据提供方第一棵树深度" prop="host_depth">
                <InputNumber :max="100" :min="0" :step="1" v-model="formData.host_depth" style="width:100%"></InputNumber>
            </FormItem>
            <FormItem label="交替构建最大树的个数" prop="tree_num_per_party">
                <InputNumber :max="100" :min="0" :step="1" v-model="formData.tree_num_per_party" style="width:100%"></InputNumber>
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
import { mapGetters } from 'vuex'
import { validateName } from '@/common/helpers/validate'

export default {
    name: 'HeteroLayerXgboost',
    data () {
        return {
            formData: {
                name: '',
                task_type: 'classification',
                objective: 'cross_entropy',
                learning_rate: 0.3,
                num_trees: 5,
                max_depth: 3,
                method: 'paillier',
                work_mode: 'mix',
                guest_depth: 1,
                host_depth: 1,
                tree_num_per_party: 1
            },
            formRules: {
                name: [
                    { required: true, message: '名称不能为空' },
                    { validator: validateName, trigger: 'blur' }
                ],
                task_type: [
                    { required: true, message: 'task_type 不能为空', trigger: 'blur' }
                ],
                objective: [
                    { required: true, message: 'objective_param 不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters('model', [
            'taskTypes',
            'objectives',
            'methods',
            'workModes'
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
