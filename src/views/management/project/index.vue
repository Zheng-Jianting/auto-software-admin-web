<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入项目名称" v-model="searchProjectName" suffix-icon="el-icon-search" class="input" />
      <el-table :data="projects" border stripe>
        <el-table-column align="center" prop="id" label="序号" width="75" />
        <el-table-column align="center" prop="name" label="用户" width="120" />
        <el-table-column align="center" prop="projectName" label="项目名称" width="150" />
        <el-table-column align="center" prop="module" label="模块来源" width="120" />
        <el-table-column align="center" prop="creationDate" label="创建时间" width="210" />
        <el-table-column align="center" prop="lastUpdateDate" label="最后更新时间" width="210" />
        <el-table-column align="center" prop="status" label="状态" width="100" />
        <el-table-column align="center" label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="viewProjectRecord(scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="downloadProject">下载</el-button>
            <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="100"
        :page-size="10"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectManagement',
    data() {
      return {
        searchProjectName: '',
        projects: [],
        currentPage: 1
      }
    },
    methods: {
      viewProjectRecord(project) {
        this.$router.push({
          path: '/management/project/record',
          query: { projectId: project.id, module: 'mindMap' }
        })
      },
      downloadProject() {},
      deleteProject() {},
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      for (let i = 0; i < 10; i++) {
        this.projects.push({ id: i + 1, name: '张三', projectName: '教务系统', module: 'mindMap', creationDate: '2023-01-01 00:00:00', lastUpdateDate: '2023-01-01 00:00:00', status: '正常' })
      }
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

  .content {
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
  }

  .input {
    width: 16%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>