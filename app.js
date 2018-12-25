const api = require('./utils/api.js');

//app.js
App({
  onLaunch: function () {
    const that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    


    
  },
  globalData: {
    userInfo: null,
    token: null
  },
  // 全局定义的用户当前的经纬度
  // latitude: null,
  // longitude: null,
})