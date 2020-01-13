var api = require('../../api/api.js')
var util = require('../../utils/util.js')
var app = getApp()

var inputName = ''
var imgUrlsDefault = []

// var musicUrl = 'http://www.ytmp3.cn/down/49676.mp3'
var musicUrl = api.backMusic + '/mylove.mp3'

//数据可用接口返回 - 在此展示只是为了方便查看数据体
Page({
  data: {
    imgUrls: imgUrlsDefault,
    indicatorDots: true,
    autoplay: true,
    interval: 2600,
    duration: 1200,
    isPlayingMusic: true,
    music_url: musicUrl,
    isOfficial: app.globalData.isOfficial,
    icAdd: api.image + "ic_add_round.png",
    title_hint:'添加图片标题',
    editImg: api.image + "ic_edit.png"
  },
  //生命周期函数--监听页面加载
  onLoad: function(data) {
    wx.showLoading({ title: '加载中', })
    var that = this
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
        title: '',
        coverImgUrl: ''
      }),
      // that.saveUser(),
      that.downLoadHomeImgs()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      isOfficial: app.globalData.isOfficial
    })
  },
  /**
   * 下载首页数据
   */
  downLoadHomeImgs: function() {
    var that = this
    wx.request({
      url: api.devDomain + 'getHomeList',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (200 == res.data.code) {
          if (res.data.result.length >= 1) {
            //更新数据
            that.setData({
              imgUrls: res.data.result,
              swiperCurrentIndex: 0,
              showOrHidden: app.globalData.isShowAd == "1" ? false : false
            })
          }
        }
      },
      error: function() {

      }
    })
  },
  // 每条List点击事件
  jump: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'gridview/gridview?id=' + id,
    })

  },
  // 删除单个模块
  deleteItem: function (e) {
    let item = e.currentTarget.dataset.id
    this.deleteDetaiilImg(item)
  },

  /**
   * 添加图片
   */
  addImg: function(e) {
    this.setData({
      showModal: true
    });

  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {

  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    var that = this
    console.log('inputName', inputName)
    if (inputName == '') {
      that.setData({
        title_hint:'标题必填'
      })
    } else {
      that.hideModal();
      that.chooseImage();
    }
  },
  /**
   * input输入框内容
   */
  inputChange: function(e) {
    inputName = e.detail.value

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()  //showLoading 只能用此语句关闭
  },
  //保存用户信息
  // saveUser: function() {
  //   wx.request({
  //     url: api.mobileIn,
  //     method: 'GET',
  //     header: {
  //       method: 'SAVE_USER',
  //     },
  //     data: {
  //       openId: app.globalData.openId,
  //       userInfo: app.globalData.userInfo

  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  play: function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      console.log('this.data.music_url', this.data.music_url)
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})