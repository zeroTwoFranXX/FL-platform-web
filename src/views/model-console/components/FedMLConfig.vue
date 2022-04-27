<template>
    <div class="config-container common-scrollbar">
        <components :is="dev_component" :nodeId="getComponentId"></components>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Reader from "@/views/model-console/config-components/FedMLcomponents/Reader";
import HeteroLogisticRegression from "@/views/model-console/config-components/FedMLcomponents/HeteroLogisticRegression";
export default {
    name: "FedMLConfig",
    components:{
        Reader,
        HeteroLogisticRegression

    },
    data () {
        return {
            dev_component:'',
            currentNodeId:0
        }
    },
    computed:{
        ...mapGetters('config',[
            'getComponentId',
            'getVueName'
        ])
    },
    watch:{
        getVueName(newValue,oldValue){
            if (newValue){
                this.dev_component = newValue
                console.log('newComponent:  ',this.dev_component)
            }
        }
    },
    created(){
        //需要初始化config文件
    }

}
</script>

<style scoped>
.config-container {
    height: calc(100% - 80px);
    padding: 0 8px;
    overflow: auto;
}
</style>
