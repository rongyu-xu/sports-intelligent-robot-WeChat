//detail.js
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
    // 这里可以是真实的网络请求，现在用模拟数据
    const mockDetailData = {
      '1': {
        title: '智能运动分析报告',
        description: '基于AI技术的运动姿态分析，帮助您提升运动表现',
        time: '2023-04-15 14:30',
        image: '/images/sport1.png',
        content: '智能运动分析系统使用先进的计算机视觉和深度学习技术，能够精确识别和分析用户的运动姿态。通过手机摄像头捕获运动过程，系统会实时分析关节角度、动作轨迹和肌肉发力情况，为用户提供专业的运动建议和改进方案。\n\n研究表明，使用智能运动分析系统的用户，运动效率平均提升了37%，运动损伤风险降低了45%。系统适用于各种运动场景，包括健身、跑步、瑜伽、舞蹈等。\n\n为了获得最佳的分析效果，请在光线充足的环境下进行拍摄，保持身体在画面中清晰可见。' 
      },
      '2': {
        title: '个性化训练计划生成',
        description: '根据您的身体数据和运动目标，生成专属训练计划',
        time: '2023-04-14 10:15',
        image: '/images/sport2.png',
        content: '个性化训练计划基于用户的身体数据、运动能力、训练目标和时间安排等多维度信息，通过智能算法生成最适合用户的训练方案。\n\n系统会考虑用户的年龄、性别、体重、身高、体脂率等基础数据，同时结合用户的运动经验、受伤历史和偏好，制定科学合理的训练计划。训练计划包括热身、主要训练内容、放松拉伸等环节，并提供详细的动作指导和视频演示。\n\n用户可以根据自己的训练情况随时调整计划，系统也会根据用户的训练反馈自动优化后续的训练安排。' 
      },
      '3': {
        title: '运动损伤预防指南',
        description: '科学的运动方式和热身方法，有效预防运动损伤',
        time: '2023-04-13 09:45',
        image: '/images/sport3.png',
        content: '运动损伤是很多运动爱好者面临的问题，本指南将为您介绍科学的运动损伤预防方法。\n\n首先，充分的热身是预防运动损伤的关键。热身可以提高体温，增加肌肉弹性，减少运动时的肌肉拉伤风险。建议进行5-10分钟的动态热身，如高抬腿、弓步走、手臂绕环等。\n\n其次，正确的动作技术也非常重要。错误的动作姿势会增加关节和肌肉的压力，容易导致损伤。建议在专业教练的指导下学习正确的动作技术，或使用智能运动分析系统进行动作纠正。\n\n此外，合理安排训练强度和频率，避免过度训练，保证充足的休息和恢复，也是预防运动损伤的重要措施。' 
      },
      '4': {
        title: '实时心率监测',
        description: '运动过程中的心率变化分析，确保运动安全有效',
        time: '2023-04-12 16:20',
        image: '/images/sport4.png',
        content: '心率监测是运动训练中重要的指标之一，通过监测心率可以了解运动强度和身体状态，确保训练安全有效。\n\n运动时的最佳心率区间可以通过公式计算：最大心率 = 220 - 年龄，目标心率区间为最大心率的60%-80%。在这个心率区间内运动，可以获得较好的有氧训练效果，同时避免过度训练。\n\n智能心率监测系统可以实时显示用户的心率数据，并根据心率变化提供运动建议。例如，当心率过高时，系统会提醒用户降低运动强度；当心率过低时，系统会建议用户增加运动强度。\n\n建议在进行中高强度运动时，使用心率监测设备实时监控心率变化，确保运动安全。' 
      },
      '5': {
        title: '睡眠质量与运动表现',
        description: '探究睡眠对运动能力的影响，提升训练效果',
        time: '2023-04-11 11:30',
        image: '/images/sport5.png',
        content: '睡眠是身体恢复和修复的重要时期，对运动表现有着重要的影响。研究表明，良好的睡眠可以提高运动能力、反应速度和决策能力，同时减少运动损伤的风险。\n\n成年人建议每天保持7-9小时的睡眠时间，运动员可能需要更多的睡眠时间来促进身体恢复。为了提高睡眠质量，建议保持规律的作息时间，创建舒适的睡眠环境，避免在睡前使用电子设备，避免摄入咖啡因和大量食物。\n\n智能睡眠监测系统可以跟踪用户的睡眠周期和质量，提供个性化的睡眠改善建议。通过改善睡眠质量，用户可以获得更好的训练效果和运动表现。' 
      }
    };
    
    // 预处理content，按换行符分割
    const detailData = mockDetailData[id];
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
        '/images/sport1.png',
        '/images/sport2.png',
        '/images/sport3.png',
        '/images/sport4.png',
        '/images/sport5.png',
        '/images/sport1.png'
      ]
    });
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