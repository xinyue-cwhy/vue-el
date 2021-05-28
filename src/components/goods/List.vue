<!-- 商品列表 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="15"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="pramas.query"
              @clear="getgoodslist"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getgoodslist"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" round @click="addgoods"
              >添加商品</el-button
            >
          </div></el-col
        >
      </el-row>
      <el-table :data="goodsList" style="width: 100%; margin-top: 47px" border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="80px">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70px">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="170px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
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
              @click="deletecount(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pramas.pagenum"
        :page-sizes="[20, 10, 5, 2]"
        :page-size="pramas.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      pramas: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
    }
  },
  created() {
    this.getgoodslist()
  },
  methods: {
    async getgoodslist() {
      const { data: res } = await this.$http.get('goods', {
        params: this.pramas,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }

      this.$message.success('获取商品成功')
      console.log(res.data)
      this.goodsList = res.data.goods
      console.log(this.goodsList)
      this.total = res.data.total
    },
    handleSizeChange(newPageSize) {
      this.pramas.pagesize = newPageSize
      this.getgoodslist()
    },
    handleCurrentChange(newPageNum) {
      this.pramas.pagenum = newPageNum
      this.getgoodslist()
    },
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
        const { data: res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status == 200) {
          this.$message.success('删除成功')
          this.getgoodslist()
          return
        }
        this.$message.error('删除失败')
      }
      if (result == 'cancel') {
        return this.$message('已取消删除')
      }
    },
    addgoods() {
      this.$router.push('goods/add')
    },
  },
}
</script>
<style lang='less' scoped>
</style>