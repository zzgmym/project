Page({
    /**
     * 生命周期函数--监听页面加载
     */
    data:{
        listData:null,
        auditor:''
    },
    onLoad: function (options) {
        var that = this;
        var ta=options.id;
        console.log(ta,'123123')
        var auditor = wx.getStorageSync('username')
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
                console.log(res.data,'rrrrr')
                for (var index in res.data) {
                    if(ta == res.data[index].id){
                        that.setData({
                            listData: res.data[index],
                            auditor:auditor
                        })

                    }

                }


                //
                // that.setData({
                //     listData: res.data
                // })

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
})
