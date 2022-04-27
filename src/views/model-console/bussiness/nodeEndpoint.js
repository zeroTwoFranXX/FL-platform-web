import { componentConfig } from '@/views/model-console/bussiness/componentConfig'
import { getComponentNameByNodeId } from '@/views/model-console/bussiness/componentList'
import { cloneDeep } from 'lodash'
import { createUuid } from '../FlowChart/Utils'
/**
 * @description 根据 action
 * @param {*} nodeId 算子区组件算子组件的id
 */
export const getEndpoints = (nodeId) => {
    let name = getComponentNameByNodeId(nodeId)
    // console.log('getEndpoints', nodeId, name)
    let component = componentConfig.find(c => c.name === name)
    let target = cloneDeep(component.targetEndpoints)
    let source = cloneDeep(component.sourceEndpoints)

    let targetEndpoints = target.map(name => ({
        id: `target_${createUuid()}`, data: { value: name }
    }))
    let sourceEndpoints = source.map(name => ({
        id: `source_${createUuid()}`, data: { value: name }
    }))
    return {
        targetEndpoints,
        sourceEndpoints
    }
}
