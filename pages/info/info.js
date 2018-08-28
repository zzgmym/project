// pages/index/info.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startProduceDate: '2018/01/01',
    endProduceDate: '2018/12/31',
    selectedProduceDate: '',
    selectedTime: '17:00',
    startTime: '00:00',
    endTime: '23:59',
    selectedTime2: '21:00',
    startTime: '00:00',
    endTime: '23:59',
  },
  timeChange: function (e) {
    this.setData({
      selectedTime: e.detail.value
    })
  },
  endtimeChange: function (e) {
    this.setData({
      selectedTime2: e.detail.value
    })
  },
  dateChange: function (e) {
    this.setData({
      selectedProduceDate: e.detail.value
    })
  },
  reasonInput: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar({
      success: function (e) {
        url: "../info/info"
      }
    })

    wx.setNavigationBarTitle({
      title: '加班登记'
    })
    var name = wx.getStorageSync('username')
    var dept = wx.getStorageSync('dept')
    // console.log(name)
    // console.log(dept)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var selectedProduceDate = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      selectedProduceDate: selectedProduceDate
    });

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

  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.time2 > e.detail.value.time1) {
      wx.request({
        url: 'http://localhost:8989/MavenTest1/list/add',
        method: 'POST',
        data: {
          reason: e.detail.value.reason,
          date1: e.detail.value.date1,
          time1: e.detail.value.time1,
          time2: e.detail.value.time2,
          name: wx.getStorageSync('username'),
          dept: wx.getStorageSync('dept')
        },
        header: {
          "Content-Type": "application/json; charset=utf8"
        },
        success: function (res) {
          // console.log("x=" + res.data)
          if (res.data!= '-1') {
            wx.showToast({
              title: res.data=='1'? '提交成功' : '提交失败',
              icon: 'none',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../history/history',
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '您已提交，请勿重复提交！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '时间选择有误，请重新选择',
        icon: 'none',
        duration: 2000
      })
    }
  },
  orderMeeting: function () { //提交input信息到后台
    var time1 = this.data.time1;
    console.log(time1)
    var time2 = this.data.time2;
    console.log(time2)
    var reason = this.data.reason;
    console.log(reason)
    var self = this;


  }
})