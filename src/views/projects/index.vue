<template>
  <div class="projects-container">
    <div class="projects-header">
      <h2>项目列表</h2>
      <el-button type="primary" @click="showProjectDialog = true">
        新建项目
      </el-button>
    </div>

    <div class="projects-content">
      <el-tabs v-model="activeGroup">
        <el-tab-pane
          v-for="group in projectGroups"
          :key="group.id"
          :label="group.name"
          :name="group.id"
        >
          <el-row :gutter="20">
            <el-col :span="8" v-for="project in group.projects" :key="project.id">
              <el-card class="project-card" @click="openProjectDetail(project)">
                <template #header>
                  <div class="project-header">
                    <h3>{{ project.name }}</h3>
                    <el-dropdown trigger="click" @command="handleCommand">
                      <el-icon><More /></el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="{ type: 'edit', project }">编辑</el-dropdown-item>
                          <el-dropdown-item :command="{ type: 'delete', project }" divided>
                            删除
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
                <div class="project-info">
                  <p>{{ project.description }}</p>
                  <div class="project-stats">
                    <div class="stat-item">
                      <el-icon><Timer /></el-icon>
                      <span>{{ project.startDate }} ~ {{ project.endDate }}</span>
                    </div>
                    <div class="stat-item">
                      <el-icon><User /></el-icon>
                      <span>{{ project.memberCount }} 成员</span>
                    </div>
                  </div>
                  <el-progress
                    :percentage="project.progress"
                    :status="project.progress === 100 ? 'success' : ''"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 项目表单弹窗 -->
    <el-dialog
      v-model="showProjectDialog"
      :title="currentProject ? '编辑项目' : '新建项目'"
      width="500px"
    >
      <el-form :model="projectForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="projectForm.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="projectForm.description"
            type="textarea"
            placeholder="请输入项目描述"
          />
        </el-form-item>
        <el-form-item label="所属分组">
          <el-select v-model="projectForm.groupId" placeholder="请选择项目分组">
            <el-option
              v-for="group in projectGroups"
              :key="group.id"
              :label="group.name"
              :value="group.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="projectForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showProjectDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveProject">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { More, Timer, User } from '@element-plus/icons-vue'

// 项目分组数据
const projectGroups = ref([
  {
    id: 'ongoing',
    name: '进行中',
    projects: [
      {
        id: 1,
        name: '项目管理系统',
        description: '开发一个现代化的项目管理系统',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        memberCount: 5,
        progress: 30
      }
    ]
  },
  {
    id: 'completed',
    name: '已完成',
    projects: []
  }
])

// 当前选中的分组
const activeGroup = ref('ongoing')

// 项目表单数据
const showProjectDialog = ref(false)
const currentProject = ref(null)
const projectForm = reactive({
  name: '',
  description: '',
  groupId: '',
  dateRange: []
})

// 打开项目详情
const openProjectDetail = (project) => {
  // TODO: 实现跳转到项目详情页面的逻辑
}

// 处理项目操作
const handleCommand = ({ type, project }) => {
  if (type === 'edit') {
    currentProject.value = project
    Object.assign(projectForm, {
      name: project.name,
      description: project.description,
      groupId: activeGroup.value,
      dateRange: [project.startDate, project.endDate]
    })
    showProjectDialog.value = true
  } else if (type === 'delete') {
    ElMessageBox.confirm('确认删除该项目吗？', '提示', {
      type: 'warning'
    }).then(() => {
      // TODO: 实现删除项目的逻辑
      ElMessage.success('删除成功')
    })
  }
}

// 保存项目
const handleSaveProject = () => {
  // TODO: 实现保存项目的逻辑
  ElMessage.success('保存成功')
  showProjectDialog.value = false
}
</script>

<style scoped>
.projects-container {
  padding: 20px;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.project-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-header h3 {
  margin: 0;
  font-size: 16px;
}

.project-info p {
  color: #606266;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-stats {
  margin: 12px 0;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #909399;
  font-size: 13px;
}

.stat-item .el-icon {
  margin-right: 4px;
}
</style>