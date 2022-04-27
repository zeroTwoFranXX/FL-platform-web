<template>
    <div>
        <div style="height:48px; line-height:48px">HeteroPearson</div>
        <Form ref="form" :model="formData" label-position="top" :rules="formRules" >

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
    name: "HeteroPearson",
    data(){
        return{
            formData:{},
            formRules:{}
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
