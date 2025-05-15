import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  // 用户登录
  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password })
      const { token: newToken, user } = response.data
      token.value = newToken
      userInfo.value = user
      localStorage.setItem('token', newToken)
      return true
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await axios.get('/api/users/current')
      userInfo.value = response.data
      return true
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return false
    }
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    login,
    getUserInfo,
    logout
  }
})