<template>
    <div class="container">
        <p style="margin: 10px 0 0 55px;font-weight: bold;font-size: 15px">Fate算子</p>
        <el-tree :data="nodeData"
             node-key="labelEng"
             :default-expanded-keys="defaultExpandedKeys"
             icon-class="el-icon-arrow-right"
             :render-content="renderContentFunction"
             :filter-node-method="filterNode"
             ref="tree"
             :props="defaultProps"></el-tree>
        <div style="height: 20px"></div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { GetModelComponentsTreeData } from '@/services/api/model-console'
import { getDefaultExpandedKeys } from '../bussiness/argoComponents'
import { setComponentList } from '../bussiness/componentList'
export default {
    name: 'ModelOperators',
    data () {
        return {
            nodeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            defaultExpandedKeys: []
        }
    },
    methods: {
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
        async getComponentsData () {
            let { data } = await GetModelComponentsTreeData()

            if (data && data.code === 200) {
                console.log('components data: ',data.data)
                this.nodeData = cloneDeep(data.data)
                this.getDefaultExpandedKeys()
            }
        },
        getDefaultExpandedKeys () {
            this.defaultExpandedKeys = getDefaultExpandedKeys(this.nodeData)
        }
    },

    created () {
            this.getComponentsData()
    }
}
</script>

<style lang="less" scoped>
.container {
    margin-left: -6px;
    padding-right: 10px;
    /deep/ .el-tree-node__content {
        height: 38px !important;
    }
}

</style>
