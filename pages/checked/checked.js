Page({
    /**
     * 生命周期函数--监听页面加载
     */
    data:{
        allData:null,
        auditor:''
    },
    onLoad: function (options) {
        var that = this;
        var ta=options.id;
        var auditor = wx.getStorageSync('username')
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
                console.log(wx.getStorageSync('username'),'123')
                for (var index in res.data) {
                    if(ta == res.data[index].id){
                        that.setData({
                            allData: res.data[index],
                            auditor:auditor
                        })
                    }

                }

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
})
