Page({

  /**
   * 页面的初始数据
   */
  data: {
    startProduceDate: '2018-01-01',
    endProduceDate: '2018-12-31',
    selectedProduceDate: '',
    selectedTime: '',
    startTime: '00:00',
    endTime: '23:59',
    selectedTime2: '',
    startTime: '00:00',
    endTime: '23:59',
    reason: '',
    id:''
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
    wx.setNavigationBarTitle({
      title: '修改记录'
    })
    var name = wx.getStorageSync('username')
    var dept = wx.getStorageSync('dept')
    this.setData({
      selectedProduceDate: options.udate,
      selectedTime: options.time1,
      selectedTime2: options.time2,
      reason:options.reason,
      id:options.id
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

  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.time2 > e.detail.value.time1) {
      wx.request({
        url: 'http://localhost:8989/MavenTest1/list/editEmp',
        method: 'POST',
        data: {
          reason: e.detail.value.reason,
          date1: e.detail.value.date1,
          time1: e.detail.value.time1,
          time2: e.detail.value.time2,
          id:this.data.id
        },
        header: {
          "Content-Type": "application/json; charset=utf8"
        },
        success: function (res) {
            wx.showToast({
              title: res.data>0?'修改成功':'修改失败',
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