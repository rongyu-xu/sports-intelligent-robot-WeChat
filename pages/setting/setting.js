//setting.js
Page({
  data: {
    // 设置项数据
    settings: [
      {
        id: 'notification',
        title: '消息通知',
        desc: '开启或关闭推送通知',
        switch: true
      },
      {
        id: 'theme',
        title: '主题设置',
        desc: '切换应用主题',
        arrow: true
      },
      {
        id: 'clearCache',
        title: '清除缓存',
        desc: '清理临时缓存数据',
        arrow: true
      },
      {
        id: 'about',
        title: '关于我们',
        desc: '查看应用信息和版本',
        arrow: true
      }
    ]
  },
  onLoad: function() {
    // 页面加载时可以初始化设置
  },
  // 开关切换事件
  onSwitchChange: function(e) {
    const id = e.currentTarget.dataset.id;
    const value = e.detail.value;
    
    // 更新设置值
    const settings = this.data.settings;
    for (let i = 0; i < settings.length; i++) {
      if (settings[i].id === id) {
        settings[i].switch = value;
        break;
      }
    }
    
    this.setData({
      settings: settings
    });
    
    // 这里可以保存设置到本地存储
    wx.setStorageSync('settings', settings);
    
    // 显示操作成功提示
    wx.showToast({
      title: value ? '已开启' : '已关闭',
      icon: 'none'
    });
  },
  // 点击设置项事件
  onSettingItemTap: function(e) {
    const id = e.currentTarget.dataset.id;
    
    switch(id) {
      case 'theme':
        wx.showModal({
          title: '主题设置',
          content: '当前仅支持默认主题',
          showCancel: false
        });
        break;
      case 'clearCache':
        wx.showModal({
          title: '清除缓存',
          content: '确定要清除所有缓存数据吗？',
          success: (res) => {
            if (res.confirm) {
              // 清除缓存
              wx.clearStorageSync();
              wx.showToast({
                title: '缓存已清除',
                icon: 'success'
              });
            }
          }
        });
        break;
      case 'about':
        wx.navigateTo({
          url: '/pages/about/about'
        });
        break;
    }
  },
  // 退出登录
  onLogoutTap: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用全局的退出登录方法
          const app = getApp();
          app.logout();
        }
      }
    });
  }
})