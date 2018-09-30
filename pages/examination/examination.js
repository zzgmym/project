var conf = require('../../config.js')
Page({
    data: {
        listData:null,

    },
    onShow: function () {
        var that = this;
        wx.request({
            url: conf.ip+'/MavenTest1/list/findUncheckCount',
            data: {
                auditor: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                console.log(res.data,'1111111')
                that.setData({
                    listData: res.data
                })

            },

        })
    },


    onPullDownRefresh: function () {
        console.log("刷新了！")
        wx.stopPullDownRefresh()
        var that = this;
        wx.request({
            url: conf.ip+'/MavenTest1/list/findUncheckCount',
            data: {
                auditor: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                // console.log(res.data)
                that.setData({
                    listData: res.data
                })
            }
        })

    }
})