// pages/leave/leave.js
var conf = require('../../config.js')
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startProduceDate: '2018/01/01',
    endProduceDate: '',
    selectedProduceDate: '',
    startProduceDate: '2018/01/01',
    endProduceDate: '',
    selectedProduceDate2: '',
    array: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', "15:00", "16:00", "17:00", "18:00", "19:00"],
    items: [
      '年假', '事假', '病假', '调休', '产假', '陪产假', '婚假', '例假', '丧假', '哺乳假'
    ],
    reason: '',
    leavetype: '',
    imgs: [],
    plusShow: true,
    typevalue: '',
    contect: '',
    totaltime: '',
    start: null,
    end: null,
    dataresult: ''
  },
  bindPickerChange: function(e) {
    var that = this
    this.setData({
      index: e.detail.value
    })
  },
  dateChange: function(e) {
    this.setData({
      selectedProduceDate: e.detail.value
    })
  },
  timeChange: function(e) {
    this.setData({
      ind: e.detail.value
    })
  },
  dateChange2: function(e) {
    this.setData({
      selectedProduceDate2: e.detail.value
    })
  },
  endtimeChange: function(e) {
    this.setData({
      ind2: e.detail.value
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
      title: '请假申请'
    })

    var name = wx.getStorageSync('username')
    var dept = wx.getStorageSync('dept')
    var selectedProduceDate = util.formatTime(new Date());
    var selectedProduceDate2 = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      selectedProduceDate: selectedProduceDate,
      selectedProduceDate2: selectedProduceDate2
    });
  },

  addimage: function(e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;//本地临时文件路径列表，可用作src展示图片
        var imgs = that.data.imgs;
        console.log("图片：" + tempFilePaths)
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length > 1) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // imgs.push(tempFilePaths)
        that.setData({
          imgs: imgs
        });
        console.log("imgs：" + that.data.imgs)
        that.showHide();
      }
    })
  },
  preview: function(e) {
    var imgs = this.data.imgs;
    wx.previewImage({
      urls: imgs
    })
  },
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
    this.showHide();
  },
  showHide: function(e) {
    console.log("数组imgs长度：" + this.data.imgs.length)
    if (this.data.imgs.length >= 1) {
      this.setData({
        plusShow: false
      })
    } else {
      this.setData({
        plusShow: true
      })
    }
  },

  addcontect: function(e) {
    wx.navigateTo({
      url: '../contect/contect',
    })
  },
  onShow: function() {
    this.setData({
      contect: wx.getStorageSync("con")
    })
  },


  formSubmit: function(e) {
    var that = this;
    console.log("请假事由=" + e.detail.value.reason)
    console.log("请假类型=" + e.detail.value.leavetype)
    console.log("请假时长=" + e.detail.value.days + "天" + e.detail.value.hours + "时")
    console.log("审批人=" + wx.getStorageSync('contect'))
    console.log("上传图片个数=" + that.data.imgs.length)

    if (e.detail.value.date2 < e.detail.value.date1) {
      wx.showToast({
        title: '时间选择有误，请重新选择',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.leavetype == null) {
      wx.showToast({
        title: '请选择请假类型',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.reason == '') {
      wx.showToast({
        title: '请填写请假事由',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.days == '' || e.detail.value.hours == '') {
      wx.showToast({
        title: '请填写请假时长',
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.contect == '') {
      wx.showToast({
        title: '请选择审批人',
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.imgs.length == 0) {
      wx.request({
        url: conf.ip+'/MavenTest1/leave/add',
        method: 'POST',
        data: {
          reason: e.detail.value.reason,
          startdate: e.detail.value.date1,
          enddate: e.detail.value.date2,
          starttime: e.detail.value.time1,
          endtime: e.detail.value.time2,
          totaltime: e.detail.value.days + "天" + e.detail.value.hours + "时",
          utype: e.detail.value.leavetype,
          uname: wx.getStorageSync('username'),
          dept: wx.getStorageSync('dept'),
          auditor: wx.getStorageSync('contect'),
          formId: e.detail.formId
        },
        header: {
          "Content-Type": "application/json; charset=utf8"
        },
        success: function (res) {
          if (res.data.status != '-1') {

            if (res.data.status == '1') {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
              })
              setTimeout(function (event) {
                var id = res.data.id;
                wx.navigateTo({
                  url: '../details/details?id=' + id + '&aaa=0',
                })
              }, 1000)
            } else if (res.data.status == '0') {
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 2000,
              })
            } else if (s.status == '2'){
              wx.showToast({
                title: '您暂时未关注公众号,请关注公众号以便接收信息',
                icon: 'none',
                duration: 3000
              })
              setTimeout(function (event) {
                var id = res.data.id;
                wx.navigateTo({
                  url: '../details/details?id=' + id + '&aaa=0',
                })
              },3000)
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
    } else {
      wx.uploadFile({
        url: conf.ip+'/MavenTest1/leave/add2',
        method: 'POST',
        filePath: that.data.imgs[0],
        name: 'image',
        formData: {
          reason: e.detail.value.reason,
          startdate: e.detail.value.date1,
          enddate: e.detail.value.date2,
          starttime: e.detail.value.time1,
          endtime: e.detail.value.time2,
          totaltime: e.detail.value.days + "天" + e.detail.value.hours + "时",
          auditor: wx.getStorageSync('contect'),
          utype: e.detail.value.leavetype,
          uname: wx.getStorageSync('username'),
          dept: wx.getStorageSync('dept'),
          formid: e.detail.formId
        },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function(res) {
          console.log(res, 'uuuuu')
          var s = (JSON.parse(res.data))
          console.log("result=" + s.status)

          if (s.status != '-1') {

            if (s.status == '1') {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
              })
              setTimeout(function (event) {
                var id = s.id;
                wx.navigateTo({
                  url: '../details/details?id=' + id + '&aaa=0',
                })
              }, 1000)
            } else if (s.status == '0') {
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 2000,
              })
            } else if (s.status == '2'){
              wx.showToast({
                title: '您暂时未关注公众号,请关注公众号以便接收信息',
                icon: 'none',
                duration: 3000
              })
              setTimeout(function (event) {
                var id = res.data.id;
                wx.navigateTo({
                  url: '../details/details?id=' + id + '&aaa=0',
                })
              }, 3000)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})