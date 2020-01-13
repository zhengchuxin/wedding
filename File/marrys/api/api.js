//base地址 47.104.198.222
// const host = 'https://pengmaster.com/party/'

const devDomain = 'http://localhost:4001/'
const host = 'http://localhost:4001/'

// 服务器的域名， 自己服务器
// const devDomain = 'https://wx.xxxxxxxx.com/';
// const host = 'https://wx.xxxxxxxx.com/'
// const host = 'https://xxxxxxxxx.com/party/'

const image = host + ''
const marry = host + 'wechat/marry/'
//接口统一入口地址
const mobileIn = host + 'mobile/mobileIn.do'

const backMusic = host
//-----------------图片具体地址------------------
//-----通用图片地址
const imageError = image + 'error.png'

//-----splash
const splashWave = image + 'wave.png'
const splashLoading = image + 'loading.gif'

//-----home
const homeBanner = image + 'home_banner.png'
const homeAvater = image + 'home_avater.png'
const homePartyRecord = image + 'home_party_cost_record_query.png'
const homeServiceGuide = image + 'home_service_guide.png'

//-----my
const myBanner = image +'my_banner.jpg'
const myXinde = image +'xinde.png'
const myXiaoxi = image +'xiaoxi.png'
const myZan = image +'zan.png'
const myArrowChart = image +'arrow_chart.png'
const qrCode = marry + 'qr_code/group_qr_code.png'

//-----分享图片
const mShareImg = host + 'wechat/marry/ozfq_zip/HY2A1167.jpg'


//-----
const versionInfoDetailShow = image + 'party_home_show.png'

module.exports = {
  image, devDomain,
  host, mobileIn,
  backMusic,
  imageError,
  splashWave, splashLoading,
  homeBanner, homeAvater, homePartyRecord, homePartyRecord, homeServiceGuide,
  myBanner, myXinde, myXiaoxi, myZan, myArrowChart,
  versionInfoDetailShow, mShareImg
}
