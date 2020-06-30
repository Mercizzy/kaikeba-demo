<template>
  <div :class="['zToast', type]">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'zToast',
  props: {
    message: String,
    type: {
      type: String,
      default: "warning"
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    setTimeout(()=> {
      this.remove();
    }, 2000)
  },
}
</script>

<style lang="less">
  .zToast{
    position: relative;
    top: 20px;
    z-index: 999;
    padding: 10px 15px;
    border: 1px solid #eee;
    text-align: center;

    &.success {
      color: greenyellow;
      border-color: aquamarine;
    }
  }
</style>