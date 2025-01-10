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
            <a @click="$router.push({ path: '/award', query: { id: 1 } })" href="#">
                <img src="@/assets/logo.jpg" alt="">
            </a>
        </div>
      </div>
    </div>

    <div class="awardbeside">
        <a href="javascript:void(0);" @click="openNewTab('/3rd')">2023年</a>
        <a href="javascript:void(0);" @click="openNewTab('/2nd')">2022年</a>
        <a href="javascript:void(0);" @click="openNewTab('/1st')">2021年</a>
    </div>
    <div class="nav wrapper">
        <ul class="awardnav">
          <li @click="$router.push({ path: '/award', query: { id: 1 } })">年度流行专辑</li>
          <li @click="$router.push({ path: '/award', query: { id: 2 } })">年度摇滚专辑</li>
          <li @click="$router.push({ path: '/award', query: { id: 3 } })">年度电音专辑</li>
          <li @click="$router.push({ path: '/award', query: { id: 4 } })">年度考古专辑</li>
          <li class="playlistli">年度歌单</li>
        </ul>
    </div>
    <div class="cart forwide">
      <div class="title" id="playlistofyear">
        <h2>2024年度歌单</h2>
        <!-- <h4>买家id</h4> -->
        <!-- <p>数量</p> -->
      </div>
      <div class="row" id="playlist">
        <ul>
          <li v-for="(item) in orderList" :key="item.id">
            <img :src="item.image" alt="">
            <div class="desc">
              <a>{{item.name}}</a>
              <p>{{item.artist}}</p>
              <!-- <small class="bookstatus">{{ item.book_status === 2 ? '发货中' : '已完成' }}</small>
              <small v-if="item.book_status===2" @click.stop="delivery(index)" class="managebookstatus">点击发货</small>
              <small v-else @click.stop="removebook(index)" class="managebookstatus">移除订单</small> -->
            </div>
            <div class="date">{{ item.date }}</div>
            <span v-if="item.id<10">0{{item.id}}</span>
            <span v-else>{{item.id}}</span>
          </li>
        </ul>
      </div>
      <div id="bottomline"></div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'PlaylistIndex',
  data () {
    return {
      orderList: [
        { id: 1, name: 'Spring ls Coming With A Strawberry In The Mouth', artist: 'Caroline Polachek、Roger Doyle、Elena Lopez', image: require('@/assets/album/Spring is Coming.webp'), date: '2024-02-14' },
        { id: 2, name: 'Don\'t Lose This Moment Searching For Another', artist: 'Chet Porter', image: require('@/assets/album/Everything you.webp'), date: '2024-05-24' },
        { id: 3, name: '吉他手', artist: '陈绮贞', image: require('@/assets/album/groupies.webp'), date: '2002-08-05' },
        { id: 4, name: 'One Sunrise At A Time', artist: 'MYRNE', image: require('@/assets/album/One Sunrise At A Time.webp'), date: '2024-07-04' },
        { id: 5, name: 'Lucifer', artist: 'A.G.Cook', image: require('@/assets/album/Britpop.webp'), date: '2024-05-10' },
        { id: 6, name: 'Tunnel Vision', artist: 'Magdalena Bay', image: require('@/assets/album/Imaginal Disk.webp'), date: '2024-08-23' },
        { id: 7, name: 'Dream of Me', artist: 'NewDad', image: require('@/assets/album/MADRA.webp'), date: '2024-01-26' },
        { id: 8, name: 'Underwear', artist: 'Pulp', image: require('@/assets/album/Different Class.webp'), date: '1995-10-30' },
        { id: 9, name: '我亲爱的偏执狂', artist: '陈绮贞', image: require('@/assets/album/groupies.webp'), date: '2002-08-05' },
        { id: 10, name: 'Marula', artist: 'Robby East、A.M.R.', image: require('@/assets/album/Marula.webp'), date: '2023-03-07' },
        { id: 11, name: 'I Don\'t Recognise You', artist: 'NewDad', image: require('@/assets/album/I Don\'t Recognise You.webp'), date: '2020-11-27' },
        { id: 12, name: 'Weird Fishes/Arpeggi', artist: 'Radiohead', image: require('@/assets/album/In Rainbows.webp'), date: '2007-10-10' },
        { id: 13, name: 'In The Cold (OCULA Remix)', artist: 'Jerro、Familiar Faces', image: require('@/assets/album/in the cold.webp'), date: '2024-08-30' },
        { id: 14, name: 'Common People', artist: 'Pulp', image: require('@/assets/album/Different Class.webp'), date: '1995-10-30' },
        { id: 15, name: '包围', artist: '苏打绿', image: require('@/assets/album/包围.webp'), date: '2009-09-11' },
        { id: 16, name: 'Knock Yourself Out XD', artist: 'Porter Robinson', image: require('@/assets/album/Knock Yourself Out XD.webp'), date: '2024-04-24' },
        { id: 17, name: 'Roll with It', artist: 'Oasis', image: require('@/assets/album/roll with it.webp'), date: '1995-10-02' },
        { id: 18, name: 'Talk talk', artist: 'Charli xcx', image: require('@/assets/album/brat.webp'), date: '2024-06-07' },
        { id: 19, name: 'Carousel', artist: 'Ghostly Kisses', image: require('@/assets/album/Carousel.webp'), date: '2024-05-17' },
        { id: 20, name: 'Dear God', artist: '陶喆', image: require('@/assets/album/Dear God.webp'), date: '2002-08-09' },
        { id: 21, name: 'Old Pine', artist: 'Ben Howard', image: require('@/assets/album/Old Pine.webp'), date: '2011-10-04' },
        { id: 22, name: 'All I Know', artist: 'Sultan + Shepard、Julia Church', image: require('@/assets/album/All I Know.webp'), date: '2024-03-01' },
        { id: 23, name: 'Photograph', artist: 'Def Leppard', image: require('@/assets/album/Photograph.webp'), date: '1983-01-20' },
        { id: 24, name: 'Goeth the Fall', artist: 'The Smashing Pumpkins', image: require('@/assets/album/Goeth the Fall.webp'), date: '2024-08-02' },
        { id: 25, name: 'Sunrise', artist: 'Pulp', image: require('@/assets/album/Sunrise.webp'), date: '2001-01-01' },
        { id: 26, name: 'ordinary things', artist: 'Nonna、Ariana Grande', image: require('@/assets/album/ordinary things.webp'), date: '2024-03-11' },
        { id: 27, name: 'Train in Vain (Stand by Me)', artist: 'The Clash', image: require('@/assets/album/London Calling.webp'), date: '1979-12-14' },
        { id: 28, name: 'Cut Your Hair', artist: 'pavement', image: require('@/assets/album/Cut Your Hear.webp'), date: '1994-02-14' },
        { id: 29, name: 'Lima', artist: 'Sultan + Shepard', image: require('@/assets/album/Lima.webp'), date: '2024-08-08' },
        { id: 30, name: 'The National Anthem', artist: 'Radiohead', image: require('@/assets/album/Kid A.webp'), date: '2000-09-27' }
        // { id: 30, name: 'Metal Mickey', artist: 'Suede', image: require('@/assets/album/suede.webp'), date: '1993-03-29' }
      ]
    }
  },
  methods: {
    openNewTab (route) {
      const url = this.$router.resolve({ path: route }).href
      window.open(url, '_blank')
    }
  }
}
</script>

<style>
/* #playlistofyear {
  font-size: 25px;
} */
#playlistofyear {
  padding-bottom: 18px;
}
#playlistofyear h2{
  font-size: 30px;
  font-weight: 200;
}
@media (max-width: 768px) {
  #playlistofyear h2{
    margin-top: 6px;
    font-size: 12.5px;
    font-weight: 200;
  }
}
.nav .awardnav li {
  margin: 0 12px;
}
.playlistli {
  border-bottom: 0.8px solid #000;
}
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
#playlist .date {
  margin-top: 36px;
  width: 250px;
  /* font-weight: 200; */
  font-size: 13px;
}
/*  原方案 */
/* #playlist li {
  padding-top: 10px;
  padding-bottom: 10px;
}
#playlist li:nth-child(odd) {
  background-color:rgb(210,210,207);
}
#playlist img {
  border-radius: 1px;
} */

/*  新方案 */
#playlist li {
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  /* border-bottom: 1px solid #000; */
}
#playlist li:last-child {
  border-bottom: none;
}
#playlist li:nth-child(odd) {
  background-color:rgb(210,210,207);
}

#playlist li:hover {
  background-color: rgb(210,210,207);
}
#playlist .desc {
  flex: 1;
  white-space: nowrap; /* 保持文本在一行内 */
  overflow: hidden;
  text-overflow: ellipsis;
}
#playlist .desc a{
  padding-top: 13px;
  margin-bottom: 15px;
}
#playlist .desc p{
  font-size: 14px;
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
#playlist span {
  padding-top: 33px;
  padding-right: 15px;
  width: 35px;
  font-weight: 300;
}

.cart .line {
  height: 30px;
  border-bottom: 1px solid black;
  /* background-color: pink; */
}
#bottomline {
  border-top: 1px solid #000;
  height: 60px;
}
@media (max-width: 768px) {
  .forwide {
    margin-top: 30px;
    width: 280px;
  }
  #playlist li {
    height: 35px;
  }
  #playlist li img {
    height: 35px;
    width: 35px;
  }
  #playlist li .desc {
    padding-left: 6px;
    margin-top: 2px;
    font-size: 10px;
    font-weight: 400;
    white-space: nowrap; /* 保持文本在一行内 */
    overflow:unset;
    /* text-overflow: ellipsis; */
  }
  #playlist li .desc a {
    font-weight: 300;
    margin-bottom: 1px;
  }
  #playlist li .desc p {
    font-size: 8px;
    font-weight: 200;
  }
  #playlist .date {
    width: 55px;
    padding-left:7px;
    padding-top: 3.5px;
    font-size: 8px;
    font-weight: 200;
  }
  #playlist span {
    padding-top: 12px;
    padding-right: 13px;
    font-size: 8px;
    font-weight: 200;
  }
  #bottomline {
    border-top: 0.5px solid #000;
    height: 30px;
  }
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
