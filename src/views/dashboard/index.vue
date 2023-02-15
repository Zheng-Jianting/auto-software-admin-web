<template>
  <div class="dashboard-container">
    <div class="top">
      <el-card class="top-card">
        <h4>基本信息</h4>
        <div class="basic-info">
          <div class="avatar flex-center">
            <img src="@/assets/default_avatar.jpg" class="avatar-img">
          </div>
          <div class="info flex-center">
            <div>
              <p><span class="info-item-title">名称</span>：<span class="info-item-content">张三</span></p>
              <p><span class="info-item-title">角色</span>：<span class="info-item-content">管理员</span></p>
              <p><span class="info-item-title">IP地址</span>：<span class="info-item-content">127.0.0.1</span></p>
              <p><span class="info-item-title">IP属地</span>：<span class="info-item-content">深圳</span></p>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="top-card">
        <h4>工作区</h4>
        <div class="work-area flex-center">
          <div class="work-item flex-center" @click="jumpLoginManagement">
            <div class="work-item-icon flex-center">
              <i class="el-icon-tickets"></i>
            </div>
            <div class="work-item-content">
              <div>
                <h5 class="work-item-content-font">登录管理</h5>
                <p class="work-item-content-font">管理系统登录记录</p>
              </div>
            </div>
          </div>
          <div class="work-item flex-center" @click="jumpUserManagement">
            <div class="work-item-icon flex-center">
              <i class="el-icon-user"></i>
            </div>
            <div class="work-item-content">
              <div>
                <h5 class="work-item-content-font">用户管理</h5>
                <p class="work-item-content-font">管理用户、角色信息</p>
              </div>
            </div>
          </div>
          <div class="work-item flex-center" @click="jumpProjectManagement">
            <div class="work-item-icon flex-center">
              <i class="el-icon-folder"></i>
            </div>
            <div class="work-item-content">
              <div>
                <h5 class="work-item-content-font">项目管理</h5>
                <p class="work-item-content-font">管理项目信息</p>
              </div>
            </div>
          </div>
          <div class="work-item flex-center" @click="jumpStatistics">
            <div class="work-item-icon flex-center">
              <i class="el-icon-data-analysis"></i>
            </div>
            <div class="work-item-content">
              <div>
                <h5 class="work-item-content-font">数据统计</h5>
                <p class="work-item-content-font">查看系统运维信息</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="top-card">
        <h4>操作文档</h4>
        <el-table :data="documentList" stripe style="width: 100%">
          <el-table-column prop="name" label="文档名称" width="230"></el-table-column>
          <el-table-column prop="module" label="模块" width="180"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        documentList: [
          { id: '001', name: '登录管理模块介绍', module: '登录管理', date: '2023-01-01 00:00:00' },
          { id: '002', name: '用户权限介绍', module: '用户管理', date: '2023-01-01 00:00:00' },
          { id: '003', name: '角色权限介绍', module: '用户管理', date: '2023-01-01 00:00:00' },
          { id: '004', name: '项目管理模块介绍', module: '项目管理', date: '2023-01-01 00:00:00' },
          { id: '005', name: '数据统计模块介绍', module: '数据统计', date: '2023-01-01 00:00:00' }
        ]
      }
    },
    methods: {
      jumpLoginManagement() {
        this.$router.push('/management/login')
      },
      jumpUserManagement() {
        this.$router.push('/management/user')
      },
      jumpProjectManagement() {
        this.$router.push('/management/project')
      },
      jumpStatistics() {
        this.$router.push('/statistics')
      }
    }
  }
</script>

<style scoped>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dashboard-container {
    margin: 30px;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .top-card {
    width: 32%;
    height: 500px;
  }

  .basic-info {
    height: 350px;
    display: flex;
  }

  .avatar {
    width: 60%;
  }

  .avatar-img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    border: 1px solid;
    border-radius: 50%;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
  }

  .info {
    width: 35%;
  }

  .info-item-title {
    display: inline-block;
    width: 60px;
    letter-spacing: 1px;
    text-align-last: justify;
    text-align: justify
  }

  .info-item-content {
    letter-spacing: 1px;
  }

  .work-area {
    height: 350px;
    flex-wrap: wrap;
  }

  .work-item {
    width: 50%;
    letter-spacing: 1px;
    cursor: pointer;
  }

  .work-item-icon {
    width: 52px;
    height: 52px;
    border: 1px solid;
    border-radius: 50%;
  }

  .work-item-content {
    width: 150px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: left;
    margin-left: 10px;
    flex-direction: column;
  }

  .work-item-content-font {
    display: block;
    margin-block-start: 5px;
    margin-block-end: 5px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 13px;
  }
</style>