Page({

    /**
     * 页面的初始数据
     */
    data: {
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        listData: null,
        allData:null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //查询该审核人未审核的申请，按日期倒序排列
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listUncheck',
            data: {
                // uname:"",
                auditor: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                console.log(res,'res11111')
                    that.setData({
                        listData: res.data
                    })
            }
        })
        //查询该审核人已审核的申请，按日期倒序排列

            wx.request({
                url: 'http://192.168.13.139:8989/MavenTest1/list/listChecked',
                data: {
                    // uname:"",
                    auditor: wx.getStorageSync('username')
                },
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function (res) {
                    console.log(res.data,'123123')
                    that.setData({
                        allData: res.data,

                    })
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
    bindChange: function (e) {

        var that = this;
        that.setData({currentTab: e.detail.current});

    },
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */

    onPullDownRefresh: function () {
        console.log("刷新了！")
        wx.stopPullDownRefresh()
        var that = this;
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listUncheck',
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
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listChecked',
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
            url: '../details/details?id='+id+'&aaa=1',
        })

    },
    gotore:function (event) {
        var id =   event.currentTarget.id;

        wx.navigateTo({
            url: '../checked/checked?id='+id,
        })

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})