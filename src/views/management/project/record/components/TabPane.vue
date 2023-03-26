<template>
  <div class="flex-center">
    <el-table :data="records" border fit highlight-current-row style="width: 100%">
      <el-table-column v-loading="loading" element-loading-text="loading" align="center" label="ID" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.recordId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="记录名称" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.recordName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="需求文本" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分析结果" width="240" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.recordData }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updated }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openUpdateRecordDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteProjectRecord(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      :page-size="pagination.params['page-size']"
      :current-page.sync="pagination.params['page-index']"
      @size-change="pageProjectRecord"
      @current-change="pageProjectRecord">
    </el-pagination>

    <el-dialog width="35%" title="编辑项目分析记录基本信息" :visible.sync="updateRecordDialogVisible" @close="pageProjectRecord">
      <el-form :model="updateRecord">
        <el-form-item label="ID" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateRecord.recordId" />
        </el-form-item>
        <el-form-item label="记录名称" label-width="200px">
          <el-input style="width: 80%;" v-model="updateRecord.recordName" />
        </el-form-item>
        <el-form-item label="需求文本" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateRecord.text" autosize />
        </el-form-item>
        <el-form-item label="分析结果" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateRecord.recordData" autosize />
        </el-form-item>
        <el-form-item label="最后更新时间" label-width="200px">
          <el-input style="width: 80%;" disabled v-model="updateRecord.updated" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateRecord">取消</el-button>
        <el-button type="primary" @click="confirmUpdateRecord">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pageProjectRecord, updateProjectRecord, deleteProjectRecord } from '@/network/project-mgmt'

  export default {
    name: 'ProjectRecordTabPane',
    props: ['project', 'activeModule'],
    data() {
      return {
        records: [],
        pagination: {
          total: 0,
          params: {
            'page-index': 1,
            'page-size': 10
          }
        },
        loading: false,
        updateRecord: {},
        updateRecordDialogVisible: false
      }
    },
    created() {
      this.pageProjectRecord()
    },
    methods: {
      assignRecordPagination(response) {
        this.records = response.data.data.records
        this.pagination = {
          total: response.data.data.total,
          params: {
            'page-index': response.data.data.pageIndex,
            'page-size': response.data.data.pageSize
          }
        }
      },
      pageProjectRecord() {
        this.loading = true
        pageProjectRecord(this.project.id, this.activeModule, this.pagination.params).then(response => this.assignRecordPagination(response))
        this.loading = false
      },
      openUpdateRecordDialog(record) {
        this.updateRecord = record
        this.updateRecordDialogVisible = true
      },
      cancelUpdateRecord() {
        this.updateRecordDialogVisible = false
        this.pageProjectRecord()
      },
      confirmUpdateRecord() {
        this.updateRecordDialogVisible = false
        updateProjectRecord(this.updateRecord).then(_ => this.pageProjectRecord()) // eslint-disable-line no-unused-vars
      },
      deleteProjectRecord(record) {
        this.$confirm('项目的分析记录删除后不可恢复，请问是否删除？')
            .then(_ => deleteProjectRecord(this.project.id, this.activeModule, record.recordId).then(_ => this.pageProjectRecord())) // eslint-disable-line no-unused-vars
            .catch(_ => {}) // eslint-disable-line no-unused-vars
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

  .pagination {
    margin-top: 15px;
  }
</style>