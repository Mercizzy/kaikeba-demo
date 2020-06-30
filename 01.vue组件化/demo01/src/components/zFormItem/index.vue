<template>
  <div class='zFormItem'>
    <label class="zFormItem-label" :style="{ 'width': labelWidth + 'px' }">{{ label }}</label>
    <div class="zFormItem-content" :style="{ 'margin-left': labelWidth + 'px' }">
      <slot></slot>
    </div>
    <div v-if="errorMessage" class="zFormItem-error" :style="{ 'left': labelWidth + 'px' }">{{ errorMessage }}</div>
  </div>
</template>

<script>
import schema from 'async-validator'
export default {
  name: 'zFormItem',
  inject: ['form'],
  props: {
    label: String,
    labelWidth: {
      type: Number,
      default: 120
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  methods: {
    validate() {
      let value = this.form.model[this.prop]
      let rule = this.form.rules[this.prop]
      let desc = { [this.prop]: rule }
      let validator = new schema(desc)
      let p = validator.validate({ [this.prop]: value }, (errors)=> {
        if(errors && errors.length > 0) {
          this.errorMessage = errors[0].message
        }else {
          this.errorMessage = ''
        }
      })
      return p
    },
  },
  mounted() {
    this.$on('validate', ()=> {
      this.validate();
    })
  },
}
</script>

<style lang="less">
  .zFormItem{
    position: relative;
    margin-bottom: 20px;

    &::after {
      clear: both;
      content: '';
    }

    .zFormItem-label {
      float: left;
      padding-right: 12px;
      line-height: 32px;
      text-align: right;
      box-sizing: border-box;
    }
    .zFormItem-content {
      height: 100%;
    }
    .zFormItem-error {
      position: absolute;
      font-size: 12px;
      color: red;
      line-height: 20px;
    }
  }
</style>