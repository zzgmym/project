var conf = require('../../config.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    allData: null,
    auditor: '',
    newname: '',
    bbb: '',
    imgs: [],
    re:1
  },
  onLoad: function (options) {
    var that = this;
    var ta = options.id;
    var auditor = wx.getStorageSync('username');
    var img = conf.ip+'/MavenTest1/images/';
    var re = options.re;
    console.log('re====' + re)
    that.setData({
      re: re
    })
    wx.request({
      url: conf.ip+'/MavenTest1/list/findById',
      data: {
        auditor: auditor,
        id: ta
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data, '000022222')
        if (res.data.status == '1') {
          that.setData({
            allData: res.data.employee,
            auditor: res.data.employee.auditor.substring(res.data.employee.auditor.length - 2),
            newname: res.data.employee.uname.substring(res.data.employee.uname.length - 2),
            ta: ta,
            bbb: '加班'
          })
        } else {
          var paths = img + res.data.leave.imgpath + '/' + res.data.leave.imgname
          var imgs = new Array
          imgs.push(paths)
          that.setData({
            allData: res.data.leave,
            auditor: res.data.leave.auditor.substring(res.data.leave.auditor.length - 2),
            newname: res.data.leave.uname.substring(res.data.leave.uname.length - 2),
            ta: ta,
            bbb: '请假',
            imgs: imgs
          })
          console.log(imgs, '3333')
        }

      }
    })
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  preview:function(){
    var imgs=this.data.imgs
    wx.previewImage({
      urls: imgs,
    })
  },
  onUnload:function(options){
    if (this.data.re == '0'){
    wx.navigateBack({
      delta:2
    })
    } else if (this.data.re == '2'){
      wx.navigateBack({
        delta: 1
      })
    }

  }


})
