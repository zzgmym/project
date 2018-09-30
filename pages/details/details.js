var conf = require('../../config.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    listData: null,
    allData: null,
    auditor: '',
    ta: '',
    aaa: '',
    showModal: false,
    bbb: '',
    newname: '',
    ssss: '',
    imgs: []

  },
  onLoad: function(options) {
    var img = conf.ip+'/MavenTest1/images/'
    var that = this;
    var ta = options.id;
    var aaa = options.aaa
    var auditor = wx.getStorageSync('username')
    wx.request({
      url: conf.ip+'/MavenTest1/list/findById',
      data: {
        id: ta
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },

      success: function(res) {
        var ssss = res.data.timeDifference;
        if (res.data.status == '1') {
          that.setData({
            listData: res.data.employee,
            auditor: res.data.employee.auditor.substring(res.data.employee.auditor.length - 2),
            ta: ta,
            aaa: aaa,
            bbb: '加班',
            newname: res.data.employee.uname.substring(res.data.employee.uname.length - 2),
            time: ssss

          })

        } else {
          var paths = img + res.data.leave.imgpath + '/' + res.data.leave.imgname
          var imgs = new Array
          imgs.push(paths)
          that.setData({
            listData: res.data.leave,
            auditor: res.data.leave.auditor.substring(res.data.leave.auditor.length - 2),
            ta: ta,
            aaa: aaa,
            bbb: '请假',
            newname: res.data.leave.uname.substring(res.data.leave.uname.length - 2),
            time: ssss,
            imgs: imgs
          })
        }
      }
    })

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  gotore: function(event) {
    var id = event.currentTarget.id;
    var status = event.currentTarget.dataset.status;
    const params = {
      id,
      status
    };
    wx.navigateTo({
      url: `../opinion/opinion?params=${JSON.stringify(params)}`
    })
  },

  submit: function() {
    this.setData({
      showModal: true
    })
  },

  go: function() {
    this.setData({
      showModal: false
    })
  },
  chexiao: function() {
    var id = this.data.ta;
    wx.request({
      url: conf.ip+'/MavenTest1/list/revokeById',
      data: {
        id: id
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.status) {
          wx.navigateTo({
            url: '../checked/checked?id=' + id+'&re=2',
          })
        }
      }
    })

  },
  preview:function(){
    var imgs = this.data.imgs;
    wx.previewImage({
      urls: imgs
    })
  }



})