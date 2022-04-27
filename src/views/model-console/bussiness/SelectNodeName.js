//对于其他三个引擎，直接静态寻找选定节点的vue_name
import EngineType from "@/views/model-console/bussiness/EngineType";

const FedMLComponent = [
    {
        nodeId:101,
        componentName:'reader',
        label:'存储引擎数据读取'
    },
    {
        nodeId:2,
        componentName:'HeteroLogisticRegression',
        label:'纵向逻辑斯谛回归模型'
    },
    {
        nodeId:1,
        componentName:'HomoLogisticRegression',
        label:'横向逻辑斯谛回归模型'
    },
    {
        nodeId:3,
        componentName:'vgg11',
        label:'VGG11模型'
    },
    {
        nodeId:4,
        componentName:'vgg11-bn',
        label:'VGG11-bn模型'
    },
    {
        nodeId:5,
        componentName:'vgg13',
        label:'VGG13模型'
    },
    {
        nodeId:6,
        componentName:'vgg13-bn',
        label:'VGG13-bn模型'
    },
    {
        nodeId:7,
        componentName:'vgg16',
        label:'VGG16模型'
    },
    {
        nodeId:8,
        componentName:'vgg16-bn',
        label:'VGG16-bn模型'
    },
    {
        nodeId:9,
        componentName:'vgg19',
        label:'VGG19模型'
    },
    {
        nodeId:10,
        componentName:'VGG19-bn模型',
        label:'vgg19-bn'
    },
    {
        nodeId:11,
        componentName:'resnet56',
        label:'参差神经网络56层模型'
    },
    {
        nodeId:12,
        componentName:'resnet110',
        label:'参差神经网络56层模型'
    },
    {
        nodeId:13,
        componentName:'cnn',
        label:'卷积神经网络'
    }


]

const paddlepaddleComponent = [
    {
        nodeId:2,
        componentName:'lr',
        label:'LR线性逻辑回归模型'
    },
    {
        nodeId:3,
        componentName:'cnn',
        label:'CNN卷积神经网络模型'
    },
    {
        nodeId:4,
        componentName:'nlp',
        label:'NLP自然语言处理模型'
    }
]
const pysyftComponent = [
    {
        nodeId:2,
        componentName:'lr',
        label:'LR线性逻辑回归模型'
    },
    {
        nodeId:3,
        componentName:'cnn',
        label:'CNN卷积神经网络模型'
    },
    {
        nodeId:4,
        componentName:'nlp',
        label:'NLP自然语言处理模型'
    }
]

function getVueName(nodeId){
    if (EngineType.getEngine() == 'FedML'){
        for (let i=0;i<FedMLComponent.length;i++){
            if (nodeId == FedMLComponent[i].nodeId){

                return FedMLComponent[i].componentName
            }
        }
    }
    else if (EngineType.getEngine() == 'paddlepaddle'){
        for (let i=0;i<paddlepaddleComponent.length;i++){
            if (nodeId == paddlepaddleComponent[i].nodeId){
                return paddlepaddleComponent[i].componentName
            }
        }
    }
    else if (EngineType.getEngine() == 'pysyft'){
        for (let i=0;i<pysyftComponent.length;i++){
            if (nodeId == pysyftComponent[i].nodeId){
                return pysyftComponent[i].componentName
            }
        }
    }
}

export default {
    getVueName
}
