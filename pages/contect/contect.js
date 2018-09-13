// pages/contect/contect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        listData:null,
        listname:[],
        selectedData: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.setNavigationBarTitle({
            title: '联系人'
        })
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/user/listAuditorName',
            data: {
                dept:wx.getStorageSync("dept")
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                var name = new Array()
                for(var i=0;i<res.data.length;i++){
                    name: name.push(res.data[i].substring(res.data[i].length - 2))
                }
                that.setData({
                    listData: res.data,
                    listname: name
                })
                console.log("uname="+that.data.listData)
            }
        })
    },
    check:function(e){
        wx.navigateBack({
            delta:1
        })

    },

    checkboxgroupBindchange: function (e) {
        var contect = e.detail.value
        var con = contect[0].substring(contect[0].length - 2)
        console.log("选择的审批人是：" + contect)
        this.setData({
            selectedData: con
        })
        wx.setStorageSync("contect", contect[0])
        wx.setStorageSync("con", con)
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