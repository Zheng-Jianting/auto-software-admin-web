<template>
  <div class="flex-center">
    <div class="content">
      <el-button class="addRoleButton" size="mini" type="primary" @click="addRole()">新增角色</el-button>
      
      <el-table :data="roles" border stripe>
        <el-table-column show-overflow-tooltip align="center" prop="id" label="ID" width="80px" />
        <el-table-column show-overflow-tooltip align="center" prop="roleCode" label="角色编码" width="130px" />
        <el-table-column show-overflow-tooltip align="center" prop="roleName" label="角色名称" width="130px" />
        <el-table-column show-overflow-tooltip align="center" prop="description" label="角色描述" width="400px" />
        <el-table-column show-overflow-tooltip align="center" label="创建时间" width="200px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.creationDate }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="最后更新时间" width="200px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.lastUpdateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openEditRolePermissionDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.params['page-size']"
        :current-page.sync="pagination.params['page-index']"
        @size-change="pageRole"
        @current-change="pageRole">
      </el-pagination>
    </div>

    <el-dialog width="35%" title="编辑角色及其权限信息" :visible.sync="editRolePermissionDialogVisible" @close="pageRole">
      <el-scrollbar style="height: 650px;">
        <el-form :model="editRole">
          <el-form-item label="角色编码" label-width="150px">
            <el-input style="width: 80%;" v-model="editRole.roleCode" />
          </el-form-item>
          <el-form-item label="角色名称" label-width="150px">
            <el-input style="width: 80%;" v-model="editRole.roleName" />
          </el-form-item>
          <el-form-item label="角色描述" label-width="150px">
            <el-input style="width: 80%;" v-model="editRole.description" />
          </el-form-item>

          <el-form-item label="角色权限" label-width="150px">
            <el-tree
              ref="flatPermissionTree"
              style="margin-top: 6px;"
              node-key="id"
              show-checkbox
              :data="rolePermissionTree.flatPermissionTree"
              :props="{ label: 'description' }"
              :default-checked-keys="rolePermissionTree.checkedKeys"
              :default-expanded-keys="rolePermissionTree.expandedKeys">
            </el-tree>
          </el-form-item>
        </el-form>
      </el-scrollbar>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditRolePermission">取消</el-button>
        <el-button type="primary" @click="confirmEditRolePermission">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pageRole, getEditRoleDialogInfo, editRoleAndPermission, removeRole } from '@/network/user-mgmt'

  export default {
    name: 'RoleList',
    data() {
      return {
        roles: [],
        pagination: {
          total: 0,
          params: {
            'page-index': 1,
            'page-size': 10
          }
        },
        editRole: {},
        editRolePermissionDialogVisible: false,
        rolePermissionTree: {
          flatPermissionTree: [],
          checkedKeys: [],
          expandedKeys: []
        }
      }
    },
    methods: {
      addRole() {},
      assignRolePagination(response) {
        this.roles = response.data.data.roles
        this.pagination = {
          total: response.data.data.total,
          params: {
            'page-index': response.data.data.pageIndex,
            'page-size': response.data.data.pageSize
          }
        }
      },
      pageRole() {
        pageRole(this.pagination.params).then(response => this.assignRolePagination(response))
      },
      openEditRolePermissionDialog(role) {
        this.editRole = role
        this.editRolePermissionDialogVisible = true
        getEditRoleDialogInfo(role.id).then(response => {
          this.rolePermissionTree.flatPermissionTree = response.data.data.flatPermissionTree.children
          this.rolePermissionTree.checkedKeys = response.data.data.checkedKeys
          this.rolePermissionTree.expandedKeys = response.data.data.expandedKeys
        })
      },
      cancelEditRolePermission() {
        this.editRolePermissionDialogVisible = false
      },
      confirmEditRolePermission() {
        this.editRolePermissionDialogVisible = false
        const params = {
          role: this.editRole,
          checkedKeys: this.$refs.flatPermissionTree.getCheckedKeys(true)
        }
        editRoleAndPermission(params).then(_ => this.pageRole()) // eslint-disable-line no-unused-vars
      },
      removeRole(role) {
        this.$confirm('角色删除后不可恢复，请问是否删除？')
            .then(_ => removeRole(role.id).then(_ => this.pageRole())) // eslint-disable-line no-unused-vars
            .catch(_ => {}) // eslint-disable-line no-unused-vars
      }
    },
    created() {
      this.pageRole()
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
    width: 6%;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 15px;
  }
</style>

<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>