var conf = require('../../config.js')
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        wx.setNavigationBarTitle({
            title: '导出数据',
        })
        wx.request({
            url: conf.ip+'/MavenTest1/list/listCountByDate',
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
                if (res.data == '') {
                    wx.showToast({
                        title: '近一周内暂无数据',
                        icon: 'none',
                        duration: 4000
                    })
                }
            }
        })
    },
  checkboxgroupBindchange: function (e) {
    var udate = e.detail.value
    console.log("udate=" + udate)
    this.setData({
      selectedData: udate
    })

  },


    fileout: function (e) {
        if(wx.getStorageSync("admin")==1){
            var data = this.data.selectedData.join(',');
            console.log("选择的日期是："+data)
            var that = this
            if (that.data.selectedData == '') {
                wx.showToast({
                    title: '请选择日期',
                    icon:'none',
                    duration: 2000
                })
            } else {
                wx.request({
                    url: conf.ip+'/MavenTest1/email/email',
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
                        if (res.data == '1') {
                            wx.showToast({
                                title: '导出成功',
                                icon: 'success',
                                duration: 2000,
                                success: function (res) {
                                  var that = this
                                    setTimeout(function () {
                                       wx.switchTab({
                                         url: '../check/out',
                                       })
                                    }, 2000)
                                }
                            })
                        }else{ 
                            if(res.data=='-2'){
                                wx.showToast({
                                    title: '导出失败，请重试',
                                    icon:'none',
                                    duration:2000
                                })
                            }else if(res.data='-1'){
                                wx.showToast({
                                    title: '导出的数据不存在',
                                    icon:'none',
                                    duration:2000
                                })
                            }else if(res.data='0'){
                                wx.showToast({
                                    title: '请选择日期',
                                    icon:'none',
                                    duration:2000
                                })
                            }
                        }
                    }
                })
            }
        }else{
            wx.showToast({
                title: '对不起，您没有权限',
                icon:'none',
                duration:2000
            })
        }
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