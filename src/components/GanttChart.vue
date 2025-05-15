<template>
  <div class="gantt-container">
    <div class="gantt-header">
      <div class="timeline-header">
        <div
          v-for="date in timelineDates"
          :key="date"
          class="timeline-cell"
        >
          {{ formatDate(date) }}
        </div>
      </div>
    </div>
    
    <div class="gantt-body">
      <div class="task-list">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-row"
        >
          <div class="task-info">
            <span class="task-name">{{ task.name }}</span>
            <span class="task-dates">
              {{ formatDate(task.startDate) }} - {{ formatDate(task.endDate) }}
            </span>
          </div>
          <div class="task-timeline">
            <div
              class="task-bar"
              :style="getTaskBarStyle(task)"
              :class="{ 'completed': task.completed }"
              @click="handleTaskClick(task)"
            >
              <div class="progress-bar" :style="{ width: `${task.progress}%` }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => []
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['task-click'])

// 计算时间线日期数组
const timelineDates = computed(() => {
  const dates = []
  let currentDate = dayjs(props.startDate)
  const end = dayjs(props.endDate)

  while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
    dates.push(currentDate.format('YYYY-MM-DD'))
    currentDate = currentDate.add(1, 'day')
  }

  return dates
})

// 格式化日期显示
const formatDate = (date) => {
  return dayjs(date).format('MM-DD')
}

// 计算任务条的样式
const getTaskBarStyle = (task) => {
  const start = dayjs(task.startDate)
  const end = dayjs(task.endDate)
  const totalDays = timelineDates.value.length
  
  const startOffset = dayjs(task.startDate).diff(dayjs(props.startDate), 'day')
  const duration = end.diff(start, 'day') + 1
  
  return {
    left: `${(startOffset / totalDays) * 100}%`,
    width: `${(duration / totalDays) * 100}%`
  }
}

// 处理任务点击事件
const handleTaskClick = (task) => {
  emit('task-click', task)
}
</script>

<style scoped>
.gantt-container {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.gantt-header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.timeline-header {
  display: flex;
  padding-left: 200px;
}

.timeline-cell {
  flex: 1;
  min-width: 50px;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #606266;
  border-right: 1px solid #e4e7ed;
}

.task-list {
  position: relative;
}

.task-row {
  display: flex;
  border-bottom: 1px solid #e4e7ed;
  height: 60px;
}

.task-info {
  width: 200px;
  padding: 8px;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.task-dates {
  font-size: 12px;
  color: #909399;
}

.task-timeline {
  flex: 1;
  position: relative;
  padding: 8px 0;
}

.task-bar {
  position: absolute;
  height: 24px;
  background-color: #409eff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.task-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-bar.completed {
  background-color: #67c23a;
}

.progress-bar {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>