<script type="text/jsx">
import utils from '@/modules/receiveFileManage/utils'
import {
  Field,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Picker,
  DatetimePicker,
  SwitchCell,
  Uploader,
  Stepper,
  Popup,
  CellGroup,
  Cell,
  Collapse,
  CollapseItem,
  Tag
} from 'vant'
import Vue from 'vue'
Vue.use(Field)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(CellGroup)
  .use(Cell)
  .use(RadioGroup)
  .use(Radio)
  .use(SwitchCell)
  .use(Popup)
  .use(Stepper)
  .use(Picker)
  .use(Uploader)
  .use(Collapse)
  .use(CollapseItem)
  .use(DatetimePicker)
  .use(Tag)
const props = {
  item: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
  typeKey: {
    type: String,
    required: true
  },
  parent: {
    type: Object,
    required: true
  }
}
const createForm = {
  name: 'item',
  props: props,
  data() {
    return {
      showPicker: false,
      date: new Date(),
      minDate: this.item.minDate,
      maxDate: this.item.maxDate,
      option: []
    }
  },
  // 初始化option
  created() {
    this.setOption()
  },
  watch: {
    parent: {
      deep: true,
      handler(val) {
        this.setOption()
      }
    }
  },
  methods: {
    onChange() {},
    onConfirm(text, value) {
      this.item.value = this.option[value]
      console.log(text, value)
      this.showPicker = false
    },
    onDateSelect(date) {
      this.item.value = utils.dateToString(date)
      this.showPicker = false
    },
    // 返回布尔值
    beforeRead(file) {
      return true
    }, // 返回 Promise
    afterRead(file) {
      console.log(file)
    },
    // 是否显示
    hideItem() {
      let hide = this.item.hide
      if (typeof hide === 'function') {
        hide = hide(this.parent)
      }
      if (hide) {
        return true
      }
      return false
    },
    setOption() {
      if (this.disabled) {
        this.item.disabled = this.disabled
      }
      const option = this.item.option
      if (typeof option === 'function') {
        this.option = option(this.parent)
      } else {
        this.option = option
      }
    },
    allChoose() {
      this.$refs.checkboxGroup.toggleAll(true)
    },
    cellCheckbox(item) {
      const uiArr = []
      const cell = item.cell
      for (let i = 0; i < this.option.length; i++) {
        const option = this.option[i]
        if (cell) {
          uiArr.push(
            <van-cell
              clickable={item.disabled}
              title={option.label}
              on-click={() => {
                this.$refs[option.label].toggle()
              }}
            >
              <van-checkbox
                slot="right-icon"
                ref={option.label}
                shape={item.shape || 'square'}
                icon={item.icon || ''}
                checkedColor={item.checkedColor || ''}
                disabled={item.disabled}
                name={option.value}
              />
            </van-cell>
          )
        } else {
          uiArr.push(
            <van-checkbox
              style={{ margin: '5px', padding: '5px' }}
              shape={item.shape || 'square'}
              icon={item.icon || ''}
              checkedColor={item.checkedColor || ''}
              disabled={item.disabled}
              name={option.value}
            >
              {option.label}
            </van-checkbox>
          )
        }
      }
      return uiArr
    },
    cellCheckTag(item) {
      if (item.allChoose) {
        return (
          <van-tag slot="right-icon" type="danger" on-click={this.allChoose}>
            {item.allChooseText}
          </van-tag>
        )
      }
    },

    cellRadio(item) {
      const cell = item.cell
      return this.option.map(option => {
        if (cell) {
          return (
            <van-cell
              title={option.label}
              clickable={item.disabled}
              on-click={() => {
                item.value = option.value
              }}
            >
              <van-radio
                slot="right-icon"
                icon={item.icon || ''}
                shape={item.shape}
                checkedColor={item.checkedColor || ''}
                disabled={item.disabled}
                name={option.value}
              />
            </van-cell>
          )
        } else {
          return (
            <van-radio
              shape={item.shape}
              disabled={item.disabled}
              icon={item.icon || ''}
              checkedColor={item.checkedColor || ''}
              name={option.value}
            >
              {option.label}
            </van-radio>
          )
        }
      })
    }
  },
  render() {
    const item = this.item
    const key = this.typeKey
    const disabledClass = item.disabled ? item.disabledClass || '' : ''
    if (this.hideItem()) {
      return ''
    }
    switch (item.type) {
      case 'image':
        return (
          <div>
            <van-cell title={item.label}></van-cell>
            <van-uploader
              before-read={this.beforeRead}
              after-read={this.afterRead}
              v-model={item.value}
              max-count={item.multiple ? item.value.length + 1 : 1}
              preview-size={100}
            ></van-uploader>
          </div>
        )
      case 'checkbox':
        return (
          <div>
            <van-cell title={item.label}>{this.cellCheckTag(item)}</van-cell>
            <van-checkbox-group
              ref="checkboxGroup"
              max={item.max}
              style={{
                width: 'calc(100% - 10px)',
                padding: '0',
                display: 'flex',
                flexWrap: 'wrap'
              }}
              disabled={item.disabled}
              v-model={item.value}
            >
              {this.cellCheckbox(item)
              //   this.option.map(option => {
              //   return (
              //     <van-checkbox
              //       style={{ margin: '5px', padding: '5px' }}
              //       shape={item.shape || 'square'}
              //       icon={item.icon || ''}
              //       disabled={item.disabled}
              //       name={option.value}
              //     >
              //       {option.label}
              //     </van-checkbox>
              //   )
              // })
              }
            </van-checkbox-group>
          </div>
        )
      case 'radio':
        if (item.right) {
          return (
            <van-cell title={item.label}>
              <van-radio-group
                slot="right-icon"
                style={{
                  padding: '0',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
                disabled={item.disabled}
                v-model={item.value}
              >
                {this.cellRadio(item)}
              </van-radio-group>
            </van-cell>
          )
        } else {
          return (
            <div>
              <van-cell title={item.label}></van-cell>
              <van-radio-group
                style={{
                  width: 'calc(100% - 10px)',
                  padding: '0',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
                disabled={item.disabled}
                v-model={item.value}
              >
                {this.cellRadio(item)}
              </van-radio-group>
            </div>
          )
        }
      case 'switch':
        return (
          <van-switch-cell
            active-value={1}
            inactive-value={0}
            disabled={item.disabled}
            v-model={item.value}
            title={item.label}
          />
        )
      case 'collapse':
        return (
          <van-Collapse v-model={item.activeName}>
            <van-collapse-item title={item.label} name="1">
              {item.value}
            </van-collapse-item>
          </van-Collapse>
        )
      case 'number':
        return (
          <van-cell title={item.label}>
            <van-stepper
              slot="right-icon"
              v-model={item.value}
              disabled={item.disabled}
            ></van-stepper>
          </van-cell>
        )
      case 'date':
        return (
          <div>
            <van-field
              readonly
              clickable={!item.disabled}
              value={item.value}
              label={item.label}
              input-align="right"
              disabled={item.disabled}
              placeholder={item.placeholder}
              on-click={() => {
                if (!item.disabled) {
                  this.showPicker = true
                }
              }}
            />
            <van-popup v-model={this.showPicker} position="bottom">
              <van-datetime-picker
                v-model={this.date}
                type="date"
                min-date={this.minDate}
                max-date={this.maxDate}
                on-cancel={() => (this.showPicker = false)}
                on-confirm={this.onDateSelect}
              ></van-datetime-picker>
            </van-popup>
          </div>
        )
      case 'datetime':
        return (
          <div>
            <van-field
              readonly
              value={item.props[key]}
              label={item.label}
              input-align="right"
              clickable={!item.disabled}
              disabled={item.disabled}
              placeholder={item.placeholder}
              on-click={() => {
                if (!item.disabled) {
                  this.showPicker = true
                }
              }}
            />
            <van-popup v-model={this.showPicker} position="bottom">
              <van-datetime-picker
                v-model={this.date}
                type="datetime"
                min-date={this.minDate}
                max-date={this.maxDate}
                on-cancel={() => (this.showPicker = false)}
                on-confirm={this.onDateSelect}
              ></van-datetime-picker>
            </van-popup>
          </div>
        )
      case 'select':
        return (
          <div>
            <van-field
              readonly
              clickable={!item.disabled}
              value={item.value.label || item.value}
              label={item.label}
              input-align="right"
              disabled={item.disabled}
              class="field-right"
              placeholder={item.placeholder}
              on-click={() => {
                if (!item.disabled) {
                  this.showPicker = true
                }
              }}
            />
            <van-popup v-model={this.showPicker} position="bottom">
              <van-picker
                show-toolbar
                columns={this.option.map(option => option.label)}
                on-cancel={() => (this.showPicker = false)}
                on-confirm={this.onConfirm}
              />
            </van-popup>
          </div>
        )
      // 默认是text 类型
      default:
        return (
          <van-field
            v-model={item.value}
            placeholder={item.placeholder}
            label={item.label}
            disabled={item.disabled}
            required={item.disabled ? false : item.required}
            input-align={item.disabled ? 'right' : 'left'}
          ></van-field>
        )
    }
  }
}
const createItemForm = {
  name: 'create-item-form',
  props: props,
  render() {
    {
      if (this.item.children) {
        if (this.item.title) {
          return (
            <van-cell-group>
              <van-cell title={this.item.title}></van-cell>
              <createForm
                item={this.item}
                typeKey={this.typeKey}
                parent={this.parent}
                disabled={this.disabled}
              ></createForm>
              {Object.keys(this.item.children).map(key => (
                <createItemForm
                  typeKey={key}
                  disabled={this.disabled}
                  parent={this.item}
                  item={this.item.children[key]}
                ></createItemForm>
              ))}
            </van-cell-group>
          )
        } else {
          return (
            <van-cell-group>
              <createForm
                item={this.item}
                typeKey={this.typeKey}
                parent={this.parent}
                disabled={this.disabled}
              ></createForm>
              {Object.keys(this.item.children).map(key => (
                <createItemForm
                  typeKey={key}
                  disabled={this.disabled}
                  parent={this.item}
                  item={this.item.children[key]}
                ></createItemForm>
              ))}
            </van-cell-group>
          )
        }
      } else {
        if (this.item.title) {
          return (
            <van-cell-group>
              <van-cell title={this.item.title}></van-cell>
              <createForm
                item={this.item}
                parent={this.parent}
                typeKey={this.typeKey}
                disabled={this.disabled}
              ></createForm>
            </van-cell-group>
          )
        } else {
          return (
            <van-cell-group>
              <createForm
                item={this.item}
                parent={this.parent}
                typeKey={this.typeKey}
                disabled={this.disabled}
              ></createForm>
            </van-cell-group>
          )
        }
      }
    }
  }
}
export default {
  name: 'dynamic-form',
  props: {
    schema: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return (
      <van-cell-group>
        {Object.keys(this.schema).map(key => {
          return (
            <createItemForm
              typeKey={key}
              parent={this.schema}
              item={this.schema[key]}
              disabled={this.disabled}
            ></createItemForm>
          )
        })}
      </van-cell-group>
    )
  }
}
</script>
<style lang="scss" scoped>
// >>> 与 /deep/
.field-right /deep/ .van-field__control {
  -webkit-text-fill-color: red;
  color: red;
}
</style>>


