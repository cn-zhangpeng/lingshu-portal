import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('响应错误:', error)
    const { status } = error.response || {}

    switch (status) {
      case 401:
        ElMessage.error('登录已过期，请重新登录')
        localStorage.removeItem('token')
        router.push('/login')
        break
      case 403:
        ElMessage.error('没有权限访问该资源')
        break
      case 404:
        ElMessage.error('请求的资源不存在')
        break
      case 500:
        ElMessage.error('服务器错误，请稍后重试')
        break
      default:
        ElMessage.error('网络错误，请稍后重试')
    }

    return Promise.reject(error)
  }
)

export default request