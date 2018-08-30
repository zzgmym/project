//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "" //用户昵称
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uname: wx.getStorageSync("username"),
    dept: wx.getStorageSync("dept")
  },

  //事件处理函数
  navigator: function (e) {
    wx.navigateTo({
      url: '../person/update',
    })
   
  },
  clear:function(){
    wx.reLaunch({
      url: '../index/index'
    })
      wx.clearStorageSync()
      console.log("缓存已清除")
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

      
    }
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh: function () {
      console.log("刷新了！")
      wx.stopPullDownRefresh()
      this.setData({
      uname: wx.getStorageSync("username"),
      dept: wx.getStorageSync("dept")
      })
 
  }
})
