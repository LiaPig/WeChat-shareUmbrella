// pages/payDeposit/payDeposit.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  // 点击了确定支付
  handlePay: () => {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.payDeposit(app.globalData.token).then(res => {
      wx.hideLoading();
      wx.showModal({
        title: '温馨提示',
        content: '交纳押金成功',
        showCancel: false,
        success: function (res) {
          wx.redirectTo({
            url: '../index/index'
          })
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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