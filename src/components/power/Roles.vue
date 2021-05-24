<!-- 角色列表 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="15">
          <el-button type="primary" round>添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleslist" border style="width: 100%; margin-top: 20px">
        <el-table-column type="expand" label="">
          <template slot-scope="scope">
            <el-row
              v-for="(item, index) in scope.row.children"
              :key="item.id"
              :class="['rowbottom', 'vcenter', index === 0 ? 'rowtop' : '']"
            >
              <el-col :span="5">
                <!-- <pre>{{ item }}</pre> -->
                <el-tag closable @close="removetag(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="['vcenter', index2 === 0 ? '' : 'rowtop']"
                  v-for="(item2, index2) in item.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removetag(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      :class="[index3 === 0 ? '' : 'rowtop']"
                      type="warning"
                      closable
                      @close="removetag(scope.row, item3.id)"
                      v-for="(item3, index3) in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="level" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="rightdialogVisible(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setrightdialogVisible"
      width="50%"
    >
      <el-tree
        :data="rightlists"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultkeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setrightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addroles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleslist: [],
      setrightdialogVisible: false,
      rightlists: [],
      treeProps: {
        children: 'children',
        label: 'authName',
      },
      defaultkeys: [],
      roleId: '',
    }
  },
  created() {
    this.getroles()
  },
  methods: {
    async getroles() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status != 200) return this.$message.error('获取失败')
      this.roleslist = res.data
    },
    async removetag(role, rightid) {
      const result = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (result == 'confirm') {
        const { data: res } = await this.$http.delete(
          `roles/${role.id}/rights/${rightid}`
        )
        if (res.meta.status == 200) {
          this.$message.success('删除成功')
          role.children = res.data
          return
        }
        this.$message.error('删除失败')
      }
      if (result == 'cancel') {
        return this.$message('已取消删除')
      }
    },
    // 分配权限
    async rightdialogVisible(node) {
      this.roleId = node.id
      this.defaultkeys = []
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status != 200) return this.$message.error('获取失败')
      this.rightlists = res.data
      this.getDefaultKeys(node, this.defaultkeys)
      this.setrightdialogVisible = true
    },
    getDefaultKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((element) => {
        this.getDefaultKeys(element, arr)
      })
    },
    async addroles() {
      const roles = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idstr = roles.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idstr }
      )
      if (res.meta.status !== 200) return this.$message.error('分配失败')
      this.getroles()
      this.$message.success('分配成功')
      this.setrightdialogVisible = false
    },
  },
}
</script>
<style lang='less' scoped>
.el-tag {
  margin: 7px;
}

.rowtop {
  border-top: 1px solid #f3eded;
}
.rowbottom {
  border-bottom: 1px solid #f3eded;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>