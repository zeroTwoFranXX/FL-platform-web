import { cloneDeep } from 'lodash'
import {response} from "msw";

const confData = {
    dsl_version:2,
    initiator:{
        role:"guest",
        party_id:0
    },
    role:{
        guest:[],
        host:[],
        arbiter:[]
    },
    job_parameters:{
        common:{}
    },
    component_parameters:{
        common:{},
        role:{
            host:{},
            guest:{}
        }
    }
}

let confJson = cloneDeep(confData)


export default {
    initData () {
        confJson = cloneDeep(confData)
    },
    getData () {
        return cloneDeep(confJson)
    },

    setData (data) {
        confJson = cloneDeep(data)
    },

    //添加具体组件参数信息
    setConfData(nodeName,data){
        confJson.component_parameters.common[nodeName] = data
        console.log(confJson)
    },

    //删除节点时删除相应的内容
    deleteConfData(nodeName){
        // if (confJson.component_parameters.common[nodeName]) {
            delete confJson.component_parameters.common[nodeName]
        // }
        // console.log(confJson)
    },

    getConfig(){
        return confJson.component_parameters.common
    },


    //修改发起者的id
    setInitId(id){
        confJson.initiator.party_id = id
    },

    //修改参与方发起者id列表
    setRoleGuestId(GuestId){
        confJson.role.guest.push(GuestId)
    },
    //修改参与方数据拥有者id列表
    setRoleHostId(HostId){
        confJson.role.host.push(HostId)
    },
    //修改参与方监视者id列表
    setRoleArbiterId(ArbiterId){
        confJson.role.arbiter.push(ArbiterId)
    },

    //设置模型参数
    setModelParam(key,value){
        confJson.job_parameters.common[key] = value
    }

}
