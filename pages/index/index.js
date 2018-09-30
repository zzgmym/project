//index.js
var conf = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    show: "",
    token: null,
    code:""
  },

  //手动登录
  formSubmit: function(e) {
    console.log(e, 'wwwwww123');
    var that = this;
    if (e.detail.value.userName == '') {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: conf.ip+'/MavenTest1/user/login',
        data: {
          userid:e.detail.value.userName,
          password:e.detail.value.password,
          code:that.data.code
          },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          if (res.data.token == null) {
            wx: wx.showToast({
              title: '用户名或密码错误！',
              icon: 'none',
            })
          }
          else {
            console.log('success')
            //存入缓存
            wx.setStorageSync('username', res.data.user.uname)
            wx.setStorageSync('dept', res.data.user.dept)
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('userid', res.data.user.userid)
            wx.setStorageSync('admin', res.data.user.admin)
            wx.setStorageSync('email', res.data.user.email)
            wx.setStorageSync('tel', res.data.user.telephone)
            console.log('openid2=' + res.data.user.openid2)
            if (res.data.user.openid2 == '' || res.data.user.openid2 ==null){
            wx.navigateTo({
              url: './shouquan',        
            })
          }else{
            wx.switchTab({
              url: '../info/info',
            })
          }
          }
        }
      })
    }
  },


  onLoad: function(e) {
    var that=this
    wx.login({
      success: function (res) {
        // code = res.code
        that.setData({
          code:res.code
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },


  userNameInput: function(e) {
    console.log(e)
    // 设置用户名
    this.setData({
      userName: e.detail.value

    })
  },

  PWDInput: function(e) {
    console.log(e)
    //设置密码
    this.setData({
      password: e.detail.value
    })
  },
  orderMeeting: function() { //提交input信息到后台
    var userName = this.data.userName;
    console.log(userName)
    var password = this.data.password;
    console.log(password)
  },
})