<template>
  <div class="flex-center">
    <div class="content">
      <el-button class="addRoleButton" size="mini" type="primary" @click="addRole(scope.$index, scope.row)">新增角色</el-button>
      <el-table :data="roles" border stripe>
        <el-table-column align="center" prop="id" label="序号" width="75" />
        <el-table-column align="center" prop="role" label="角色" width="130" />
        <el-table-column align="center" prop="description" label="描述" width="360" />
        <el-table-column align="center" label="操作" width="200">
          <el-button size="mini" type="primary" @click="editPermission(scope.$index, scope.row)">编辑权限</el-button>
          <el-button size="mini" type="danger" @click="deleteRole(scope.$index, scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="3"
        :page-size="20"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RoleList',
    data() {
      return {
        roles: [],
        currentPage: 1
      }
    },
    methods: {
      addRole() {},
      editPermission() {},
      deleteRole() {},
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      this.roles = [
        { id: 1, role: '用户', description: '普通用户，具有前台系统使用权限' },
        { id: 2, role: '管理员', description: '具有前后台系统使用权限，能对用户进行管理' },
        { id: 3, role: '超级管理员', description: '具有系统最高权限' }
      ]
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

  .addRoleButton {
    width: 10%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>