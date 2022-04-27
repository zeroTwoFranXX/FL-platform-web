<template>
    <div>
        <div style="height:48px; line-height:48px">ColumnExpand</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >

            <FormItem label="need_run:">
                <Select v-model="formData.need_run">
                    <Option v-for="(item,index) in need_runSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click='handleOk'>确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import confDataGenerate from "@/views/model-console/FlowChart/Fate/confDataGenerate";

export default {
    name: "ColumnExpand",
    data(){
        return{
            formData:{
                need_run:true
            },
            formRules:{},
            need_runSet:[true,false],
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
    methods:{
        handleOk(){
            let nodeName = confDataGenerate.getNameById(this.currentNodeId)
            confDataGenerate.setNodeConf(nodeName,this.formData)

        }

    }

}
</script>

<style scoped>

</style>
