<template>
  <div>
    <div class="header">
      <div class="wrapper">
        <div class="left manage-title">
            <h1>商品管理</h1>
        </div>
        <div class="right">
            <a @click="showAll" href="#">
                <img src="@/assets/logo.jpg" alt="">
            </a>
        </div>
      </div>
    </div>

    <div class="beside">
        <div class="left cartout">
            <a @click="logout" href="#">退出</a>
        </div>
        <div @click="goBook" class="middle">
          <a href="#"><span class="iconfont icon-dingdan"></span></a>
          <a class="addposition">订单</a>
        </div>
        <div @click="goAdd" class="right">
            <a href="#"><span class="iconfont icon-tianjia"></span></a>
            <a class="addposition">添加</a>
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
    <div class="goods wrapper">
        <ul>
          <li @click="$router.push(`/edit/${item.goods_id}`)" v-for="(item) in list" :key="item.id">
            <a href="#">
              <div class="pic">
                <!-- 使用转换后的 Base64 字符串作为图片源 -->
                <img :src="item.goods_image" alt="">
              </div>
              <div class="txt">
                  <h4>{{ item.goods_name }}</h4>
                  <p>¥<span>{{item.goods_price}}</span></p>
              </div>
            </a>
          </li>
      </ul>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/api/getGoods'
import store from '@/store'

export default {
  name: 'ManageIndex',
  data () {
    return {
      type: 'all',
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
    if (!store.getters.token) {
      alert('请先登录')
      return this.$router.push('/login')
    }
    if (store.getters.userAccount !== 'admin') {
      alert('你没有权限')
      return this.$router.push('/')
    }
    this.getgoods()
  },
  methods: {
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
    goAdd () {
      this.$router.push('/add')
    },
    goBook () {
      this.$router.push('/book')
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
    }
  }
}
</script>

<style>
.activeli {
  border-bottom: 1px solid black; /* 你可以根据需要调整颜色和宽度 */
}
.header .manage-title {
  display: flex;
  padding-top: 15px;
  padding-right: 50px;
  align-items: center;
}
.icon-dingdan {
  font-weight: 200;
}
.addposition {
  position: relative;
  top:-2px
}
.beside .cartout {
  padding-top: 2px;
  margin-right: 5px;
}
.goods {
  margin-top: 208px !important;
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
</style>
