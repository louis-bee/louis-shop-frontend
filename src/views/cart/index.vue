<template>
  <div class="theCart">
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
      <div @click="goMyorder" class="middle">
          <!-- <a href="#"><span class="iconfont icon-dingdan"></span></a> -->
          <a class="myorderposition">我的订单</a>
        </div>
      <div class="right cartborder">
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
    <div v-if="cartList.length===0" class="emptycart">
      <h3>购物车为空</h3>
    </div>
    <div v-else class="cart">
      <div class="title">
        <h2>购物车</h2>
        <h4>数量</h4>
        <p>价格</p>
      </div>
      <div class="row">
        <ul>
          <li v-for="(item,index) in cartList" :key="item.id">
            <img @click="$router.push(`/detail/${item.goods_id}`)" :src="item.goods_image" alt="">
            <div @click="$router.push(`/detail/${item.goods_id}`)" class="desc">
              <a @click.prevent="$router.push(`/detail/${item.goods_id}`)" href="#">{{item.goods_name}}</a>
              <small @click.stop="remove(index)">移除</small>
            </div>
            <div class="num">
              <button @click.stop="updateQuantity(index, -1)">-</button>
              <input type="text" :value="cartList[index].book_num" @change="updateQuantity(index, $event.target.value)">
              <button @click.stop="updateQuantity(index, 1)">+</button>
            </div>
            <span>￥{{item.goods_price}}</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="checkout">
        <div class="sum">
          <p>合计</p>
          <p>￥{{totalPrice}}</p>
        </div>
        <input @click="checkOut" type="submit" value="结 算" id="submitBtn">
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
import { getCart, getCartNum } from '@/api/getCart'
import { updateCart, updateSingleCart, removeCart } from '@/api/updateCart'
import store from '@/store'

export default {
  name: 'CartIndex',
  data () {
    return {
      cartList: null,
      cartNum: store.getters.cartNum
    }
  },
  created () {
    this.getcart()
    this.getcartnum()
    this.cartNum = store.getters.cartNum
  },
  computed: {
    totalPrice () {
      return this.cartList.reduce((total, item) => {
        return total + item.goods_price * item.book_num
      }, 0)
    }
  },
  methods: {
    async getcart () {
      const res = await getCart(store.getters.userId, store.getters.token)
      if (res.status !== 200) {
        if (res.message === '身份验证失败') {
          if (store.getters.token) {
            this.$store.dispatch('user/logout')
            alert('登录已过期，请重新登录')
          } else {
            alert('请先登录')
          }
          return this.$router.push('/login')
        }
        return console.log(res.message)
      }
      this.cartList = res.data.cartList
    },
    async updatecart () {
      const clearList = JSON.parse(JSON.stringify(this.cartList))
      // console.log(clearList)
      const res = await updateCart(store.getters.userId, clearList, store.getters.token)
      console.log(res)
    },
    async updatesinglecart (index) {
      const clearList = JSON.parse(JSON.stringify(this.cartList))
      // console.log(clearList)
      await updateSingleCart(store.getters.userId, clearList[index], store.getters.token)
      // const res = await updateSingleCart(store.getters.userId, clearList[index], store.getters.token)
      // console.log(res)
      // console.log(this.cartList[index].book_num)
    },
    async remove (index) {
      const res = await removeCart(this.cartList[index].book_id, store.getters.token)
      // console.log(res)
      if (res.status !== 200) {
        return console.log(res.message)
      }
      this.cartNum-- // 移除商品时购物车数量减一
      this.$store.commit('user/setCartNum', this.cartNum) // 更新至共享存储模块中
      this.cartList.splice(index, 1)
    },
    async checkOut () {
      if (this.cartList.length === 0) {
        alert('购物车为空')
      }
      this.$router.push('/pay')
    },
    updateQuantity (index, value) {
      let num = this.cartList[index].book_num
      const input = parseInt(value, 10)
      if (value === -1 && num > 1) {
        num--
        this.cartList[index].book_num = num
      } else if (value === 1) {
        num++
        this.cartList[index].book_num = num
      } else if (isNaN(input) || input < 1) {
        console.log(isNaN(input))

        this.cartList[index].book_num = 1
      } else {
        this.cartList[index].book_num = input
      }

      this.updatesinglecart(index)
      // this.updatecart()
    },
    goLayout () {
      this.$router.push('/')
    },
    goMyorder () {
      this.$router.push('/myorder')
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
    logout () {
      this.$store.dispatch('user/logout')
      this.goLayout()
    },
    async getcartnum () {
      const res = await getCartNum(store.getters.userId, store.getters.token)
      if (res.status !== 200) {
        return console.log(res.message)
      }
      this.cartNum = res.data.num
      this.$store.commit('user/setCartNum', res.data.num)
    }
  }
}
</script>

<style>
.emptycart {
  display: flex;
  justify-content: center;
  margin-top: 220px;
  background-color: rgb(210,210,207);
}
.emptycart h3 {
  font-size: 16px;
}
small {
  cursor: default;
}
small:hover {
  color: rgb(255, 255, 255);
}
.theCart {
  background-color: rgb(216,216,212) ;
}
.beside .cartborder {
  border-bottom: 1px solid black;
}
.cart {
  margin: 0 auto;
  padding-top: 220px !important;
  margin-bottom: 40px !important;
  width: 950px;
  /* background-color: pink; */
}
.cart .title {
  display: flex;
  padding-bottom: 25px;
  border-bottom: 2px solid black;
  color: black;
}
.cart .title h2 {
  width: 600px;
}
.cart .title h4 {
  flex: 1;
}

.cart .row li {
  display: flex;
  margin-top: 20px;
}
.cart .row li img {
  height: 100px;
  width: 100px;
}
.cart .row .desc {
  margin-top: 5px;
  padding-left: 45px;
  width: 500px;
}
.cart .row .desc a{
  display: block;
  margin-bottom: 35px;
  font-size: 20px;
  font-weight: 500;
}
.cart .row .num {
  flex: 1;
}
.cart .row .num button {
  height: 35px;
  width: 35px;
  font-size: 20px;
  font-weight: 100;
  text-align: center;
  background-color: rgb(216, 216, 212);
  border: none;
}
.cart .row .num input {
  height: 35px;
  width: 35px;
  font-size: 16px;
  text-align: center;
  background-color: rgb(216, 216, 212);
  border: none;
}
.cart .row span {
  color: black;
}

.cart .line {
  height: 30px;
  border-bottom: 1px solid black;
  /* background-color: pink; */
}

.cart .checkout {
  margin-left: 640px;
  margin-top: 40px;
  width: 310px;
  /* background-color: pink; */
}
.cart .checkout .sum {
  display: flex;
  justify-content: space-between;
  color: black;
}
.cart .checkout input {
  margin-top: 20px;
  margin-left: 5px;
  padding: 10px;
  width: 305px;
  height: 45px;
  font-size: 16px;
  color: rgb(216, 216, 212);
  background-color: black;
}
.cart .checkout input:hover {
  background-color: rgb(235, 79, 71);
}

</style>
