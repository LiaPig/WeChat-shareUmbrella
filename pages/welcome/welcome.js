// pages/welcome/welcome.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 点击了扫码用伞
  openScan: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        const umbrellaId = res.result;
        if (umbrellaId) {
          wx.showLoading({
            title: '正在获取数据',
          });
          api.placeOrder(app.globalData.token, umbrellaId)
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
            content: '请重新扫描二维码',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定');
              }
            }
          });
        }
      }
    })
  },
  // 跳转去手动输入解锁界面
  goToInputLock: function() {
    wx.navigateTo({
      url: '../inputLock/inputLock'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    api.checkDeposit(app.globalData.token).then(res => {
      //没交押金跳转去交押金界面
      if(!res.data.data){
        wx.redirectTo({
          url: '../payDeposit/payDeposit'
        });
      }
    });
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