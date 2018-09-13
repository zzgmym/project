Page({
    /**
     * 生命周期函数--监听页面加载
     */
    data:{
        listData:null,
        allData:null,
        auditor:'',
        ta:'',
        aaa:'',
        showModal: false
    },
    onLoad: function (options) {
        var that = this;
        var ta=options.id;
        var aaa=options.aaa
        var auditor = wx.getStorageSync('username')
        console.log(ta ,'11111');
        console.log(aaa ,'2222');
        console.log(wx.getStorageSync('username') ,'wx.getStorageSync(\'username\')');
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/list/listUncheck',
            data: {
                auditor: wx.getStorageSync('username')
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },

            success: function (res) {
                console.log(res.data,'000022222')
                for (var index in res.data) {
                    if(ta == res.data[index].id){
                        that.setData({
                            listData: res.data[index],
                            auditor:auditor,
                            ta:ta,
                            aaa:aaa
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
    gotore:function (event) {
        var id = event.currentTarget.id;
        var status = event.currentTarget.dataset.status;
        const params = {id, status};
        wx.navigateTo({
            url: `../opinion/opinion?params=${JSON.stringify(params)}`
        })
    },

    submit: function() {
        this.setData({
            showModal: true
        })
    },

    go: function() {
        this.setData({
            showModal: false
        })
    }


})
