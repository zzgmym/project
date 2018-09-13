// pages/A-centrality/A-mySetting/A-password/A-password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:null,
    text2: null,
    text3: null
  },
  formsub: function (e) {
    console.log(e)
    var oldPwd = e.detail.value.oldPwd;
    var newPwd = e.detail.value.newPwd;
    var newPwd2 = e.detail.value.newPwd2;

    if (oldPwd == '' || newPwd == '' || newPwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (newPwd != newPwd2) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: "http://192.168.13.139:8989/MavenTest1/login/editpassword",
        method: 'POST',
        data: {
          userid:wx.getStorageSync("userid"),
          oldPwd: oldPwd,
          newPwd: newPwd
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log(res.data);
          if (res.data == 0) {
            wx.showToast({
              title: "密码输入错误",
              icon: 'none',
              duration: 2000,
            })
          } else if (res.data == 1) {
            wx.showToast({
              title: "修改成功！",
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }, 2000)
              }
            })
          }
        }
      })
    }
  },
  delete1:function(e){
    this.setData({
      text1:""
    })
  },
  delete2: function (e) {
    this.setData({
      text2: ""
    })
  },
  delete3: function (e) {
    this.setData({
      text3: ""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '修改密码'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})