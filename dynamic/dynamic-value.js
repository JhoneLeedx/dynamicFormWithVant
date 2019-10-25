import utils from '@/modules/receiveFileManage/utils'
export default function (form, formValue, dynamicFunc) {
    if (Object.keys(formValue).length) {
        Object.keys(form).forEach(key => {
            switch (form[key].type) {
                case 'checkbox':
                    form[key].value = []
                    if (formValue[key] && formValue[key].value) {
                        form[key].value = formValue[key].value.split(",").map(value => value)
                    } else if (formValue[key]) {
                        form[key].value = formValue[key].split(",").map(value => value)
                    }
                    break
                case 'collapse':
                case 'image':
                case 'text':
                case 'radio':
                case 'switch':
                case 'number':
                    if (formValue[key]) {
                        form[key].value = formValue[key].value || formValue[key] || ''
                    }
                    break
                case 'date':
                    if (formValue[key] && formValue[key].value) {
                        form[key].value = utils.dateToString(formValue[key].value)
                    } else {
                        form[key].value = utils.dateToString(formValue[key])
                    }
                    break
                case 'datetime':
                    if (formValue[key] && formValue[key].value) {
                        form[key].value = utils.datetimeToString(formValue[key].value)
                    } else {
                        form[key].value = utils.datetimeToString(formValue[key])
                    }
                    break
                case 'select':
                    {
                        let option = form[key].option
                        if (typeof option === 'function') {
                            option = option(form)
                        }
                        form[key].value = option.filter(({ value = "" }) => (value === formValue[key] || value === formValue[key].value))[0]
                        break
                    }
                default: {
                    form[key].value = formValue[key] || formValue[key].value
                    break
                }

            }
            if (form[key].children && form[key].children !== undefined && formValue[key].children && formValue[key].children !== undefined) {
                dynamicFunc(form[key].children, formValue[key].children, dynamicFunc)
            }
        })
    }
    return form
}