// pages/contect/contect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    listData: null,
    listname: [],
    selectedData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '联系人'
    })
    wx.request({
      url: 'http://192.168.13.139:8989/MavenTest1/user/listAuditor',
      data: {
        dept: wx.getStorageSync("dept")
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var name = new Array()
        for (var i = 0; i < res.data.length; i++) {
          name: name.push(res.data[i].uname.substring(res.data[i].uname.length - 2))
        }
        that.setData({
          listData: res.data,
          listname: name
        })
        console.log("uname=" + that.data.listData.uname)
        console.log("tel=" + that.data.listData.telephone)
      }
    })
  },
  // search:function(key){
  //   var that =this;
  //   key:'listData'
  //   var arr = []
  //   for(let i in res.data){
  //     res.data[i].show = false;

  //   }
  // },
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





