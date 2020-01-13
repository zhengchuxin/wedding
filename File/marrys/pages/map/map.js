var api = require('../../api/api.js')
var app = getApp()
var editId = ''
var editName = ''
var bgImg = ''

/**
 * 需要上传信息
 * inviteLongitude:经度
 * inviteLatitude:纬度
 */
let inviteName = ''//Mr.王&Miss.刘
let inviteDateOne = ''//谨定于 2018年8月18日
let inviteDateTwo = ''//农历 2018年七月初八 举办婚礼
let inviteAddress = ''//地址：沧州市盐山县庆云镇前簸箕村(点击导航)
let inviteLongitude = null//117.398193
let inviteLatitude = null//37.895525

Page({
  data: {
    inviteName: inviteName,
    inviteDateOne: inviteDateOne,
    inviteDateTwo: inviteDateTwo,
    inviteAddress: inviteAddress,
    inviteLongitude: inviteLongitude,
    inviteLatitude: inviteLatitude,
    isOfficial: app.globalData.isOfficial,
    editImg: api.image + "ic_edit.png",
    saveImg: api.image + "ic_save.png",
    editWhiteImg: api.image + "ic_edit_white.png",
    bgImg: bgImg
  },
  onLoad: function() {
    wx.showLoading({ title: '加载中', })
    var that = this
    that.downLoadMapInfo()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow', app.globalData.isOfficial)
    this.setData({
      isOfficial: app.globalData.isOfficial
    })

  },
  /**
 * 现在首页数据
 */
  downLoadMapInfo: function () {
    var that = this
    wx.request({

      url: api.devDomain + 'getAddress',
      method: 'GET',
      success: function (res) {
        if (200 == res.data.code) {
          if (res.data.result.length >= 1) {
      
            inviteName = res.data.result[0].name,
              inviteDateOne = res.data.result[0].timeString,
              inviteDateTwo = res.data.result[0].time,
              inviteAddress = res.data.result[0].address,
              inviteLongitude = res.data.result[0].lag,
              inviteLatitude = res.data.result[0].lat,
            //更新数据
            that.setData({
              inviteName: res.data.result[0].name,
              inviteDateOne: res.data.result[0].timeString,
              inviteDateTwo: res.data.result[0].time,
              inviteAddress: res.data.result[0].address,
              inviteLongitude: res.data.result[0].lag,
              inviteLatitude: res.data.result[0].lat,
              bgImg: res.data.result[0].backgroundPic,
            })
          }
        }

      },
      error: function () {

      }
    })
  },

  /**
   * 地图导航
   */
  markertap(e) {
    wx.openLocation({
      latitude: parseFloat(inviteLatitude),
      longitude: parseFloat(inviteLongitude),
      scale: 18,
      name: '',
      address: ''
    })
  },

  /**
   * 地址修改
   */
  btnName: function() {
    this.setData({
      showModal: true,
      editId: 'btnName',
      editName: inviteName,
      isAddress: false
    })
  },
  /**
   * 阳历日期
   */
  btnDateOne: function() {
    this.setData({
      showModal: true,
      editId: 'btnDateOne',
      editName: inviteDateOne,
      isAddress: false
    })
  },
  /**
   * 阴历日期
   */
  btnDateTwo: function() {
    this.setData({
      showModal: true,
      editId: 'btnDateTwo',
      editName: inviteDateTwo,
      isAddress: false
    })
  },
  /**
   * 地址修改
   */
  btnAddress: function() {
    this.setData({
      showModal: true,
      editId: 'btnAddress',
      editName: inviteAddress,
      isAddress: true
    })
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
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.upLoadMapInfo()
    this.hideModal();
  },
  /**
   * input输入框内容
   */
  inputChange: function(e) {
    if ('btnName' == e.target.id) {
      inviteName = e.detail.value
    } else if ('btnDateOne' == e.target.id) {
      inviteDateOne = e.detail.value
    } else if ('btnDateTwo' == e.target.id) {
      inviteDateTwo = e.detail.value
    } else if ('btnAddress' == e.target.id) {
      inviteAddress = e.detail.value
    }
  },
  /**
   * input输入框经度内容
   */
  inputChangeJd: function(e) {
    inviteLongitude = e.detail.value
    console.log('inviteLongitude:', inviteLongitude)
  },
  /**
   * input输入框纬度内容
   */
  inputChangeWd: function(e) {
    console.log(e.detail.value)
    inviteLatitude = e.detail.value
  },
  /**
   * 上传地图信息
   */
  upLoadMapInfo: function() {
    var that = this
    wx.showLoading({
      title: '正在上传...',
    })
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'SAVE_MAP_INFO',
      },
      data: {
        'inviteName': inviteName,
        'inviteDateOne': inviteDateOne,
        'inviteDateTwo': inviteDateTwo,
        'inviteAddress': inviteAddress,
        'inviteLongitude': inviteLongitude,
        'inviteLatitude': inviteLatitude,
        'userId': app.globalData.hostUserId,
        'isOfficial': app.globalData.isOfficial
      },
      success: function (res) {
        wx.hideLoading()
        //更新数据
        that.setData({
          inviteName: inviteName,
          inviteDateOne: inviteDateOne,
          inviteDateTwo: inviteDateTwo,
          inviteAddress: inviteAddress,
          inviteLongitude: inviteLongitude,
          inviteLatitude: inviteLatitude
        })
      },
      error: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 上传背景图片
   */
  upLoadBgImage: function () {
    wx.showLoading({
      title: '正在上传...',
    })
    wx.uploadFile({
      url: api.mobileIn, //此处换上你的接口地址
      filePath: bgImg,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
        'method': 'SAVE_MAP_IMAGE'
      },
      formData: {
        'userId': app.globalData.hostUserId,
        'host': api.host,
        'isOfficial': app.globalData.isOfficial
      },
      success: function (res) {
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
      },
    })
  },
  
  onReady: function () {
    wx.hideLoading()  //showLoading 只能用此语句关闭
  },

  /**
   * 修改背景图片
   */
  editBg: function(e) {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths
        bgImg = tempFilePaths[0]
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          bgImg: bgImg
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        that.upLoadBgImage()
      }
    })
  },
})