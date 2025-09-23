//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查用户登录状态
    this.checkLoginStatus()

    // 获取登录凭证
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 实际项目中需要将code发送到后端进行处理
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: ''
  },
  
  // 检查用户登录状态
  checkLoginStatus: function() {
    // 演示模式开关：设置为true时跳过登录页面
    const isDemoMode = true
    
    let userInfo = wx.getStorageSync('userInfo')
    let token = wx.getStorageSync('token')
    
    // 在演示模式下，如果没有用户信息，自动创建模拟用户信息
    if (isDemoMode && (!userInfo || !userInfo.isLogin || !token)) {
      // 创建模拟用户信息
      userInfo = {
        phone: '13800138000',
        isLogin: true,
        loginTime: new Date().getTime(),
        nickName: '演示用户',
        avatarUrl: '/images/user.png'
      }
      
      // 生成模拟token
      token = 'demo_token_' + Date.now()
      
      // 保存到本地存储
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('token', token)
      
      console.log('演示模式：自动创建模拟用户信息')
    }
    
    // 更新全局数据
    this.globalData.userInfo = userInfo
    this.globalData.token = token
    
    // 判断是否需要登录（非演示模式下）
    if (!isDemoMode && (!userInfo || !userInfo.isLogin || !token)) {
      // 获取当前页面路径
      const pages = getCurrentPages()
      const currentPage = pages.length > 0 ? pages[0].route : ''
      
      // 如果当前不是登录页面，则跳转到登录页面
      if (currentPage !== 'pages/login/login') {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    }
  },
  
  // 重新检查登录状态（供页面调用）
  recheckLogin: function() {
    this.checkLoginStatus()
  },
  
  // 退出登录
  logout: function() {
    // 清除本地存储
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
    
    // 更新全局数据
    this.globalData.userInfo = null
    this.globalData.token = ''
    
    // 跳转到登录页面
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})