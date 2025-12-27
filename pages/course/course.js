// pages/course/course.js
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
    listContainerHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取系统信息，用于适配不同机型的状态栏和导航栏
    this.getSystemInfo();
    // 模拟获取列表数据
    this.getCoursesData();
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

  // 模拟获取课程列表数据
  getCoursesData: function() {
    let that = this;
    // 模拟异步请求数据
    setTimeout(function() {
      // 设置模拟数据
      that.setData({
        courses: [
          {
            id: 1,
            time: '2025/09/28 16:00-17:00',
            status: '已完成',
            title: '基础跑步训练',
            description: '学习正确的跑步姿势和呼吸方法，提高跑步效率',
            duration: 60,
            difficulty: '100'
          },
          {
            id: 2,
            time: '2025/09/29 15:00-16:30',
            status: '进行中',
            title: '力量训练课程',
            description: '通过器械训练增强核心力量，提高身体稳定性',
            duration: 90,
            difficulty: '90'
          },
          {
            id: 3,
            time: '2025/09/30 10:00-11:00',
            status: '未开始',
            title: '瑜伽放松练习',
            description: '通过瑜伽动作放松身心，缓解运动后的肌肉紧张',
            duration: 60,
            difficulty: '80'
          }
        ]
      });
    }, 1000);
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
    this.getCoursesData();
    // 停止下拉刷新动画
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})