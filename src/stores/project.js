import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const currentProject = ref(null)
  const boardColumns = ref([])
  const tasks = ref([])

  // 获取项目列表
  const getProjects = async () => {
    try {
      const response = await axios.get('/api/projects')
      projects.value = response.data
      return true
    } catch (error) {
      console.error('获取项目列表失败:', error)
      return false
    }
  }

  // 获取项目详情
  const getProjectDetail = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`)
      currentProject.value = response.data
      return true
    } catch (error) {
      console.error('获取项目详情失败:', error)
      return false
    }
  }

  // 获取看板列
  const getBoardColumns = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/columns`)
      boardColumns.value = response.data
      return true
    } catch (error) {
      console.error('获取看板列失败:', error)
      return false
    }
  }

  // 获取任务列表
  const getTasks = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks`)
      tasks.value = response.data
      return true
    } catch (error) {
      console.error('获取任务列表失败:', error)
      return false
    }
  }

  // 更新任务状态（拖拽后）
  const updateTaskStatus = async (taskId, columnId) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { columnId })
      return true
    } catch (error) {
      console.error('更新任务状态失败:', error)
      return false
    }
  }

  return {
    projects,
    currentProject,
    boardColumns,
    tasks,
    getProjects,
    getProjectDetail,
    getBoardColumns,
    getTasks,
    updateTaskStatus
  }
})