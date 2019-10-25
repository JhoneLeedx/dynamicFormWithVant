# dynamicFormWithVant
## 基于有赞h5 ui框架实现的手机端表单
```
引入 dynamic 包下内容到项目中 （前提是引入vant有赞ui框架）
import dynamicForm from '@/components/dynamic/dynamic-form'
import dynamicValue from '@/components/dynamic/dynamic-value'
import dynamicValidation from '@/components/dynamic/dynamic-validation'
```

```
# 定义表单js 
# 可以添加children {}对象通父级一致，对象格式为{key: {}}
export const schema = 
    {
       username:{ 
       type: 'text',
        disabled: false,
        label: '用户名',
        placeholder: '请输入',
        required: true,
         hide: data => data.username.value !== 1,
        children : {
            username:{ 
             type: 'text',
            disabled: false,
            label: '用户名',
             placeholder: '请输入',
                required: true,
             hide: data => data.username.value !== 1,
        }
    }
    }
    },
   
```


```
# 初始化表单数据时 引入dynamic-value.js在数据获取完成时

schema = dynamicValue(schema, data, dynamicValue)
```


```
# 校验表单时 引入dynamic-validation.js

const  { validation, error: errorMsg } =  dynamicValidation(schema, dynamicValidation)

# 如果validation = true 校验成功，反之 error中有校验错误信息
```


