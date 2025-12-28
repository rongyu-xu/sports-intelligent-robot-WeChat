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
    listPaddingTop: 0,
    
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
    ],
    
    // 雷达图数据 - 近三个月的指标情况
    radarData: {
      // 指标名称
      indicators: ['基本姿势', '运球', '投篮', '传球', '体能'],
      // 三个月的数据（最近一月、上月、上上月）
      months: ['9月', '8月', '7月'],
      // 数据值（每个指标的三个月数值）
      data: [
        [5, 3, 6], // 基本姿势
        [4, 5.2, 6.4], // 运球
        [2.5, 4.6, 3.8], // 投篮
        [4, 5, 6], // 传球
        [6, 4, 5.2]  // 体能
      ],
      // 颜色 - 使用指定的色值
      colors: ['#FF9E17', '#019EFF', '#00CD85'],
      // 填充颜色 - 使用指定的rgba值
      fillColors: ['rgba(255,158,23,0.16)', 'rgba(1,158,255,0.16)', 'rgba(0,205,133,0.16)']
    },
    
    // 折线图数据 - 近6个月的分数变化
    lineChartData: {
      // 月份
      months: ['4月', '5月', '6月', '7月', '8月', '9月'],
      // 分数
      scores: [6.2, 7.5, 6.8, 7.2, 8.5, 9.1]
    }
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
          statusBarHeight: res.statusBarHeight,
          listPaddingTop: res.statusBarHeight + 44 // 导航栏高度固定为44px
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
    // 绘制雷达图
    this.drawRadarChart();
    // 绘制折线图
    this.drawLineChart();
  },
  
  /**
   * 绘制雷达图
   */
  drawRadarChart: function() {
    // 获取Canvas上下文
    const ctx = wx.createCanvasContext('radarChart');
    
    // 设置画布尺寸（调整为更小的尺寸）
    const width = 250;
    const height = 250;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 90; // 减小雷达图半径
    
    // 获取雷达图数据
    const { indicators, data, colors, fillColors } = this.data.radarData;
    const indicatorCount = indicators.length;
    
    // 绘制雷达图网格
    for (let level = 1; level <= 5; level++) {
      ctx.beginPath();
      ctx.setStrokeStyle('#e0e0e0');
      ctx.setLineWidth(1);
      
      for (let i = 0; i < indicatorCount; i++) {
        const angle = (i * 2 * Math.PI) / indicatorCount - Math.PI / 2;
        const x = centerX + (radius * level / 5) * Math.cos(angle);
        const y = centerY + (radius * level / 5) * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
    }
    
    // 绘制轴线
    for (let i = 0; i < indicatorCount; i++) {
      ctx.beginPath();
      ctx.setStrokeStyle('#999999');
      ctx.setLineWidth(1);
      
      const angle = (i * 2 * Math.PI) / indicatorCount - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // 绘制指标名称（调整字体大小和位置）
      ctx.setFontSize(10);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.setFillStyle('#333333');
      
      const labelX = centerX + (radius + 12) * Math.cos(angle);
      const labelY = centerY + (radius + 12) * Math.sin(angle);
      ctx.fillText(indicators[i], labelX, labelY);
    }
    
    // 绘制数据区域
    const monthCount = data[0].length;
    for (let monthIndex = 0; monthIndex < monthCount; monthIndex++) {
      ctx.beginPath();
      ctx.setStrokeStyle(colors[monthIndex]); // 使用指定的边框颜色
      ctx.setFillStyle(fillColors[monthIndex]); // 使用指定的填充颜色
      ctx.setLineWidth(2);
      
      for (let i = 0; i < indicatorCount; i++) {
        const value = data[i][monthIndex];
        const angle = (i * 2 * Math.PI) / indicatorCount - Math.PI / 2;
        const x = centerX + (radius * value / 10) * Math.cos(angle);
        const y = centerY + (radius * value / 10) * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    
    // 绘制图例（调整位置为下方居中，横排显示）
    const { months } = this.data.radarData;
    const legendItemWidth = 40; // 每个图例项的宽度
    const legendTotalWidth = months.length * legendItemWidth;
    const legendStartX = (width - legendTotalWidth) / 2; // 计算居中起始位置
    const legendY = height - 20; // 雷达图下方的Y坐标
    
    for (let i = 0; i < months.length; i++) {
      // 计算每个图例项的X坐标
      const legendX = legendStartX + i * legendItemWidth;
      
      // 绘制颜色块
      ctx.beginPath();
      ctx.setFillStyle(colors[i]);
      ctx.rect(legendX, legendY, 10, 10);
      ctx.fill();
      
      // 绘制图例文本
      ctx.setFontSize(11);
      ctx.setTextAlign('left');
      ctx.setTextBaseline('middle');
      ctx.setFillStyle('#333333');
      ctx.fillText(months[i], legendX + 15, legendY + 5);
    }
    
    // 绘制完成
    ctx.draw();
  },
  
  /**
   * 绘制折线图
   */
  drawLineChart: function() {
    // 获取Canvas上下文
    const ctx = wx.createCanvasContext('lineChart');
    
    // 设置画布尺寸
    const width = 320;
    const height = 200;
    const padding = 30;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // 获取折线图数据
    const { months, scores } = this.data.lineChartData;
    const dataCount = months.length;
    
    // 计算数据点坐标
    const xStep = chartWidth / (dataCount - 1);
    const maxScore = 10;
    const yStep = chartHeight / maxScore;
    
    // 绘制坐标轴
    ctx.beginPath();
    ctx.setStrokeStyle('#e0e0e0');
    ctx.setLineWidth(1);
    
    // X轴
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    
    // Y轴
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    
    ctx.stroke();
    
    // 绘制Y轴刻度
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * 2 * yStep);
      
      // 刻度线
      ctx.beginPath();
      ctx.setStrokeStyle('#e0e0e0');
      ctx.setLineWidth(1);
      ctx.moveTo(padding, y);
      ctx.lineTo(padding - 5, y);
      ctx.stroke();
      
      // 刻度值
      ctx.setFontSize(10);
      ctx.setTextAlign('right');
      ctx.setTextBaseline('middle');
      ctx.setFillStyle('#999999');
      ctx.fillText((i * 2).toString(), padding - 10, y);
    }
    
    // 创建渐变（用于折线下方的填充）
    const gradient = ctx.createLinearGradient(padding, padding, padding, height - padding);
    gradient.addColorStop(0, 'rgba(1, 158, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(1, 158, 255, 0)');
    
    // 绘制填充区域
    ctx.beginPath();
    ctx.moveTo(padding, height - padding); // 从左下角开始
    
    for (let i = 0; i < dataCount; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (scores[i] * yStep);
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width - padding, height - padding); // 到右下角结束
    ctx.closePath();
    ctx.setFillStyle(gradient);
    ctx.fill();
    
    // 绘制折线
    ctx.beginPath();
    ctx.setStrokeStyle('#019EFF');
    ctx.setLineWidth(2);
    
    for (let i = 0; i < dataCount; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (scores[i] * yStep);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // 绘制数据点
    for (let i = 0; i < dataCount; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (scores[i] * yStep);
      
      ctx.beginPath();
      ctx.setFillStyle('#019EFF');
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // 绘制月份标签
    for (let i = 0; i < dataCount; i++) {
      const x = padding + i * xStep;
      
      ctx.setFontSize(10);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('top');
      ctx.setFillStyle('#999999');
      ctx.fillText(months[i], x, height - padding + 5);
    }
    
    // 绘制完成
    ctx.draw();
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