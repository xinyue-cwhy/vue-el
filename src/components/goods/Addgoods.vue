<!-- 添加商品页面 -->
<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :space="200"
        :active="activeindex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="top"
        label-width="100px"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeindex"
          :before-leave="changetabs"
          @tab-click="tabclicks"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                v-model="ruleForm.goods_weight"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="ruleForm.goods_number"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_number">
              <el-cascader
                clearable
                @change="handleChange"
                v-model="ruleForm.goods_cat"
                :options="parentCateList"
                :props="{
                  expandTrigger: 'hover',
                  value: 'cat_id',
                  label: 'cat_name',
                  children: 'children',
                }"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <template>
              <el-form-item
                v-for="(item, i) in manyTableData"
                :key="i"
                :label="item.attr_name"
              >
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox
                    v-for="(itm, i) in item.attr_vals"
                    :key="i"
                    :label="itm"
                    border
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input
            ></el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="successload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="ruleForm.goods_introduce" />
            <el-button type="primary" @click="addAllForm">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="imgdialogVisible" width="50%">
        <img :src="previewPath" alt="" class="imgpreview" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeindex: '0',
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics: [],
        goods_introduce: '',
        goods_cat: [],
        attrs: [],
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
      },
      parentCateList: [],
      manyTableData: [],
      onlyTableData: [],
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      previewPath: '',
      imgdialogVisible: false,
    }
  },
  created() {
    this.getParentCateList()
  },
  computed: {
    cateId() {
      if (this.ruleForm.goods_cat.length == 3) {
        return this.ruleForm.goods_cat[2]
      }
      return null
    },
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
      if (this.ruleForm.goods_cat.length != 3) {
        this.ruleForm.goods_cat = []
        return this.$message.error('请选中三级标签')
      }
    },
    changetabs(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.ruleForm.goods_cat.length != 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    async tabclicks() {
      if (this.activeindex == '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'many' },
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数失败')
        }
        this.$message.success('获取参数成功')
        res.data.forEach((element) => {
          element.attr_vals = element.attr_vals
            ? element.attr_vals.split(' ')
            : []
        })
        this.manyTableData = res.data
      }
      if (this.activeindex == '2') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'only' },
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数失败')
        }
        this.$message.success('获取参数成功')
        this.onlyTableData = res.data
        console.log(res.data)
      }
    },
    // 图片处理
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.imgdialogVisible = true
    },
    handleRemove(file) {
      const fileitem = file.response.data.tem_path
      const i = this.ruleForm.pics.findIndex((x) => x.pic === fileitem)
      this.ruleForm.pics.splice(i, 1)
    },
    successload(response) {
      console.log(response)
      const picinfo = {
        pic: response.data.tmp_path,
      }

      this.ruleForm.pics.push(picinfo)
    },
    async addAllForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必填项')

        this.manyTableData.forEach((item) => {
          const newinfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          }
          this.ruleForm.attrs.push(newinfo)
        })

        this.onlyTableData.forEach((item) => {
          const newinfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          }
          this.ruleForm.attrs.push(newinfo)
        })
        const form = _.cloneDeep(this.ruleForm)
        form.goods_cat = form.goods_cat.join(',')
        console.log(form)
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$router.push('/goods')
      })
    },
  },
}
</script>
<style lang='less' scoped>
.el-steps {
  margin-top: 20px;
}
.el-step__title {
  font-size: 13px !important;
}
.el-tabs {
  margin-top: 30px;
}
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.imgpreview {
  width: 100%;
}

.el-button {
  margin-top: 10px;
}
</style>