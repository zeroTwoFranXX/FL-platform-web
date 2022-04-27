import { cloneDeep } from 'lodash'

const defaultData = {
    nodes: [],
    endpoints: [],
    edges: [],
    head: ''
}
let FlowChartJson = cloneDeep(defaultData)

const isValidData = (data) => {
    if (data === null || typeof data !== 'object') return false
    if (!Array.isArray(data.nodes)) return false
    if (!Array.isArray(data.endpoints)) return false
    if (!Array.isArray(data.edges)) return false
    return true
}
export default {
    initData () {
        FlowChartJson = cloneDeep(defaultData)
    },
    getData () {
        return cloneDeep(FlowChartJson)
    },

    setData (data) {
        if (isValidData(data)) {
            FlowChartJson = cloneDeep(data)
            // console.log("FlowChartJson: ",FlowChartJson)
        }
    },

    getEndpoints () {
        return FlowChartJson.endpoints
    },

    addNode (nodeData) {
        FlowChartJson.nodes.push(nodeData)
    },

    removeNodeByNodeId (nodeId) {
        FlowChartJson.nodes = FlowChartJson.nodes.filter(node => node.id !== nodeId)
    },

    getNodeDataByNodeId (nodeId) {
        return FlowChartJson.nodes.find(n => n.id === nodeId)
    },

    addEdge (edge) {
        FlowChartJson.edges.push(edge)
    },

    removeEdge (edge) {
        FlowChartJson.edges = FlowChartJson.edges.filter(item => item !== edge)
    },

    getEdgesByPointIds (ids) {
        const data = []
        FlowChartJson.edges.forEach((edge) => {
            ids.forEach((id) => {
                if (edge.indexOf(id) > -1) {
                    data.push(edge)
                }
            })
        })
        return data
    },

    removeEdgesByPointIds (ids) {
        ids.forEach((id) => {
            FlowChartJson.edges = FlowChartJson.edges.filter(edge => edge.indexOf(id) === -1)
        })
    },

    addEndpoint (point) {
        FlowChartJson.endpoints.push(point)
    },

    getEndpointsByPointIds (ids) {
        return [...FlowChartJson.endpoints.filter((point) => {
            return ids.indexOf(point.id) > -1
        })]
    },

    removeEndpointsByPointIds (ids) {
        ids.forEach((id) => {
            //filter创建满足条件的新数组
            FlowChartJson.endpoints = FlowChartJson.endpoints.filter(point => point.id !== id)
        })
    },

    changeNodePos (nodeId, newPosition) {
        const node = FlowChartJson.nodes.find(n => n.id === nodeId)
        node.position = newPosition
    },

    changeNodeValue (nodeId, value) {
        const node = FlowChartJson.nodes.find(n => n.id === nodeId)
        node.data.value = value
    },

    getHead () {
        return FlowChartJson.head
    }
}
