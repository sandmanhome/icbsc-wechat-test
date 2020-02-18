//index.js
//获取应用实例
const app = getApp()

var test = require('../icbs-key-utils/test.js'); 

Page({
  data: {
    motto: 'Hello World',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  transaction: function (e) {
    test.transaction()
  },

  newKey: function (e) {
    test.newKey()
  }
})
