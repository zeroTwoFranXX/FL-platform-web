import confDataStruct from "@/views/model-console/FlowChart/Fate/confDataStruct";
import model from '../model'


//根据节点id获取名字
function getNameById(nodeId){
    let data = model.getData().nodes

    for(let i=0;i<data.length;i++){
        if(nodeId == data[i].id){
            return data[i].nodeName
        }
    }
}



//保存组件具体参数,直接写进去
function setNodeConf(nodeName,data){
    confDataStruct.setConfData(nodeName,data)

}

//获取发起者的id
function getGuestId(id){
    confDataStruct.setInitId(10000)
    // confDataStruct.setInitId(id)
}

//获取参与方的id
function getRoleId(guestId,hostId,arbiterId){
    confDataStruct.setRoleGuestId(10000)
    confDataStruct.setRoleHostId(9999)
    confDataStruct.setRoleArbiterId(9998)

}

//设置模型参数
function getAndSetJobParam(data){
    confDataStruct.setModelParam('job_type','train')
    confDataStruct.setModelParam('backend','1')
    confDataStruct.setModelParam('work_mode','1')
}

function initConfData(){
    getGuestId(1)
    getRoleId(1,2,3)
    getAndSetJobParam('data')
    console.log("ok后的数据：",confDataStruct.getData())

}

export default {
    getNameById,
    setNodeConf,
    initConfData
}
