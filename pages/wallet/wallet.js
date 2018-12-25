// pages/wallet/wallet.js
const app = getApp();
const api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: null,
    balance_str: null,
    deposit: null,
    deposit_str: null,
  },
  // 获取余额和押金数据
  getData() {
    const that = this;
    wx.showLoading({
      title: '正在获取数据',
    });
    api.myWallet(app.globalData.token).then(res => {
      let myData = res.data.data;
      const balance_str = Number(myData.balance).toFixed(2);
      const deposit_str = Number(myData.deposit).toFixed(2);
      that.setData({
        balance: myData.balance,
        deposit: myData.deposit,
        balance_str: balance_str,
        deposit_str: deposit_str
      })
      wx.hideLoading();
    });
  },
  // 点击了充值按钮
  handlePay: function() {
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
  // 点击了取押金按钮
  returnDeposit: function(){
    const that = this;
    wx.showModal({
      title: '温馨提示',
      content: '取走押金之后将无法继续租用伞,请确定是否支取押金',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          api.returnDeposit(app.globalData.token).then(res => {
            console.log(res);
            wx.showToast({
              title: '押金退还成功',
              icon: 'success',
              duration: 2000
            });
            that.getData();
          });
         
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  // 点击了交押金按钮
  payDeposit: function(){
    wx.redirectTo({
      url: '../payDeposit/payDeposit'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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