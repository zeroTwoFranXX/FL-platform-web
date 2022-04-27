<template>
    <div>
        <div style="height:36px; line-height:36px">HdfsReader</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >
            <FormItem label="Guest Dataset:" prop="guest">
                <Select v-model="formData.guest" multiple placeholder="选择自己的数据集">
                    <Option v-for="(item,index) in guestDataset" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem label="Host Dataset:" prop="host">
                <Select v-model="formData.host" multiple placeholder="选择被授权使用的数据集">
                    <Option v-for="(item, index) in hostDataset" :key="index" :value="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click='handleOk'>确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { ListHostDataset, ListGuestDataset } from '@/services/api/dataset'
import { validateName } from '@/common/helpers/validate'
import {Message} from "element-ui";
import saveEvent from "@/views/model-console/bussiness/SaveEvent";
import {getDataSet} from "@/services/api/model-console";
export default {
    name: 'HdfsReader',
    props: {
        nodeId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            formData: {
                guest: [],
                host: []
            },
            formRules: {
                host: [
                    { required: true, type: 'array', min: 1, message: 'Host Dataset 不能为空', trigger: 'blur' }
                ],
                guest: [
                    { required: true, message: 'Guest Dataset 不能为空'}
                ]
            },
            guestDataset: [111,222],
            hostDataset: [1111,2222],

        }
    },
    watch: {
        nodeId (newVal, oldVal) {
            this.getNodeData(newVal)
        }
    },
    methods: {
        handleOk () {

            this.$refs['form'].validate(valid => {
                if (valid) {
                    //更新数据集数组长度
                    saveEvent.setGuest(this.formData.guest.length)
                    saveEvent.setHost(this.formData.host.length)
                    console.log('clicked ok', this.nodeId, cloneDeep(this.formData))
                } else {
                    Message.error('请输入正确配置')
                }
            })
        },
        getNodeData (nodeId) {
            if (nodeId) console.log('getNodeData', this.nodeId)
        },
        listGuestDataset () {
            this.hostDataset = ListHostDataset()
            // this.guestDataset = ListGuestDataset()
        }
    },
    created () {
        getDataSet().then(res=>{
            console.log(res)
        })
        this.listGuestDataset()
    }
}
</script>

<style scoped>

</style>
