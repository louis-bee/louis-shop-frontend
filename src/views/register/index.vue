<template>
  <div>
    <div class="header">
      <div class="wrapper">
        <div class="left">
          <a href="https://space.bilibili.com/501779432" target="_blank">
            <img src="@/assets/louis2.jpg" alt="">
          </a>
        </div>
        <div class="right">
          <a @click="goLayout" href="#">
            <img src="@/assets/logo.jpg" alt="">
          </a>
        </div>
      </div>
    </div>

    <div class="login">
      <div class="left">
        <h1>注 册</h1>
        <a @click="goLayout" href="#">回到商店</a>
      </div>
      <div class="right">
        <h4>名 字</h4>
        <input v-model="username" type="text" placeholder="名 字">
        <h4>邮 箱</h4>
        <input v-model="email" type="text" placeholder="邮 箱">
        <h4>密 码</h4>
        <input v-model="password" type="password" placeholder="密 码">
        <input @click="register" class="submit" type="submit" value="注册">
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { Register } from '@/api/register'

export default {
  name: 'RegisterIndex',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    goLayout () {
      this.$router.push('/')
    },
    async register () {
      const res = await Register(this.username, this.email, this.password)
      console.log(res)
      if (res.status !== 200) {
        return alert(res.message)
      }
      alert('注册成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.login {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 110px;
  padding-top: 120px;
  padding-left: 80px;
  width: 1140px;
}
.login .left {
  margin-top: 40px;
  margin-left: 10px;
}
h1 {
  margin-bottom: 20px;
  font-size: 40px;
}

.login .right {
  padding-left: 60px;
  width: 600px;
  /* background-color: pink; */
}
.login .right input {
  margin-top: 10px;
  padding: 10px 20px;
  width: 470px;
  height: 47px;
  border: 1px solid rgb(2, 2, 2);
  background-color: rgb(210, 210, 207);
}
.login .right h4 {
  margin-top: 20px;
}
.login .right .submit {
  margin-top: 24px;
  background-color: rgb(2, 2, 2);
  color: rgb(209, 209, 207);
}
.login .right .choice {
  margin-top: 24px;
  font-size: 14px;
}
.login .right .choice a {
  margin-right: 10px;
}
</style>
