// pages/inputLock/inputLock.js
const app = getApp();
const api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
  },

  // 根据输入框更新值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 点击了立即用伞按钮
  handleRent: function() {
    const that = this;
    // 如果输入的不为空
    if(that.data.inputValue) {
      wx.showLoading({
        title: '正在获取数据',
      });
      api.placeOrder(app.globalData.token, that.data.inputValue)
      .then(res => {
        wx.hideLoading();
        wx.redirectTo({
          url: '../order/order'
        })
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
        });
      })
    }
    else {
      wx.showModal({
        title: '温馨提示',
        content: '请输入雨伞号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定');
          }
        }
      });
    }
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