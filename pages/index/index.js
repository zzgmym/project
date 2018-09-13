//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        show: "",
        token: null,
    },

    //手动登录
    formSubmit: function (e) {
        console.log(e,'wwwwww123');
        var that = this;
        if(e.detail.value.userName==''){
            wx.showToast({
                title: '请输入账号',
                icon:'none',
                duration:2000
            })
        } else if(e.detail.value.password==''){
            wx.showToast({
                title: '请输入密码',
                icon:'none',
                duration:2000
            })
        } else{
            wx.request({
                url: 'http://192.168.13.139:8989/MavenTest1/user/login',
                data: e.detail.value,
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function (res) {
                    if (res.data.token==null) {
                        wx: wx.showToast({
                            title: '用户名或密码错误！',
                            icon: 'none',
                        })
                    } else {
                        console.log('uname=' + res.data.user.uname)
                        console.log('dept=' + res.data.user.dept)
                        console.log('token=' + res.data.token)
                        console.log('admin=' + res.data.user.admin)
                        //存入缓存
                        wx.setStorageSync('username', res.data.user.uname)
                        wx.setStorageSync('dept', res.data.user.dept)
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('userid', res.data.user.username)
                        wx.setStorageSync('admin', res.data.user.admin)
                        wx.setStorageSync('email', res.data.user.email)
                        wx.setStorageSync('tel', res.data.user.telephone)
                        wx: wx.switchTab({
                            url: '../info/info',
                        })
                    }
                }
            })
        }
    },


    onLoad: function (res) {
        wx.setNavigationBarTitle({
            title: '登录'
        });
    },

    userNameInput: function (e) {
        console.log(e)
        // 设置用户名
        this.setData({
            userName: e.detail.value

        })
    },

    PWDInput: function (e) {
        console.log(e)
        //设置密码
        this.setData({
            password: e.detail.value
        })
    },
    orderMeeting: function () { //提交input信息到后台
        var userName = this.data.userName;
        console.log(userName)
        var password = this.data.password;
        console.log(password)
    },
})
