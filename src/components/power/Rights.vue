<!-- 权限列表 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-table :data="rightslist" border style="width: 100%">
        <el-table-column type="index" label="#" width="80"> </el-table-column>
        <el-table-column prop="authName" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level == 2">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightslist: [],
    }
  },
  created() {
    this.getRightslist()
  },
  methods: {
    async getRightslist() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status != 200) return this.$message.error('获取信息失败')
      this.rightslist = res.data
    },
  },
}
</script>
<style lang='less' scoped>
</style>