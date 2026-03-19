// map.js
const api = require('../../api/api.js')

Page({
  data: {
    markers: [
      {
        id: 1,
        latitude: 30.249672,
        longitude: 120.149017,
        name: '杭州西湖',
        iconPath: '/images/icon_map.png',
        width: 50,
        height: 50,
        callout: {
          content: '杭州西湖',
          color: '#333333',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK'
        }
      },
      {
        id: 2,
        latitude: 30.227838,
        longitude: 120.177598,
        name: '杭州体育馆',
        iconPath: '/images/icon_map.png',
        width: 50,
        height: 50,
        callout: {
          content: '杭州体育馆',
          color: '#333333',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK'
        }
      }
    ],
    covers: [],
    courses: [],
    currentLocation: {
      latitude: 30.227838,
      longitude: 120.177598
    },
    // 分页相关
    page: 1,
    size: 10,
    hasMore: true,
    loading: false,
    searchValue: ''
  },
  
  onLoad: function() {
    // 初始化地图
    this.initMap();
    // 获取当前位置
    this.getCurrentLocation();
    // 加载场馆数据
    this.loadVenues();
  },
  
  // 加载场馆数据
  loadVenues: function(isLoadMore = false) {
    const { page, size, hasMore, loading, searchValue } = this.data;
    
    if (!hasMore || loading) return;
    
    this.setData({ loading: true });
    
    api.get('/api/v1/venues', {
      page: isLoadMore ? page + 1 : 1,
      size: size,
      name: searchValue
    }).then(res => {
      console.log("res-----", res);
      const venues = res.data.records || [];
      const total = res.data.total || 0;
      const current = res.data.current || (isLoadMore ? page + 1 : 1);
      const pages = res.data.pages || 0;
      
      const newPage = current;
      const newCourses = isLoadMore ? [...this.data.courses, ...venues] : venues;
      const newHasMore = newPage < pages;
      
      this.setData({
        courses: newCourses,
        page: newPage,
        hasMore: newHasMore,
        loading: false
      });
    }).catch(err => {
      console.error('加载场馆失败', err);
      this.setData({ loading: false });
    });
  },
  
  // 初始化地图
  initMap: function() {
    // 获取地图上下文
    this.mapCtx = wx.createMapContext('map');
    console.log('地图初始化完成');
  },
  
  // 获取当前位置
  getCurrentLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        
        this.setData({
          currentLocation: {
            latitude: latitude,
            longitude: longitude
          }
        });
        
        // 更新地图中心到当前位置
        this.mapCtx.moveToLocation();
        console.log('获取当前位置成功', res);
      },
      fail: (err) => {
        console.error('获取当前位置失败', err);
        // 使用默认位置
        wx.showToast({
          title: '无法获取位置，使用默认位置',
          icon: 'none'
        });
      }
    });
  },
  
  // 地图点击事件
  onMapTap: function(e) {
    console.log('地图点击位置', e);
  },

  onTapDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到详情页
    wx.navigateTo({
      url: '/pages/venue/venue?id=' + id
    });
  },
  
  // 快捷按钮点击事件
  onQuickBtnTap: function(e) {
    const type = e.currentTarget.dataset.type;
    switch(type) {
      case 'venues':
        wx.showToast({
          title: '加载附近场馆',
          icon: 'loading'
        });
        // 加载附近场馆逻辑
        break;
      case 'routes':
        wx.showToast({
          title: '加载运动路线',
          icon: 'loading'
        });
        // 加载运动路线逻辑
        break;
      case 'partners':
        wx.showToast({
          title: '查找运动伙伴',
          icon: 'loading'
        });
        // 查找运动伙伴逻辑
        break;
      case 'data':
        wx.showToast({
          title: '查看运动数据',
          icon: 'loading'
        });
        // 查看运动数据逻辑
        break;
    }
  },
  
  // 推荐场馆点击事件
  onVenueTap: function(e) {
    const venueId = e.currentTarget.dataset.id;
    console.log('点击场馆', venueId);
    wx.showToast({
      title: '进入场馆详情',
      icon: 'success'
    });
  },
  
  // 搜索功能
  onSearch: function(e) {
    const keyword = e.detail.value;
    console.log('搜索关键词', keyword);
    
    this.setData({
      searchValue: keyword,
      page: 1,
      hasMore: true,
      courses: []
    });
    
    // 重新加载数据
    this.loadVenues();
  },
  
  // 搜索框失焦事件
  onSearchBlur: function(e) {
    const keyword = e.detail.value;
    if (keyword && keyword !== this.data.searchValue) {
      this.onSearch(e);
    }
  },
  
  // 搜索框完成按钮事件
  onSearchConfirm: function(e) {
    this.onSearch(e);
  },
  
  // 触底加载更多
  onReachBottom: function() {
    this.loadVenues(true);
  }
});