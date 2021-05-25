<!-- 商品分类 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-row>
        <el-col>
          <el-button type="primary" round @click="showDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <tree-table
        class="treetable"
        :data="goodslist"
        :columns="columns"
        show-index
        index-text="#"
        :selection-type="false"
        :expand-type="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-error"
            v-if="scope.row.cat_deleted"
            style="color: lightred"
          ></i>
          <i class="el-icon-success" v-else style="color: lightgreen"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-if="scope.row.cat_level === 2"
            >三级</el-tag
          >
        </template>
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-size="queryinfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类弹框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form
        :rules="addCateFormRules"
        :model="cateform"
        ref="addCateFormRef"
        width="50%"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="cateform.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok',
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
        },
      ],
      dialogFormVisible: false,
      cateform: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0,
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' },
        ],
      },
      parentCateList: [],
      parentvalue: [],
    }
  },
  created() {
    this.getgoods()
  },
  methods: {
    async getgoods() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryinfo,
      })
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.goodslist = res.data.result
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryinfo.pagesize = newsize
      this.getgoods()
    },
    handleCurrentChange(newpage) {
      this.queryinfo.pagenum = newpage
      this.getgoods()
    },
    showDialog() {
      this.getParentCateList()
      this.dialogFormVisible = true
    },
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.parentCateList = res.data
    },
    handleChange() {
      console.log(this.parentvalue)
      if (this.parentvalue.length > 0) {
        this.cateform.cat_pid = this.parentvalue[this.parentvalue.length - 1]
        this.cateform.cat_level = this.parentvalue.length
        return
      }
      this.cateform.cat_pid = 0
      this.cateform.cat_level = 0
    },
    addform() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.cateform)
        if (res.meta.status !== 201) {
          return this.$message.error('添加失败')
        }
        this.$message.success('添加成功')
        this.getgoods()
        this.dialogFormVisible = false
      })
    },
  },
}
</script>
<style lang='less' scoped>
.treetable {
  margin-top: 14px;
}
</style>