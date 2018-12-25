基于微信小程序的共享雨伞租借系统
---
> 一个微信小程序项目

### 摘要

 共享雨伞由于符合节省资源、绿色出行、环保理念，得到了政府的极力提倡和支持。而微信小程序是一种不需要安装即可打开使用的应用。用户只需要通过进入本系统的微信小程序,交纳押金后扫描某把雨伞的二维码或者手动输入雨伞号，就能租借使用。还伞时，只需要把雨伞插回可归还的地方，然后确认付款就完成了所有操作。（由于无法模拟雨伞插回伞座，所以是要自己点击还伞的）


### 功能模块
+ 自动注册登录

+ 缴纳（退还）押金

+ 获取当前位置和定位

+ 使用扫描二维码用伞、手动输入伞号借伞

+ 查询余额、充值余额

+ 结束用伞

+ 支付订单

### 关于登录与注册

+ 这里使用的是用户无感的注册或者登录。

+ 当用户授权使用本小程序的时候，调用微信官方登录接口，获取到``code``、``encryptedData``、``iv``发送给后台，后台判断是否已经注册过。

+ 如果没有，立即注册，返回``token``；如果已经注册过，登录，返回``token``。


### 页面展示

1.授权登录

![](https://upload-images.jianshu.io/upload_images/7016617-1a2e03c94327bc33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.初次进来，先提醒交押金，已经交过直接到界面3

![](https://upload-images.jianshu.io/upload_images/7016617-5d365a14e668b7b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3.定位到当前位置显示在地图上，还有刷新定位按钮、立即用伞按钮、我的钱包按钮

![](https://upload-images.jianshu.io/upload_images/7016617-b4854c55e0bca521.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4.点击了钱包按钮，进入到我的钱包页面，可查看余额和押金情况

![](https://upload-images.jianshu.io/upload_images/7016617-9b34dee075b1ae22.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5.点击了充值按钮后，有四个充值金额可选

![](https://upload-images.jianshu.io/upload_images/7016617-692f372f804694e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6.如果界面3点击了立即用伞按钮，则进来解锁用伞页面，有两个方式，扫码或者手动输入

![](https://upload-images.jianshu.io/upload_images/7016617-6fd5b05c69ddeacb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

7.扫码用伞

![](https://upload-images.jianshu.io/upload_images/7016617-a19c918ec54b4b9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8.手动输入雨伞号

![](https://upload-images.jianshu.io/upload_images/7016617-bbfb94ea98648854.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[9.借伞后的页面

!](https://upload-images.jianshu.io/upload_images/7016617-c780e40b6e1639ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

10.结束用伞后

![](https://upload-images.jianshu.io/upload_images/7016617-2de9d653b6ba4962.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 交互api
> 本小程序的后台接口，由[Hertz大佬](http://leewaiho.com)提供。

目录位置：
 - config
     - config.js  // 封装了api域名
     - utils
        - api.js  // 都在这里了

### 页面目录
- pages
     - balance  // 余额充值
     - index  // 有地图的
     - inputLock // 手动输入雨伞号
     - logs // 没用到，查看启动日志
     - order // 订单详情
     - pay // 支付
     - payDeposit // 交纳押金
     - wallet // 我的钱包
     - welcome // 选择解锁方式
