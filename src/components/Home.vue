<!-- 主页面 -->
<template>
  <el-container class="contain">
    <el-header>
      <div>
        <!-- <img src="../assets/logo.png" alt="" /> -->
        <span>电商后台管理项目</span>
      </div>
      <el-button type="info" @click="back">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    back() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getlist() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
  },
}
</script>
<style lang='less' scoped>
.contain {
  height: 100%;
}
.el-header {
  background-color: rgb(87, 156, 235);
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 20px;
    color: white;
  }
}
.el-aside {
  background-color: rgb(149, 227, 247);
}
.el-main {
  background-color: rgb(154, 240, 221);
}
</style>