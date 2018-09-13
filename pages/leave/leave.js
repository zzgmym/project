// pages/leave/leave.js
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startProduceDate: '2018/01/01',
        endProduceDate: '',
        selectedProduceDate: '',
        startProduceDate: '2018/01/01',
        endProduceDate: '',
        selectedProduceDate2: '',
        array: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', "15:00", "16:00", "17:00", "18:00", "19:00"],
        items: [
            '年假', '事假', '病假', '调休', '产假', '陪产假', '婚假', '例假', '丧假', '哺乳假'
        ],
        reason: '',
        leavetype: '',
        imgs: [],
        plusShow: true,
        typevalue: '',
        contect: '',
        totaltime: '',
        start: null,
        end: null
    },
    timeChange: function (e) {
        this.setData({
            ind: e.detail.value
        })
    },
    endtimeChange: function (e) {
        this.setData({
            ind2: e.detail.value
        })
    },
    dateChange: function (e) {
        this.setData({
            selectedProduceDate: e.detail.value
        })
    },
    dateChange2: function (e) {
        this.setData({
            selectedProduceDate2: e.detail.value
        })
    },
    bindPickerChange: function (e) {
        var that = this
        this.setData({
            index: e.detail.value
        })
    },

    reasonInput: function (e) {
        this.setData({
            reason: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '请假申请'
        })

        var name = wx.getStorageSync('username')
        var dept = wx.getStorageSync('dept')
        // console.log(name)
        // console.log(dept)
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var selectedProduceDate = util.formatTime(new Date());
        var selectedProduceDate2 = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            selectedProduceDate: selectedProduceDate,
            selectedProduceDate2: selectedProduceDate2
        });
    },

    addcontect: function (e) {
        wx.navigateTo({
            url: '../contect/contect',
        })
    },
    onShow: function () {
        this.setData({
            contect: wx.getStorageSync("con")
        })
    },

    addimage: function (e) {
        var that = this
        wx.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                var imgs = that.data.imgs;
                console.log("图片：" + tempFilePaths)
                for (var i = 0; i < tempFilePaths.length; i++) {
                    if (imgs.length >= 3) {
                        that.setData({
                            imgs: imgs
                        });
                        return false;
                    } else {
                        imgs.push(tempFilePaths[i]);
                    }
                }
                that.setData({
                    imgs: imgs
                });
                console.log("imgs：" + that.data.imgs)
                that.showHide();
            }
        })
    },
    preview: function (e) {
        var index = e.currentTarget.dataset.index;
        //所有图片
        var imgs = this.data.imgs;
        wx.previewImage({
            //当前显示图片
            current: imgs[index],
            //所有图片
            urls: imgs
        })
    },
    deleteImg: function (e) {
        var imgs = this.data.imgs;
        var index = e.currentTarget.dataset.index;
        imgs.splice(index, 1);
        this.setData({
            imgs: imgs
        });
        this.showHide();
    },
    showHide: function (e) {
        console.log("数组imgs长度：" + this.data.imgs.length)
        if (this.data.imgs.length >= 3) {
            this.setData({
                plusShow: false
            })
        } else {
            this.setData({
                plusShow: true
            })
        }
    },

    formSubmit: function (e) {
        var that = this;
        console.log("请假事由=" + e.detail.value.reason)
        console.log("请假类型=" + e.detail.value.leavetype)
        console.log("请假时长="+e.detail.value.days+"天"+e.detail.value.hours+"时")
        console.log("审批人=" + wx.getStorageSync('contect'))
        console.log("上传图片个数=" + that.data.imgs.length)

        if (e.detail.value.date2 < e.detail.value.date1) {
            wx.showToast({
                title: '时间选择有误，请重新选择',
                icon: 'none',
                duration: 2000
            })
        } else if (e.detail.value.leavetype == null) {
            wx.showToast({
                title: '请选择请假类型',
                icon: 'none',
                duration: 2000
            })
        } else if (e.detail.value.reason == '') {
            wx.showToast({
                title: '请填写请假事由',
                icon: 'none',
                duration: 2000
            })
        } else if(e.detail.value.days==''||e.detail.value.hours==''){
            wx.showToast({
                title: '请填写请假时长',
                icon: 'none',
                duration: 2000
            })
        } else if(that.data.contect==''){
            wx.showToast({
                title: '请选择审批人',
                icon: 'none',
                duration: 2000
            })
        } else if (that.data.imgs.length == 0) {
            wx.request({
                url: 'http://192.168.13.139:8989/MavenTest1/leave/add',
                method: 'POST',
                data: {
                    reason: e.detail.value.reason,
                    startdate: e.detail.value.date1,
                    enddate: e.detail.value.date2,
                    starttime: e.detail.value.time1,
                    endtime: e.detail.value.time2,
                    totaltime: e.detail.value.days + "天" + e.detail.value.hours + "时",
                    utype: e.detail.value.leavetype,
                    uname: wx.getStorageSync('username'),
                    dept: wx.getStorageSync('dept'),
                    auditor: wx.getStorageSync('contect'),
                },
                header: {
                    "Content-Type": "application/json; charset=utf8"
                },
                success: function (res) {
                    console.log(res,'uuuuu')
                    if (res.data.status != '-1') {
                        wx.showToast({
                            title: res.data.status == '1' ? '提交成功' : '提交失败',
                            icon: 'none',
                            duration: 2000,
                        })
                        if(res.data.status == '1') {
                            setTimeout(function (event) {
                                    var id =  res.data.id;
                                    wx.navigateTo({
                                        url: '../details/details?id='+id+'&aaa=2',
                                    })
                            },1000)
                        }
                    } else {
                        wx.showToast({
                            title: '您已提交，请勿重复提交！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        } else {
            wx.uploadFile({
                url: 'http://192.168.13.139:8989/MavenTest1/leave/add2',
                method: 'POST',
                filePath: that.data.imgs[0],
                name: 'image',
                formData: {
                    reason: e.detail.value.reason,
                    startdate: e.detail.value.date1,
                    enddate: e.detail.value.date2,
                    starttime: e.detail.value.time1,
                    endtime: e.detail.value.time2,
                    totaltime: e.detail.value.days + "天" + e.detail.value.hours + "时",
                    auditor: wx.getStorageSync('contect'),
                    utype: e.detail.value.leavetype,
                    uname: wx.getStorageSync('username'),
                    dept: wx.getStorageSync('dept'),
                },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function (res) {

                    console.log("请假result=" + res.data)
                    if (res.data != '-1') {
                        wx.showToast({
                            title: res.data == '1' ? '提交成功' : '提交失败',
                            icon: 'none',
                            duration: 2000,
                        })
                    } else {
                        wx.showToast({
                            title: '您已提交，请勿重复提交！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */

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