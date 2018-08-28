Page({
  data: {
    listData:null
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8989/MavenTest1/list/list',
      data: {
        // uname:"",
        name: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          listData: res.data
        })
      }
    })

    wx.setNavigationBarTitle({
      title: '历史记录'
    })
  },

  reset: function (event) {
    var id = event.currentTarget.dataset.testid;
    var listdata = event.currentTarget.dataset.listdata;
     wx.navigateTo({
       url: '../history/reset?id='+listdata[id].id+'&udate='+listdata[id].udate+'&time1='+listdata[id].starttime+'&time2='+listdata[id].endtime+'&reason='+listdata[id].reason,
     })
  },

  onPullDownRefresh: function () {
    console.log("刷新了！")
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: 'http://localhost:8989/MavenTest1/list/list',
      data: {
        // uname:"",
        name: wx.getStorageSync('username')
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          listData: res.data
        })
      }
    })

  }
})