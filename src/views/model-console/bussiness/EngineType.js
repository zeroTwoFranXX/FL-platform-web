//模拟vuex
//当从后端获取该模型的信息时，第一时间将该数据进行更新

//判断模型是否选择引擎
let JudgeModelIsNew = 0
let engine = ''

function setEngine(data){
    engine = data
}

function setJudgeIsNew(value){
    JudgeModelIsNew = value
}

function getEngine(){
    return engine
}

function getJudge(){
    return JudgeModelIsNew
}
export default {
    setJudgeIsNew,
    setEngine,
    getJudge,
    getEngine
}
