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
        <h1>登 录</h1>
        <a @click="goLayout" href="#">回到商店</a>
      </div>
      <div class="right">
        <h4>邮 箱</h4>
        <input v-model="email" type="text" placeholder="邮 箱">
        <h4>密 码</h4>
        <input v-model="password" type="password" placeholder="密 码">
        <input @click="login" class="submit" type="submit" value="登录">
        <div class="choice">
          <a @click="goRegister" href="#">注册</a>
          <a href="#" @click="handleForgetPasswordClick">忘记密码？</a>
        </div>
      </div>
    </div>
    <div class="footer">
        <div class="wechat">
            <img src="@/assets/wechat.jpg" alt="">
            <h4>联系客服</h4>
        </div>
    </div>
  </div>
</template>

<script>
import { pwdLogin } from '@/api/login'
import { getCartNum } from '@/api/getCart'
import store from '@/store'

export default {
  name: 'LoginIndex',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    goLayout () {
      this.$router.push('/')
    },
    goRegister () {
      this.$router.push('/register')
    },
    handleForgetPasswordClick () {
      alert('真是个小笨猪！')
      alert('请联系在线客服')
    },
    async login () {
      const res = await pwdLogin(this.email, this.password)
      if (res.status !== 200) {
        return alert(res.message)
      }
      this.$store.commit('user/setUserInfo', res.data)
      this.getcartnum(res.data.userId, res.data.token)

      if (store.getters.userAccount === 'admin') {
        this.$router.push('/manage')
      } else {
        this.$router.push('/')
      }
    },
    async getcartnum (userId, token) {
      const res = await getCartNum(userId, token)
      if (res.status !== 200) {
        return console.log(res.message)
      }
      // console.log(res.data.num)

      this.$store.commit('user/setCartNum', res.data.num)
    }
  }
}
</script>

<style>
.login {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 150px;
  padding-top: 120px;
  padding-left: 80px;
  width: 1140px;
}
.login .left {
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
