// pages/bless/index.js
var api = require('../../../api/api.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getPraiseList()
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getPraiseList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // 获取赞列表
  getPraiseList: function () {
    var that = this
    wx.request({
      url: api.devDomain + 'getPraiseList',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',

      success: function (res) {
        wx.hideToast()
        if (200 == res.data.code) {
          console.log(res.data.result);
          //更新数据
          that.setData({
            zanLog: res.data.result
          })
        }
      },
    })
  },
  loadMoreFriends: function (e) {
    wx.navigateTo({
      url: 'blessDetail/blessDetail'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: 'http://img0.imgtn.bdimg.com/it/u=2231567854,4206478950&fm=26&gp=0.jpg',
      path: "pages/splash/splash?hostUserId=" + app.globalData.hostUserId,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  zan: function (event) {
    var that = this;
    var params = new Object()
    if (app.globalData.openIdMsg == "查询openId成功") {
      params.nickName = userInfo.nickName;
      params.avatarUrl = userInfo.avatarUrl;
      params.gender = userInfo.gender;
      params.country = userInfo.country;
      params.province = userInfo.province;
      params.city = userInfo.city;
      params.openId = app.globalData.openId;
    } else {
      params.nickName = "审核";
      params.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/L6SG55UJpKRgM12pUGIPOftHibgMFFPR5OquI5pPCYAyiax7xN4TRsYNqZA08P3nrhEVKjOeG2CV8xOMHMcviaHLg/132";
      params.gender = '1';
      params.country = '1';
      params.province = '1';
      params.city = '1';
      params.openId = '1';
    }


    wx.request({
      url: api.devDomain + 'addPraise',
      data: params,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {

        if (200 == res.data.code) {
          console.log(res.data)
          that.getPraiseList()
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
})