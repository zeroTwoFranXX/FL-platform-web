// 基于树状数据获取 treeData 展开值

export const getDefaultExpandedKeys = (treeData) => {
    let result = []
    if (!treeData) return result
    if (treeData && treeData.length === 0) return result
    treeData.forEach(item => {
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                result.push(child.name || child.labelEng)
            })
        }
    })

    return result
}
