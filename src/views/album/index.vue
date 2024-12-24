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
              <a @click="$router.push({ path: '/award', query: { id: 1 } })" href="#">
                  <img src="@/assets/logo.jpg" alt="">
              </a>
          </div>
        </div>
    </div>
    <div class="nav wrapper">
        <ul class="awardnav">
          <li :class="{ activeli: goodsId <= 4 }" @click="$router.push({ path: '/award', query: { id: 1 } })">年度流行专辑</li>
          <li :class="{ activeli: goodsId>4 && goodsId <= 8 }" @click="$router.push({ path: '/award', query: { id: 2 } })">年度摇滚专辑</li>
          <li :class="{ activeli: goodsId>8 && goodsId <= 12 }" @click="$router.push({ path: '/award', query: { id: 3 } })">年度电音专辑</li>
          <li :class="{ activeli: goodsId>12 }" @click="$router.push({ path: '/award', query: { id: 4 } })">年度考古专辑</li>
          <li @click="$router.push(`/playlist`)">年度歌单</li>
        </ul>
    </div>
    <div class="detail wrapper" id="album">
      <div class="left">
        <img :src="goodsInfo.image" alt="">
      </div>
      <div class="right">
        <h1 id="namewide">{{goodsInfo.name}}</h1>
        <div class="price"><span>{{goodsInfo.price}}</span></div>
        <div class="date"><span>{{goodsInfo.date}}</span></div>
        <p class="description">{{goodsInfo.description}}</p>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'AlbumIndex',
  data () {
    return {
      goodsInfo: null,
      list: [
        { id: 1, name: 'Imaginal Disk', image: require('@/assets/album/Imaginal Disk.webp'), price: 'Magdanela Bay', date: '2024-08-23', description: '全年最爱！！！\n\nTunnel Vision、Watching TV、True Blue Interlude、Death & Romance' },
        { id: 2, name: 'BRAT', image: require('@/assets/album/brat.webp'), price: 'Charli xcx', date: '2024-06-07', description: 'bumping that bumping that...\n\nTalk talk、Mean girls、Apple、Von dutch、360' },
        { id: 3, name: 'My Method Actor', image: require('@/assets/album/My Method Actor.webp'), price: 'Nilüfer Yanya', date: '2024-09-13', description: '听感很流畅的一张indie pop，舒缓中却是冷静的控诉。\n\nBinding、Call It Love、Like I Say (I runaway)' },
        { id: 4, name: 'Short n\' Sweet', image: require('@/assets/album/Short n Sweet.webp'), price: 'Sabrina Carpenter', date: '2024-08-23', description: 'Short n sweet!\n\nGood Graces、Dumb & Poetic、Espresso、Taste' },

        { id: 5, name: 'MADRA', image: require('@/assets/album/MADRA.webp'), price: 'NewDad', date: '2024-01-26', description: '好听(盯)的Dream Pop\n你怎么知道我去看他们现场了?\n\nAngel、Dream of Me、Change My Mind、In My Head' },
        { id: 6, name: 'no, no!', image: require('@/assets/album/nono.webp'), price: '张醒婵', date: '2024-05-13', description: '淤青了吗？！、世界的B面、从A到Z、词汇字母一短篇巨著一、风之电话亭' },
        { id: 7, name: 'Romance', image: require('@/assets/album/Romance.webp'), price: 'FONTAINES D.C.', date: '2024-08-23', description: '来自爱尔兰的后朋克复兴浪潮。\n\nStarburster、Death Kink、Bug、Here\'s The Thing' },
        { id: 8, name: 'Bright Future', image: require('@/assets/album/Bright Future.webp'), price: 'Adrianne Lenker', date: '2024-03-22', description: '很美很美很美的民谣。\n\n"Bright Future并不真的是光明未来，而是一个讽刺我们没有未来这一事实的标题，Lenker在这张专辑时不时的提到了这一点。\n重点不是世界末日，而是世界末日之前的每一刻。你无可救药地坠入爱河，并希望自己能继续得到希望与机会。"\n\nFool、Real House、Free Treasure、Vampire Empire' },

        { id: 9, name: 'EVERYTHING YOU\'VE EVER SEEN', image: require('@/assets/album/Everything you.webp'), price: 'Chet Porter', date: '2024-05-24', description: '很走心的future bass，今年最喜欢的电子专辑！\n\nDon\'t Lose This Moment Searching For Another、Today Tomorrow Forever、Things l Wish l Could Forget、Hazel\'s Interlude' },
        { id: 10, name: 'SMILE! :D', image: require('@/assets/album/SMILE.webp'), price: 'Porter Robinson', date: '2024-07-26', description: 'Taylor Swift全新力作！(bushi\n\nPorter在几年前的一场关于上一张专辑的直播中说道:"Now that i\'ve finished this, we\'re gonna do some ignorant shit..."\n\nKnock Yourself Out XD、Year of the Cup、Is There Really No Happiness？、Kitsune Maison Freestyle' },
        { id: 11, name: 'Britpop', image: require('@/assets/album/Britpop.webp'), price: 'A.G.Cook', date: '2024-05-11', description: 'Lucifer、Silver Thread Golden Needle、Crescent Sun、Soulbreaker、Soulbreaker' },
        { id: 12, name: 'Bloom', image: require('@/assets/album/Bloom.webp'), price: 'Ben Böhmer', date: '2024-09-27', description: '暖暖的Melodic Progressive House，总能在熬夜时振幅人心陪你度过漫漫长夜。\n\nRust、Martin、Hiding、Beautiful' },
        // { id: 11, name: 'There Must Be Something Here', image: require('@/assets/album/There Must Be Something.webp'), price: 'acloudyskye', date: '2024-02-23', description: '依然是喜欢的电子+摇滚曲风，但是这张电子元素的占比少了很多，更偏向了后摇？\n\nSurface、Team、Left、Flares' },
        // { id: 12, name: 'Childish', image: require('@/assets/album/Childish.webp'), price: 'Lane 8', date: '2024-09-27', description: '写给女儿的专辑。相较于前专略显逊色。\n\nSay The Word、Childish、You、The Deep' },
        { id: 13, name: 'Groupies 吉他手', image: require('@/assets/album/groupies.webp'), price: '陈绮贞', date: '2002-08-05', description: '一听到《我亲爱的偏执狂》的前奏就仿佛回到了7月份在宿舍做旅行攻略的场景......\n\n我亲爱的偏执狂、吉他手、躺在你的衣柜、就算全世界与我为敌、1234567、小步舞曲' },
        { id: 14, name: 'The Rise and Fall of Ziggy Stardust and the Spiders From Mars', image: require('@/assets/album/Ziggy Stardust.webp'), price: 'David Bowie', date: '1972-06-16', description: 'Soul Love、Ziggy Stardust、Lady Stardust、Moonage Daydream、Starman' },
        { id: 15, name: 'Different Class', image: require('@/assets/album/Different Class.webp'), price: 'Pulp', date: '1995-10-30', description: '上个期末考循环曲《Underwear》\n\nUnderwear、Common People、Disco 2000、I Spy' },
        { id: 16, name: 'POWERS', image: require('@/assets/album/POWERS.webp'), price: '羊文学', date: '2020-12-09', description: '1999、powers、ghosts、おまじない' },
        { id: 17, name: 'Seamese Dream', image: require('@/assets/album/Seamese Dream.webp'), price: 'The Smashing Pumpkins', date: '1993-07-27', description: 'Cherub Rock、Luna、Rocket、Silverf**k、Today' },
        { id: 18, name: 'Parklife', image: require('@/assets/album/Parklife.webp'), price: 'Blur', date: '1994-04-25', description: 'Tracy Jacks、London Loves、Parklife、Badhead' },
        { id: 19, name: 'The Stone Roses', image: require('@/assets/album/The Stone Roses.webp'), price: 'The Stone Roses', date: '1989-05-01', description: 'She Bangs the Drums、This Is the One、I Wanna Be Adored、Made of Stone、Fools Gold' },
        { id: 20, name: 'Hounds Of Love', image: require('@/assets/album/Hounds of Love.webp'), price: 'Kate Bush', date: '1985-09-16', description: 'Waking The Witch、The Big Sky、Watching You Without Me、Running Up That Hill' }
      ]
    }
  },
  created () {
    this.goodsInfo = this.list[this.goodsId - 1]
  },
  computed: {
    goodsId () {
      return parseInt(this.$route.params.id)
    }
  },

  methods: {

  }
}
</script>

<style>
.description {
  white-space: pre-line;
  line-height: 24px;
}
@media (max-width: 768px) {
  .description {
    line-height: 10px;
    font-size: 8px;
  }
}
#album {
  margin-top: 205px !important;
}
@media (max-width: 768px) {
  #album {
    margin-top: 70px !important;
  }
}
.detail .right #namewide {
  margin-top: 30px;
  width: 450px;
}
#album .price {
  font-size: 20px;
}
.detail .right .date {
  margin-top: 12px;
  font-size: 16px;
}
#album .left {
  display: flex;
  justify-content: center;
  align-items: center;
}
#album img {
  border-radius: 1px;
  height: 450px;
  width: 450px;
}
</style>
