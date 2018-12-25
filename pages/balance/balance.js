// pages/balance/balance.js
const app = getApp();
const api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: null,
    balanceOption: [
      { name: '充100元', value: 100 },
      { name: '充50元', value: 50 },
      { name: '充20元', value: 20 },
      { name: '充10元', value: 10 }
    ],
    currentValue: 50,
  },
  // 获取余额数据
  getBalanceData: function() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.myWallet(app.globalData.token).then(res => {
      let myData = res.data.data;
      that.setData({
        balance: myData.balance
      })
      wx.hideLoading();
    });
  },
  // 点击了某个充值金额
  changeValue: function (e) {
    this.setData({
      currentValue: e.currentTarget.dataset.value
    })
  },
  // 点击了立即支付
  handlePay: function() {
    const that = this;
    wx.showLoading({
      title: '正在充值中',
    });
    console.log("我要充值", this.data.currentValue, "元");    
    api.payBalance(app.globalData.token, that.data.currentValue).then(res => {
      wx.hideLoading();
      wx.showModal({
        title: '温馨提示',
        content: '充值成功',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.getBalanceData();
          }
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBalanceData();
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