<template>
  <div class='zForm'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item=> item.prop)
        .map(item=> item.validate())
        
      Promise.all(tasks)
        .then(()=> cb(true))
        .catch(()=> cb(false))
    },
  },
  mounted() {
    
  },
}
</script>

<style lang="less">
  .zForm{
    
  }
</style>