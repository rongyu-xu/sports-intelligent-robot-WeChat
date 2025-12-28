// map.js
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
    courses: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      }
    ],
    currentLocation: {
      latitude: 30.227838,
      longitude: 120.177598
    }
  },
  
  onLoad: function() {
    // 初始化地图
    this.initMap();
    // 获取当前位置
    this.getCurrentLocation();
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
    // 搜索逻辑
    wx.showToast({
      title: '搜索中...',
      icon: 'loading'
    });
  }
});