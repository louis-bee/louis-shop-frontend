<template>
  <div class="pay">
    <img src="@/assets/wechatpay.jpg" alt="">
    <input @click="pay" class="paid" type="button" value="我已完成支付">
    <a @click="goCart" href="#"><input class="cancel" type="button" value="取消"></a>
  </div>
</template>

<script>
import { Pay } from '@/api/pay'
import store from '@/store'

export default {
  name: 'PayIndex',
  methods: {
    async pay () {
      const res = await Pay(store.getters.userId, store.getters.token)
      if (res.status !== 200) {
        if (res.message === '身份验证失败') {
          if (store.getters.token) {
            alert('登录已过期，请重新登录')
            this.$store.dispatch('user/logout')
          } else {
            alert('请先登录')
          }
          return this.$router.push('/login')
        }
        return console.log(res.message)
      }
      this.$store.commit('setcartNum', 0)
      this.goMyorder()
    },
    goCart () {
      this.$router.push('/cart')
    },
    goMyorder () {
      this.$router.push('/myorder')
    }
  }
}
</script>

<style>
.pay {
    margin: 120px auto;
    height: 250px;
    width: 250px;
  }
  .pay input {
    margin-top: 15px;
    text-align: center;
    padding: 10px;
    height: 40px;
    width: 250px;
    color: black;
  }
  .pay .paid:hover {
    background-color: rgb(50,200,100);
  }
  .pay .cancel:hover {
    background-color: rgb(216,216,212);
  }
</style>
