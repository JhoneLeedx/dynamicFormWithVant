<template>
  <van-dialog
    class="dialog"
    v-model="show"
    title="部门列表"
    show-cancel-button
    confirmButtonColor="#ee0a24"
    @cancel="canel"
    @confirm="confirm"
  >
    <van-cell-group class="dept">
      <div class="dept-list">
        <dynamic-form :schema="radio" :disabled="false" v-if="isRadio"></dynamic-form>
        <dynamic-form :schema="schema" :disabled="false" v-else></dynamic-form>
      </div>
    </van-cell-group>
  </van-dialog>
</template>
<script>
import dynamicForm from '@/modules/receiveFileManage/components/dynamic/dynamic-form'
import dynamicValue from '@/modules/receiveFileManage/components/dynamic/dynamic-value'
import { schema } from './deptCheck'
import { radio } from './deptRadio'
export default {
  components: {
    dynamicForm
  },
  props: {
    depts: {
      type: String,
      default: ''
    },
    showDept: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'showDept',
    event: 'cancelDept'
  },
  data() {
    return {
      show: false,
      schema,
      radio
    }
  },
  methods: {
    canel() {
      this.show = false
      this.$emit('cancelDept', false)
    },
    confirm() {
      if (this.isRadio) {
        this.$emit('chooseDept', this.radio.dept.value)
      } else {
        this.$emit('chooseDept', this.schema.dept.value)
      }

      this.$emit('cancelDept', false)
    }
  },
  watch: {
    showDept(val) {
      this.show = val
    },
    show(val) {
      this.$emit('cancelDept', val)
    },
    depts(val) {
      this.schema = dynamicValue(this.schema, { dept: val }, dynamicValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  .dept {
    height: 60vh;
    overflow: hidden;
    margin-top: 20px;
    .dept-list {
      overflow-y: auto;
      height: 100%;
    }
   
  }
}
</style>