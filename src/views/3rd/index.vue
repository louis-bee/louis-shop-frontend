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
            <a href="javascript:void(0);" onclick="window.close();">
                <img src="@/assets/logo.jpg" alt="">
            </a>
        </div>
      </div>
    </div>
    <div class="old3">
      <div class='pic' id="firstpic"><img src="@/assets/third/第三届logo.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度流行.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度电音.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度考古.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度配乐.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度艺人.webp" alt=""></div>
      <div class='pic'><img src="@/assets/third/年度歌单.webp" alt=""></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'ThirdIndex',
  data () {

  },
  methods: {

  }
}
</script>

<style>
.old3 {
  display: block;
  /* justify-content: center; */
}
.old3 #firstpic {
  margin-top: 150px;
  width: 200px;
  width: 170px;
}
.old3 .pic{
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 900px;
}
.old3 .pic:last-child {
  width: 450px;
}
</style>
