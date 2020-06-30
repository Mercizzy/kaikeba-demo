<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <z-input 
      v-model="value" 
      @change="handleChange" 
      placeholder="请输入" 
      maxlength="4"
      type="number">
    </z-input>
    <z-form-item label="姓名">
      <z-input 
        v-model="value" 
        placeholder="请输入">
      </z-input>
    </z-form-item> -->
    <z-form :model="model" :rules="rules" ref="form">
      <z-form-item label="账号" prop="name">
        <z-input 
          v-model="model.name" 
          placeholder="请输入">
        </z-input>
      </z-form-item>
      <z-form-item label="密码" prop="password">
        <z-input 
          type="password"
          v-model="model.password" 
          placeholder="请输入">
        </z-input>
      </z-form-item>
      <button @click="submit('form')">提交</button>
    </z-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ZInput from '../components/zInput/index'
import ZFormItem from '../components/zFormItem/index'
import ZForm from '../components/zForm/index'
import ZToast from '../components/zToast/index'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    'z-input': ZInput,
    'z-form-item': ZFormItem,
    'z-form': ZForm
  },
  data() {
    return {
      value: '',
      model: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      },
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    submit(form) {
      this.$refs[form].validate(result=> {
        if(result) {
          // alert('提交成功')
          this.$create(ZToast, {
            type: "success",
            message: "验证成功"
          })
        }else {
          return false
        }
      })
    },
  }
}
</script>
