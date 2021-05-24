<!-- 用户列表 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="15"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="pramas.query"
              @clear="getuserlist"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getuserlist"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" round @click="dialogVisible = true"
              >添加用户</el-button
            >
          </div></el-col
        >
      </el-row>
      <el-table :data="userList" style="width: 100%; margin-top: 47px" border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editdialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deletecount(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="addrole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pramas.pagenum"
        :page-sizes="[2, 4, 5]"
        :page-size="pramas.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="DialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="formrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog title="修改用户" :visible.sync="editdialogVisible" width="50%">
      <el-form
        :model="editform"
        :rules="formrules"
        ref="editruleForm"
        label-width="100px"
        class="demo-ruleForm"
        @close="editDialogClosed"
      >
        <el-form-item label="用户名">
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editvalidate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="adddialogFormVisible"
      @close="setRoleDialogClosed"
    >
      <el-form>
        <el-form-item label="当前用户">{{ roles.name }}</el-form-item>
        <el-form-item label="当前角色">{{ roles.role }}</el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model="selectvalue" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    var checkModeil = (rule, value, cb) => {
      const regModeil = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regModeil.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      pramas: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      formrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { validator: checkModeil, trigger: 'blur' },
        ],
      },
      editdialogVisible: false,
      editform: {
        username: '',
        email: '',
        mobile: '',
        id: '',
      },
      adddialogFormVisible: false,
      roles: {
        name: '',
        role: '',
        id: '',
      },
      rolelist: [],
      selectvalue: '',
    }
  },
  created() {
    this.getuserlist()
  },
  methods: {
    async getuserlist() {
      const { data: res } = await this.$http.get('users', {
        params: this.pramas,
      })
      if (res.meta.status !== 200)
        return this.$message.console.error('获取用户信息失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.pramas.pagesize = newsize
      this.getuserlist()
    },
    handleCurrentChange(newpage) {
      this.pramas.pagenum = newpage
      this.getuserlist()
    },
    async userStateChanged(i) {
      const { data: res } = await this.$http.put(
        `users/${i.id}/state/${i.mg_state}`
      )
      if (res.meta.status !== 200) {
        i.mg_state = !i.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    DialogClosed() {
      this.$refs.ruleForm.resetFields()
    },
    validate() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getuserlist()
      })
    },
    editdialog(i) {
      this.editdialogVisible = true
      this.editform.username = i.username
      this.editform.email = i.email
      this.editform.mobile = i.mobile
      this.editform.id = i.id
    },
    editDialogClosed() {
      this.$refs.editruleForm.resetFields()
    },
    editvalidate() {
      this.$refs.editruleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'users/' + this.editform.id,
          { email: this.editform.email, mobile: this.editform.mobile }
        )
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success('修改成功')
        this.editdialogVisible = false
        this.getuserlist()
      })
    },
    async deletecount(i) {
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
        const { data: res } = await this.$http.delete('users/' + i)
        if (res.meta.status == 200) {
          this.$message.success('删除成功')
          console.log(this.pramas.pagenum)
          this.getuserlist()
          return
        }
        this.$message.error('删除失败')
      }
      if (result == 'cancel') {
        return this.$message('已取消删除')
      }
    },
    async addrole(node) {
      this.roles.name = node.username
      this.roles.role = node.role_name
      this.roles.id = node.id
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('分配失败')
      this.rolelist = res.data
      this.adddialogFormVisible = true
    },
    async okrole() {
      if (!this.selectvalue) {
        return this.$message.error('请选择角色')
      }
      const { data: res } = await this.$http.put(
        `users/${this.roles.id}/role`,
        { rid: this.selectvalue }
      )
      if (res.meta.status !== 200) return this.$message.error('分配失败')
      this.$message.success('更新成功')
      this.getuserlist()
      this.adddialogFormVisible = false
    },
    setRoleDialogClosed() {
      this.selectvalue = ''
    },
  },
}
</script>
<style lang='less' scoped>
</style>