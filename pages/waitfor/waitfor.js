var conf = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    listData: null,
    allData: null,
    newname: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //查询该审核人未审核的申请，按日期倒序排列
  onShow: function(options) {
    var that = this;
    wx.request({
      url: conf.ip + '/MavenTest1/list/listUncheck',
      data: {
        // uname:"",
        auditor: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        var listData = res.data;
        if(listData.length==0){
          wx.showToast({
            title: '暂无数据',
            icon:'none',
            duration:2000
          })
        }
        for (var i = 0; i < listData.length; i++) {
          listData[i].newname = listData[i].uname.substring(listData[i].uname.length - 2);
        }
        that.setData({
          listData: listData
        })
      }
    })
    //查询该审核人已审核的申请，按日期倒序排列

    wx.request({
      url: conf.ip + '/MavenTest1/list/listChecked',
      data: {
        // uname:"",
        auditor: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        var allData = res.data;
        if (allData.length == 0) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
        }
        for (var i = 0; i < allData.length; i++) {
          allData[i].newname = allData[i].uname.substring(allData[i].uname.length - 2);
        }
        console.log(res.data, '123123')
        that.setData({
          allData: allData,

        })
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
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  gotoresult: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../details/details?id=' + id + '&aaa=1',
    })

  },
  gotore: function(event) {
    var id = event.currentTarget.id;

    wx.navigateTo({
      url: '../checked/checked?id=' + id+'&re=1',
    })

  },
  onPullDownRefresh: function () {
    console.log("刷新了！")
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: conf.ip + '/MavenTest1/list/listUncheck',
      data: {
        // uname:"",
        auditor: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var listData = res.data;
        for (var i = 0; i < listData.length; i++) {
          listData[i].newname = listData[i].uname.substring(listData[i].uname.length - 2);
        }
        that.setData({
          listData: listData
        })
      }
    })
    //查询该审核人已审核的申请，按日期倒序排列

    wx.request({
      url: conf.ip + '/MavenTest1/list/listChecked',
      data: {
        // uname:"",
        auditor: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var allData = res.data;
        for (var i = 0; i < allData.length; i++) {
          allData[i].newname = allData[i].uname.substring(allData[i].uname.length - 2);
        }
        console.log(res.data, '123123')
        that.setData({
          allData: allData,

        })
      }
    })
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