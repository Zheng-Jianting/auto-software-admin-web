<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入用户名称" v-model="searchName" prefix-icon="el-icon-search" clearable class="input" @keyup.enter.native="searchLoginRecord" />

      <el-table :data="loginRecords" border stripe>
        <el-table-column show-overflow-tooltip align="center" prop="id" label="ID" width="80" />
        <el-table-column show-overflow-tooltip align="center" prop="username" label="用户名称" width="150" />
        <el-table-column show-overflow-tooltip align="center" prop="ipAddress" label="IP地址" width="150" />
        <el-table-column show-overflow-tooltip align="center" prop="ipProvince" label="IP地址所属省份" width="150" />
        <el-table-column show-overflow-tooltip align="center" prop="ipCity" label="IP地址所属城市" width="150" />
        <el-table-column show-overflow-tooltip align="center" label="登录时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.loginDate }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeLoginRecord(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.params['page-size']"
        :current-page.sync="pagination.params['page-index']"
        @size-change="pageLoginRecord"
        @current-change="pageLoginRecord">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { pageLoginRecord, findLoginRecordByName, removeLoginRecord } from '@/network/login-mgmt'

  export default {
    name: 'LoginManagement',
    data() {
      return {
        searchName: '',
        loginRecords: [],
        pagination: {
          total: 0,
          params: {
            'page-index': 1,
            'page-size': 10
          }
        }
      }
    },
    methods: {
      assignLoginRecordPagination(response) {
        this.loginRecords = response.data.data.loginRecords
        this.pagination = {
          total: response.data.data.total,
          params: {
            'page-index': response.data.data.pageIndex,
            'page-size': response.data.data.pageSize
          }
        }
      },
      searchLoginRecord() {
        if (!this.checkPermission('find-login-record-by-name', '根据用户名称查询前台系统登录记录')) return
        findLoginRecordByName(this.searchName, this.pagination.params).then(response => this.assignLoginRecordPagination(response))
      },
      pageLoginRecord() {
        if (!this.checkPermission('page-login-record', '查看前台系统登录记录')) return
        pageLoginRecord(this.pagination.params).then(response => this.assignLoginRecordPagination(response))
      },
      removeLoginRecord(loginRecord) {
        if (!this.checkPermission('remove-login-record', '删除前台系统登录记录')) return
        this.$confirm('登录记录删除后不可恢复，请问是否删除？')
            .then(_ => removeLoginRecord(loginRecord.id).then(_ => this.pageLoginRecord())) // eslint-disable-line no-unused-vars
            .catch(_ => {}) // eslint-disable-line no-unused-vars
      }
    },
    created() {
      this.pageLoginRecord()
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