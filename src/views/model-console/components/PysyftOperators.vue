<template>
    <div class="pysyftContainer">
        <p style="margin: 10px 0 0 55px;font-weight: bold;font-size: 15px">pysyft算子</p>
        <div class="middle"></div>
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
    </div>
</template>

<script>
export default {
    name: "PysyftOperators",
    data(){
        return{
            nodeData:[{
                labelZh:'联邦学习算法组件',
                labelEng:'fl_algorithm',
                nodeId:1,
                nodeLevel:1,
                children:[
                    {
                        nodeId:2,
                        nodeLevel:2,
                        labelZh:'LR线性逻辑回归模型',
                        labelEng:'lr'
                    },
                    {
                        nodeId:3,
                        nodeLevel:2,
                        labelZh:'CNN卷积神经网络模型',
                        labelEng:'cnn'
                    },
                    {
                        nodeId:4,
                        nodeLevel:2,
                        labelZh:'NLP自然语言处理模型',
                        labelEng:'nlp'
                    }
                ]

            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            defaultExpandedKeys: ['lr','cnn','nlp']
        }
    },
    methods:{
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
.pysyftContainer {
    margin-left: -6px;
    padding-right: 10px;
    width: 200px;

}
.pysyftContainer /deep/ .el-tree-node__content{
    height: 38px;
}
.middle{
    margin-left: 55px;
    margin-bottom: 50px;
    margin-top: 20px;
}
</style>
