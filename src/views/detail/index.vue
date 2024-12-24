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

    <div class="beside">
        <div class="left">
          <a v-if="islogin===true" @click="logout" href="#">退出登录</a>
          <a v-else @click="goLogin" href="#">登录</a>
        </div>
        <div @click="goMyorder" class="middle">
          <!-- <a href="#"><span class="iconfont icon-dingdan"></span></a> -->
          <a class="myorderposition">我的订单</a>
        </div>
        <div class="right">
            <a @click="goCart" href="#"><span class="iconfont icon-24gl-bag"></span></a>
            <i>{{cartNum}}</i>
        </div>
    </div>

    <div class="nav wrapper">
        <ul>
          <li @click="showAll">全部</li>
          <li @click="showSpecial">特价</li>
          <li @click="showRecord">唱片</li>
          <li @click="showClothing">衣饰</li>
          <li @click="showDaily">日用品</li>
          <li @click="showOther">其它</li>
        </ul>
    </div>

    <div class="detail wrapper">
      <div class="left">
        <img :src="goodsInfo.goods_image" alt="">
      </div>
      <div class="right">
        <h1>{{goodsInfo.goods_name}}</h1>
        <div class="price"><span>￥{{goodsInfo.goods_price}}</span></div>
        <div class="num">
          <label>数量</label>
          <div class="change">
            <button @click="handleSub" class="minus">-</button>
            <input :value="numvalue" @change="handleChange" class="inp" type="text">
            <button @click="handleAdd" class="add">+</button>
          </div>
        </div>
        <input @click="addtocart" type="submit" value="添加到购物车">
        <p>{{goodsInfo.goods_description}}</p>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import { getDetail } from '@/api/getDetail'
import { addToCart } from '@/api/addToCart'
import { getCartNum } from '@/api/getCart'
import store from '@/store'

export default {
  name: 'DetailIndex',
  data () {
    return {
      islogin: false,
      goodsInfo: null,
      cartNum: store.getters.cartNum,
      numvalue: 1
    }
  },
  created () {
    if (store.getters.token) {
      this.islogin = true
    } else {
      this.islogin = false
    }
    // console.log(this.islogin === false)
    this.getdetail()
    this.getcartnum()
    this.cartNum = store.getters.cartNum
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    async getdetail () {
      const res = await getDetail(this.goodsId)
      // console.log(res)
      this.goodsInfo = res.data.goodsDetail
    },
    async addtocart () {
      if (!store.getters.token) {
        alert('请先登录')
        this.goLogin()
      }
      if (this.goodsInfo.goods_on === 0) {
        alert('该商品已下架')
        return this.$router.push('/myorder')
      }
      const res = await addToCart(this.goodsId, store.getters.userId, this.numvalue, store.getters.token)
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
      if (res.status === 200) {
        this.cartNum = this.cartNum + res.data.addtype
        this.$store.commit('user/setCartNum', this.cartNum)
        this.goCart()
      }
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.goLayout()
    },
    goLayout () {
      this.$router.push('/')
    },
    goLogin () {
      this.$router.push('/login')
    },
    goCart () {
      if (!store.getters.token) {
        alert('请先登录')
        this.goLogin()
      } else { this.$router.push('/cart') }
    },
    goMyorder () {
      if (!store.getters.token) {
        alert('请先登录')
        this.goLogin()
      } else { this.$router.push('/myorder') }
    },
    handleAdd () { // 数量加1
      this.numvalue++
    },
    handleSub () { // 数量减1
      if (this.numvalue > 1) this.numvalue--
    },
    handleChange (e) { // 输入数量
      const num = e.target.value
      if (isNaN(num) || num < 1) {
        this.numvalue = 1
      } else {
        this.numvalue = num
      }
    },
    showAll () {
      this.$store.commit('setType', 'all')
      this.$router.push('/')
    },
    showClothing () {
      this.$store.commit('setType', 'clothing')
      this.$router.push('/')
    },
    showSpecial () {
      this.$store.commit('setType', 'special')
      this.$router.push('/')
    },
    showRecord () {
      this.$store.commit('setType', 'record')
      this.$router.push('/')
    },
    showDaily () {
      this.$store.commit('setType', 'daily')
      this.$router.push('/')
    },
    showOther () {
      this.$store.commit('setType', 'other')
      this.$router.push('/')
    },
    async getcartnum () {
      const res = await getCartNum(store.getters.userId, store.getters.token)
      if (res.status !== 200) {
        if (res.message === '身份验证失败') {
          return
        }
        return console.log(res.message)
      }
      this.cartNum = res.data.num
      this.$store.commit('user/setCartNum', res.data.num)
    }
  }
}
</script>

<style>
body {
  background-color: rgb(216,216,212);
}
.detail {
  display: flex;
  margin-top: 220px !important;
  margin-bottom: 50px !important;
  /* height: 500px; */
}

.detail .left {
  margin-left: 100px;
  height: 480px;
  width: 480px;
}
.detail .right {
  margin-left: 100px;
}
.detail .right h1 {
  margin-top: 10px;
  width: 305px;
}
.detail .right .price {
  margin-top: 15px;
  font-size: 18px;
}
.detail .right .num {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: 43px;
  width: 305px;
  text-align: center;
}
.detail .right .num label{
  padding-top: 8px;
  padding-left: 5px;
}
.detail .right .change {
  display: flex;
  text-align: center;
  border: 1px solid black;
}
.detail .right .num button {
  padding-top: 8px;
  height: 35px;
  width: 35px;
  font-size: 20px;
  font-weight: 100;
  text-align: center;
  background-color: rgb(216, 216, 212);
  border: none;
}

.detail .right input {
  margin-top: 20px;
  padding: 10px;
  width: 305px;
  height: 45px;
  font-size: 16px;
  color: rgb(216, 216, 212);
  background-color: black;
}
.detail .right input:hover {
  background-color: rgb(235, 79, 71);
}

.detail .right .num input {
  margin-top: 4px;
  height: 35px;
  width: 150px;
  font-size: 16px;
  text-align: center;
  color: black;
  background-color: rgb(216, 216, 212);
  border: none;
}

.detail .right p {
  margin-top: 30px;
  width: 432px;
}
</style>
