// pages/pay/pay.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost_str: null,
    orderId: null
  },

  // 获取当前用户的订单信息
  getOrderData() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.unpaidOrder(app.globalData.token).then(res => {
      wx.hideLoading();
      const orderData = res.data.data;
      that.setData({
        cost_str: orderData.cost.toFixed(2),
        orderId: orderData.id
      });
    });
  },
  // 点击了立即支付按钮
  handlePay() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.payOrder(app.globalData.token, that.data.orderId)
    .then(res => {
      wx.hideLoading();
      wx.showModal({
        title: '支付成功',
        content: res.data.message,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        }
      });
    })
    .catch(err => {
      if(err.data.code === 11000) {
        wx.hideLoading();        
        wx.showModal({
          title: '支付失败',
          content: err.data.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../balance/balance',
              })
            }
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderData();
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