const connectorPaintStyle = {
    strokeWidth: 2,
    stroke: '#b4bdc5',
    joinstyle: 'round',
    outlineStroke: 'transparent',
    outlineWidth: 2
}

const connectorHoverStyle = {
    // strokeWidth: 2,
    stroke: '#216477'
}
const endpointHoverStyle = {
    stroke: '#289de9',
    fill: '#289de9'
}

export const targetEndpoint = {
    cssClass: 'targetPoint',
    isTarget: true,
    endpoint: 'Dot',
    paintStyle: {
        stroke: '#289de9',
        fill: '#FFF',
        radius: 4,
        strokeWidth: 2
    },
    maxConnections: 2,
    dropOptions: { hoverClass: 'hover', activeClass: 'active' }
}

export const sourceEndpoint = {
    cssClass: 'sourcePoint',
    isSource: true,
    endpoint: 'Dot',
    maxConnections: 2,
    paintStyle: {
        stroke: '#289de9',
        fill: '#FFF',
        radius: 4,
        strokeWidth: 2
    },
    connector: ['Bezier',
        {
            curviness: 70,
            stub: [40, 60],
            gap: 8,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }
    ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle,
    dragOptions: {}
}

//特殊端点
//数据读取

//dataOutput
export const ReaderDataOutput = {
    cssClass: 'sourcePoint',
    isSource: true,
    endpoint: 'Dot',
    maxConnections: 1,
    paintStyle: {
        stroke: '#289de9',
        fill: '#FFF',
        radius: 4,
        strokeWidth: 2
    },
    connector: ['Bezier',
        {
            curviness: 70,
            stub: [40, 60],
            gap: 8,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }
    ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle,
    dragOptions: {}
}

//modelOutput
// export const ReaderModelOutput = {
//     cssClass: 'sourcePoint',
//     isSource: true,
//     endpoint: 'Dot',
//     maxConnections: 0,
//     paintStyle: {
//         stroke: '#289de9',
//         fill: '#FFF',
//         radius: 4,
//         strokeWidth: 2
//     },
//     connector: ['Bezier',
//         {
//             curviness: 70,
//             stub: [40, 60],
//             gap: 8,
//             cornerRadius: 5,
//             alwaysRespectStubs: true
//         }
//     ],
//     connectorStyle: connectorPaintStyle,
//     hoverPaintStyle: endpointHoverStyle,
//     connectorHoverStyle,
//     dragOptions: {}
// }

//数据存储
// modelOutput
export const DataIOModelOutput = {
    cssClass: 'sourcePoint',
    isSource: true,
    endpoint: 'Dot',
    maxConnections: 1,
    paintStyle: {
        stroke: '#289de9',
        fill: '#FFF',
        radius: 4,
        strokeWidth: 2
    },
    connector: ['Bezier',
        {
            curviness: 70,
            stub: [40, 60],
            gap: 8,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }
    ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle,
    dragOptions: {}
}

//模型评估 evaluation
//dataOutput  modelOutput
export const EvaluationOutput = {
    cssClass: 'sourcePoint',
    isSource: true,
    endpoint: 'Dot',
    maxConnections: 0,
    paintStyle: {
        stroke: '#289de9',
        fill: '#FFF',
        radius: 4,
        strokeWidth: 2
    },
    connector: ['Bezier',
        {
            curviness: 70,
            stub: [40, 60],
            gap: 8,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }
    ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle,
    dragOptions: {}
}


