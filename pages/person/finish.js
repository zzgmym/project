var app = getApp();
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
        listname:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //查询该审核人未审核的申请，按日期倒序排列
    onShow: function (options) {
        var that = this;
        wx.setNavigationBarTitle({
            title: '已完成',
        })
        wx.request({
            url: conf.ip+'/MavenTest1/list/listCheckedByName',
            data: {
                uname: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                if (res.data == '') {
                    wx.showToast({
                        title: '暂无数据',
                        icon: 'none',
                        duration: 4000
                    })
                } else {
                    var name = wx.getStorageSync("username").substring(wx.getStorageSync("username").length - 2)
                    that.setData({
                        listData: res.data,
                        listname: name
                    })
                }

            },

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
  gotoresult: function (event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../checked/checked?id=' + id + '&aaa=0'+'&re=1',
    })
  },
    onPullDownRefresh: function () {
        console.log("刷新了！")
        wx.stopPullDownRefresh()
        var that = this;
        wx.request({
            url: conf.ip+'/MavenTest1/list/listCheckedByName',
            data: {
                uname: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                var name = wx.getStorageSync("username").substring(wx.getStorageSync("username").length - 2)
                that.setData({
                    listData: res.data,
                    listname: name
                })
            }
        })

    },

})