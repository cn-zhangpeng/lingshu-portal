<template>
  <div class="gantt-container">
    <h2>项目甘特图 {{ $route.params.id }}</h2>
    <!-- 这里将实现甘特图功能 -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.gantt-container {
  padding: 20px;
}
</style>