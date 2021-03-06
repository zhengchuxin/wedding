// pages/bless/index.js
var api = require('../../api/api.js')
var app = getApp()
var bgShare = ''
var inputTitleName = "震惊！她竟然做出了这种事情"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue: '',
    zanNum: 0,
    editImg: api.image + "ic_edit.png",
    isOfficial: app.globalData.isOfficial,
    showOrHidden: false,//判断显示与否的，true表示显示，反之隐藏
    inputTitleName: inputTitleName,
    showComment: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中', })
    var that = this
    that.getStatus()
  },

  /**
  * 是否显示
  */
  getStatus: function () {
    var that = this

    that.getPraiseList(),
      that.getCommentList(),
      // that.getSharePic(),
      that.setData({
        showOrHidden: true,//判断显示与否的，true表示显示，反之隐藏
      })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()  //showLoading 只能用此语句关闭
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
   * 显示标题
   */
  showTitleLayout: function (e) {
    var that = this
    that.setData({
      showModal: true
    })
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    var that = this
    inputTitleName = "震惊！她竟然做出了这种事情"
    that.hideModal()
    that.upLoadImage()
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this
    that.hideModal()
    that.upLoadImage()
  },
  /**
* 隐藏模态对话框
*/
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * inputChangeTitleName
   */
  inputChangeTitleName: function (e) {
    inputTitleName = e.detail.value
  },
  /**
   * 获取分享图片
   */
  getSharePic: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_SHARE_INFO',
      },
      data: {
        userId: app.globalData.hostUserId
      },
      success: function (res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          console.log(res.data)
          //更新数据
          bgShare = res.data[0][2],
            inputTitleName = res.data[0][5]
        }
      },
    })
  },

  /**
   * 修改分享图片
   */
  upLoadImage: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: api.mobileIn, //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
            'method': 'SAVE_SHARE_INFO'
          },
          formData: {
            'userId': app.globalData.hostUserId,
            'host': api.host,
            'inputTitleName': inputTitleName
          },
          success: function (res) {
            wx.showModal({
              title: '提示',
              content: res.data,
              showCancel: false
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: res.data,
              showCancel: false
            })
          },
        })

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
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
    that.getPraiseList(),
      that.getCommentList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 获取评论列表
  getCommentList: function () {
    var that = this
    wx.request({

      url: api.devDomain + 'getCommentList',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        if (200 == res.data.code) {
          that.setData({
            chatList: res.data.result
          });
        }
      }
    })
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
          if (app.globalData.openIdMsg == "查询openId成功") {
            that.setData({
              showComment: true,
              zanLog: res.data.result
            })
          }else{
            that.setData({
              zanLog: res.data.result
            })
          }
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
    return {
      title: inputTitleName,
      imageUrl: bgShare,
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
    var userInfo = JSON.parse(app.globalData.userInfo);
    console.log(userInfo)
    var params = new Object()

    if (app.globalData.openIdMsg == "查询openId成功") {
      params.nickName = userInfo.nickName;
      params.avatarUrl = userInfo.avatarUrl;
      params.gender = userInfo.gender;
      params.country = userInfo.country;
      params.province = userInfo.province;
      params.city = userInfo.city;
      params.openId = app.globalData.openId;
    }else{
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

  // 添加评论
  foo: function () {
    var that = this;
    if (that.data.inputValue) {
      //留言内容不是空值
      var userInfo = JSON.parse(app.globalData.userInfo);
      console.log(userInfo)
      var params = new Object()
      params.nickName = userInfo.nickName;
      params.avatarUrl = userInfo.avatarUrl;
      params.gender = userInfo.gender;
      params.content = that.data.inputValue;
      params.time = "2020年01月";

      wx.request({
        url: api.devDomain + 'addComment',
        data: params,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: res => {
          if (200 == res.data.code) {
            that.getCommentList()
            wx.showModal({
              title: '温馨提示',
              content: res.data.msg,
              showCancel: false
            })
          }
        }
      })
    } else {
      //Catch Error
      wx.showModal({
        title: '温馨提示',
        content: '您还没有填写内容',
        showCancel: false
      })
    }
    that.setData({
      inputValue: '' //将data的inputValue清空
    });
    return;
  }
})