export const schema = [
    {
        type: 'text',
        key: 'ceshi',
        props: {
            username: ''
        },
        disabled: false,
        label: '用户名',
        placeholder: '请输入',
        required: true
    },
    {
        type: 'checkbox',
        key: 'check',
        shape: 'square', //round圆圈 square矩形
        props: {
            check: ['1', '2']
        },
        option: [
            {
                label: '测试1',
                value: '1'
            },
            {
                label: '测试2',
                value: '2'
            }
        ],
        disabled: true,
        label: '多选',
        required: true
    },
    {
        type: 'radio',
        key: 'radio',
        shape: 'round', //round圆圈 square矩形
        props: {
            check: '1'
        },
        option: [
            {
                label: '测试1',
                value: '1'
            },
            {
                label: '测试2',
                value: '2'
            },
            {
                label: '测试3',
                value: '3'
            }
        ],
        disabled: false,
        label: '单选',
        required: true
    },
    {
        type: 'switch',
        key: 'switch',
        props: {
            switch: 0
        },
        disabled: false,
        label: '选择开关',
        required: true
    },
    {
        type: 'select',
        key: 'select',
        props: {
            select: '1'
        },
        option: [
            {
                label: '测试1',
                value: '1'
            },
            {
                label: '测试2',
                value: '2'
            },
            {
                label: '测试3',
                value: '3'
            }
        ],
        disabled: false,
        label: '选择',
        showPicker: false,
        required: true
    },
    {
        type: 'date',
        key: 'date',
        props: {
            date: ''
        },
        minDate: new Date(),
        maxDate: new Date(2030, 10, 1),
        disabled: true,
        label: '时间选择',
        placeholder: '请选择时间',
        required: true
    },
    {
        type: 'image',
        key: 'image',
        props: {
            image: []
        },
        disabled: true,
        label: '图片选择',
        required: true
    },
    {
        type: 'number',
        key: 'number',
        props: {
            number: []
        },
        disabled: false,
        label: '数字输入',
        required: true
    }
]