Page({
  data: {
    listData: null,
    // 展开折叠
    selectedFlag: [false],
    temp1:null,
    selectedData: [],
    count:''
  },
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.13.139:8989/MavenTest1/list/listByDate',
      data: {
        dept:wx.getStorageSync("dept")
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
      title: '审批'
    })
  },
  checkboxgroupBindchange: function (e) {
    var id = e.detail.value
    console.log("id=" +id)
    this.setData({
      selectedData : id
    })
  },
 
  checkok: function (e) {
    var data = this.data.selectedData.join(',');
    wx.request({
      url: 'http://192.168.13.139:8989/MavenTest1/list/passByIds',
      data: {temp1: data},
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      }, 
      success: function (res) {
        console.log('审核通过！')
        wx.showToast({
          title: res.data == '1' ? '审核成功' : '审核失败',
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../check/check',
              })
            }, 2000)
          }
        })
      }
    })

  },
 
  onUnload: function () {
    wx.reLaunch({
      url: '../info/info'
    })
  },
  out: function (e) {
    wx.navigateTo({
      url: './out'
    })
  }

})