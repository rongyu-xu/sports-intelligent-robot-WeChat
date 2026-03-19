//index.js
const api = require('../../api/api.js')

Page({
  data: {
    list: [],
    // 设置默认值，确保在异步获取系统信息完成前页面布局正常
    statusBarHeight: 20,  // 默认状态栏高度(px)
    navBarHeight: 44,    // 默认导航栏高度(px)
    listPaddingTop: 84,  // 默认列表容器padding-top(px)
    listContainerStyle: { // 默认列表容器样式
      'padding-top': '168rpx'
    },
    isScrolled: false,   // 控制标题栏背景色的滚动状态
    navBarBgColor: 'transparent', // 默认标题栏背景色为透明
    // 场馆详情数据
    venue: {
      id: '',
      name: '',
      address: '',
      area: '',
      venueTypeName: '',
      organizationName: '',
      smartDevices: '',
      todayCourses: 0,
      environmentImageUrls: '',
      remark: ''
    },
    loading: false,
    // 教练力量数据
    coaches: [
      {
        id: 1,
        name: '张教练',
        title: '篮球高级教练',
        avatar: '/images/test1.png'
      },
      {
        id: 2,
        name: '李教练',
        title: '足球专业教练',
        avatar: '/images/test2.png'
      },
      {
        id: 3,
        name: '王教练',
        title: '羽毛球特级教练',
        avatar: '/images/test3.png'
      },
      {
        id: 4,
        name: '赵教练',
        title: '乒乓球金牌教练',
        avatar: '/images/test4.png'
      },
      {
        id: 5,
        name: '陈教练',
        title: '游泳中级教练',
        avatar: '/images/test5.png'
      }
    ],
    // 智能设备数据
    equipment: [
      {
        id: 1,
        name: '篮球教培机器人',
        count: 10
      },
      {
        id: 2,
        name: '智能篮板',
        count: 15
      }
    ],
    // 学员评价数据
    reviews: [
      {
        id: 1,
        name: '小明',
        avatar: '/images/icon_commonUser.png',
        rating: 4,
        content: '场馆设施非常齐全，教练专业耐心，每次来都能得到很好的训练效果。'
      },
      {
        id: 2,
        name: '小红',
        avatar: '/images/icon_family.png',
        rating: 4,
        content: '环境干净整洁，器材维护得很好，就是周末人有点多。'
      },
      {
        id: 3,
        name: '小刚',
        avatar: '/images/icon_commonUser.png',
        rating: 5,
        content: '教练非常专业，制定的训练计划很有针对性，坚持了三个月，身体素质明显提高。'
      }
    ]
  },
  onLoad: function(options) {
    // 获取系统信息，包括状态栏高度等，用于适配不同机型
    this.getSystemInfo();
    // 模拟获取列表数据
    this.getListData();
    
    // 获取场馆ID并加载详情
    const venueId = options.id;
    if (venueId) {
      this.loadVenueDetail(venueId);
    }
  },
  
  // 加载场馆详情
  loadVenueDetail: function(id) {
    this.setData({ loading: true });
    
    api.get('/api/v1/venues/' + id).then(res => {
      const venueData = res.data || {};
      this.setData({
        venue: {
          id: venueData.id || '',
          name: venueData.name || '',
          address: venueData.address || '',
          area: venueData.area || '',
          venueTypeName: venueData.venueTypeName || '',
          organizationName: venueData.organizationName || '',
          smartDevices: venueData.smartDevices || '',
          todayCourses: venueData.todayCourses || 0,
          environmentImageUrls: venueData.environmentImageUrls || '',
          remark: venueData.remark || ''
        },
        loading: false
      });
    }).catch(err => {
      console.error('加载场馆详情失败', err);
      this.setData({ loading: false });
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
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
  
  // 动态设置列表容器的样式
  setListContainerStyle: function() {
    try {
      // 微信小程序中，1px = 2rpx的转换
      const listPaddingTopRpx = this.data.listPaddingTop * 2 + 24;
      
      this.setData({
        listContainerStyle: {
          'padding-top': listPaddingTopRpx + 'rpx'
        }
      });
    } catch (e) {
      console.error('设置列表容器样式失败', e);
    }
  },
  onShow: function() {
    // 页面显示时检查登录状态
    const app = getApp();
    app.recheckLogin();
    
    // 刷新数据
  },
  getListData: function() {
    // 这里可以是真实的网络请求，现在用模拟数据
    const mockData = [
      {
        id: '1',
        title: '智能运动分析报告',
        description: '基于AI技术的运动姿态分析，帮助您提升运动表现',
        time: '2023-04-15 14:30',
        image: '/images/sport1.png'
      },
      {
        id: '2',
        title: '个性化训练计划生成',
        description: '根据您的身体数据和运动目标，生成专属训练计划',
        time: '2023-04-14 10:15',
        image: '/images/sport2.png'
      },
      {
        id: '3',
        title: '运动损伤预防指南',
        description: '科学的运动方式和热身方法，有效预防运动损伤',
        time: '2023-04-13 09:45',
        image: '/images/sport3.png'
      },
      {
        id: '4',
        title: '实时心率监测',
        description: '运动过程中的心率变化分析，确保运动安全有效',
        time: '2023-04-12 16:20',
        image: '/images/sport4.png'
      },
      {
        id: '5',
        title: '睡眠质量与运动表现',
        description: '探究睡眠对运动能力的影响，提升训练效果',
        time: '2023-04-11 11:30',
        image: '/images/sport5.png'
      },
      {
        id: '6',
        title: '睡眠质量与运动表现',
        description: '探究睡眠对运动能力的影响，提升训练效果',
        time: '2023-04-11 11:30',
        image: '/images/sport5.png'
      },
      {
        id: '7',
        title: '睡眠质量与运动表现',
        description: '探究睡眠对运动能力的影响，提升训练效果',
        time: '2023-04-11 11:30',
        image: '/images/sport5.png'
      }
    ];
    this.setData({
      list: mockData
    });
  },
  onItemTap: function(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到详情页
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },
  // 处理列表滚动事件
  onListScroll: function(e) {
    const scrollTop = e.detail.scrollTop;
    // 当滚动距离大于20px时，添加背景色；否则保持透明
    const isScrolled = scrollTop > 20;
    const navBarBgColor = isScrolled ? '#ffffff' : 'transparent';
    
    this.setData({
      isScrolled: isScrolled,
      navBarBgColor: navBarBgColor
    });
  },
  
  onPullDownRefresh: function() {
    // 下拉刷新
    this.getListData();
    wx.stopPullDownRefresh();
  },
  
  // 返回上一页
  onBackTap: function() {
    wx.navigateBack({
      delta: 1
    });
  }
})