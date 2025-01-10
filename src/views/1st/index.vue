<template>
  <div class="theCart">
    <div class="header oldtop">
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
    <div class="old oldtop2">
      <div class='pic' id="firstpic"><img src="@/assets/first/年度专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度考古专辑.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度艺人.webp" alt=""></div>
      <div class='pic'><img src="@/assets/first/年度歌单1.webp" alt=""></div>
      <div class='pic' id="mtz"><img src="@/assets/first/年度歌单2.webp" alt=""></div>
      <div class='pic' id="mtz"><img src="@/assets/first/年度歌单3.webp" alt=""></div>
      <div class='pic' id="mtz"><img src="@/assets/first/年度歌单4.webp" alt=""></div>
      <div class='pic' id="lastpic"><img src="@/assets/first/第一届图标.webp" alt=""></div>
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
.old .pic{
  margin-top: 14px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
.old #firstpic {
  margin-top: 150px;
}
.old #mtz {
  margin-top: 0px;
}
.old #lastpic {
    width: 200px;
}
@media (max-width: 768px) {
  .old .pic{
    margin-top: 170px;
    width: 100vw;
  }
  .old #firstpic {
    margin-top: 180px;
  }
  .old #mtz {
    margin-top: 2px !important
  }
  .old #lastpic {
    margin-top: 200px;
    width: 40vw;
    padding-bottom: 200px;
  }
}
</style>
