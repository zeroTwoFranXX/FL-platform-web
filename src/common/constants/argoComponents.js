/**
 * 模型算子区算法列表
 * type: 类型，category 表示某类组件，component 表示某一组件;
 * name: 名称 保证唯一性，不会重复
 */

const algoComponents = [
    {
        type: 'category',
        name: 'datasource-config',
        label: '数据源配置',
        children: [
            {
                type: 'component',
                id: 'Reader',
                name: 'Reader',
                label: '存储引擎数据读取'
            },
            {
                type: 'component',
                id: 'DataIO',
                name: 'DataIO',
                label: '模型引擎数据输入'
            }
        ]
    },
    {
        type: 'category',
        name: 'federated-learning',
        label: '联邦学习算法',
        children: [
            {
                type: 'component',
                name: 'Intersection',
                id: 'Intersection',
                label: 'PSI求交'
            },
            {
                type: 'component',
                name: 'HeteroFastSecureBoost',
                id: 'HeteroFastSecureBoost',
                label: '纵向Xgboost层次模型'
            }
        ]
    },
    {
        type: 'category',
        name: 'evaluation',
        label: '评估组件',
        children: [
            {
                type: 'component',
                name: 'Evaluation',
                id: 'Evaluation',
                label: '模型评估'
            }
        ]
    }
]

export default algoComponents
