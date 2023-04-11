<template>
  <div class="flex-center tab-container">
    <div style="flex-direction: row;">
      <el-tag class="tag">用户：{{ project.username }}</el-tag>
      <el-tag class="tag">项目名称：{{ project.projectName }}</el-tag>
      <el-tag class="tag">模块来源：{{ project.fromModule }}</el-tag>
    </div>
    <el-tabs class="tabs" v-model="activeModule" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :name="item.key" :label="item.label">
        <keep-alive>
          <ProjectRecordTabPane v-if="activeModule==item.key" :project="project" :activeModule="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ProjectRecordTabPane from './components/TabPane'

  export default {
    name: 'ProjectRecord',
    components: { ProjectRecordTabPane },
    data() {
      return {
        project: {},
        activeModule: 'mindMap',
        tabMapOptions: [
          { key: 'mindMap', label: '思维导图' },
          { key: 'usercaseDiagram', label: '用例图' },
          { key: 'activityDiagram', label: '活动图' },
          { key: 'erDiagram', label: 'ER图' },
          { key: 'uiDiagram', label: 'UI组件布局图' },
          { key: 'autoCode', label: '自动代码生成' }
        ]
      }
    },
    watch: {
      activeModule(val) {
        this.$router.push({
          name: 'ProjectRecord',
          query: { id: this.project.id, module: val }, // just let url display project id and active module
        })
      }
    },
    created() {
      this.project = this.$route.params.project
      this.activeModule = this.$route.params.defaultModule
    }
  }
</script>

<style scoped>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .tab-container {
    margin: 30px;
  }

  .tag {
    margin-left: 20px;
  }

  .tabs {
    margin-top: 15px;
  }
</style>