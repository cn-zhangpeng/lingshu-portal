<template>
  <div class="dashboard-container">
    <div class="board-header">
      <h2>项目看板</h2>
      <el-button type="primary" @click="showTaskDialog = true">
        新建任务
      </el-button>
    </div>

    <div class="board-content">
      <el-row :gutter="20">
        <el-col :span="6" v-for="list in kanbanLists" :key="list.id">
          <div class="list-container">
            <div class="list-header">
              <h3>{{ list.title }}</h3>
              <span class="task-count">{{ list.tasks.length }}</span>
            </div>
            <draggable
              v-model="list.tasks"
              group="tasks"
              :animation="200"
              ghost-class="ghost-card"
              class="task-list"
              @end="handleDragEnd"
            >
              <template #item="{ element }">
                <div class="task-card" @click="openTaskDetail(element)">
                  <h4>{{ element.title }}</h4>
                  <p class="task-desc">{{ element.description }}</p>
                  <div class="task-footer">
                    <el-tag size="small" :type="element.priority === 'high' ? 'danger' : 'info'">
                      {{ element.priority }}
                    </el-tag>
                    <el-avatar :size="24" :src="element.assignee.avatar" />
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 任务详情弹窗 -->
    <el-dialog
      v-model="showTaskDialog"
      :title="currentTask ? '编辑任务' : '新建任务'"
      width="500px"
    >
      <el-form :model="taskForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="taskForm.title" placeholder="请输入任务标题" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="taskForm.description"
            type="textarea"
            placeholder="请输入任务描述"
          />
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="taskForm.priority" placeholder="请选择优先级">
            <el-option label="高" value="high" />
            <el-option label="中" value="medium" />
            <el-option label="低" value="low" />
          </el-select>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select v-model="taskForm.assigneeId" placeholder="请选择执行人">
            <el-option
              v-for="member in projectMembers"
              :key="member.id"
              :label="member.name"
              :value="member.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showTaskDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveTask">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import draggable from 'vuedraggable'

// 看板数据
const kanbanLists = ref([
  {
    id: 1,
    title: '待处理',
    tasks: [
      {
        id: 1,
        title: '设计用户界面',
        description: '完成项目管理系统的界面设计',
        priority: 'high',
        assignee: { id: 1, name: '张三', avatar: '' }
      }
    ]
  },
  {
    id: 2,
    title: '进行中',
    tasks: []
  },
  {
    id: 3,
    title: '已完成',
    tasks: []
  }
])

// 项目成员数据
const projectMembers = ref([
  { id: 1, name: '张三', avatar: '' },
  { id: 2, name: '李四', avatar: '' }
])

// 任务表单数据
const showTaskDialog = ref(false)
const currentTask = ref(null)
const taskForm = reactive({
  title: '',
  description: '',
  priority: 'medium',
  assigneeId: ''
})

// 打开任务详情
const openTaskDetail = (task) => {
  currentTask.value = task
  Object.assign(taskForm, {
    title: task.title,
    description: task.description,
    priority: task.priority,
    assigneeId: task.assignee.id
  })
  showTaskDialog.value = true
}

// 保存任务
const handleSaveTask = () => {
  // TODO: 实现保存任务的逻辑
  ElMessage.success('保存成功')
  showTaskDialog.value = false
}

// 处理拖拽结束
const handleDragEnd = () => {
  // TODO: 实现更新任务状态的逻辑
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.list-container {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  height: calc(100vh - 200px);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.list-header h3 {
  margin: 0;
  font-size: 16px;
}

.task-count {
  background-color: #e4e7ed;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.task-list {
  min-height: 100px;
}

.task-card {
  background-color: #fff;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.task-card h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.task-desc {
  font-size: 12px;
  color: #606266;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ghost-card {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>