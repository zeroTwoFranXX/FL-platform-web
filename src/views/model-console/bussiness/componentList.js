import { cloneDeep } from 'lodash'
// 用来保存扁平化的树状列表
let componentsList = []

// 将算子组件树状结构树状数据扁平化为树状
export const setComponentList = (treeData) => {
    if (!treeData) return
    if (!Array.isArray(treeData)) return
    componentsList = []
    treeData.forEach(item => {
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                componentsList.push(cloneDeep(child))
                componentsList.forEach(component => {
                    component.name = component.labelEng
                    component.type = component.nodeComponentType
                    component.vueName = component.labelEng.split('_').join('-')
                })
            })
        }
    })
}

// 获取算子区组件列表
export const getComponentList = () => {
    return cloneDeep(componentsList)
}

// 根据 componentId id 获取 node 的 name
export const getComponentNameByNodeId = (nodeId) => {
    nodeId = parseInt(nodeId)
    let target = componentsList.find(component => component.nodeId === nodeId) || {}
    return target.name
}

// get component's componentType by component‘s nodeId
export const getComponentTypeById = (id) => {
    id = parseInt(id)
    let target = componentsList.find(component => component.nodeId === id) || {}
    return target.nodeComponentType
}

export const getComponentVueNameById = (id) => {
    id = parseInt(id)
    let target = componentsList.find(component => component.nodeId === id) || { vueName: '' }
    return target.vueName
}

//根据组件id获取父级id
export const getComponentParentIdById = (id) =>{
    id = parseInt(id)
    let target = componentsList.find(component => component.nodeId === id) || {}
    return target.parentId
}
