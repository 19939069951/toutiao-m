/*
 * @Description: px 转 rem
 * @Author: Li Guangyin
 * @Date: 2022-03-11 20:37:07
 * @LastEditTime: 2022-03-16 23:06:41
 */
// 不能转换行内样式 <div style="color: red"></div> 这种不会转换
module.exports = {
  // 配置要是用的postcss插件
  // 作用:生成浏览器css样式规则前缀
  plugins: {
    // 配置使用postcss-pxtorem 插件
    'postcss-pxtorem': {
      // lib-flexible的rem适配方案: 把一行分为10份,没分就是十分之一
      // 所以rootValue应该设置为你设计稿宽度的十分之一
      // 我们的设计稿是750,所以应该设置为750/10 = 75
      // 但是vant建议设置为37.5,为什么?因为vant是基于375写的
      // 有没有更好的办法?
      // 如果是vant的样式,就按照37.5来转换
      // 如果是我们自己的样式,就按照75来转换
      // rootValue支持下面两种格式
      //    number 固定数值
      //    function 可以动态返回,postcss-pxtorem处理每个css文件的时候来调用会把被处理的css文件相关的信息通过参数传递给该函数
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      exclude: 'github-makdown', // 配置不需要转换的样式资源
      // 配置要转换的css属性 *表示所有
      propList: ['*']
    }
  }
}
