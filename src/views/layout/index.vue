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
            <a @click="showAll" href="#">
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
            <i class="cartnumi">{{cartNum}}</i>
        </div>
    </div>

    <div class="nav wrapper">
        <ul>
            <li :class="{ activeli:type === 'all' }" @click="showAll">全部</li>
            <li :class="{ activeli:type === 'special' }" @click="showSpecial">特价</li>
            <li :class="{ activeli:type === 'record' }" @click="showRecord">唱片</li>
            <li :class="{ activeli:type === 'clothing' }" @click="showClothing">衣饰</li>
            <li :class="{ activeli:type === 'daily' }" @click="showDaily">日用品</li>
            <li :class="{ activeli:type === 'other' }" @click="showOther">其它</li>
        </ul>
    </div>
    <div class="goods wrapper">
      <ul>
        <li @click="$router.push(`/detail/${item.goods_id}`)" v-for="(item) in list" :key="item.id">
          <a href="#">
            <div class="pic">
              <!-- 使用转换后的 Base64 字符串作为图片源 -->
              <img :src="item.goods_image" alt="">
            </div>
            <div class="txt">
                <h4 class="ellipsis">{{ item.goods_name }}</h4>
                <p>¥<span>{{item.goods_price}}</span></p>
            </div>
          </a>
        </li>
      </ul>
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
import { getGoods } from '@/api/getGoods'
import { getCartNum } from '@/api/getCart'
import store from '@/store'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      islogin: false,
      type: 'all',
      cartNum: store.getters.cartNum,
      list: [
        // { id: 1, name: 'Brightest Lights CD', image: '@/uploads/BrightestLights.webp', price: '159' },
        // { id: 2, name: 'Reviver CD', image: '@/uploads/Reviver.webp', price: '159' },
        // { id: 3, name: 'Black Ringer Tee', image: '@/uploads/Clothing1.webp', price: '159' },
        // { id: 4, name: 'rqwrewasdq', image: '@/uploads/Clothing3.webp', price: '159' },
        // { id: 5, name: 'Brightest Lights CD', image: '@/uploads/Clothing2.webp', price: '543' }
      ]
    }
  },
  created () {
    if (store.getters.token) {
      this.islogin = true
    } else {
      this.islogin = false
    }
    // console.log(this.islogin === false)
    this.type = store.getters.type
    this.$store.commit('setType', 'all')
    if (store.getters.token) { this.getcartnum() }
    this.cartNum = store.getters.cartNum
    this.getgoods()
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.islogin = false
      this.cartNum = 0
    },
    goCart () {
      if (!store.getters.token) {
        alert('请先登录')
        this.goLogin()
      } else { this.$router.push('/cart') }
    },
    async getgoods () {
      const res = await getGoods(this.type)
      // console.log(res)
      this.list = res.data.goodsList
      // this.list.forEach(item => {
      //   this.convertBufferToBase64(item)
      // })
      // console.log(this.list)
    },
    // convertBufferToBase64 (item) {
    //   // 将 Buffer 转换为 Base64 编码的字符串
    //   const base64Image = item.goods_image.toString('base64')
    //   // 将 Base64 字符串设置回商品对象的 goods_image 属性
    //   item.goods_image = `data:image/jpg;base64,${base64Image}`
    // },
    showAll () {
      this.type = 'all'
      this.getgoods()
    },
    showClothing () {
      this.type = 'clothing'
      this.getgoods()
    },
    showSpecial () {
      this.type = 'special'
      this.getgoods()
    },
    showRecord () {
      this.type = 'record'
      this.getgoods()
    },
    showDaily () {
      this.type = 'daily'
      this.getgoods()
    },
    showOther () {
      this.type = 'other'
      this.getgoods()
    },
    goMyorder () {
      if (!store.getters.token) {
        alert('请先登录')
        this.goLogin()
      } else { this.$router.push('/myorder') }
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
.activeli {
  border-bottom: 1px solid black; /* 你可以根据需要调整颜色和宽度 */
}
.ellipsis {
  padding-right: 5px;
  white-space: nowrap; /* 保持文本在一行内 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.myorderposition{
  position: relative;
  cursor: pointer;
  top:2px
}
.cartnumi {
  cursor: pointer;
}
.goods {
  margin-top: 208px;
}
.goods ul {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.goods li {
  /* box-sizing: border-box; */
  position: relative;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  width: 300px;
  height: 370px;
  /* background-color: #eef9f4; */
  transition: all 0.2s;

}
.goods li:hover {
  /* border: 1px solid black; */
  top: -4px;
  box-shadow: 0 10px 25px rgb(0 0 0 / 15%);
}

.goods li .pic {
  width: 100%;
  height: 300px;
}
.goods li .pic img {
  width: 100%;
  height: 100%;
}
.goods li .txt {
  padding-left: 5px;
  text-align: left;
}
.goods li h4 {
  margin-top: 14px;
  margin-bottom: 7px;
  font-size: 16px;
}
@media (max-width: 768px) {
  .goods {
    margin-top: 75px;
  }
}
</style>
