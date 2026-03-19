const config = require('../config/config.js')

// 测试阶段使用的固定token
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6MSwidXNlclR5cGUiOiJBRE1JTiIsInRva2VuVHlwZSI6ImFjY2VzcyIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc3MzQ2MDkxMSwiZXhwIjoxNzczNTQ3MzExfQ.BEoIKMNEt7Z7BXAI4ENHEslrCsX0bpjFKH0wIpQIRzo'

const request = (options) => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    
    // 使用测试token或从全局获取的token
    const token = TEST_TOKEN || app.globalData.token || ''
    
    wx.request({
      url: config.baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        ...options.header
      },
      timeout: config.timeout,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          })
          setTimeout(() => {
            app.logout()
          }, 1500)
          reject(res)
        } else {
          wx.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

const http = {
  get: (url, data, options = {}) => {
    return request({
      url,
      method: 'GET',
      data,
      ...options
    })
  },
  
  post: (url, data, options = {}) => {
    return request({
      url,
      method: 'POST',
      data,
      ...options
    })
  },
  
  put: (url, data, options = {}) => {
    return request({
      url,
      method: 'PUT',
      data,
      ...options
    })
  },
  
  delete: (url, data, options = {}) => {
    return request({
      url,
      method: 'DELETE',
      data,
      ...options
    })
  }
}

module.exports = http
