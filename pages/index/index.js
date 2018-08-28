//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    show: "",
    token: "",
  },

  //手动登录
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8989/MavenTest1/login/login',
      data: e.detail.value,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.token=="") {
          wx: wx.showToast({
            title: '用户名或密码错误！',
            icon: 'none',
          });
          return;
        } else {
        console.log('uname=' + res.data.user.uname)
        console.log('dept=' + res.data.user.dept)
        console.log('token=' + res.data.token)
        console.log('admin=' + res.data.user.admin)
        //存入缓存
        wx.setStorageSync('username', res.data.user.uname)
        wx.setStorageSync('dept', res.data.user.dept)
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userid', res.data.user.username)
        wx.setStorageSync('admin', res.data.user.admin)
          wx: wx.switchTab({
            url: '../info/info',
          })
        }

      }
    })
  },


  onLoad: function (res) {
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
            hasUserInfo: true,
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: '登录'
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  userNameInput: function (e) {
    console.log(e)
    // 设置用户名
    this.setData({
      userName: e.detail.value

    })
  },

  PWDInput: function (e) {
    console.log(e)
    //设置密码
    this.setData({
      password: e.detail.value
    })
  },
  orderMeeting: function () { //提交input信息到后台
    var userName = this.data.userName;
    console.log(userName)
    var password = this.data.password;
    console.log(password)
  },


})
