Page({
  data: {
    listData:null,
    lists:[{},{}],

  },
  onLoad: function () {
    var that = this;
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
        console.log(res.data,'1232')
        that.setData({
          listData: res.data
        })

      },

    })

    wx.setNavigationBarTitle({
      title: '历史记录'
    })
  },
    //删除地址

    deleteClick:function(event){

        var id = event.currentTarget.dataset.deleteid;
        console.log(event.currentTarget.dataset.deleteid,'pp22222')

        wx.request({

            url: 'http://192.168.13.139:8989/MavenTest1/list/delEmp',

            data: {id},

            method: 'POST',

            success: function(res){

                if(res.data.status == 0){

                    this.onPullDownRefresh()

                }else{

                    wx.showToast({

                        title: '删除成功',

                        icon: 'success',

                        duration: 1000

                    })

                    //删除之后应该有一个刷新页面的效果，等和其他页面刷新跳转一起做

                }

            },

            fail:function(){

                wx.showToast({

                    title: '服务器网络错误!',

                    icon: 'loading',

                    duration: 1500

                })

            }

        })

    },
    delList: function () {
        var lists = this.data.lists;
        lists.pop();      //实质是删除lists数组内容，使for循环少一次
        this.setData({
            lists: lists,
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
        // console.log(res.data)
        that.setData({
          listData: res.data
        })
      }
    })

  }
})