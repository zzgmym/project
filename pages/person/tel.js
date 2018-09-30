// pages/person/tel.js
var conf = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oldtel = wx.getStorageSync("tel")
    this.setData({
      telNum:oldtel
    })
    wx.setNavigationBarTitle({
      title: '修改手机号',
    })
  },
  updateTel:function(e){
    var that = this
    this.setData({
      telNum:e.detail.value.tel
    })
    console.log("tel="+that.data.telNum)
    wx.request({
      url: conf.ip+'/MavenTest1/user/editTelephone',
      data:{
        username:wx.getStorageSync("userid"),
        telephone:that.data.telNum
      },
      method:'POST',
      header: {
        "Content-Type": "application/json"
      },
      success:function(res){
        console.log("result="+res.data.status)
        console.log("reason="+res.data.reason)
        if(res.data.status==1){
          wx.setStorageSync('tel', that.data.telNum)
          wx.showToast({
            title: '修改成功！',
            icon:'success',
            duration:2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta:1
                })
              }, 2000)
            }
          })
        } else if(res.data.status==0){
          wx.showToast({
            title: '修改失败！',
            duration:2000
          })
        } else{
          wx.showToast({
            title: res.data.reason,
            icon:'none',
            duration:2000
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