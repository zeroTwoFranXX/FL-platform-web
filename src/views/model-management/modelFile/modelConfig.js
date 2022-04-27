import { cloneDeep } from 'lodash'
// eslint-disable-next-line camelcase
import column_expand from './01column_expand/index'
// eslint-disable-next-line camelcase
import homo_data_split from './02homo_data_split/index'
// eslint-disable-next-line camelcase
import hetero_data_split from './03hetero_data_split/index'
// eslint-disable-next-line camelcase
import test_homo_dnn_multi_layer from './04test_homo_dnn_multi_layer/index'
// eslint-disable-next-line camelcase
import fast_sbt_mix from './05fast_sbt_mix/index'
// eslint-disable-next-line camelcase
import hetero_binning_asymmetric from './06hetero_binning_asymmetric/index'
// eslint-disable-next-line camelcase
import hetero_binning_bucket_binning from './07hetero_binning_bucket_binning/index'
// eslint-disable-next-line camelcase
import hetero_binning_category_binning from './08hetero_binning_category_binning/index'
// eslint-disable-next-line camelcase
import hetero_binning_optim_chi_square from './09hetero_binning_optim_chi_square/index'
// eslint-disable-next-line camelcase
import hetero_binning_optim_gini from './10hetero_binning_optim_gini'
// eslint-disable-next-line camelcase
import hetero_binning_optim_iv from './11hetero_binning_optim_iv/index'
// eslint-disable-next-line camelcase
import hetero_binning_optim_ks from './12hetero_binning_optim_ks/index'
// eslint-disable-next-line camelcase
import hetero_binning_sparse_optimal_gini from './13hetero_binning_sparse_optimal_gini/index'
// eslint-disable-next-line camelcase
import hetero_binning_woe_binning from './14hetero_binning_woe_binning/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_fast_sbt from './15hetero_feature_selection_fast_sbt/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_iv_selection from './16hetero_feature_selection_iv_selection/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_iv_top_k from './17hetero_feature_selection_iv_top_k/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_manually from './18hetero_feature_selection_manually/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_percentage_value from './19hetero_feature_selection_percentage_value/index'
// eslint-disable-next-line camelcase
import hetero_feature_selection_select_col_names from './20hetero_feature_selection_select_col_names/index'
// eslint-disable-next-line camelcase
import test_hetero_kmeans from './21test_hetero_kmeans'
// eslint-disable-next-line camelcase
import test_hetero_linr_train_job from './22test_hetero_linr_train_job'
// eslint-disable-next-line camelcase
import hetero_lr_normal from './23hetero_lr_normal'
// eslint-disable-next-line camelcase
import test_hetero_nn_binary from './24test_hetero_nn_binary'
// eslint-disable-next-line camelcase
import test_hetero_pearson_default from './25test_hetero_pearson_default'
// eslint-disable-next-line camelcase
import test_hetero_poisson from './26test_hetero_poisson'
// eslint-disable-next-line camelcase
import test_secureboost_train_regression from './27test_secureboost_train_regression'
import scorecard from './28scorecard'
// eslint-disable-next-line camelcase
import homo_lr_normal from './29homo_lr_normal'
// eslint-disable-next-line camelcase
import test_secureboost_train_binary from './30test_secureboost_train_binary'
// eslint-disable-next-line camelcase
import test_intersect_job_rsa from './31test_intersect_job_rsa'
// eslint-disable-next-line camelcase
import test_intersect_job_raw from './32test_intersect_job_raw'
// eslint-disable-next-line camelcase
import test_fast_sbt_layer from './33test_fast_sbt_layer'
const modelFileList = [
    {
        name: 'column_expand',
        label: '01column_expand',
        // eslint-disable-next-line camelcase
        ...column_expand
    },
    {
        name: 'homo_data_split',
        label: '02homo_data_split',
        // eslint-disable-next-line camelcase
        ...homo_data_split
    },
    {
        name: 'hetero_data_split',
        label: '03hetero_data_split',
        // eslint-disable-next-line camelcase
        ...hetero_data_split
    },
    {
        name: 'test_homo_dnn_multi_layer',
        label: '04test_homo_dnn_multi_layer',
        // eslint-disable-next-line camelcase
        ...test_homo_dnn_multi_layer
    },
    {
        name: 'fast_sbt_mix',
        label: '05fast_sbt_mix',
        // eslint-disable-next-line camelcase
        ...fast_sbt_mix
    },
    {
        name: 'hetero_binning_asymmetric',
        label: '06hetero_binning_asymmetric',
        // eslint-disable-next-line camelcase
        ...hetero_binning_asymmetric
    },
    {
        name: 'hetero_binning_bucket_binning',
        label: '07hetero_binning_bucket_binning',
        // eslint-disable-next-line camelcase
        ...hetero_binning_bucket_binning
    },
    {
        name: 'hetero_binning_category_binning',
        label: '08hetero_binning_category_binning',
        // eslint-disable-next-line camelcase
        ...hetero_binning_category_binning
    },
    {
        name: 'hetero_binning_optimal_chi_square',
        label: '09hetero_binning_optimal_chi_square',
        // eslint-disable-next-line camelcase
        ...hetero_binning_optim_chi_square
    },
    {
        name: 'hetero_binning_optim_gini',
        label: '10hetero_binning_optim_gini',
        // eslint-disable-next-line camelcase
        ...hetero_binning_optim_gini
    },
    {
        name: 'hetero_binning_optim_chi_square',
        label: '11hetero_binning_optim_chi_square',
        // eslint-disable-next-line camelcase
        ...hetero_binning_optim_chi_square
    },
    {
        name: 'hetero_binning_optim_iv',
        label: '12hetero_binning_optim_iv',
        // eslint-disable-next-line camelcase
        ...hetero_binning_optim_iv
    },
    {
        name: 'hetero_binning_optim_ks',
        label: '12hetero_binning_optim_ks',
        // eslint-disable-next-line camelcase
        ...hetero_binning_optim_ks
    },
    {
        name: 'hetero_binning_sparse_optimal_gini',
        label: '13hetero_binning_sparse_optimal_gini',
        // eslint-disable-next-line camelcase
        ...hetero_binning_sparse_optimal_gini
    },
    {
        name: 'hetero_binning_woe_binning',
        label: '14hetero_binning_woe_binning',
        // eslint-disable-next-line camelcase
        ...hetero_binning_woe_binning
    },
    {
        name: 'hetero_feature_selection_fast_sbt',
        label: '15hetero_feature_selection_fast_sbt',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_fast_sbt
    },
    // TODO：修改
    {
        name: 'hetero_feature_selection_iv_selection',
        label: '16hetero_feature_selection_iv_selection',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_iv_selection
    },
    {
        name: 'hetero_feature_selection_iv_top_k',
        label: '17hetero_feature_selection_iv_top_k',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_iv_top_k
    },
    {
        name: 'hetero_feature_selection_manually',
        label: '18hetero_feature_selection_manually',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_manually
    },
    {
        name: 'hetero_feature_selection_percentage_value',
        label: '19hetero_feature_selection_percentage_value',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_percentage_value
    },
    {
        name: 'hetero_feature_selection_select_col_names',
        label: '20hetero_feature_selection_select_col_names',
        // eslint-disable-next-line camelcase
        ...hetero_feature_selection_select_col_names
    },
    {
        name: 'test_hetero_kmeans',
        label: '21test_hetero_kmeans',
        // eslint-disable-next-line camelcase
        ...test_hetero_kmeans
    },
    {
        name: 'test_hetero_linr_train_job',
        label: '22test_hetero_linr_train_job',
        // eslint-disable-next-line camelcase
        ...test_hetero_linr_train_job
    },
    {
        name: 'hetero_lr_normal',
        label: '23hetero_lr_normal',
        // eslint-disable-next-line camelcase
        ...hetero_lr_normal
    },
    {
        name: 'test_hetero_nn_binary',
        label: '24test_hetero_nn_binary',
        // eslint-disable-next-line camelcase
        ...test_hetero_nn_binary
    },
    {
        name: 'test_hetero_pearson_default',
        label: '25test_hetero_pearson_default',
        // eslint-disable-next-line camelcase
        ...test_hetero_pearson_default
    },
    {
        name: 'test_hetero_poisson',
        label: '26test_hetero_poisson',
        // eslint-disable-next-line camelcase
        ...test_hetero_poisson
    },
    {
        name: 'test_secureboost_train_regression',
        label: '27test_secureboost_train_regression',
        // eslint-disable-next-line camelcase
        ...test_secureboost_train_regression
    },
    {
        name: 'scorecard',
        label: '28scorecard',
        // eslint-disable-next-line camelcase
        ...scorecard
    },
    {
        name: 'homo_lr_normal',
        label: '29homo_lr_normal',
        // eslint-disable-next-line camelcase
        ...homo_lr_normal
    },
    {
        name: 'test_secureboost_train_binary',
        label: '30test_secureboost_train_binary',
        // eslint-disable-next-line camelcase
        ...test_secureboost_train_binary
    },
    {
        name: 'test_intersect _job_rsa',
        label: '31test_intersect_job_rsa',
        // eslint-disable-next-line camelcase
        ...test_intersect_job_rsa
    },
    {
        name: 'test_intersect job_raw',
        label: '32test_intersect job_raw',
        // eslint-disable-next-line camelcase
        ...test_intersect_job_raw
    },
    {
        name: 'test_fast_sbt_layer',
        label: '33test_fast_sbt_layer',
        // eslint-disable-next-line camelcase
        ...test_fast_sbt_layer
    }
]
console.log(modelFileList)
// 根据名称获取模型初始化文件
export const getModelInitFile = (name) => {
    let file = modelFileList.find(file => file.name === name)
    return cloneDeep(file)
}

// 模型管理
export const ListModelInitTypes = () => {
    return modelFileList.map(item => ({
        name: item.label,
        label: item.label,
        value: item.name
    }))
}

// 应用管理
export const ListModelPredictions = () => {
    return modelFileList
        .filter(item => Boolean(item.predict_conf))
        .map(item => ({ name: item.name, label: item.label }))
}

// 应用管理获取预测数据集合
export const GetPredictionsDataset = (name) => {
    let file = modelFileList.find(file => file.name === name)
    return cloneDeep(file)
}
