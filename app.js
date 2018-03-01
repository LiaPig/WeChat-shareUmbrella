//app.js
App({
  onLaunch: function () {
    const that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // if (res.code) {
        //   //发起网络请求
        //   wx.request({
        //     url:'https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html',
        //     data: {
        //       appId: "wxd5fbb5156af5f5d1",

        //       js_code: res.code
        //     }
        //   })
        // }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取用户当前位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        that.latitude = res.latitude;
        that.longitude = res.longitude;
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  // 全局定义的用户当前的经纬度
  latitude: null,
  longitude: null,
})