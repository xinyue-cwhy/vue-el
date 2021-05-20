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
      <el-aside :width="flag ? '64px' : '200px'">
        <div class="collapsebtn" @click="isflag">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="flag"
          :collapse-transition="false"
          router
          :default-active="activepath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconobj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      flag: false,
      activepath: '',
    }
  },
  created() {
    this.getlist()
    this.activepath = window.sessionStorage.getItem('activepath')
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
    },
    isflag() {
      this.flag = !this.flag
    },
    saveNavState(i) {
      window.sessionStorage.setItem('activepath', i)
      this.activepath = i
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
  background-color: rgb(229, 235, 234);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: rgb(229, 235, 234);
}
.iconfont {
  margin-right: 8px;
}
.collapsebtn {
  background-color: #32363a;
  height: 30px;
  color: white;
  text-align: center;
  font-size: 10px;
  line-height: 30px;
  letter-spacing: 0.2em;
}
</style>