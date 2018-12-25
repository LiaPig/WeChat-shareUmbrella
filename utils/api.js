const config = require('../config/config.js');
const app = getApp();

module.exports = {
  // 登录的接口(POST)
  login: () => {
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: r => {
          let code = r.code
          // 登录成功后获取用户详情信息
          if (code) {
            wx.getUserInfo({
              success: res => {
                // 成功则发送 code, encryptedData, iv 数据到 后端业务服务器 完成登录操作 获得token
                wx.setStorageSync('userInfo', res.userInfo)
                wx.request({
                  url: `${config.api}/auth/wechat/login`,
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    'wechat_code': code,
                    'encryptedData': res.encryptedData,
                    'iv': res.iv
                  },
                  success: res => {
                    // 得到业务服务器返回后判断是否成功登录
                    let result = res.data;
                    if (result.success) {
                      // 成功时的操作
                      const apiToken = 'bearer ' + result.data['access_token'];
                      wx.setStorageSync('token', apiToken);
                      resolve(res);
                    } else {
                      // 失败时的操作
                      reject(res)
                    }
                  },
                  fail: res => {
                    wx.showToast('服务器繁忙, 请稍后再试')
                  }
                })
              }
            })
          }
        }
      })
    });
  },
  // 获取用户经纬度的接口(GET)
  getLocation: () => {
    return new Promise((resolve, reject) => {
      // 获取用户当前位置
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: res => {
          resolve(res);
        }
      })
    })
  },
  // 查询有没交押金的接口(GET)
  checkDeposit: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/users/checkDeposit`,
        method: 'get',
        header: {
          'Authorization': token
        },
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    });
  },
  // 交纳押金的接口(PUT)
  payDeposit: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/users/payDeposit`,
        method: 'put',
        header: {
          'Authorization': token
        },
        data: {},
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
  // 退押金的接口(PUT)
  returnDeposit: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/users/backDeposit`,
        method: 'put',
        header: {
          'Authorization': token
        },
        data: {},
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
  // 查询进行中的订单的接口(GET)
  proceedOrder: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/orders/proceedOrder`,
        method: 'get',
        header: {
          'Authorization': token
        },
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    });
  },
  // 查询待支付的订单接口(GET)
  unpaidOrder: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/orders/unpaidOrder`,
        method: 'get',
        header: {
          'Authorization': token
        },
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    });
  },
  // 查询当前用户的余额和押金的接口(GET)
  myWallet: token => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/my/wallet`,
        method: 'get',
        header: {
          'Authorization': token
        },
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    });
  },
  // 充值余额的接口(POST)
  payBalance: (token, amount) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/users/payAccount`,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        data: {
          payAmount: amount
        },
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
  // 租用伞下单的接口(POST)
  placeOrder: (token, umbrellaId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/orders/placeOrder`,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        data: {
          umbrellaId: umbrellaId
        },
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
  // 归还伞结束订单的接口(POST)
  finishOrder: (token, orderId, rentId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/orders/finish`,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        data: {
          orderId: orderId,
          rentId: rentId
        },
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
  // 支付雨伞的接口(POST)
  payOrder: (token, orderId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.api}/orders/pay`,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        data: {
          orderId: orderId
        },
        success: res => {
          // 得到业务服务器返回后判断是否成功登录
          let result = res.data;
          if (result.success) {
            // 成功时的操作
            resolve(res);
          } else {
            // 失败时的操作
            reject(res);
          }
        },
        fail: res => {
          wx.showToast('服务器繁忙, 请稍后再试');
        }
      })
    })
  },
}