// pages/A-centrality/A-mySetting/A-password/A-password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formsub: function (e) {
    console.log(e)
    var oldPwd = e.detail.value.oldPwd;
    var newPwd = e.detail.value.newPwd;
    var newPwd2 = e.detail.value.newPwd2;

    if (oldPwd == '' || newPwd == '' || newPwd2 == '') {
      wx.showToast({
        title: '密码不能为空',//kong
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
        url: "",
        method: 'POST',
        data: {
          oldPwd: oldPwd,
          newPwd: newPwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.error) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }, 2000)
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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