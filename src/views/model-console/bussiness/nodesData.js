import { getComponentTypeById, getComponentVueNameById } from '@/views/model-console/bussiness/componentList'

// nodesData
// key: nodeId
// value：{ componentType, componentName }
const nodesData = new Map()

export const setData = (nodeId, data) => {
    nodesData.set(nodeId, data)
    // console.log(nodesData)
}

export const getData = (nodeId) => {
    nodesData.get(nodeId)
}

export const newNodeData = (componentId) => {
    return {
        componentType: getComponentTypeById(componentId),
        vueName: getComponentVueNameById(componentId),
        value: {}
    }
}

export const getComponentTypeByNodeId = (nodeId) => {
    let node = nodesData.get(nodeId) || {}
    return node.componentType
}

export const getVueNameByNodeId = (nodeId) => {
    let node = nodesData.get(nodeId) || {}
    return node.vueName
}
