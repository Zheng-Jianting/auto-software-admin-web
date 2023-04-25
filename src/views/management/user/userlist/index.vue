<template>
  <div class="flex-center">
    <div class="content">
      <el-input placeholder="请输入用户名称" v-model="searchName" prefix-icon="el-icon-search" clearable class="input" @keyup.enter.native="searchUser" />

      <el-table :data="users" border stripe>
        <el-table-column show-overflow-tooltip align="center" prop="id" label="ID" width="80" />
        <el-table-column show-overflow-tooltip align="center" prop="username" label="用户名称" width="150" />
        <el-table-column show-overflow-tooltip align="center" prop="email" label="邮箱" width="200" />
        <el-table-column show-overflow-tooltip align="center" label="状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="注册时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.creationDate }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="最后更新时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.lastUpdateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="roleName" label="角色" width="120" />
        <el-table-column show-overflow-tooltip align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUpdateUserDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="openAssignRoleDialog(scope.row)">分配角色</el-button>
            <el-button size="mini" type="danger" @click="removeUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.params['page-size']"
        :current-page.sync="pagination.params['page-index']"
        @size-change="pageUser"
        @current-change="pageUser">
      </el-pagination>
    </div>

    <el-dialog width="35%" title="编辑用户基本信息" :visible.sync="updateUserDialogVisible" @close="pageUser">
      <el-form :model="updateUser">
        <el-form-item label="ID" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateUser.id" />
        </el-form-item>
        <el-form-item label="用户名称" label-width="200px">
          <el-input style="width: 80%;" v-model="updateUser.username" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="200px">
          <el-input style="width: 80%;" v-model="updateUser.email" />
        </el-form-item>
        <el-form-item label="状态" label-width="200px">
          <el-select style="width: 20%;" v-model="updateUser.status" :placeholder="updateUser.status === 'enabled' ? '启用' : '禁用'">
            <el-option label="启用" value="enabled"></el-option>
            <el-option label="禁用" value="disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateUser.creationDate" />
        </el-form-item>
        <el-form-item label="最后更新时间" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateUser.lastUpdateDate" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUser">取消</el-button>
        <el-button type="primary" @click="confirmUpdateUser">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="40%" title="分配角色" :visible.sync="assignRoleDialogVisible" @close="pageUser">
      <el-form :model="assignRoleUser">
        <el-form-item label="用户名称" label-width="130px">
          <el-input style="width: 32%;" disabled v-model="assignRoleUser.username" />
        </el-form-item>
        <el-form-item label="角色列表" label-width="130px">
          <el-checkbox class="checkbox" v-for="role in assignRoles" :key="role.roleId" v-model="role.owned">{{ role.roleName + '：' + role.description }}</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAssignRole">取消</el-button>
        <el-button type="primary" @click="confirmAssignRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pageUser, findUserByName, updateUser, removeUser, listAssignRole, assignRole } from '@/network/user-mgmt'

  export default {
    name: 'UserList',
    data() {
      return {
        searchName: '',
        users: [],
        pagination: {
          total: 0,
          params: {
            'page-index': 1,
            'page-size': 10
          }
        },
        updateUser: {},
        updateUserDialogVisible: false,
        assignRoles: [],
        assignRoleUser: {},
        assignRoleDialogVisible: false
      }
    },
    methods: {
      assignUserPagination(response) {
        this.users = response.data.data.users
        this.pagination = {
          total: response.data.data.total,
          params: {
            'page-index': response.data.data.pageIndex,
            'page-size': response.data.data.pageSize
          }
        }
      },
      searchUser() {
        if (!this.checkPermission('find-user-by-name', '根据用户名称查询用户列表')) return
        findUserByName(this.searchName, this.pagination.params).then(response => this.assignUserPagination(response))
      },
      pageUser() {
        if (!this.checkPermission('page-user', '查看用户列表')) return
        pageUser(this.pagination.params).then(response => this.assignUserPagination(response))
      },
      openUpdateUserDialog(user) {
        if (!this.checkPermission('update-user', '编辑用户信息')) return
        this.updateUser = user
        this.updateUserDialogVisible = true
      },
      cancelUpdateUser() {
        this.updateUserDialogVisible = false
      },
      confirmUpdateUser() {
        this.updateUserDialogVisible = false
        updateUser(this.updateUser).then(_ => this.pageUser()) // eslint-disable-line no-unused-vars
      },
      removeUser(user) {
        if (!this.checkPermission('remove-user', '删除用户')) return
        this.$confirm('用户删除后不可恢复，请问是否删除？')
            .then(_ => removeUser(user.id).then(_ => this.pageUser())) // eslint-disable-line no-unused-vars
            .catch(_ => {}) // eslint-disable-line no-unused-vars
      },
      openAssignRoleDialog(user) {
        if (!this.checkPermission('assign-role', '赋予用户角色')) return
        this.assignRoleUser = user
        listAssignRole(user.id).then(response => {
          this.assignRoles = response.data.data
          this.assignRoleDialogVisible = true
        })
      },
      cancelAssignRole() {
        this.assignRoleDialogVisible = false
      },
      confirmAssignRole() {
        this.assignRoleDialogVisible = false
        let roleIdList = []
        this.assignRoles.forEach(role => {
          if (role.owned) {
            roleIdList.push(role.roleId)
          }
        })
        assignRole(this.assignRoleUser.id, roleIdList).then(_ => this.pageUser()) // eslint-disable-line no-unused-vars
      }
    },
    created() {
      this.pageUser()
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

  .checkbox {
    display: block;
    padding-bottom: 5px;
  }
</style>