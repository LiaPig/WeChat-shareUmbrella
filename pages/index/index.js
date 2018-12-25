//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({
    data: {
        // 用于地图组件显示的数据
        latitude: null,
        longitude: null,
        controls: [],
    },
    // 点击地图上的控件触发的事件
    controltap: function(e) {
      switch (e.controlId) {
        case 1: this.toWelcomePage();break;
        case 2: this.refreshLocation();break;
        case 3: this.toWalletPage();break;
      }
    },
    // 获取屏幕信息函数
    getSystemInfoData: function () {
        const that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    controls: [
                      {
                        id: 1,
                        iconPath: '/utils/icons/use.png',
                        position: {
                            left: (res.windowWidth - 80) / 2,
                            top: res.windowHeight - 100,
                            width: 80,
                            height: 80
                        },
                        clickable: true
                      },
                      {
                        id: 2,
                        iconPath: '/utils/icons/refresh.png',
                        position: {
                          left: res.windowWidth/4 - 20,
                          top: res.windowHeight - 100 + 20,
                          width: 40,
                          height: 40
                        },
                        clickable: true
                      },
                      {
                        id: 3,
                        iconPath: '/utils/icons/wallet.png',
                        position: {
                          left: res.windowWidth / 2 + res.windowWidth / 4 - 20,
                          top: res.windowHeight - 100 + 20,
                          width: 40,
                          height: 40
                        },
                        clickable: true
                      },
                    ]
                })
            }
        })
    },
    // 重新刷新获取位置
    refreshLocation() {
      const that = this;
      wx.showLoading({
        title: '正在刷新位置',
      });
      api.getLocation().then(res => {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.hideLoading();
      });
    },
    // 跳转去欢迎使用页面
    toWelcomePage() {
      wx.navigateTo({
        url: '../welcome/welcome'
      })
    },
    // 跳转去我的钱包页面
    toWalletPage() {
      wx.navigateTo({
        url: '../wallet/wallet'
      })
    },
    // 页面初始化先执行的方法
    onLoad: function () {
        const that = this;
        wx.showLoading({
          title: '正在登录中',
        });
        // 1.登录,获取用户token
        api.login().then(res => {
          wx.hideLoading();
          const token = `bearer ${res.data.data['access_token']}`;
          // 放到全局app里去
          app.globalData.token = token;
          console.log(`首页token: ${token}`);
          wx.showLoading({
            title: '正在查询押金',
          });
          // 2.判断当前用户是否交了押金
          api.checkDeposit(token).then(res2 => {
            wx.hideLoading();
            if(res2.data.data) {
              console.log("判断有没交押金：有");
              wx.showLoading({
                title: '正在查询订单1',
              });
              // 3.判断当前用户是否有正在进行的订单
              api.proceedOrder(token).then(res3 => {
                wx.hideLoading();
                // 没有进行中的订单
                if (res3.data.code === 23011) {
                  console.log("判断有没进行中的订单：没有");
                  wx.showLoading({
                    title: '正在查询订单2',
                  });
                  // 4. 判断当前用户是否有待支付的订单
                  api.unpaidOrder(token).then(res4 => {
                    wx.hideLoading();
                    if(res4.data.code === 23013) {
                      console.log("判断有没待支付的订单：没有");
                      // 5.获取屏幕信息
                      that.getSystemInfoData();
                      // 6.获取到当前用户的位置,定位在地图上
                      wx.showLoading({
                        title: '正在获取位置',
                      });
                      api.getLocation().then(res6 => {
                        that.setData({
                          latitude: res6.latitude,
                          longitude: res6.longitude
                        });
                        wx.hideLoading();
                      });
                    }
                    else if (res4.data.code === 23012) {
                      wx.redirectTo({
                        url: '../pay/pay'
                      });
                    }
                  });
                  
                }
                // 有进行中的订单，应跳转到订单详情页面
                else if (res3.data.code === 23010) {
                  wx.redirectTo({
                    url: '../order/order'
                  })
                }
              })
            }
            else {
              console.log("你没交押金");             
              wx.redirectTo({
                url: '../payDeposit/payDeposit'
              })
            }
          })
        })
        
        
        

        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res =>
        //     {
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //         app.globalData.userInfo = res.userInfo
        //     this.setData({
        //         userInfo: res.userInfo,
        //         hasUserInfo: true
        //       })
        //     }
        //   })
        // }
    }
})
