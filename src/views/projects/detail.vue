<template>
  <div class="project-detail">
    <el-card class="project-info-card">
      <template #header>
        <div class="card-header">
          <h2>{{ project.name }}</h2>
          <el-button-group>
            <el-button type="primary" :icon="Edit">编辑</el-button>
            <el-button type="danger" :icon="Delete">删除</el-button>
          </el-button-group>
        </div>
      </template>
      
      <div class="project-info">
        <el-descriptions :column="2">
          <el-descriptions-item label="创建时间">{{ formatDate(project.createTime) }}</el-descriptions-item>
          <el-descriptions-item label="项目负责人">{{ project.leader }}</el-descriptions-item>
          <el-descriptions-item label="项目状态">
            <el-tag :type="getStatusType(project.status)">{{ project.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="截止时间">{{ formatDate(project.deadline) }}</el-descriptions-item>
        </el-descriptions>
        
        <div class="project-description">
          <h3>项目描述</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </el-card>

    <el-card class="task-board-card">
      <template #header>
        <div class="card-header">
          <h3>任务看板</h3>
          <el-button type="primary" :icon="Plus">添加任务</el-button>
        </div>
      </template>
      
      <div class="task-board">
        <!-- 任务看板内容将在后续实现 -->
        <el-empty description="暂无任务" />
      </div>
    </el-card>

    <el-card class="team-card">
      <template #header>
        <div class="card-header">
          <h3>团队成员</h3>
          <el-button type="primary" :icon="Plus">添加成员</el-button>
        </div>
      </template>
      
      <div class="team-list">
        <!-- 团队成员列表将在后续实现 -->
        <el-empty description="暂无成员" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const route = useRoute()
const projectId = route.params.id

// 模拟项目数据，后续将通过API获取
const project = ref({
  id: projectId,
  name: '示例项目',
  leader: '张三',
  status: '进行中',
  createTime: '2024-03-20',
  deadline: '2024-06-30',
  description: '这是一个示例项目的详细描述信息。'
})

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

const getStatusType = (status) => {
  const statusMap = {
    '未开始': 'info',
    '进行中': 'primary',
    '已完成': 'success',
    '已暂停': 'warning',
    '已取消': 'danger'
  }
  return statusMap[status] || 'info'
}
</script>

<style scoped>
.project-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2,
.card-header h3 {
  margin: 0;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-description h3 {
  margin-bottom: 12px;
  font-size: 16px;
}

.project-description p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

.task-board,
.team-list {
  min-height: 200px;
}
</style>