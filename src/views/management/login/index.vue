<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入用户名" v-model="searchName" suffix-icon="el-icon-search" class="input" />
      <el-table :data="loginRecords" border stripe>
        <el-table-column align="center" prop="id" label="序号" width="75" />
        <el-table-column align="center" prop="name" label="用户" width="120" />
        <el-table-column align="center" prop="ip" label="IP" width="140" />
        <el-table-column align="center" prop="ipCity" label="IP属地" width="120" />
        <el-table-column align="center" prop="loginCount" label="登录次数" width="100" />
        <el-table-column align="center" prop="lastLoginDate" label="上次登录时间" width="210" />
        <el-table-column align="center" prop="latestLoginDate" label="最近登录时间" width="210" />
        <el-table-column align="center" label="操作" width="100">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="1000"
        :page-size="100"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginManagement',
    data() {
      return {
        searchName: '',
        loginRecords: [],
        currentPage: 1
      }
    },
    methods: {
      handleDelete() {},
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      for (let i = 0; i < 20; i++) {
        this.loginRecords.push({ id: i + 1, name: '张三', ip: '127.0.0.1', ipCity: '深圳', loginCount: 10, lastLoginDate: '2023-01-01 00:00:00', latestLoginDate: '2023-01-01 00:00:00' })
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
    width: 18%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>