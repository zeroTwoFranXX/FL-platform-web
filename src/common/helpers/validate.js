// 表单验证

// 验证名称限定由字母或者数字或_
export const validateName = (rule, value, callback) => {
    let reg = /^[a-z0-9_]+$/i
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('名称限定为字母或者数字或_'))
    }
}
