import { getSession } from '@/modules/receiveFileManage/utils/storage'
const schema = {
    dept: {
        type: 'checkbox',
        value: [],
        option: getSession("depts"),
        cell: true,
        shape: 'round',
        label: "部门选择",
        allChooseText: "全选",
        allChoose: true,
        checkedColor: "#ee0a24"
    }
}
export { schema }