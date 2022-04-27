//用户保存模型前必须选择数据集

let GuestDataSetLen = 1
let HostDataSetLen = 1

function setGuest(data){
    GuestDataSetLen = data
}

function setHost(data){
    HostDataSetLen = data
}

function getGuest(){
    return GuestDataSetLen
}

function getHost(){
    return HostDataSetLen
}

//用户在运行前必须先进行模型保存
let IsSave = 0

function setSave(data){
    IsSave = data
}

function getSave(){
    return IsSave
}

export default {
    setHost,
    setGuest,
    getGuest,
    getHost,
    setSave,
    getSave
}
