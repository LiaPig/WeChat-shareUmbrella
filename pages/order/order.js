// pages/order/order.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    umbrellaId: null,
    startTime: null,
    orderId: null,
    rentId: null
  },
  // 获取当前用户的订单信息
  getOrderData() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.proceedOrder(app.globalData.token).then(res => {
      wx.hideLoading();
      const orderData = res.data.data;
      that.setData({
        umbrellaId: orderData.umbrellaId,
        startTime: orderData.startTime,
        orderId: orderData.id
      });
    });
  },
  // 根据输入框更新值
  bindKeyInput: function (e) {
    this.setData({
      rentId: e.detail.value
    });
  },
  // 点击了结束用伞按钮
  handleEnd() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.finishOrder(app.globalData.token, that.data.orderId, that.data.rentId)
    .then(res => {
      wx.hideLoading();
      wx.redirectTo({
        url: '../pay/pay'
      });
    })
    .catch(err => {
      wx.hideLoading();
      wx.showModal({
        title: '操作失败',
        content: err.data.message,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定');
          }
        }
      });1
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