// pages/index/info.js
var util = require('../../utils/util.js');
var conf = require('../../config.js')
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
    endTime: '23:59'
  },
  timeChange: function(e) {
    this.setData({
      selectedTime: e.detail.value
    })
  },
  endtimeChange: function(e) {
    this.setData({
      selectedTime2: e.detail.value
    })
  },
  dateChange: function(e) {
    this.setData({
      selectedProduceDate: e.detail.value
    })
  },
  reasonInput: function(e) {
    this.setData({
      reason: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onShow: function() {
    this.setData({
      contect: wx.getStorageSync("con")
    })
  },

  //添加审批人
  addcontect: function(e) {
    wx.navigateTo({
      url: '../contect/contect',
    })
  },

  formSubmit: function(e) {
    var that = this;
    if (e.detail.value.time2 <= e.detail.value.time1) {
      wx.showToast({
        title: '时间选择有误，请重新选择',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.contect == '') {
      wx.showToast({
        title: '请选择审批人！',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: conf.ip+'/MavenTest1/list/add',
        method: 'POST',
        data: {
          reason: e.detail.value.reason,
          date1: e.detail.value.date1,
          time1: e.detail.value.time1,
          time2: e.detail.value.time2,
          auditors: wx.getStorageSync('contect'),
          name: wx.getStorageSync('username'),
          dept: wx.getStorageSync('dept'),
          formId: e.detail.formId
        },
        header: {
          "Content-Type": "application/json; charset=utf8"
        },
        success: function(res) {
          if (res.data.status != '-1') {
            wx.showToast({
              title: res.data.status == '1' ? '提交成功' : '提交失败',
              icon: 'none',
              duration: 2000,

            })
            if (res.data.status == '1') {
              setTimeout(function(event) {
                var id = res.data.id;
                wx.navigateTo({
                  url: '../details/details?id=' + id + '&aaa=0',
                })
              }, 1000)
            }
          } else {
            wx.showToast({
              title: '您已提交，请勿重复提交！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  orderMeeting: function() { //提交input信息到后台
    var time1 = this.data.time1;
    console.log(time1)
    var time2 = this.data.time2;
    console.log(time2)
    var reason = this.data.reason;
    console.log(reason)
    var self = this;
  }
})