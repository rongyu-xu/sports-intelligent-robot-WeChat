// pages/growth/growth.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏相关
    statusBarHeight: 0,
    navBarHeight: 44,
    navBarBgColor: 'transparent',
    
    // 成长数据
    totalDistance: 234.5,
    totalTime: 156.8,
    totalCalories: 12500,
    totalWorkouts: 128,
    
    // 进度数据
    currentLevel: 8,
    totalLevels: 20,
    progress: 40,
    
    // 成就列表
    achievements: [
      {
        id: 1,
        title: '初出茅庐',
        description: '完成第1次运动',
        icon: '/images/icon_achievement1.png'
      },
      {
        id: 2,
        title: '坚持一周',
        description: '连续运动7天',
        icon: '/images/icon_achievement2.png'
      },
      {
        id: 3,
        title: '运动达人',
        description: '累计运动50次',
        icon: '/images/icon_achievement3.png'
      },
      {
        id: 4,
        title: '里程突破',
        description: '累计跑步100公里',
        icon: '/images/icon_achievement4.png'
      }
    ],
    
    // 运动历程
    milestones: [
      {
        id: 1,
        time: '2025-09-25',
        title: '完成5公里跑步',
        description: '首次完成5公里跑步，耗时28分钟'
      },
      {
        id: 2,
        time: '2025-09-20',
        title: '力量训练突破',
        description: '卧推重量达到50公斤'
      },
      {
        id: 3,
        time: '2025-09-15',
        title: '连续运动10天',
        description: '坚持运动10天，获得连续运动徽章'
      },
      {
        id: 4,
        time: '2025-09-10',
        title: '累计消耗10000卡路里',
        description: '运动成果显著，继续保持'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取系统信息，设置导航栏高度
    this.getSystemInfo();
    
    // 计算等级进度
    this.calculateProgress();
  },

  /**
   * 获取系统信息
   */
  getSystemInfo: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          statusBarHeight: res.statusBarHeight
        });
      },
      fail: function(error) {
        console.error('获取系统信息失败:', error);
      }
    });
  },

  /**
   * 计算等级进度
   */
  calculateProgress: function() {
    const progress = (this.data.currentLevel / this.data.totalLevels) * 100;
    this.setData({
      progress: progress
    });
  },

  /**
   * 处理滚动事件
   */
  onScroll: function(e) {
    const scrollTop = e.detail.scrollTop;
    // 滚动时改变导航栏背景色
    let navBarBgColor = 'transparent';
    if (scrollTop > 100) {
      navBarBgColor = 'rgba(255, 255, 255, 0.9)';
    }
    this.setData({
      navBarBgColor: navBarBgColor
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 模拟刷新数据
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '数据已更新',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我的运动成长',
      path: '/pages/growth/growth'
    };
  }
});