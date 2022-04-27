export const componentConfig = [
    // 1.数据读取组件
    {
        name: 'hdfs_reader',
        componentName: 'hdfs-reader',
        nodeComponentType: 'Reader',
        label: '存储引擎数据读取',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'engine_input',
        componentName: 'engine-input',
        nodeComponentType: 'DataIO',
        label: '模型引擎数据输入',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },

    // 2.隐私安全组件
    {
        name: 'psi_intersection',
        componentName: 'psi-intersection',
        nodeComponentType: 'Intersection',
        label: 'PSI求交',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },

    // 3.数据预处理组件
    {
        name: 'process_scale',
        componentName: 'process-scale',
        nodeComponentType: 'FeatureScale',
        label: '特征放缩处理组件',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'column_expand',
        componentName: 'column-expand',
        nodeComponentType: 'ColumnExpand',
        label: '列扩展组件',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'homo_data_split',
        componentName: 'homo-data-split',
        nodeComponentType: 'HomoDataSplit',
        label: '横向数据分割',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_data_split',
        componentName: 'hetero-data-split',
        nodeComponentType: 'HeteroDataSplit',
        label: '纵向数据分割',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_feature_binning',
        componentName: 'hetero-feature-binning',
        nodeComponentType: 'HeteroFeatureBinning',
        label: '纵向特征分箱',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_feature_selection',
        componentName: 'hetero-feature-selection',
        nodeComponentType: 'HeteroFeatureSelection',
        label: '纵向特征选择',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },

    {
        name: 'hetero_pearson',
        componentName: 'hetero-pearson',
        nodeComponentType: 'HeteroPearson',
        label: '纵向皮尔森系数',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },

    // 4.联邦学习算法组件
    {
        name: 'hetero_layer_xgboost',
        componentName: 'hetero-layer-xgboost',
        nodeComponentType: 'HeteroFastSecureBoost',
        label: '纵向SBT层次模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
    },
    {
        name: 'hetero_logistic_regression',
        componentName: 'hetero-logistic-regression',
        nodeComponentType: 'HeteroLR',
        label: '纵向逻辑斯谛回归模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
    },
    {
        name: 'hetero_fast_secureboost',
        componentName: 'hetero-fast-secureboost',
        nodeComponentType: 'HeteroFastSecureBoost',
        label: '纵向SBT混合模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_linR',
        componentName: 'hetero-linR',
        nodeComponentType: 'HeteroLinR',
        label: '纵向线性模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_LR',
        componentName: 'hetero-LR',
        nodeComponentType: 'HeteroLR',
        label: '纵向逻辑回归模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_nn',
        componentName: 'hetero-nn',
        nodeComponentType: 'HeteroNN',
        label: '纵向神经网络',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_secureboost',
        componentName: 'hetero-secureboost',
        nodeComponentType: 'HeteroSecureBoost',
        label: '纵向Xgboost',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'scorecard',
        componentName: 'scorecard',
        nodeComponentType: 'Scorecard',
        label: '评分卡',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'homo_secureboost',
        componentName: 'homo-secureboost',
        nodeComponentType: 'HomoSecureboost',
        label: '横向Xgboost',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    },
    {
        name: 'hetero_poisson_regression',
        componentName: 'hetero-poisson-regression',
        nodeComponentType: 'HeteroPoisson',
        label: '纵向泊松回归模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
},
    {
        name: 'hetero_kmeans',
        componentName: 'hetero-kmeans',
        nodeComponentType: 'HeteroKmeans',
        label: '纵向Kmeans模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
    },
    {
        name: 'homo_logistic_regression',
        componentName: 'homo-logistic-regression',
        nodeComponentType: 'HomoLR',
        label: '横向逻辑斯谛回归模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
    },
    {
        name: 'homo_deep_nn',
        componentName: 'homo-deep-nn',
        nodeComponentType: 'HomoNN',
        label: '横向DNN模型',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '验证数据', '模型输入']
    },

    // 5.模型评估组件
    {
        name: 'model_eval',
        componentName: 'model-eval',
        nodeComponentType: 'Evaluation',
        label: '模型评估',
        sourceEndpoints: ['数据输出', '模型输出'],
        targetEndpoints: ['数据输入', '模型输入']
    }
]
