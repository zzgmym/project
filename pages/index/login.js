Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("token====" + wx.getStorageSync('token'))
    console.log("正在发送token去验证")
    //发起网络请求
    wx.request({
      url:'http://localhost:8989/MavenTest1/login/autologin',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token') 
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
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