var conf = require('../../config.js')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    listData: null,
    newname: ''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //查询该审核人未审核的申请，按日期倒序排列
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: conf.ip+'/MavenTest1/list/listByName',
      data: {
        // uname:"",
        name: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {


        that.setData({
          listData: res.data,
          newname: wx.getStorageSync('username').substring(wx.getStorageSync('username').length - 2)
        })
        console.log(res.data, '123')

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
  onPullDownRefresh: function() {
    console.log("刷新了！")
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: conf.ip+'/MavenTest1/list/listByName',
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
        for (var i = 0; i < listData.length; i++) {
          listData[i].newname = listData[i].uname.substring(listData[i].uname.length - 2);
        }
        that.setData({
          listData: res.data,
        })

      }
    })

  },
  gotoresult: function(event) {
    var id = event.currentTarget.id;

    wx.navigateTo({
      url: '../started/started?id=' + id,
    })

  },
})