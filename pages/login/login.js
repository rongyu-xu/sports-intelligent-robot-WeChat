//login.js
Page({
  data: {
    phone: '',
    code: '',
    countdown: 0,
    canIUseGetPhoneNumber: false,
    isLoading: false
  },
  onLoad: function() {
    // 检查是否支持获取手机号
    if (wx.canIUse('getPhoneNumber')) {
      this.setData({
        canIUseGetPhoneNumber: true
      })
    }
  },
  // 输入手机号
  onPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 输入验证码
  onCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 获取验证码
  getVerificationCode: function() {
    const phone = this.data.phone
    
    // 简单的手机号验证
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return
    }
    
    // 显示倒计时
    let countdown = 60
    this.setData({
      countdown: countdown
    })
    
    // 倒计时逻辑
    const timer = setInterval(() => {
      countdown--
      this.setData({
        countdown: countdown
      })
      
      if (countdown <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    
    // 这里应该调用发送验证码的API
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  },
  // 手机号登录
  phoneLogin: function() {
    const phone = this.data.phone
    const code = this.data.code
    
    // 验证输入
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return
    }
    
    if (!code || code.length !== 6) {
      wx.showToast({
        title: '请输入6位验证码',
        icon: 'none'
      })
      return
    }
    
    this.setData({
      isLoading: true
    })
    
    // 模拟登录请求
    setTimeout(() => {
      // 登录成功后保存用户信息
      const userInfo = {
        phone: phone,
        isLogin: true,
        loginTime: new Date().getTime()
      }
      
      // 模拟生成token
      const token = 'token_' + Date.now()
      
      // 保存到本地存储
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('token', token)
      
      // 更新全局数据
      const app = getApp()
      app.globalData.userInfo = userInfo
      app.globalData.token = token
      
      this.setData({
        isLoading: false
      })
      
      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 1500)
  },
  // 微信授权登录
  getPhoneNumber: function(e) {
    if (!e.detail.code) {
      wx.showToast({
        title: '请授权手机号',
        icon: 'none'
      })
      return
    }
    
    this.setData({
      isLoading: true
    })
    
    // 这里应该调用后端API，传递e.detail.code换取手机号并登录
    // 模拟登录请求
    setTimeout(() => {
      // 登录成功后保存用户信息
      const userInfo = {
        phone: '微信授权号码',
        isLogin: true,
        loginTime: new Date().getTime(),
        isWechatAuth: true
      }
      
      // 模拟生成token
      const token = 'token_' + Date.now()
      
      // 保存到本地存储
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('token', token)
      
      // 更新全局数据
      const app = getApp()
      app.globalData.userInfo = userInfo
      app.globalData.token = token
      
      this.setData({
        isLoading: false
      })
      
      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 1500)
  },
  // 检查用户是否已登录（供页面内部调用）
  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    return userInfo && userInfo.isLogin
  }
})