//detail.js
const api = require('../../api/api.js')

Page({
  data: {
    id: '',
    contentLines: [],
    detail: {
      title: '',
      description: '',
      time: '',
      content: '',
      image: ''
    },
    imageList: [] // 图片列表
  },
  onLoad: function(options) {
    // 获取从首页传递过来的id
    if (options && options.id) {
      this.setData({
        id: options.id
      });
      // 根据id获取详情数据
      this.getDetailData(options.id);
    }
  },
  
  onShow: function() {
    // 页面显示时检查登录状态
    const app = getApp();
    app.recheckLogin();
  },
  getDetailData: function(id) {
    // 调用真实接口获取详情数据
    api.get('/api/v1/course-plan-instances/' + id).then(res => {
      const courseData = res.data || {};
      
      // 构建详情数据
      const detailData = {
        title: courseData.planName || '课程详情',
        description: courseData.courseTypeName || '',
        time: courseData.instanceDate ? courseData.instanceDate + ' ' + (courseData.instanceTime || '') : '',
        content: this.buildContent(courseData),
        image: '', // 接口中没有图片字段，使用默认值
        durationMinutes: courseData.durationMinutes || '--',
        totalStudentCount: courseData.totalStudentCount || '--',
        attendanceCount: courseData.attendanceCount || '--'
      };
      
      // 预处理content，按换行符分割
      const contentLines = detailData.content.split('\n');
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: detailData.title
      });
      
      // 更新数据
      this.setData({
        detail: detailData,
        contentLines: contentLines,
        imageList: [
          '/images/test0.png',
          '/images/test1.png',
          '/images/test2.png',
          '/images/test3.png',
          '/images/test4.png',
          '/images/test5.png'
        ]
      });
    }).catch(err => {
      console.error('加载课程详情失败', err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
  },
  
  // 构建详情内容
  buildContent: function(courseData) {
    let content = '';
    
    // 课程基本信息
    content += `课程名称：${courseData.planName || '未知'}\n`;
    content += `课程类型：${courseData.courseTypeName || '未知'}\n`;
    content += `适用年龄：${courseData.applicableAge || '不限'}\n`;
    content += `课程时长：${courseData.durationMinutes || 0}分钟\n`;
    content += `场馆：${courseData.venueName || '未知'}\n`;
    content += `教练：${courseData.coachName || '未知'}\n`;
    content += `班级：${courseData.className || '未知'}\n`;
    content += `状态：${courseData.statusName || '未知'}\n\n`;
    
    // 课程设备
    if (courseData.equipment) {
      content += `课程设备：${courseData.equipment}\n\n`;
    }
    
    // 包含训练
    if (courseData.includedTraining) {
      content += `包含训练：${courseData.includedTraining}\n\n`;
    }
    
    // 编排状态
    content += `编排状态：${courseData.schedulingStatusName || '未知'}\n`;
    content += `学员人数：${courseData.totalStudentCount || 0}人\n`;
    content += `实到人数：${courseData.attendanceCount || 0}人\n\n`;
    
    // 单项课程信息
    if (courseData.includedSingleCourses && courseData.includedSingleCourses.length > 0) {
      content += `课程内容：\n`;
      courseData.includedSingleCourses.forEach((item, index) => {
        content += `${index + 1}. ${item.courseName || '未知课程'}\n`;
        content += `   类型：${item.courseTypeName || '未知'}\n`;
        content += `   时长：${item.totalDurationMinutes || 0}分钟\n`;
        if (item.description) {
          content += `   描述：${item.description}\n`;
        }
        content += `\n`;
      });
    }
    
    return content;
  },
  // 图片预览功能
  previewImage: function(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imageList[index],
      urls: this.data.imageList,
      success: function(res) {
        console.log('预览图片成功', res);
      },
      fail: function(res) {
        console.error('预览图片失败', res);
      }
    });
  },
  
  onShareAppMessage: function() {
    // 分享功能
    return {
      title: this.data.detail.title,
      path: '/pages/detail/detail?id=' + this.data.id
    }
  }
})