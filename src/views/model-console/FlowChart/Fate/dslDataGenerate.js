import {
    getComponentParentIdById,
    getComponentTypeById,
} from '@/views/model-console/bussiness/componentList'
import model from '../model'
import GenerateDsl from "@/views/model-console/FlowChart/Fate/dslDataStruct";
import dslDataStruct from "@/views/model-console/FlowChart/Fate/dslDataStruct";
//节点名字计数
//新模型初始化为0
let num = 0
//递增函数
function count(){
    return num++
}

//具体的input信息修改
function ReWriteData(Name,data,Module){
    GenerateDsl.addComponents(Name,{
        input:{
            data:{
                data:data
            },
            // model:[],
            // isometric_model:[]
        },
        module:Module,
        output:{
            data:["data"],
            model:["model"]
        }
    })
}

function ReWriteTrainData(Name,data,Module){
    GenerateDsl.addComponents(Name,{
        input:{
            data:{
                train_data:data
            },
            // model:[],
            // isometric_model:[]
        },
        module:Module,
        output:{
            data:["data"],
            model:["model"]
        }
    })
}

function ReWriteValidateData(Name,data,Module){
    GenerateDsl.addComponents(Name,{
        input:{
            data:{
                validate_data:data
            },
            // model:[],
            // isometric_model:[]
        },
        module:Module,
        output:{
            data:["data"],
            model:["model"]
        }
    })
}

function ReWriteValidateAndTrainData(Name,train_data,validate_data,Module){
    GenerateDsl.addComponents(Name,{
        input:{
            data:{
                train_data:train_data,
                validate_data:validate_data
            },
            // model:[],
            // isometric_model:[]
        },
        module:Module,
        output:{
            data:["data"],
            model:["model"]
        }
    })
}

function ReWriteNone(Name,Module){
    GenerateDsl.addComponents(Name,{
        input:{
            data:{},
            // model:[],
            // isometric_model:[]
        },
        module:Module,
        output:{
            data:["data"],
            model:["model"]
        }
    })
}

//获取已有模型的时候初始化num，通过dag图节点个数确定
function ReInitNum(){
    let temp = 0
    const obj = Array.from(dslDataStruct.getData()).reduce((obj, [key, value]) =>
            Object.assign(obj, { [key]: value} )
        , {})
    for (let item in obj){
        if (temp<item.charAt(item.length-1)){
            temp = item.charAt(item.length-1)
        }
    }
    num = Number(temp)+1
}

//生成节点名字
function setNodeName(componentId){
    let componentType = getComponentTypeById(componentId)
    let type = componentType.toLowerCase()
    const name = type+`_${count()}`
    return name
}

//获取组件类型
function getModuleById(componentId){
    let module = getComponentTypeById(componentId)
    return module
}


//获取连接线的目的节点和节端点
function getInputDataByEndpointId(sourceId,targetId){
    //获取dag图的信息
    let data = model.getData()
    let nodes = data.nodes
    let SourceId,TargetId,SourceName,TargetName
    for (let i=0;i<nodes.length;i++){
        for (let j in nodes[i].points.sources){
            if (sourceId == nodes[i].points.sources[j]){
                SourceId = nodes[i].id
                SourceName = nodes[i].nodeName
            }
        }
    }
    for (let i=0;i<nodes.length;i++){
        for (let j in nodes[i].points.targets){
            if (targetId == nodes[i].points.targets[j]){
                TargetId = nodes[i].id
                TargetName = nodes[i].nodeName
            }
        }
    }
    return {SourceId, TargetId, SourceName,TargetName}
}

//获取input数据类型
function JudgeInputType(targetId){
    let data = model.getData()
    let InputType
    let endpoint = data.endpoints
    for (let i=0;i<endpoint.length;i++){
        if (targetId == endpoint[i].id){
            InputType = endpoint[i].data.value
        }
    }
    return InputType
}

//获取output数据类型
function JudgeOutputType(sourceId){
    let data = model.getData()
    let OutputType
    let endpoint = data.endpoints
    for (let i=0;i<endpoint.length;i++){
        if (sourceId == endpoint[i].id){
            OutputType = endpoint[i].data.value
        }
    }
    return OutputType
}

//修改节点信息
function addDslInputData(Name,inputData,InputType){
    let OldData = GenerateDsl.getData()
    console.log(OldData)
    let NewData = []
    let NewTrainData = []
    let NewValidateData = []
    let Model = []
    let MetricModel = []
    let Module= ''
    //对原来数据进行遍历更新

    for(let [key,value] of OldData){
        if (Name == key){
            //如果之前input中存在data，则先保存下来，再进行更新
            let tmpValue = value.input.data
            let tmpInput = value.input
            console.log(tmpValue)
            Module = value.module
            if (Object.keys(tmpValue).length !=0){
                // console.log("进来了")
                if (InputType == 0){
                    if (tmpValue.data.length != 0){
                        for (let i in tmpValue.data){
                            console.log(tmpValue.data[i])
                            NewData.push(tmpValue.data[i])
                        }
                    }
                }
                else{
                    // console.log(tmpValue.train_data,tmpValue.validate_data)
                        if (Object.keys(tmpValue.train_data).length != 0) {
                            for (let i in tmpValue.train_data) {
                                NewTrainData.push(tmpValue.train_data[i])
                                console.log(tmpValue.train_data[i])
                            }
                        }

                        if (Object.keys(tmpValue.validate_data).length != 0) {
                            for (let i in tmpValue.validate_data) {
                                NewValidateData.push(tmpValue.validate_data[i])
                                console.log(tmpValue.validate_data[i])
                            }
                        }
                    }


            }

            if (Object.keys(tmpInput.model).length != 0){
                for (let i in tmpInput.model){
                    Model.push(tmpInput.model[i])
                }
            }
            if (Object.keys(tmpInput.isometric_model).length != 0){
                for (let i in tmpInput.isometric_model){
                    MetricModel.push(tmpInput.isometric_model[i])
                }
            }

            if (InputType == 0){
                NewData.push(inputData)
                console.log(NewData)
                // ReWriteData(Name,NewData,Module)
                GenerateDsl.addComponents(Name,{
                    input:{
                        data:{
                            data:NewData,
                        },
                        model:Model,
                        isometric_model:MetricModel
                    },
                    module:Module,
                    output:{
                        data:["data"],
                        model:["model"]
                    }
                })
            }
            else if(InputType == 1){
                NewTrainData.push(inputData)
                // if (NewValidateData.length == 0){
                //     ReWriteTrainData(Name,NewTrainData,Module)
                // }
                // else{
                //     ReWriteValidateAndTrainData(Name,NewTrainData,NewValidateData,Module)
                // }
                GenerateDsl.addComponents(Name,{
                    input:{
                        data:{
                            train_data:NewTrainData,
                            validate_data:NewValidateData
                        },
                        model:Model,
                        isometric_model:MetricModel
                    },
                    module:Module,
                    output:{
                        data:["data"],
                        model:["model"]
                    }
                })
            }
            else if(InputType == 2){
                NewValidateData.push(inputData)
                // if (NewTrainData.length == 0){
                //     ReWriteValidateData(Name,NewValidateData,Module)
                // }
                // else{
                //     ReWriteValidateAndTrainData(Name,NewTrainData,NewValidateData,Module)
                // }
                GenerateDsl.addComponents(Name,{
                    input:{
                        data:{
                            train_data:NewTrainData,
                            validate_data:NewValidateData
                        },
                        model:Model,
                        isometric_model:MetricModel
                    },
                    module:Module,
                    output:{
                        data:["data"],
                        model:["model"]
                    }
                })
            }

        }
    }

    console.log(GenerateDsl.getData())

}


//删除边时修改input
function DelInputData(sourceId,targetId){
    //判断是模型流还是数据流
    let Type = JudgeOutputType(sourceId)
    let {SourceName,TargetName,TargetId} = getInputDataByEndpointId(sourceId,targetId)

    let OldData = GenerateDsl.getData()
    console.log(OldData)
    let NewData = []
    let NewTrainData = []
    let NewValidateData = []
    let Model = []
    let MetricModel = []
    let Module = ''
    //判断是否为算法组件
    let IsAlg = JudgeIsAlgorithm(getComponentIdById(TargetId))
    if (Type == "数据输出"){
        for (let [key,value] of OldData){
            if (TargetName == key){
                let tmpValue = value.input.data
                let tmpInput = value.input
                console.log(tmpValue)
                if (IsAlg == true){
                    console.log(tmpValue.train_data,tmpValue.validate_data)
                    for (let i in tmpValue.train_data){
                        if (SourceName != tmpValue.train_data[i].slice(0,tmpValue.train_data[i].length-5)){
                            NewTrainData.push(tmpValue.train_data[i])
                        }
                    }
                    for (let i in tmpValue.validate_data){
                        if (SourceName != tmpValue.validate_data[i].slice(0,tmpValue.validate_data[i].length-5)){
                            NewValidateData.push(tmpValue.validate_data[i])
                        }
                    }
                }
                else{
                    for (let i in tmpValue.data){
                        if (SourceName != tmpValue.data[i].slice(0,tmpValue.data[i].length-5)){
                            NewData.push(tmpValue.data[i])
                        }
                    }
                }

                console.log(tmpInput)
                console.log(Object.keys(tmpInput.model).length)
                if (Object.keys(tmpInput.model).length != 0){
                    for (let i in tmpInput.model){
                        Model.push(tmpInput.model[i])
                    }
                }

                if (Object.keys(tmpInput.isometric_model).length != 0){
                    for (let i in tmpInput.isometric_model){
                        MetricModel.push(tmpInput.isometric_model[i])
                    }
                }

                Module = value.module
                if (IsAlg == true){
                    // if (NewValidateData.length == 0){
                    //     ReWriteTrainData(TargetName,NewTrainData,Module)
                    // }
                    // else if (NewTrainData.length == 0){
                    //     ReWriteValidateData(TargetName,NewValidateData,Module)
                    // }
                    // else if (NewTrainData.length == 0 && NewValidateData.length == 0){
                    //     ReWriteNone(TargetName,Module)
                    // }
                    GenerateDsl.addComponents(TargetName,{
                        input:{
                            data:{
                                train_data:NewTrainData,
                                validate_data:NewValidateData
                            },
                            model:Model,
                            isometric_model:MetricModel
                        },
                        module:Module,
                        output:{
                            data:["data"],
                            model:["model"]
                        }
                    })
                }
                else{
                    // if (NewData.length == 0){
                    //     ReWriteNone(TargetName,Module)
                    // }
                    // else{
                    //     ReWriteData(TargetName,NewData,Module)
                    // }
                    GenerateDsl.addComponents(TargetName,{
                        input:{
                            data:{
                                data:NewData
                            },
                            model:Model,
                            isometric_model:MetricModel
                        },
                        module:Module,
                        output:{
                            data:["data"],
                            model:["model"]
                        }
                    })
                }
            }
        }
    }
    else{
        for (let [key,value] of OldData){
            if (TargetName == key){
                let tmpValue = value.input.data
                let tmpInput = value.input
                console.log(tmpInput)
                if (IsAlg == true){
                    for (let i in tmpValue.train_data){
                            NewTrainData.push(tmpValue.train_data[i])

                    }
                    for (let i in tmpValue.validate_data){
                            NewValidateData.push(tmpValue.validate_data[i])
                    }
                }
                else{
                    for (let i in tmpValue.data){
                            NewData.push(tmpValue.data[i])
                    }
                }

                if (Object.keys(tmpInput.model).length != 0){
                    for (let i in tmpInput.model){
                        if (SourceName != tmpInput.model[i].slice(0,tmpInput.model[i].length-6)){
                            Model.push(tmpInput.model[i])
                        }

                    }
                }

                if (Object.keys(tmpInput.isometric_model).length != 0){
                    for (let i in tmpInput.isometric_model){
                        if (SourceName != tmpInput.isometric_model[i].slice(0,tmpInput.isometric_model[i].length-6)){
                            Model.push(tmpInput.isometric_model[i])
                        }
                    }
                }

                Module = value.module
                if (IsAlg == true){

                    GenerateDsl.addComponents(TargetName,{
                        input:{
                            data:{
                                train_data:NewTrainData,
                                validate_data:NewValidateData
                            },
                            model:Model,
                            isometric_model:MetricModel
                        },
                        module:Module,
                        output:{
                            data:["data"],
                            model:["model"]
                        }
                    })
                }
                else{
                    // if (NewData.length == 0){
                    //     ReWriteNone(TargetName,Module)
                    // }
                    // else{
                    //     ReWriteData(TargetName,NewData,Module)
                    // }
                    GenerateDsl.addComponents(TargetName,{
                        input:{
                            data:{
                                data:NewData
                            },
                            model:Model,
                            isometric_model:MetricModel
                        },
                        module:Module,
                        output:{
                            data:["data"],
                            model:["model"]
                        }
                    })
                }
            }
        }
    }

    console.log(GenerateDsl.getData())
}

//判断组件是否为算法组件
function JudgeIsAlgorithm(componentId){
    let parentId = getComponentParentIdById(componentId)
    if (parentId == 4){
        return true
    }
    else{
        return false
    }
}

//根据节点id获取componentId
function getComponentIdById(Id){
    let nodes = model.getData().nodes
    let ComponentId
    for (let i=0;i<nodes.length;i++){
        if (Id == nodes[i].id){
            ComponentId = nodes[i].data.componentId
        }
    }
    return ComponentId
}

//修改input中的model
function addDslInputModel(TargetName,ModelName,ModelType,IsAlg){
    let OldData = GenerateDsl.getData()
    let NewModel = []
    let NewMetricModel = []
    let Data=[]
    let TrainData = []
    let ValidateData = []
    let Module = ''

    for (let [key,value] of OldData){
        if (TargetName == key){
            let tmpValue = value.input
            console.log(tmpValue)
            Module = value.module
            // console.log(Object.keys(tmpValue.data).length)
            //model的数据
            if (Object.keys(tmpValue.model).length != 0){

                for (let i in tmpValue.model){
                    console.log(tmpValue.model[i])
                    NewModel.push(tmpValue.model[i])
                }
            }
            if (Object.keys(tmpValue.isometric_model).length != 0){
                for (let i in tmpValue.isometric_model){
                    console.log(tmpValue.isometric_model[i])
                    NewMetricModel.push(tmpValue.isometric_model[i])
                }
            }


            //data的数据
            if (Object.keys(tmpValue.data).length != 0){
                if (IsAlg == false){
                    if (Object.keys(tmpValue.data.data).length !=0){
                        for (let i in tmpValue.data.data){
                            Data.push(tmpValue.data.data[i])
                        }
                    }
                }
                else{
                    if (Object.keys(tmpValue.data.train_data).length !=0){
                        for (let i in tmpValue.data.train_data){
                            TrainData.push(tmpValue.data.train_data[i])
                        }
                    }
                    if (Object.keys(tmpValue.data.train_data).length !=0){
                        for (let i in tmpValue.data.validate_data){
                            ValidateData.push(tmpValue.data.validate_data[i])
                        }
                    }
                }
            }

            //写数据
            if (ModelType == 0){
                NewModel.push(ModelName)
                console.log(NewModel)
                GenerateDsl.addComponents(TargetName,{
                    input:{
                        data:{
                            data:Data,
                            train_data:TrainData,
                            validate_data:ValidateData
                        },
                        model:NewModel,
                        isometric_model:NewMetricModel
                    },
                    module:Module,
                    output:{
                        data:["data"],
                        model:["model"]
                    }
                })
            }
            else{
                NewMetricModel.push(ModelName)
                console.log(NewMetricModel)
                GenerateDsl.addComponents(TargetName,{
                    input:{
                        data:{
                            data:Data,
                            train_data:TrainData,
                            validate_data:ValidateData
                        },
                        model:NewModel,
                        isometric_model:NewMetricModel
                    },
                    module:Module,
                    output:{
                        data:["data"],
                        model:["model"]
                    }
                })
            }

        }
    }
    console.log(dslDataStruct.getData())
}


//设置inputData
function setInputData(targetId,targetEndpointType,sourceId){
    //InputType对应输入数据的类型，0--data  1--train_data  2--validation_data
    //ModelType对应输入模型的类型，0--model  1--isometric_model
    //具体节点的名字，比如dataio_1
    let {SourceName,TargetName,TargetId, SourceId} = getInputDataByEndpointId(sourceId,targetId)
    console.log(SourceName)

    let IsAlg = JudgeIsAlgorithm(getComponentIdById(TargetId))
    //source和target的组件id
    let SourceComponentId = getComponentIdById(SourceId)
    let TargetComponentId = getComponentIdById(TargetId)
    console.log(targetEndpointType)

    let DataName,ModelName
    //数据连线需要判断组件是否是算法组件
    DataName = SourceName+".data"
    ModelName = SourceName +".model"
    if (IsAlg == true){
        if (targetEndpointType == "数据输入"){
            addDslInputData(TargetName,DataName,1)
        }else if(targetEndpointType == "验证数据"){
            addDslInputData(TargetName,DataName,2)
        }
    }
    else{
        if (targetEndpointType == "数据输入"){
            addDslInputData(TargetName,DataName,0)
        }
    }

    //模型连线需要判断source和target是相同类型组件还是不同类型组件
    if (targetEndpointType == "模型输入"){
        if (SourceComponentId == TargetComponentId){
            addDslInputModel(TargetName,ModelName,0,IsAlg)
            // console.log(111)
        }else{
            addDslInputModel(TargetName,ModelName,1,IsAlg)
        }
    }

}



export default {
    setNodeName,
    getModuleById,
    getInputDataByEndpointId,
    JudgeInputType,
    JudgeOutputType,
    setInputData,
    ReInitNum,
    DelInputData
}
