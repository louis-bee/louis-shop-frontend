<template>
  <div>
    <div class="header">
      <div class="wrapper">
        <div class="left manage-title">
            <h1>编辑商品</h1>
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
            <a @click="goBack" href="#">返回</a>
        </div>
    </div>
    <div class="addgoods wrapper">
      <form @submit.prevent="edit">
        <div class="left">
          <img v-if="imgShow===0" :src="goodsInfo.goods_image" alt="">
          <img v-else id="productImageDisplay" alt="">
        </div>
        <div class="right">
          <div class="form-group">
            <input v-model="goodsInfo.goods_name" type="text" id="productName" placeholder="商品名">
          </div>
          <div class="form-group goodspriceposition">
            ￥<input v-model="goodsInfo.goods_price" type="number" id="productPrice" placeholder="价格">
          </div>
          <div class="form-group">
            <input @change="handleFileChange" type="file" id="productImage" accept="image/*" >
          </div>
          <div class="form-group">
            <textarea v-model="goodsInfo.goods_description" id="productDescription" placeholder="描述"></textarea>
          </div>
          <div class="form-group">
            <!-- <label for="productCategory">选择商品分类:</label> -->
            <select v-model="goodsInfo.goods_type" id="productCategory">
              <option value="clothing">衣服</option>
              <option value="special">特价</option>
              <option value="record">唱片</option>
              <option value="daily">日用品</option>
              <option value="other">其它</option>
            </select>
          </div>
          <button class="submitgoods" type="submit">修改商品</button>
          <input class="deletegoods" @click="deletegoods" value="下架商品">
        </div>
      </form>
    </div>
    <div class="footer"></div>
    <!-- <div class="addgoods">
      <form @submit.prevent="edit">
        <div class="form-group">
          <label for="productName">商品名:</label>
          <input v-model="goodsInfo.goods_name" type="text" id="productName" name="productName" required>
        </div>

        <div class="form-group">
          <label for="productPrice">价格:</label>
          <input v-model="goodsInfo.goods_price" type="number" id="productPrice" name="productPrice" required>
        </div>

        <div class="form-group">
          <label for="productDescription">描述:</label>
          <textarea v-model="goodsInfo.goods_description" id="productDescription" name="productDescription" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="productImage">上传商品图片:</label>
          <input @change="handleFileChange" type="file" id="productImage" name="productImage" accept="image/*" required>
        </div>

        <div class="form-group">
          <label for="productCategory">选择商品分类:</label>
          <select v-model="goodsInfo.goods_type" id="productCategory" name="productCategory">
            <option value="clothing">衣服</option>
            <option value="special">特价</option>
            <option value="record">唱片</option>
            <option value="daily">日用品</option>
            <option value="other">其它</option>
          </select>
        </div>

        <button type="submit">提交商品</button>
      </form>
      <button @click="deletegoods">下架商品</button>
    </div> -->

  </div>
</template>

<script>
import { Edit, Delete, EditnoImage } from '@/api/edit'
import { getDetail } from '@/api/getDetail'
import store from '@/store'

export default {
  name: 'EditIndex',
  data () {
    return {
      imgShow: 0,
      goodsInfo: {
        goods_id: null,
        goods_name: '',
        goods_price: null,
        goods_description: '',
        goods_image: null,
        goods_type: ''
      }
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
    this.getdetail()// 渲染
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
    goManage () {
      this.$router.push('/manage')
    },
    goBack () {
      window.history.back()
    },
    handleFileChange (event) {
      this.goodsInfo.goods_image = event.target.files[0] // 获取第一个文件对象
      const input = this.goodsInfo.goods_image
      this.imgShow++
      // console.log(this.goodsimage)
      const reader = new FileReader()
      reader.onload = function (e) {
        const imgDisplay = document.getElementById('productImageDisplay')
        imgDisplay.src = e.target.result
      }
      // 读取文件
      reader.readAsDataURL(input)
    },
    async edit () {
      if (this.goodsInfo.goods_on === 0) {
        alert('该商品已下架')
        return this.$router.push('/book')
      }
      // console.log(this.goodsInfo.goods_id, this.goodsInfo.goods_name, this.goodsInfo.goods_price, this.goodsInfo.goods_description, this.goodsInfo.goods_image, this.goodsInfo.goods_type)
      // console.log(this.goodsname, this.goodsprice, this.goodsdescription, this.goodsimage, this.goodstype)
      let res = null
      if (this.imgShow === 0) {
        res = await EditnoImage(this.goodsInfo.goods_id, this.goodsInfo.goods_name, this.goodsInfo.goods_price, this.goodsInfo.goods_description, this.goodsInfo.goods_type, store.getters.token)
        // return alert('未上传图片')
      } else {
        res = await Edit(this.goodsInfo.goods_id, this.goodsInfo.goods_name, this.goodsInfo.goods_price, this.goodsInfo.goods_description, this.goodsInfo.goods_image, this.goodsInfo.goods_type, store.getters.token)
      }
      // console.log(res)
      if (res.status !== 200) {
        if (res.message === '身份验证失败') {
          if (store.getters.token) {
            alert('登录已过期，请重新登录')
          } else {
            alert('请先登录')
          }
          return this.$router.push('/login')
        }
        return alert(res.message)
      }
      alert('修改成功')
      this.$router.push('/manage')
    },
    async deletegoods () {
      if (this.goodsInfo.goods_on === 0) {
        alert('该商品已下架')
        return this.$router.push('/book')
      }
      const res = await Delete(this.goodsInfo.goods_id, store.getters.token)
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
        return alert(res.message)
      }
      alert(res.message)
      this.$router.push('/manage')
    }
  }
}
</script>

<style>
.addgoods{
  margin-top: 150px;
}
.addgoods select {
  margin-top: 10px;
  width: 65px;
  height: 28px;
  background-color: rgb(239, 239, 239) !important;
}
.addgoods select option {
  /* text-indent: 3px; */
  /* padding-left: 10px; */
  background-color: rgb(239, 239, 239) !important;
}

.deletegoods {
  cursor: default;
  margin-top: 18px;
  /* padding-top: ; */
  width: 305px;
  height: 45px;
  font-size: 16px;
  /* line-height: 45px; */
  text-align: center;
  color: rgb(216, 216, 212);
  border: none;
  background-color: black !important;
}
.deletegoods:hover {
  background-color: rgb(235, 79, 71) !important;
}
</style>
