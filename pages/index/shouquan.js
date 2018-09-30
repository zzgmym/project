// pages/index/shouquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d2ac00f1d52187d&redirect_uri=http%3a%2f%2f221s04360e.iask.in%2fMavenTest1%2fuser%2fgetOpenid2&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
  },

  onLoad:function(){
    console.log('我返回了')
    setTimeout(function () {
      wx.reLaunch({
        url: '../info/info',
      })
    }, 3000) 
  },
 
})