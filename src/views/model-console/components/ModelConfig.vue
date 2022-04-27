<template>
    <div class="config-container common-scrollbar">
        <components :is="dev_component" :nodeId="currentNodeId"></components>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HdfsReader from '../config-components/HdfsReader'
import EngineInput from '@/views/model-console/config-components/EngineInput'
import HeteroLayerXgboost from '@/views/model-console/config-components/HeteroLayerXgboost'
import ModelEval from '@/views/model-console/config-components/ModelEval'
import PsiIntersection from '@/views/model-console/config-components/PsiIntersection'
import HeteroLogisticRegression from "@/views/model-console/config-components/HeteroLogisticRegression";
import ColumnExpand from "@/views/model-console/config-components/ColumnExpand";
import HeteroPearson from "@/views/model-console/config-components/HeteroPearson";
import confDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
export default {
    name: 'ModelConfig',
    components: {
        HdfsReader,
        EngineInput,
        HeteroLayerXgboost,
        ModelEval,
        PsiIntersection,
        ColumnExpand,
        HeteroLogisticRegression,
        HeteroPearson
    },
    data () {
        return {
            dev_component: null
        }
    },
    computed: {
        ...mapGetters('config', [
            'currentVueName', // 当前组件的名称
            'currentNodeId' // 当前选中的节点ID
        ]),
        ...mapGetters('FateConfStore',[
            'ConfData'
        ])
    },
    watch: {
        currentVueName (newValue, oldValue) {
            if (newValue) {
                this.dev_component = newValue
                console.log('点击后配置区变化：',this.dev_component)
            }
        }
    },
    created() {
        //初始化conf文件
        console.log('目前对应的confdata：', this.ConfData)
        if (! this.ConfData.component_parameters){
            confDataStruct.initData()
            console.log(confDataStruct.getData())
            this.$store.commit('FateConfStore/setConfData',confDataStruct.getData())
        }
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
