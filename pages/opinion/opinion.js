var conf = require('../../config.js')
var app = getApp();
Page({
  data: {
    temp1: '',
    checkreason: '',
    text1: '',
    ta: '',
    status: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var params = JSON.parse(options.params);

    var status = params.status
    console.log(status, '000')
    this.setData({
      ta: params.id,
      status: params.status
    })
    console.log(status, 'llll')
  },
  reasonInput: function(e) {
    this.setData({
      text1: e.detail.value,
    })
  },

  formSubmit: function(e) {
    var auditor = wx.getStorageSync('username')
    var formData = this.data.text1
    var temp = this.data.ta
    var status = this.data.status
    var formid = e.detail.formId
    console.log(status, '987')
    wx.request({

      url: status == '同意' ? conf.ip + '/MavenTest1/list/passByIds' : conf.ip + '/MavenTest1/list/unpassByIds',
      method: 'POST',
      data: {
        id: temp,
        auditor: auditor,
        checkreason: formData,
        formId: formid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        wx.navigateTo({
          url: '../checked/checked?id=' + temp+'&re=0',
        })
      }

    })
  },

})