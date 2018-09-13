Page({
    data:{
        listData:null,
    },
    onLoad: function (event) {
        var that = this;

        // console.log(event.currentTarget.dataset.deleteid,'0000000223333')
        wx.request({
            url: 'http://192.168.13.139:8989/MavenTest1/user/listAuditor',
            data: {
                // uname:"",
                dept: '技术',
            },
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                that.setData({
                    listData: res.data
                })

            },

        }),
            wx.setNavigationBarTitle({
                title: '历史记录'
            })
    },
    gotoresult: function (event) {
            var id =   event.currentTarget.id;
            var listdata = event.currentTarget.dataset.uname;
            // console.log(id ,'000000000022222');
            // console.log(listdata ,'000000000');
            wx.navigateTo({
                // url: '../overtime/overtime?id='+id

                url: '../overtime/overtime?id='+id+'&uname='+listdata,
            })

        }
})
