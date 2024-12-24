<template>
  <div class="myorder">
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
      <div @click="goLayout" class="left">
          <a @click="logout" href="#">退出登录</a>
      </div>
      <div class="middle myorderborder">
          <!-- <a href="#"><span class="iconfont icon-dingdan"></span></a> -->
          <a class="myorderposition">我的订单</a>
        </div>
      <div @click="goCart" class="right">
          <a href="#"><span class="iconfont icon-24gl-bag"></span></a>
          <i class="cartnumi">{{cartNum}}</i>
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
    <div v-if="orderList.length===0" class="emptycart">
      <h3>没有任何订单</h3>
    </div>
    <div v-else class="cart">
      <div class="title">
        <h2>我的订单</h2>
        <h4>价格</h4>
        <p>数量</p>
      </div>
      <div class="row">
        <ul>
          <li v-for="(item,index) in orderList" :key="item.id">
            <img @click="$router.push(`/detail/${item.goods_id}`)" :src="item.goods_image" alt="">
            <div @click="$router.push(`/detail/${item.goods_id}`)" class="desc">
              <a href="">{{item.goods_name}}</a>
              <small class="bookstatus">{{ item.book_status === 2 ? '发货中' : '已完成' }}</small>
              <small v-if="item.book_status === 3" @click.stop="removebook(index)" class="managebookstatus">移除</small>
            </div>
            <div class="num">
              <span>￥{{item.goods_price}}</span>
            </div>
            <span>x{{item.book_num}}</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
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
import { getCartNum } from '@/api/getCart'
import { getMyorder, removeBook } from '@/api/myorder'
import { Delete } from '@/api/edit'
import store from '@/store'

export default {
  name: 'MyorderIndex',
  data () {
    return {
      orderList: null,
      cartNum: store.getters.cartNum
    }
  },
  created () {
    this.getcartnum()
    this.getmyorder()
    this.cartNum = store.getters.cartNum
  },
  methods: {
    async getmyorder () {
      const res = await getMyorder(0, store.getters.userId, store.getters.token)
      if (res.status !== 200) {
        return console.log(res.message)
      }
      this.orderList = res.data.orderList
    },
    async getcartnum () {
      const res = await getCartNum(store.getters.userId, store.getters.token)
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
      this.cartNum = res.data.num
      this.$store.commit('user/setCartNum', res.data.num)
    },
    async removebook (index) { // 移除订单
      const res = await removeBook(0, this.orderList[index].book_id, store.getters.token)
      this.getmyorder()
      if (res.message === '已删除该订单') {
        this.deletegoods(this.orderList[index].goods_id) // 调用删除商品函数
      }
    },
    async deletegoods (goodsId) { // 删除商品函数
      const res = await Delete(goodsId, store.getters.token) // 发送删除请求
      if (res.status !== 200) {
        return console.log(res.message)
      }
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.goLayout()
    },
    goLayout () {
      this.$router.push('/')
    },
    goCart () {
      this.$router.push('/cart')
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
    }
  }
}
</script>

<style>
.cart .row .num span {
  position:relative;
  top: 6px;
  left: 13px;
  /* padding-top: 10px; */
  /* margin-left: 14px; */
  height: 35px;
  width: 50px;
  font-size: 16px;
  text-align: center;
  color: #333;
  background-color: rgb(216, 216, 212);
  border: none;
}
.myorder {
  background-color: rgb(216, 216, 212);
}
.bookstatus {
  color: black;
}
.bookstatus:hover {
  color: black;
}
.beside .myorderborder {
  border-bottom: 1px solid black;
}
</style>
