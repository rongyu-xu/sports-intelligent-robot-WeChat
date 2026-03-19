// pages/course/course.js
const api = require('../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 课程列表数据
    courses: [],
    // 状态栏高度
    statusBarHeight: 0,
    // 导航栏高度
    navBarHeight: 0,
    // 导航栏背景色
    navBarBgColor: 'transparent',
    // 列表区域顶部内边距
    listPaddingTop: 0,
    // 列表容器高度
    listContainerHeight: 0,
    // 分页相关
    page: 1,
    size: 10,
    hasMore: true,
    loading: false,
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取系统信息，用于适配不同机型的状态栏和导航栏
    this.getSystemInfo();
    // 加载课程数据
    this.loadCourses();
  },
  
  // 加载课程数据
  loadCourses: function(isLoadMore = false) {
    const { page, size, hasMore, loading, searchValue } = this.data;
    
    if (!hasMore || loading) return;
    
    this.setData({ loading: true });
    
    api.get('/api/v1/course-plan-instances', {
      page: isLoadMore ? page + 1 : 1,
      size: size,
      courseName: searchValue
    }).then(res => {
      const courses = res.data.records || [];
      const total = res.data.total || 0;
      const current = res.data.current || (isLoadMore ? page + 1 : 1);
      const size = res.data.size || this.data.size;
      
      const newPage = current;
      const newCourses = isLoadMore ? [...this.data.courses, ...courses] : courses;
      // 使用 total 判断是否还有更多数据
      const newHasMore = (newPage * size) < total;
      
      this.setData({
        courses: newCourses,
        page: newPage,
        hasMore: newHasMore,
        loading: false
      });
    }).catch(err => {
      console.error('加载课程失败', err);
      this.setData({ loading: false });
    });
  },

  // 获取系统信息
  getSystemInfo: function() {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        // 设置状态栏高度
        that.setData({
          statusBarHeight: res.statusBarHeight,
          // 导航栏高度，默认44px
          navBarHeight: 44,
          // 列表区域顶部内边距 = 状态栏高度 + 导航栏高度 + 额外空间
          listPaddingTop: res.statusBarHeight + 44 + 16
        });
        // 计算列表容器高度
        that.setListContainerHeight();
      }
    });
  },

  // 计算列表容器高度
  setListContainerHeight: function() {
    let that = this;
    // 创建节点查询器
    const query = wx.createSelectorQuery();
    // 选择列表容器
    query.select('.list-container').boundingClientRect();
    query.exec(function(res) {
      if (res[0]) {
        that.setData({
          listContainerHeight: res[0].height
        });
      }
    });
  },

  // 课程项点击事件
  onCourseTap: function(e) {
    // 获取点击的课程ID
    const id = e.currentTarget.dataset.id;
    // 跳转到课程详情页面或执行其他操作
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 重新获取课程列表数据
    this.setData({
      page: 1,
      hasMore: true,
      courses: []
    });
    this.loadCourses();
    // 停止下拉刷新动画
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.loadCourses(true);
  },
  
  // scroll-view 触底事件
  onScrollToLower() {
    this.loadCourses(true);
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
    this.loadCourses();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})