var api = require('../../api/api.js')
//获取应用实例
var app = getApp()

Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    // logo: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg',
    logo: 'https://wx.chuxinzheng.com/my6.jpg',
    appName: "Marry",
    checkImgLength: 0,
    imgLists: [],
    loading: '',
    isShowMessage: true,
  },
  onLoad: function(options) {
    var that = this
    setTimeout(function () {
      //要延时执行的代码
      //获取宿主用户Id
      if (app.globalData.openIdMsg == "查询openId成功") {
        that.setData({
          //图片地址
          wave: api.splashWave,
          loading: api.splashLoading,
          isShowMessage: true
        })

      } else {
        that.setData({
          //图片地址
          wave: api.splashWave,
          loading: api.splashLoading,
          isShowMessage: false
        })
      }
    }, 1000) //延迟时间 这里是1秒

  },
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

  //进入主页面
  goHome: function() {
    wx.switchTab({
      url: '../home/home'
    });
  },

  btnEnter: function() {

    var that = this
    that.goHome()
  },

  getUserInfo(e) {
    console.log('getUserInfo')
    var that = this
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        if (e.detail.errMsg === 'getUserInfo:ok') {
          console.log('获取用户信息成功')
          app.globalData.userInfo = e.detail.rawData
          that.goHome()
          // that.getUser()
        } else {
          console.log('fail', '获取用户信息失败')
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败',
            showCancel: false,
            confirmColor: '#e2211c',
            success(res) {}
          })
        }
      }
    })
  },

  //添加图片
  addImg: function() {
    var that = this;
    console.log(9 - that.data.checkImgLength)
    if (9 - that.data.checkImgLength >= 1) {
      wx.chooseImage({
        count: 9 - that.data.checkImgLength, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var tempFilePaths = res.tempFilePaths //这里拿到的是图片在微信客户端的临时路径！！！
          let length = tempFilePaths.length;
          console.log('xxx===' + tempFilePaths)
          // let tempList = that.data.imgLists.concat(tempFilePaths);//JSON数据

          wx.uploadFile({
            url: api.devDomain + 'upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function(res) {
              var data = JSON.parse(res.data)
              console.log('tou xianxxx + ' + data.fileUrl);
              that.setData({
                logo: data.fileUrl
              })
              // console.log('tou xianxxx + ' + JSON.stringify(res.data));
            }
          })
        }
      })
    }
  },

  addHomePic: function() {

    var that = this;
    var params = new Object()
    params.createTime = '2019年04月13日 11点04分';
    params.id = '82da-1555124643816-06018';
    params.imgUrl = 'https://pengmaster.com/party//userImg/osaod0ZlCZxFk3qxoDRrrx9lRvU8/wxc028256ea6d51af1.o6zAJs1lH7XCQJzJjW07YGC2CEjg.hvl7nkIMocR183ec3c85b7ea372887d78a4ad614e8b3.jpg';
    params.title = '狗娃特写';
    params.updateTime = 'null';
    params.userId = 'osaod0ZlCZxFk3qxoDRrrx9lRvU8';

    wx.request({
      url: api.devDomain + 'addHomeList',
      data: params,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {

        if (200 == res.data.code) {
          console.log(res.data)

        }
      }
    })
  },

  addAddress: function() {

    var that = this;
    var params = new Object()
    params.openId = 'osaod0ZlCZxFk3qxoDRrrx9lRvU8';
    params.timeString = '2019年10月28日 23点20分';
    params.remark1 = 'remark1';
    params.remark2 = 'remark2';
    params.name = 'Mr刘&Ms黄';
    params.invate = '诚邀你的到来';
    params.time = '农历 2020年一月初十三 举办婚礼';
    params.address = '地址：广东省广州市广州塔22层(点击导航)';
    params.lag = '113.3245904';
    params.lat = '23.1066805';
    params.backgroundPic = 'https://pengmaster.com/party//userImg/osaod0ZlCZxFk3qxoDRrrx9lRvU8/map/wxc028256ea6d51af1.o6zAJs1lH7XCQJzJjW07YGC2CEjg.4hxol1f3rgTTbd6c3cfab2c727caa5c15cafdcbf6a0a.jpg';

    wx.request({
      url: api.devDomain + 'addAddress',
      data: params,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {

        if (200 == res.data.code) {
          console.log(res.data)

        }
      }
    })
  },

  addHomeDetailPic: function() {


    var that = this;
    var params = new Object()
    var detailArray = [{
        "bannerId": "82da-1555124643816-06018",
        "createTime": "2019年04月13日 11点04分",
        "desc": "不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后",
        "id": "25d0-1555124674287-62280",
      "imgUrl": "https://wx.chuxinzheng.com/my1.jpg",
        "updateTime": "null",
        "userId": ""
      },
      {
        "bannerId": "82da-1555124643816-06018",
        "createTime": "2019年04月13日 11点04分",
        "desc": "不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后",
        "id": "48f6-1555124657252-76324",
        "imgUrl": "https://wx.chuxinzheng.com/my2.jpg",
        "updateTime": "null",
        "userId": ""
      },
      {
        "bannerId": "82da-1555124643816-06018",
        "createTime": "2019年04月13日 11点04分",
        "desc": "不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后",
        "id": "5769-1555124665207-41362",
        "imgUrl": "https://wx.chuxinzheng.com/my3.jpg",
        "updateTime": "null",
        "userId": "",
      },
      {
        "bannerId": "82da-1555124643816-06018",
        "createTime": "2019年04月13日 11点04分",
        "desc": "不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后",
        "id": "83ba-1555124684025-46797",
        "imgUrl": "https://wx.chuxinzheng.com/my4.jpg",
        "updateTime": "null",
        "userId": "",
      }
    ];

    params.id = 'osaod0ZlCZxFk3qxoDRrrx9lRvU9';
    // params.detailArray = JSON.stringify(strMapToObj(detailArray));
    params.detailArray = JSON.stringify(detailArray);

    wx.request({
      url: api.devDomain + 'addHomeDetail',
      data: params,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {

        if (200 == res.data.code) {
          console.log(res.data)

        }
      }
    })
  },
  //创建订单
  createOrder: function() {

    var datasource = [
      {
        "proid": '112222',
        "proimg": 'http://www.xxx.jpg',
        "proname": '衣服',
        "price": '45',
        "num": '2'
      },
      {
        "proid": '33334444',
        "proimg": 'http://www.33333.jpg',
        "proname": '裤子',
        "price:": '98',
        "num": '4'
      }
    ]

    var that = this;
    var params = new Object()
    params.userid = 'iamopenid';
    params.name = 'zcx';
    params.tel = '13750522222';
    params.address = '广东省广州市广州塔22层(点击导航)';
    params.note = '不加辣';
    params.list = JSON.stringify(datasource);
  
    wx.request({
      url: api.devDomain + 'createorder',
      data: params,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {

        if (200 == res.data.code) {
          console.log(res.data)

        }
      }
    })


  }
})