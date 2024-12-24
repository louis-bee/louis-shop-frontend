<template>
  <div>
    <div class="header">
      <div class="wrapper">
        <div class="left manage-title">
            <h1>添加商品</h1>
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

    <div class="addgoods wrapper">
      <form @submit.prevent="add">
        <div class="left">
          <img id="productImageDisplay" alt="">
        </div>
        <div class="right">
          <div class="form-group">
            <input v-model="goodsname" type="text" id="productName" placeholder="商品名">
          </div>
          <div class="form-group goodspriceposition">
            ￥<input v-model="goodsprice" type="number" id="productPrice" placeholder="价格">
          </div>
          <div class="form-group">
            <input @change="handleFileChange" type="file" id="productImage" placeholder="选择图片" accept="image/*" >
          </div>
          <div class="form-group">
            <textarea v-model="goodsdescription" id="productDescription" placeholder="描述"></textarea>
          </div>
          <div class="form-group">
            <!-- <label for="productCategory">选择商品分类:</label> -->
            <select v-model="goodstype" id="productCategory">
              <option value="clothing">衣服</option>
              <option value="special">特价</option>
              <option value="record">唱片</option>
              <option value="daily">日用品</option>
              <option value="other">其它</option>
            </select>
          </div>
          <button class="submitgoods" type="submit">上传商品</button>
        </div>
      </form>
    </div>
    <div class="footer"></div>

  </div>
</template>

<script>
import { Add } from '@/api/add'
import store from '@/store'

export default {
  name: 'AddIndex',
  data () {
    return {
      goodsname: '',
      goodsprice: null,
      goodsdescription: '',
      goodsimage: null,
      goodstpye: ''
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
  },
  methods: {
    goManage () {
      this.$router.push('/manage')
    },
    handleFileChange (event) {
      this.goodsimage = event.target.files[0] // 获取第一个文件对象
      console.log(this.goodsimage)
      const reader = new FileReader()
      reader.onload = function (e) {
        const imgDisplay = document.getElementById('productImageDisplay')
        imgDisplay.src = e.target.result
      }
      // 读取文件
      reader.readAsDataURL(this.goodsimage)
    },
    async add () {
      // console.log(this.goodsname, this.goodsprice, this.goodsdescription, this.goodsimage, this.goodstype)
      const res = await Add(this.goodsname, this.goodsprice, this.goodsdescription, this.goodsimage, this.goodstype, store.getters.token)
      console.log(res)
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
        return alert(res.message)
      }
      alert('添加成功')
      this.$router.push('/manage')
    }
  }
}
</script>

<style>
.addgoods{
  margin-top: 150px !important;
  /* margin-top: 220px  */
  margin-bottom: 50px !important
}
.addgoods form {
  display: flex;
}
.addgoods .left {
  margin-left: 100px;
  height: 480px;
  width: 480px;
}
.addgoods .right {
  margin-left: 100px;
}
.addgoods input {
  background-color: rgb(210,210,207 );
  /* border: black solid 1px; */
}
.addgoods #productName {
  margin-top: 12px;
  height: 60px;
  width: 305px;
  font-size: 24px;
}
.addgoods .goodspriceposition {
  padding-top: 10px;
  height: 50px;
  /* width: 100px; */
  font-size: 20px;
}
.addgoods #productPrice {
  /* padding-bottom: 6px; */
  width: 100px;
  font-size: 20px;
}
/* 隐藏input[type="number"]的加减按钮 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.addgoods #productImage {
  margin-top: 5px;
}
.addgoods textarea {
  margin-top: 12px;
  padding: 10px;
  height: 140px;
  width: 420px;
  /* background-color: rgb(216, 216, 212); */
  background-color: rgb(210,210,207 ) ;
  font: 16px/1.5  "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  font-size: 16px;
}
textarea {
  /* touch-action: none; */
  /* overflow: hidden; */
  resize: none; /* 禁用调整大小 */
}
.addgoods .right .submitgoods {
  margin-top: 20px;
  padding: 10px;
  width: 305px;
  height: 45px;
  font-size: 16px;
  color: rgb(216, 216, 212);
  border: none;
  background-color: black;
}
.addgoods .right .submitgoods:hover {
  background-color: rgb(235, 79, 71);
}
/* select {
  text-align: center;
} */
</style>
