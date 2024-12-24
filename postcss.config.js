// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1519.2,
      fontViewportUnit: 'vw' // 确保字体大小使用视口宽度单位
    }
  }
}
// const pxtovw = require('postcss-px-to-viewport')
// module.exports = {
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           new pxtovw({
//             unitToConvert: 'px', // 需要转换的单位，默认为"px"
//             viewportWidth: 1519.2, // 视窗的宽度，对应的是我们设计稿的宽度
//             // viewportHeight: 1334,//视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置，此处未配置
//             unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
//             propList: ['*'], // 能转化为vw的属性列表,*表示匹配所有，!表示不匹配
//             viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
//             fontViewportUnit: 'vw', // 字体使用的视口单位
//             selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
//             minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
//             mediaQuery: false, // 不允许在媒体查询中转换`px`,默认是false
//             replace: true, // 是否直接更换属性值，而不添加备用属性
//             exclude: [/node_modules/] // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
//           // landscape: true, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape),此项目仅用在移动端，未配置
//           // landscapeUnit: 'vw', //横屏时使用的单位
//           // landscapeWidth: 1134 //横屏时使用的视口宽度
//           })
//         ]
//       }
//     }
//   }
// }
