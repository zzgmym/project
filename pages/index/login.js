import config from '../../config.js'
var conf = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log("token====" + wx.getStorageSync('token'))
    console.log("正在发送token去验证")
    //发起网络请求
    wx.request({
      url: conf.ip + '/MavenTest1/user/autologin',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log("result=" + res.data)
        if (res.data == 1) {
          console.log("登录成功！")
          wx.switchTab({
            url: '../info/info',
          })
        } else {
          console.log("登录失败！")
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
  }

})