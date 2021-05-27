<!-- 分类参数 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-alert
        show-icon
        title="注意：只能对第三级标签设置相关参数"
        type="warning"
      >
      </el-alert>
      <el-row style="margin-top: 20px">
        <el-col>
          <span style="margin-right: 20px">选择商品分类:</span>
          <el-cascader
            clearable
            @change="handleChange"
            v-model="parentvalue"
            :options="parentCateList"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
            }"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isabled"
            @click="mkdVisible"
            >添加参数</el-button
          >
          <el-table
            :data="manyTableData"
            style="width: 100%; margin-top: 47px"
            border
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="tagclose(scope.row, i)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editdialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deletecount(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isabled"
            @click="mkdVisible"
            >添加属性</el-button
          >
          <el-table
            :data="onlyTableData"
            style="width: 100%; margin-top: 47px"
            border
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="tagclose(scope.row, i)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="属性"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editdialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deletecount(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加，，对话框 -->
      <el-dialog
        :title="'添加' + dialogTexy"
        :visible.sync="dVisible"
        width="30%"
        @close="closep"
      >
        <el-form
          :model="addpruleForm"
          :rules="addprules"
          ref="pruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="dialogTexy" prop="pname">
            <el-input v-model="addpruleForm.pname"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改，，对话框 -->
      <el-dialog
        :title="'修改' + dialogTexy"
        :visible.sync="editdVisible"
        width="30%"
        @close="editclosep"
      >
        <el-form
          :model="editForm"
          :rules="addprules"
          ref="editpruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="dialogTexy" prop="attr_name">
            <el-input v-model="editForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentvalue: [],
      parentCateList: [],
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
      dialogTexy: '',
      dVisible: false,
      addpruleForm: {
        pname: '',
        attr_name: '',
      },
      addprules: {
        pname: [
          { required: true, message: '错误', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        attr_name: [
          { required: true, message: '错误', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
      },
      editdVisible: false,
      editForm: [],
    }
  },
  computed: {
    isabled() {
      if (this.parentvalue.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.parentvalue.length == 3) {
        return this.parentvalue[2]
      }
      return null
    },
  },
  created() {
    this.getParentCateList()
  },
  methods: {
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 3 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.parentCateList = res.data
    },
    async handleChange() {
      this.getParamsData()
    },
    async getParamsData() {
      if (this.parentvalue.length != 3) {
        this.parentvalue = []
        this.manyTableData = []
        this.onlyTableData = []
        return this.$message.error('请选中三级标签')
      }
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName },
        }
      )
      if (res.meta.status !== 200) return
      res.data.forEach((element) => {
        element.attr_vals = element.attr_vals
          ? element.attr_vals.split(' ')
          : []
        element.inputVisible = false
        element.inputValue = ''
      })
      console.log(res.data)
      if (this.activeName == 'many') {
        this.manyTableData = res.data
        this.dialogTexy = '动态参数'
      } else {
        this.onlyTableData = res.data
        this.dialogTexy = '静态属性'
      }
    },
    handleClick() {
      this.getParamsData()
    },
    mkdVisible() {
      this.dVisible = true
    },
    closep() {
      this.$refs.pruleForm.resetFields()
    },
    editclosep() {
      this.$refs.editpruleForm.resetFields()
    },
    add() {
      this.$refs.pruleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addpruleForm.pname,
            attr_sel: this.activeName,
          }
        )
        if (res.meta.status !== 201) {
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加参数成功')
        this.getParamsData()
        this.dVisible = false
      })
    },
    // 点击确定按钮
    edit() {
      this.$refs.editpruleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('修改参数失败')
        }
        this.$message.success('修改参数成功')
        this.getParamsData()
        this.editdVisible = false
      })
    },
    //点击编辑按钮
    async editdialog(id) {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${id}}`,
        {
          params: { attr_vals: this.activeName },
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('请求参数失败')
      }
      this.editForm = res.data
      this.editdVisible = true
    },
    // 点击删除按钮
    async deletecount(id) {
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
          `categories/${this.cateId}/attributes/${id}`
        )
        if (res.meta.status == 200) {
          this.$message.success('删除成功')
          this.getParamsData()
          return
        }
        this.$message.error('删除失败')
      }
      if (result == 'cancel') {
        return this.$message('已取消删除')
      }
    },
    async handleInputConfirm(scope) {
      if (scope.inputValue.trim().length == 0) {
        scope.inputValue = ''
        scope.inputVisible = false
        return
      }
      // 添加标签
      scope.attr_vals.push(scope.inputValue.trim())
      scope.inputValue = ''
      scope.inputVisible = false
      this.setedittag(scope)
    },
    async setedittag(scope) {
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${scope.attr_id}`,
        {
          attr_name: scope.attr_name,
          attr_sel: scope.attr_sel,
          attr_vals: scope.attr_vals.join(' '),
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改参数失败')
      }
      this.$message.success('修改参数成功')
    },
    showInput(scope) {
      scope.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    tagclose(row, i) {
      row.attr_vals.splice(i, 1)
      this.setedittag(row)
    },
  },
}
</script>
<style lang='less' scoped>
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 100px;
}
</style>