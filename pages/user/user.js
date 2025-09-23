//user.js
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    // 设置默认值，确保在异步获取系统信息完成前页面布局正常
    statusBarHeight: 20,  // 默认状态栏高度(px)
    navBarHeight: 44,    // 默认导航栏高度(px)
    listPaddingTop: 84,  // 默认列表容器padding-top(px)
    listContainerStyle: { // 默认列表容器样式
      'padding-top': '168rpx'
    }
  },
  onLoad: function() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 检查是否已经授权获取用户信息
    this.checkUserInfo();
    this.getSystemInfo();
  },
  onShow: function() {
    // 页面显示时先检查登录状态
    const app = getApp();
    app.recheckLogin();
    
    // 然后检查用户信息
    this.checkUserInfo();
  },
  // 获取系统信息（使用最新的API）
  getSystemInfo: function() {
    try {
      // 使用 wx.getWindowInfo() 获取窗口信息，包括状态栏高度
      const windowInfo = wx.getWindowInfo();
      
      // 状态栏高度
      const statusBarHeight = windowInfo.statusBarHeight;
      // 计算导航栏高度（微信小程序默认导航栏高度是44px）
      const navBarHeight = 44;
      // 计算列表容器的padding-top，确保不与标题栏重叠
      const listPaddingTop = statusBarHeight + navBarHeight + 12; // 12px是额外间距
      
      this.setData({
        statusBarHeight: statusBarHeight,
        navBarHeight: navBarHeight,
        listPaddingTop: listPaddingTop
      });
      
      // 动态设置列表容器的样式
      this.setListContainerStyle();
    } catch (e) {
      console.error('获取或处理系统信息失败', e);
      // 保持使用默认值
    }
  },
  checkUserInfo: function() {
    // 从全局获取用户信息
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserProfile: function() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // 保存用户信息到全局
        const app = getApp();
        app.globalData.userInfo = res.userInfo;
        res.userInfo.avatarUrl = '/images/icon_commonUser.png'
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo: function(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onOrderTap: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  onSettingTap: function() {
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  }
})