<template>
  <div class="theCart">
    <div class="header">
      <div class="wrapper">
        <div class="left manage-title">
            <h1>订单管理</h1>
        </div>
        <div class="right">
            <a @click="goManage" href="#">
                <img src="@/assets/logo.jpg" alt="">
            </a>
        </div>
      </div>
    </div>

    <div class="beside">
        <div class="left cartout bookreturn">
            <a @click="goManage" href="#">返回</a>
        </div>
    </div>
    <!-- <div class="nav wrapper">
        <ul>
          <li><a href="index.html">全部</a></li>
          <li>特价</li>
          <li>唱片</li>
          <li>衣饰</li>
          <li>日用品</li>
          <li>其它</li>
        </ul>
    </div> -->
    <div class="cart">
      <div class="title">
        <h2>所有订单</h2>
        <h4>买家id</h4>
        <p>数量</p>
      </div>
      <div class="row">
        <ul>
          <li v-for="(item,index) in orderList" :key="item.id">
            <img @click="$router.push(`/edit/${item.goods_id}`)" :src="item.goods_image" alt="">
            <div @click="$router.push(`/edit/${item.goods_id}`)" class="desc">
              <a href="#">{{item.goods_name}}</a>
              <small class="bookstatus">{{ item.book_status === 2 ? '发货中' : '已完成' }}</small>
              <small v-if="item.book_status===2" @click.stop="delivery(index)" class="managebookstatus">点击发货</small>
              <small v-else @click.stop="removebook(index)" class="managebookstatus">移除订单</small>
            </div>
            <div class="num">
              <span>{{ item.user_id }}</span>
              <!-- <input type="text" :value="item.user_id"> -->
            </div>
            <span>x{{item.book_num}}</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import { getMyorder, removeBook, Delivery } from '@/api/myorder'
import { Delete } from '@/api/edit'
import store from '@/store'

export default {
  name: 'BookIndex',
  data () {
    return {
      orderList: null
    }
  },
  created () {
    if (!store.getters.token) {
      alert('请先登录')
      return this.$router.push('/login')
    }
    if (store.getters.userAccount !== 'admin') {
      alert('你没有权限')
      return this.$router.push('/')
    }
    this.getmyorder()
  },
  methods: {
    async getmyorder () {
      const res = await getMyorder(1, store.getters.userId, store.getters.token)
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
      // console.log(res)
      this.orderList = res.data.orderList
    },
    async removebook (index) {
      const res = await removeBook(1, this.orderList[index].book_id, store.getters.token)
      this.getmyorder()
      if (res.message === '已删除该订单') {
        this.deletegoods(this.orderList[index].goods_id)
      }
    },
    async deletegoods (goodsId) {
      const res = await Delete(goodsId, store.getters.token)
      if (res.status !== 200) {
        return console.log(res.message)
      }
    },
    async delivery (index) {
      const res = await Delivery(this.orderList[index].book_id, store.getters.token)
      // console.log(res.message)
      alert(res.message)
      this.getmyorder()
    },
    goManage () {
      this.$router.push('/manage')
    }
  }
}
</script>

<style>
.managebookstatus {
  margin-left: 13px;
}
.theCart {
  background-color: rgb(216,216,212) ;
}
.beside .cartborder {
  border-bottom: 1px solid black;
}
.bookreturn {
  position: relative;
  padding-bottom: 3px;
  right: 140px;
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
