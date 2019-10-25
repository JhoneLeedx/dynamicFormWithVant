// 校验form表单
export default function (form, validationFunc) {
    const keys = Object.keys(form)
    let validation = true
    let errorMsg = ''
    for (let i = 0; i < keys.length; i++) {
        const { value, error, required = false, children = undefined } = form[keys[i]]
        if (!required) {
            break
        }
        if (!value || !value.length) {
            validation = false
            errorMsg = error || '请确保参数填写完整'
            break
        }
        // 递归检查是否有children
        if (children) {
            const result = validationFunc(children, validationFunc)
            validation = result.validation
            errorMsg = result.error || ''
        }
    }
    return { validation, error: errorMsg }
}