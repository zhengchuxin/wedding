//app.js
// 修改成自己的AppId，AppSecret
var api = require('/api/api.js')
var AppId = 'wxc028256ea6d51axxxx'
var AppSecret = '9f8d745b3f3f5eb1497807be8ecxxxxx'

App({
  onLaunch: function () {
    var that = this
    //调用登录接口，获取 code  
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        wx.request({
          url: api.devDomain + 'getOpenId?code=' + code,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            // 将openId设成全局
            that.globalData.openId = res.data.result.openid;
            that.globalData.openIdMsg = res.data.msg
            // console.log('res.data.openid', res.data.openid)
          },
          fail: function (res) { }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    openId: null,
    openIdMsg: null,
    user: null,
    flag: null,
    hostUserId: null,
    isOfficial: true,
    isCreate: true,
    isShowAd: null
  }
})