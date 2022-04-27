
const isValidParams = (params) => {
    return params !== undefined && params !== null && params !== ''
}

// 列表查询时处理search参数
// {name: 'xx', type: 1} => {searchBy: 'name,type', searchContent:'xx,1'}
export const handleRequestParams = (params) => {
    const searchBy = []
    const searchContent = []
    for (const key in params) {
        if (isValidParams(params[key])) {
            searchBy.push(key)
            searchContent.push(params[key])
        }
    }
    return {
        searchBy: searchBy.join(','),
        searchContent: searchContent.join(',')
    }
}
