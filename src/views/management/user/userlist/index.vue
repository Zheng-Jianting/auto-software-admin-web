<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入用户名" v-model="searchName" suffix-icon="el-icon-search" class="input" />
      <el-table :data="users" border stripe>
        <el-table-column align="center" prop="id" label="序号" width="75" />
        <el-table-column align="center" prop="name" label="用户" width="125" />
        <el-table-column align="center" prop="role" label="角色" width="130" />
        <el-table-column align="center" prop="status" label="状态" width="120" />
        <el-table-column align="center" label="操作" width="200">
          <el-button size="mini" type="primary" @click="assignRole(scope.$index, scope.row)">分配角色</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="10"
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
    name: 'UserList',
    data() {
      return {
        searchName: '',
        users: [],
        currentPage: 1
      }
    },
    methods: {
      assignRole() {},
      handleDelete() {},
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      for (let i = 0; i < 10; i++) {
        this.users.push({ id: i + 1, name: '张三', role: '超级管理员', status: '正常' })
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
    width: 31%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>