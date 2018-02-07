//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 用于地图组件显示的数据
        latitude: null,
        longitude: null,
        controls: [{
            id: 1,
            iconPath: '/utils/pictures/1.jpg',
            position: {
                left: 120,
                top: 400,
                width: 80,
                height: 80
            },
            clickable: true
        }],
        
        // motto: 'Hello World',
        // userInfo: {},
        // hasUserInfo: false,
        // canIUse: wx.canIUse('button.open-type.getUserInfo')
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
        title: '',
      });
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          that.setData({
            latitude: latitude,
            longitude: longitude
          });
          wx.hideLoading();
        }
      })
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

    onLoad: function () {
        const that = this;
        // 获取屏幕信息
        that.getSystemInfoData();
        // 获取到当前用户的位置
        if (app.latitude && app.longitude) {
            that.setData({
                latitude: app.latitude,
                longitude: app.longitude
            })
        }
        else {
          that.refreshLocation();
        }
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res =>
            {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                app.globalData.userInfo = res.userInfo
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
        }
        })
        }

    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
