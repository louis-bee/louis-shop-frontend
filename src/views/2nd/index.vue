<template>
  <div class="theCart">
    <div class="header  oldtop">
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
    <div class="old2 oldtop2">
      <div class='pic' id="firstpic"><img src="@/assets/second/年度流行专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/second/年度电音专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/second/年度摇滚专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/second/年度考古专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/second/年度艺人.webp" alt=""></div>
      <div class='pic' ><img src="@/assets/second/年度歌单.webp" alt=""></div>
      <div class='pic' id="lastpic"><img src="@/assets/second/第二届图标.jpg" alt=""></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'SecondIndex',
  data () {

  },
  methods: {

  }
}
</script>

<style>
.old2 {
  display: block;
  /* justify-content: center; */
}
.old2 #firstpic {
  margin-top: 150px;
}
.old2 .pic{
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 550px;
}
.old2 #lastpic {
  width: 150px;
}

@media (max-width: 768px) {
  .old2 .pic{
    margin-top: 170px;
    width: 100vw;
  }
  .old2 #lastpic {
    margin-top: 200px;
    width: 40vw;
    margin-bottom: 200px;
  }
  .old2 #firstpic {
  margin-top: 180px;
}
}

</style>
