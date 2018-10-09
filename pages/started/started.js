var conf = require('../../config.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    listData: null,
    auditor: '',
    time: '',
    newname: '',
    imgs: [],
    showModal: false,
    ta: '',
    bbb: ''
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })

    var img = conf.ip + '/MavenTest1/images/';
    var that = this;
    var ta = options.id;
    console.log(ta, '123123')
    var auditor = wx.getStorageSync('username')
    wx.request({
      url: conf.ip + '/MavenTest1/list/findById',
      data: {
        id: ta
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },

      success: function(res) {

        if (res.data.status == '1') {
          that.setData({
            listData: res.data.employee,
            auditor: auditor,
            newname: res.data.employee.uname.substring(res.data.employee.uname.length - 2),
            time: res.data.timeDifference,
            bbb: '加班'
          })

        } else {
          var paths = img + res.data.leave.imgpath + '/' + res.data.leave.imgname
          var imgs = new Array
          imgs.push(paths)
          that.setData({
            listData: res.data.leave,
            auditor: auditor,
            newname: res.data.leave.uname.substring(res.data.leave.uname.length - 2),
            time: res.data.timeDifference,
            imgs: imgs,
            bbb: '请假'
          })

        }
      },
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
  //撤销
  chexiao: function() {
    var id = this.data.listData.id;
    console.log(this.data.listData.id, '99999')
    wx.request({
      url: conf.ip + '/MavenTest1/list/revokeById',
      data: {
        id: id
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },

      success: function(res) {
        console.log(res.data, 'eeeee')
        if (res.data.status) {
          wx.navigateTo({
            url: '../checked/checked?id=' + id+'&re=2',
          })
        }
      }
    })

  },
  preview: function() {
    var imgs = this.data.imgs
    wx.previewImage({
      urls: imgs,
    })
  }
})