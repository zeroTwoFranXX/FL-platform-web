<template>
    <div class="model-container">
        <!--引擎选择区-->
        <div class="engine-select" v-if="JudgeModelIsNew==0" style="display: flex">
            <Select v-model="engine">
                <Option v-for="(item,index) in engineSet" :key="index" :value="item">{{item}}</Option>
            </Select>
            <el-button size="small" type="primary" @click="SelectEngine">确定</el-button>
        </div>
        <div class="engine-select" v-else-if="JudgeModelIsNew==1">
            <Select v-model="engine" disabled>
                <Option v-for="(item,index) in engineSet" :key="index" :value="item">{{item}}</Option>
            </Select>
        </div>
        <div class="model-header"><!--头部-->
            <model-header></model-header>
        </div>
        <div class="model-content"><!--算子区-->
            <div v-if="engine == 'Fate'">
                <div class="model-content-left  common-scrollbar">
                    <model-operators></model-operators>
                </div>
            </div>
            <div v-else-if="engine == 'FedML'">
                <div class="model-content-left  common-scrollbar">
                    <fed-m-l-operators></fed-m-l-operators>
                </div>
            </div>
            <div v-else-if="engine == 'paddlepaddle'">
                <div class="model-content-left  common-scrollbar">
                    <paddlepaddle-operators></paddlepaddle-operators>
                </div>
            </div>
            <div v-else-if="engine == 'pysyft'">
                <div class="model-content-left  common-scrollbar">
                    <pysyft-operators></pysyft-operators>
                </div>
            </div>
            <div class="model-content-center"><!--画布区-->
                <div
                    id="mainContainer"
                    @dragover="handleDragover"
                    @drop="handleDrop"
                ></div>
            </div>
            <!-- 参数配置区-->
            <div class="model-content-right" v-if="engine == 'Fate' && JudgeModelIsNew==1">
                <div class="params-setting">
                    <model-config></model-config>
                </div>
            </div>
            <div class="model-content-right" v-else-if="engine == 'FedML' && JudgeModelIsNew==1">
                <div class="params-setting">
                    <fed-m-l-config></fed-m-l-config>
                </div>
            </div>
            <div class="model-content-right" v-else-if="engine == 'paddlepaddle' && JudgeModelIsNew==1">
                <div class="params-setting">
                    <paddlepaddle-config></paddlepaddle-config>
                </div>
            </div>
            <div class="model-content-right" v-else-if="engine == 'pysyft' && JudgeModelIsNew==1">
                <div class="params-setting">
                    <pysyft-config></pysyft-config>
                </div>
            </div>
            <div class="model-actions"><!--操作区域-->
                <model-actions></model-actions>
            </div>
        </div>
    </div>
</template>

<script>
import ModelHeader from './components/ModelHeader.vue'
import ModelOperators from './components/ModelOperators.vue'
import ModelConfig from './components/ModelConfig.vue'
import ModelActions from './components/ModelActions.vue'
import paddlepaddleOperators from "@/views/model-console/components/paddlepaddleOperators";
import paddlepaddleConfig from "@/views/model-console/components/paddlepaddleConfig";
import PysyftOperators from "@/views/model-console/components/PysyftOperators";
import PysyftConfig from "@/views/model-console/components/PysyftConfig";
import FedMLConfig from "@/views/model-console/components/FedMLConfig";
import FedMLOperators from "@/views/model-console/components/FedMLOperators";
import FlowChart from './FlowChart/index'
import { mapGetters } from 'vuex'
import ModelChartData from './FlowChart/model'
import {getDataSet, GetModelComponentsTreeData} from "@/services/api/model-console";
import {cloneDeep} from "lodash";
import {setComponentList} from "@/views/model-console/bussiness/componentList";
import confDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
import GenerateDsl from "@/views/model-console/FlowChart/Fate/dslDataStruct";
import EngineType from "@/views/model-console/bussiness/EngineType";
import {Message} from "element-ui";
import SelectNodeName from "@/views/model-console/bussiness/SelectNodeName";
export default {
    name: 'ModelConsole',
    data(){
        return{
            JudgeModelIsNew:0,
            engine:'Fate',
            engineSet:['Fate','FedML','paddlepaddle','pysyft'],
            //除Fate外其他引擎使用的组件id
            componentId:0
        }
    },
    components: {
        ModelHeader, ModelOperators, ModelConfig, ModelActions,
        paddlepaddleOperators,FedMLOperators,PysyftOperators,
        paddlepaddleConfig,FedMLConfig,PysyftConfig
    },
    computed: {
        ...mapGetters('model', [
            'currentModelId',
            'DagData',
        ]),
        ...mapGetters('FateConfStore',[
            'ConfData'
        ]),
        ...mapGetters('FateDslStore',[
            'DslData'
        ])
    },
    methods: {
        handleDragover (ev) {
            //如果此事件没有显示处理，默认动作不应该照常执行
            ev.preventDefault()
        },

        handleDrop (ev) {
            if (this.JudgeModelIsNew == 0){
                Message.error('请先选择引擎，再进行模型创建!')
            }
            else if (this.JudgeModelIsNew == 1) {
                console.log("dag图操作")
                console.log(ev.dataTransfer.getData('target'))

                if (this.engine != 'Fate'){
                    //对于除Fate以外的其他引擎而言，设置nodeId，为了渲染参数配置区
                    this.componentId = ev.dataTransfer.getData('target')
                }
                //dataTransfer保存被拖拽的数据
                FlowChart.addNode({pageX: ev.pageX, pageY: ev.pageY}, ev.dataTransfer.getData('target'))
            }
        },

        //加载算子区数据
        async LoadData () {
            let { data } = await GetModelComponentsTreeData()
            if (data && data.code === 200) {
                setComponentList(cloneDeep(data.data))
            }
        },

        //存储dag模型数据
        async LoadAlgAndDagData(){
            //通过异步函数await等待算子数据
            await this.LoadData()

            //通过store获取dag暂存数据
            await FlowChart.loadData(this.DagData)
        },

        //选择engine
        SelectEngine(){
            this.JudgeModelIsNew = 1
            EngineType.setJudgeIsNew(1)
            EngineType.setEngine(this.engine)
            console.log('console: ',this.engine)
            Message.success("选择引擎成功，可以使用当前引擎可识别的模型算子")
            //记录此时的engine
        }

    },
    created() {
        //如果是新模型，engine应该是0；如果是原有模型，则为1
        this.engine = EngineType.getEngine()

        getDataSet().then(res=>{
            console.log("dataSet:")
            console.log(res)
        })
    },
    mounted () {

        FlowChart.setContainer('mainContainer')
        FlowChart.on('commandListEmpty', () => {
            this.isUndoDisable = true
        })
        FlowChart.on('showNodeData', () => {
            this.dialogTableVisible = true
        })
        FlowChart.on('addCommand', () => {
            this.isUndoDisable = false
        })
        FlowChart.on('selectNode', (data) => {
            this.isShowNode = true
            this.currentNodeId = data
            //进行判断，不同的引擎节点id保存到不同的仓库中
            if (this.engine == 'Fate') {
                this.$store.commit('config/setCurrentNodeId', data)
            }
            else{
                this.$store.commit('config/setComponentId',this.componentId)
            }

            console.log('selectNode', data)
        })
        // ModelConsoleAPI.getModelData().then((data) => {
        //     console.log('model data: ' + data)
        //     debugger
        //     FlowChart.loadData(data.data)
        // })

        //加载算子区数据并且在此之后加载模型数据
        this.LoadAlgAndDagData()
        console.log(this.currentModelId)

        //将dsl文件信息从vuex仓库中存放到js中
        // console.log("11仓库中：",this.DslData)
        let DslTmp = new Map(Object.entries(this.DslData.components))
        // console.log("转换后的：",DslTmp)
        GenerateDsl.setData(DslTmp)
        // console.log(GenerateDsl.getData())

        //将conf文件信息从vuex仓库中存放到js中
        // console.log("11仓库中：",this.ConfData)
        confDataStruct.setData(this.ConfData)
        // console.log(confDataStruct.getData())
    },

}
</script>

<style lang="less" scoped>

.engine-select{
    height: 40px;
    position: absolute;
    width: 200px;
    top: 60px;
    left: calc(50% - 150px);
    padding: 3px;
    border: 1px solid #dcdee2;
    border-radius:8px;
    background-color: #ffffff;
    z-index:1000;
}

.model-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .model-header {
        margin-top: 20px;
        box-sizing: border-box;
        height: 40px;
        border-bottom: 2px solid #f8f8f9;
        background: #ffffff;
        z-index:1000;
    }
    .model-content {
        flex: 1;
        width:100%;
        height: 100%;
        display: flex;

        .model-content-left {
            padding-bottom: 40px;
            flex: 0 0 200px;
            z-index: 1000;
            background: #ffffff;
            height: 100%;
            overflow-y: auto;
        }

        .model-content-right {
            flex: 0 0 300px;
            z-index: 1000;
            height: 100%;
            background-color: #f8f8f9;
            .params-setting{
                height: 100%;
                background: #ffffff;
                margin-bottom: 10px;
            }
            .current-task{
                height: calc(100% - 510px);
                background: #ffffff;
            }
        }

        .model-content-center {
            flex: 1;
            background-color: #f8f8f9;
            width: 100%;
            overflow: hidden;

            #mainContainer {
                outline: none !important;
                height: 100%;
                width: 100%;
                position: relative;
            }
        }
        .model-actions {
            position: absolute;
            width: 400px;
            height: 50px;
            bottom: 20px;
            left: calc(50% - 250px);
            padding: 8px;
            border: 1px solid #dcdee2;
            border-radius:8px;
            background-color: #ffffff;
            z-index:1000;
        }
    }
}
</style>
