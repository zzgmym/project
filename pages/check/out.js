Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: null,
        temp1: null,
        selectedData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.setNavigationBarTitle({
            title: '导出数据',
        })
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listCountByDate',
            data: {
                dept: wx.getStorageSync("dept")
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                that.setData({
                    listData: res.data
                })
                console.log(that.data.listData);
            }
        })
    },

    fileout: function (e) {
        if(wx.getStorageSync("admin")==1){
            var data = this.data.selectedData.join(',');
            console.log("选择的日期是："+data)
            wx.request({
                url: 'http://192.168.13.139:8989/MavenTest1/email/email',
                data: {
                    udate: data,
                    dept:wx.getStorageSync("dept"),
                    email:wx.getStorageSync("email")
                },
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function (res) {
                    console.log("返回result="+res.data)
                    if (res.data == true) {
                        wx.showToast({
                            title: '导出成功',
                            icon: 'success',
                            duration: 2000,
                            success: function () {
                                setTimeout(function () {
                                    wx.switchTab({
                                        url: '../check/out',
                                    })
                                }, 2000)
                            }
                        })
                    }else{
                        wx.showToast({
                            title: '导出失败，请重试',
                            icon:'none',
                            duration:2000
                        })
                    }
                }
            })
        }else{
            wx.showToast({
                title: '对不起，您没有权限',
                icon:'none',
                duration:2000
            })
        }
    },
    checkboxgroupBindchange: function (e) {
        var udate = e.detail.value
        console.log("udate="+udate)
        this.setData({
            selectedData: udate
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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