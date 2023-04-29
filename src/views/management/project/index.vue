<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入项目名称" v-model="searchProjectName" prefix-icon="el-icon-search" clearable class="input" @keyup.enter.native="serchProject" />

      <el-table :data="projects" border stripe>
        <el-table-column align="center" prop="id" label="ID" width="155" />
        <el-table-column show-overflow-tooltip align="center" prop="username" label="用户名称" width="160" />
        <el-table-column show-overflow-tooltip align="center" prop="projectName" label="项目名称" width="200" />
        <el-table-column show-overflow-tooltip align="center" prop="fromModule" label="模块来源" width="140" />
        <el-table-column show-overflow-tooltip align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="updated" label="最后更新时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updated }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="status" label="状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="viewProjectRecord(scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="openUpdateProjectDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="downloadProject(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="deleteProject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.params['page-size']"
        :current-page.sync="pagination.params['page-index']"
        @size-change="pageProject"
        @current-change="pageProject">
      </el-pagination>
    </div>

    <el-dialog width="35%" title="编辑项目基本信息" :visible.sync="updateProjectDialogVisible" @close="pageProject">
      <el-form :model="updateProject">
        <el-form-item label="ID" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateProject.id" />
        </el-form-item>
        <el-form-item label="用户名称" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateProject.username" />
        </el-form-item>
        <el-form-item label="项目名称" label-width="200px">
          <el-input style="width: 80%;" v-model="updateProject.projectName" />
        </el-form-item>
        <el-form-item label="模块来源" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateProject.fromModule" />
        </el-form-item>
        <el-form-item label="创建时间" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateProject.created" />
        </el-form-item>
        <el-form-item label="最后更新时间" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateProject.updated" />
        </el-form-item>
        <el-form-item label="状态" label-width="200px">
          <el-select style="width: 20%;" v-model="updateProject.status" :placeholder="updateProject.status === 1 ? '启用' : '禁用'">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateProject">取消</el-button>
        <el-button type="primary" @click="confirmUpdateProject">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pageProject, findProjectByName, updateProjectBasicInfo, downloadProject, deleteProject } from '@/network/project-mgmt'

  export default {
    name: 'ProjectManagement',
    data() {
      return {
        searchProjectName: '',
        projects: [],
        pagination: {
          total: 0,
          params: {
            'page-index': 1,
            'page-size': 10
          }
        },
        updateProject: {},
        updateProjectDialogVisible: false
      }
    },
    methods: {
      assignProjectPagination(response) {
        this.projects = response.data.data.projects
        this.pagination = {
          total: response.data.data.total,
          params: {
            'page-index': response.data.data.pageIndex,
            'page-size': response.data.data.pageSize
          }
        }
      },
      serchProject() {
        if (!this.checkPermission('find-project-by-name', '根据项目名称查询项目列表')) return
        findProjectByName(this.searchProjectName, this.pagination.params).then(response => this.assignProjectPagination(response))
      },
      pageProject() {
        if (!this.checkPermission('page-project', '查看项目列表')) return
        pageProject(this.pagination.params).then(response => this.assignProjectPagination(response))
      },
      viewProjectRecord(project) {
        if (!this.checkPermission('page-project-record', '查看项目某个模块下的分析记录列表')) return
        this.$router.push({
          name: 'ProjectRecord',
          query: { id: project.id, module: 'mindMap' }, // just let url display project id and active module
          params: { project, defaultModule: 'mindMap' } // actually pass the parameters
        })
      },
      openUpdateProjectDialog(project) {
        if (!this.checkPermission('update-project-basic-info', '编辑项目基本信息')) return
        this.updateProject = project
        this.updateProjectDialogVisible = true
      },
      cancelUpdateProject() {
        this.updateProjectDialogVisible = false
      },
      confirmUpdateProject() {
        this.updateProjectDialogVisible = false
        updateProjectBasicInfo(this.updateProject).then(_ => this.pageProject()) // eslint-disable-line no-unused-vars
      },
      downloadProject(project) {
        if (!this.checkPermission('download-project', '下载项目')) return
        downloadProject(project.id).then(response => {
          let blob = new Blob([JSON.stringify(response.data, null, 2)], { type : 'text/plain' })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = project.projectName + '.txt'
          a.click()
          window.URL.revokeObjectURL(url)
        })
      },
      deleteProject(project) {
        if (!this.checkPermission('delete-project', '删除项目')) return
        this.$confirm('项目删除后不可恢复，请问是否删除？')
            .then(_ => deleteProject(project.id).then(_ => this.pageProject())) // eslint-disable-line no-unused-vars
            .catch(_ => {}) // eslint-disable-line no-unused-vars
      }
    },
    created() {
      this.pageProject()
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
    width: 15%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>