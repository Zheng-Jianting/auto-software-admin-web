<template>
  <div class="flex-center tab-container">
    <div style="flex-direction: row;">
      <el-tag class="tag">用户：{{project.name}}</el-tag>
      <el-tag class="tag">项目名称：{{project.projectName}}</el-tag>
      <el-tag class="tag">模块来源：{{project.module}}</el-tag>
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
        tabMapOptions: [
          { key: 'mindMap', label: '思维导图' },
          { key: 'usercaseDiagram', label: '用例图' },
          { key: 'activityDiagram', label: '活动图' },
          { key: 'erDiagram', label: 'ER图' },
          { key: 'uiDiagram', label: '软件原型自动设计' },
          { key: 'autoCode', label: '自动编码实现' }
        ],
        projectId: '',
        activeModule: 'mindMap'
      }
    },
    watch: {
      activeModule(val) {
        this.$router.push({
          path: this.$route.path,
          query: { projectId: this.projectId, module: val }
        })
      }
    },
    created() {
      this.projectId = this.$route.query.projectId
      this.activeModule = this.$route.query.module
      // get project info using axios with projectId
      this.project = { name: '张三', projectName: '教务系统', module: 'mindMap' }
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