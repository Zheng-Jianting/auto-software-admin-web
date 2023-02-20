<template>
  <div class="flex-center">
    <el-table :data="records" border fit highlight-current-row style="width: 100%">
      <el-table-column v-loading="loading" element-loading-text="loading" align="center" label="记录ID" width="75">
        <template slot-scope="scope">
          <span>{{ scope.row.recordId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="记录名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.recordName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="需求文本" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.text }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分析结果" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.recordData }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.creationDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="最后更新时间" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.lastUpdateDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
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
</template>

<script>
  export default {
    name: 'ProjectRecordTabPane',
    props: ['project', 'activeModule'],
    data() {
      return {
        records: [],
        recordQuery: {
          page: 1,
          limit: 10,
          activeModule: this.activeModule,
          sort: '+id'
        },
        loading: false,
        currentPage: 1
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // get records through filter project with activeModule
      getList() {
        this.loading = true
        for (let i = 0; i < 10; i++) {
          this.records.push({ recordId: i + 1, recordName: '教务系统思维导图', text: '我想做一个教务系统', recordData: 'xxxxxx', creationDate: '2023-01-01 00:00:00', lastUpdateDate: '2023-01-01 00:00:00' })
        }
        this.loading = false
      },
      deleteRecord() {},
      handleSizeChange() {},
      handleCurrentChange() {}
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