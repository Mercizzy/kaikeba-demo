<template>
  <div class='zInput'>
    <input 
      class="input-inner"
      :value="value" 
      @input="handleInput" 
      @change="handleChange"  
      v-bind="$attrs"
      autocomplete="off"
      @blur="handleBlur"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,  // 阻止没有在props中定义的属性渲染在根组件上，配合$attrs，可以将属性定向渲染在某个元素上
  name: 'zInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e.target.value)
    },
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    handleBlur() {
      this.$emit('blur')
      this.$parent.$emit('validate')
    },
  },
  mounted() {
    
  },
}
</script>

<style lang="less">
  .zInput{
    width: 180px;
    font-size: 14px;

    .input-inner {
      padding: 0 15px;
      width: 100%;
      height: 32px;
      line-height: 32px;
      outline: none;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      box-sizing: border-box;

      &:focus {
        border-color: #409eff;
      }
    }
  }
</style>