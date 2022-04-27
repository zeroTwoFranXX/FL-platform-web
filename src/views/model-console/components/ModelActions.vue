<template>
    <div>
        <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="6">
                <Button @click="saveModel">保存</Button>
            </Col>
            <Col span="6">
                <Button type="primary" @click="handleRun">运行</Button>
            </Col>
            <Col span="6" style="text-align:right">
                <Button type="primary" @click="test1">监控</Button>
            </Col>
            <Col span="6" style="text-align:right">
                <Button @click="goBackList">返回</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import ModelData from '../FlowChart/model'
import GenerateDsl from '../FlowChart/Fate/dslDataStruct'
import ConfDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
import {RunModel, SaveConfFile, SaveDagFile, SaveDslFile} from '@/services/api/model-console'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { saveJSON } from '@/common/helpers/file'
import confDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
import saveEvent from "@/views/model-console/bussiness/SaveEvent";
import {Message} from "element-ui";
import HeteroLogisticRegression from "@/views/model-console/config-components/HeteroLogisticRegression";
export default {
    name: 'ModelActions',
    data(){
        return{
            saveType:0
        }
    },
    computed: {
        ...mapGetters('model', [
            'currentModelId',
        ]),
        ...mapGetters('FateConfStore',[
            'ConfData'
        ]),
        ...mapGetters('FateDslStore',[
            'DslData'
        ])

    },
    methods: {
        //保存配置文件
        saveModel () {

            if (!this.currentModelId) return

            //先判断是否数据集是否有值
            let guestData = saveEvent.getGuest()
            let hostData = saveEvent.getHost()
            if (guestData != 0 && hostData != 0){

                // let temp = ""
                // //通知用户此刻配置了哪些算法组件
                // for (let item in confDataStruct.getConfig()){
                //     temp+=item.slice(0,item.length-2)+"  "
                // }
                // Message.success("已配置的算法组件参数："+temp)



                //本地保存json文件
                //保存dsl文件
                let tmp = GenerateDsl.getData()
                //将map类型转换为object类型
                const obj = Array.from(tmp).reduce((obj, [key, value]) =>
                        Object.assign(obj, { [key]: value} )
                    , {})
                //保证完整的数据结构
                let DslData = {components:obj}
                console.log("本地保存的dsl文件：",DslData)
                saveJSON(DslData,this.currentModelId + '_dsl.json')

                //保存dag文件
                console.log("本地保存的dag文件：",ModelData.getData())
                saveJSON(cloneDeep(ModelData.getData()), this.currentModelId + '_dag.json')

                //保存conf文件
                console.log("本地保存的conf文件：",ConfDataStruct.getData())
                saveJSON(cloneDeep(ConfDataStruct.getData()),this.currentModelId + '_conf.json')

                //将dsl文件保存到服务器
                SaveDslFile(this.currentModelId, DslData).then(res=>{
                    console.log('saveDsl res', res)
                    if (res && res.data &&res.data.code === 200){
                        this.$Message.success('Dsl文件保存成功')
                    }
                })

                //将conf文件保存到服务器
                // 4.15
                SaveConfFile(this.currentModelId, 0,cloneDeep(ConfDataStruct.getData())).then(res=>{
                    console.log(cloneDeep(ConfDataStruct.getData()))
                    console.log(res)
                    if (res && res.data &&res.data.code === 200){
                        this.$Message.success('Conf文件保存成功')
                    }
                })

                //将dag文件保存到服务器
                SaveDagFile(this.currentModelId, cloneDeep(ModelData.getData())).then(res => {
                    // console.log('saveModel res', res)
                    if (res && res.data && res.data.code === 200) {
                        this.$Message.success('模型DAG文件保存成功')
                    }
                })

                //成功保存后修改保存状态
                this.saveType = 1
                saveEvent.setSave(this.saveType)
            }
            else{
                Message.error("请先在数据读取组件中配置数据集")
            }

        },
        goBackList () {
            this.$router.push({ name: 'model-management' }).then(() => {
                // FIXME: jsplumb 数据重载有些问题，现在通过手动刷新的方式实现。
                window.location.reload()
            })
        },

        handleRun () {
            if (!this.currentModelId) return
            if (saveEvent.getSave() != 0){
                RunModel(this.currentModelId).then(res => {
                    console.log('runModel', res)
                    if (res && res.data && res.data.code === 200) {
                        try {
                            let jobId = res.data.result.split('jobId')[1].substring(4, 26)
                            if (jobId) {
                                this.$Message.success({
                                    content: `运行成功：JobId  - ${jobId}`,
                                    duration: 3
                                })
                            } else {
                                this.$Message.success(res.data.msg)
                            }
                        } catch (e) {
                            this.$Message.error(e.message)
                        }
                        // this.$emit('on-ok')
                        // setTimeout(() => {
                        //     this.goMonitor()
                        // }, 3000)
                    }
                })
            }
            else{
                Message.error("请先保存模型，再进行运行")
            }

        },
        goMonitor () {
            window.open('http://192.168.179.183:8080')
        },
        test1(){
            // console.log(confDataStruct.getConfig())
            // for (let item in confDataStruct.getConfig()){
            //
            //     console.log(item.slice(0,item.length-2))
            // }

            // console.log("测试：",confDataStruct.getData())
        }
    }
}
</script>

<style scoped>

</style>
