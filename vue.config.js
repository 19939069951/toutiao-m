/*
 * @Description: vue项目配置文件
 * @Author: Li Guangyin
 * @Date: 2022-03-11 23:53:12
 * @LastEditTime: 2022-03-14 18:21:27
 */
module.exports = {
  devServer: {
    open: true,
    proxy: { // 配置跨域
      '/mobile': {
        target: 'https://www.fastmock.site/mock/595655a88a215fe20edca6c2ab671c03', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, // 允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': '' // 重写路径
        }
      }
    }
  }
}