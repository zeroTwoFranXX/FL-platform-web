<template>
    <div class="FedML_container">
        <p style="margin: 10px 0 0 55px;font-weight: bold;font-size: 15px">FedML算子</p>
<!--        <p style="margin: 50px 10px 10px 50px;font-weight: bold">数据预处理文件</p>-->
<!--        <el-upload-->
<!--            class="upload-demo"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :on-error="ErrorFile"-->
<!--            :on-success="SuccessFile"-->
<!--            :auto-upload="true">-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--        </el-upload>-->


        <el-tree
            :data="nodeData"
            node-key="labelEng"
            :default-expanded-keys="defaultExpandedKeys"
            icon-class="el-icon-arrow-right"
            :render-content="renderContentFunction"
            :filter-node-method="filterNode"
            ref="tree"
            :props="defaultProps">

        </el-tree>
        <div style="height: 20px"></div>
    </div>
</template>


<script>
import {Message} from "element-ui";
export default {
    name: "FedMLOperators",
    data(){
        return{
            nodeData:[
                {
                    labelZh:'数据读取组件',
                    labelEng:'data_reader',
                    nodeId:100,
                    nodeLevel:1,
                    children:[
                        {
                            nodeId:101,
                            nodeLevel:2,
                            labelZh:'存储引擎数据读取',
                            labelEng:'Reader'
                        }
                    ]
                },
                {
                    labelZh:'纵向联邦学习算法组件',
                    labelEng:'hetero_fl_algorithm',
                    nodeId:200,
                    nodeLevel:1,
                    children:[
                        {
                            nodeId:2,
                            nodeLevel:2,
                            labelZh:'纵向逻辑斯谛回归模型',
                            labelEng:'HeteroLogisticRegression'
                        }
                    ]
                },
                {
                    labelZh:'横向联邦学习算法组件',
                    labelEng:'homo_fl_algorithm',
                    nodeId:300,
                    nodeLevel:1,
                    children:[
                        {
                            nodeId:1,
                            nodeLevel:2,
                            labelZh:'横向逻辑斯谛回归模型',
                            labelEng:'HomoLogisticRegression'
                        },
                        {
                            nodeId:3,
                            nodeLevel:2,
                            labelZh:'VGG11模型',
                            labelEng:'vgg11'
                        },
                        {
                            nodeId:4,
                            nodeLevel:2,
                            labelZh:'VGG11-bn模型',
                            labelEng:'vgg11-bn'
                        },
                        {
                            nodeId:5,
                            nodeLevel:2,
                            labelZh:'VGG13模型',
                            labelEng:'vgg13'
                        },
                        {
                            nodeId:6,
                            nodeLevel:2,
                            labelZh:'VGG13-bn模型',
                            labelEng:'vgg13-bn'
                        },
                        {
                            nodeId:7,
                            nodeLevel:2,
                            labelZh:'VGG16模型',
                            labelEng:'vgg16'
                        },
                        {
                            nodeId:8,
                            nodeLevel:2,
                            labelZh:'VGG16-bn模型',
                            labelEng:'vgg16-bn'
                        },
                        {
                            nodeId:9,
                            nodeLevel:2,
                            labelZh:'VGG19模型',
                            labelEng:'vgg19'
                        },
                        {
                            nodeId:10,
                            nodeLevel:2,
                            labelZh:'VGG19-bn模型',
                            labelEng:'vgg19-bn'
                        },
                        {
                            nodeId:11,
                            nodeLevel:2,
                            labelZh:'残差神经网络56层模型',
                            labelEng:'resnet56'
                        },
                        {
                            nodeId:12,
                            nodeLevel:2,
                            labelZh:'残差神经网络110层模型',
                            labelEng:'resnet110'
                        },
                        {
                            nodeId:13,
                            nodeLevel:2,
                            labelZh:'卷积神经网络',
                            labelEng:'cnn'
                        },
                    ]

                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            defaultExpandedKeys: ['lr','cnn','nlp']
        }
    },
    methods:{
        SuccessFile(response,file,fileList){
            console.log('Success')
            console.log('filename: ',file.name)
            console.log('filetext:',file.raw)
            Message.success('文件上传成功')
        },
        ErrorFile(err,file,fileList){
            console.log(err)
            Message.error('文件上传失败')
        },
        renderContentFunction (h, { node, data }) {
            return h('div', {
                class: { leafNode: !data.children },
                style: {
                    height: '38px',
                    lineHeight: '38px',
                    fontSize: '12px',
                    color: '#1b1c23'
                }
            }, [
                h('span', {    //框
                    attrs: {
                        draggable: data.nodeLevel === 2,  //第二层元素可以被拖拽
                        name: data.labelEng,
                        id: data.nodeId
                    },
                    on: {
                        dragstart: this.dragHandle    //拖拽形式为单击后拖拽
                    },
                    class: 'node',
                    style: {
                        display: 'inline-block',
                        marginTop: '4px',
                        height: '34px',
                        lineHeight: '32px',
                        width: '140px',
                        borderRadius: '4px',
                        position: 'relative',
                        outline: 'none',
                        border: data.nodeLevel === 2 ? '1px solid #289de9' : 'none'
                    }
                }, [
                    h('span', {    //内容
                        class: 'operator',
                        style: {
                            fontWeight: data.nodeLevel === 1 ? 'bold' : 'normal',
                            fontSize: '13px',
                            marginLeft: '4px',
                            color: '#515a6e'
                        }
                    }, data.labelZh)
                ])

            ])
        },
        filterNode (value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        dragHandle (event) {  //设置拖拽数据
            event.dataTransfer.setData('target', event.target.id)
        },
    }
}
</script>

<style scoped>
.FedML_container {
    margin-left: -6px;
    padding-right: 10px;
    width: 200px;

}
.FedML_container /deep/ .el-tree-node__content{
    height: 38px;
}
.upload-demo{
    margin-left: 55px;
    margin-bottom: 50px;
    margin-top: 20px;
}
</style>
