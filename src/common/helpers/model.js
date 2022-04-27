// 解析模型控制台枚举类
export const parseModelEnumType = (enumString) => {
    enumString = enumString || ''

    return enumString
        .split(',')
        .map(itemString => {
            let item = itemString.split('-')
            return {
                value: item[0],
                name: item[1]
            }
        })
}
