Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: null,
    temp1: null,
    selectedData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8989/MavenTest1/list/listCountByDate',
      data: {
        dept: wx.getStorageSync("dept")
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData({
          listData: res.data
        })
        console.log(that.data.listData);
      }
    })
  },

  fileout: function (e) {
    var data = this.data.selectedData.join(',');
    wx.request({
      url: 'http://localhost:8989/MavenTest1/list/editStatus',
      data: { temp1: data },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log('导出成功！')
        wx.showToast({
          title: '导出成功！',
          icon: 'success',
          duration: 2000
        })
        res.onLoad;
      }
    })
  },
  checkboxgroupBindchange: function (e) {
    var udate = e.detail.value
    console.log("udate=" + udate)
    this.setData({
      selectedData: udate
    })
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