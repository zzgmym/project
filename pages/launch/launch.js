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

    },
    /**
     * 生命周期函数--监听页面加载
     */
    //查询该审核人未审核的申请，按日期倒序排列
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listByName',
            data: {
                // uname:"",
                name: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                console.log(res.data,'1232')
                that.setData({
                    listData: res.data
                })

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
    onPullDownRefresh: function () {
        console.log("刷新了！")
        wx.stopPullDownRefresh()
        var that = this;
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listByName',
            data: {
                // uname:"",
                auditor: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                // console.log(res.data)
                that.setData({
                    listData: res.data,
                })
            }
        })

    },
    gotoresult: function (event) {
        var id =   event.currentTarget.id;

        wx.navigateTo({
            url: '../started/started?id='+id,
        })

    },
})