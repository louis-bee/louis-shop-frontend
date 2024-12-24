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
    <div class="old">
      <div class='pic' id="firstpic"><img src="@/assets/first/第一届图标.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度考古专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度艺人.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度歌单1.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度歌单2.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度歌单3.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度歌单4.webp" alt=""></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'FirstIndex',
  data () {

  },
  methods: {

  }
}
</script>

<style>
.old {
  display: block;
  /* justify-content: center; */
}
.old #firstpic {
  margin-top: 150px;
  width: 200px;
}
.old .pic{
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
</style>
