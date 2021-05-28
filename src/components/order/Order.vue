<!-- 订单 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="15"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="pramas.query"
              @clear="getOrderlist"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getOrderlist"
              ></el-button>
            </el-input></div
        ></el-col>
      </el-row>
      <el-table :data="orderlist" style="width: 100%; margin-top: 47px" border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="350px">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="100px">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="100px">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status == '0'"
              >未付款</el-tag
            >
            <el-tag v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="100px">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
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
            <!-- 地址按钮 -->
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="getprogress"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pramas.pagenum"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="pramas.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 修改弹出框 -->

      <el-dialog title="修改地址" :visible.sync="editdialogVisible" width="30%">
        <el-form
          :model="editForm"
          :rules="editFormrule"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="省市区/县" prop="location">
            <el-cascader
              clearable
              @change="handleChange"
              v-model="editForm.location"
              :options="city"
              :props="{
                expandTrigger: 'hover',
              }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editdialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 物流 -->
      <el-dialog title="物流详情" :visible.sync="progressVisible" width="50%">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import city from './citydata.js'
export default {
  data() {
    return {
      city,
      pramas: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderlist: [],
      editdialogVisible: false,
      editForm: {
        address: '',
        location: [],
      },
      editFormrule: {
        location: [{ required: true, message: '请选择地址', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
      progressInfo: [
        {
          time: '2018-05-10 09:39:00',
          ftime: '2018-05-10 09:39:00',
          context: '已签收,感谢使用顺丰,期待再次为您服务',
          location: '',
        },
        {
          time: '2018-05-10 08:23:00',
          ftime: '2018-05-10 08:23:00',
          context:
            '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
          location: '',
        },
        {
          time: '2018-05-10 07:32:00',
          ftime: '2018-05-10 07:32:00',
          context: '快件到达 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-10 02:03:00',
          ftime: '2018-05-10 02:03:00',
          context:
            '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-09 23:05:00',
          ftime: '2018-05-09 23:05:00',
          context: '快件到达 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 21:21:00',
          ftime: '2018-05-09 21:21:00',
          context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 13:07:00',
          ftime: '2018-05-09 13:07:00',
          context: '顺丰速运 已收取快件',
          location: '',
        },
        {
          time: '2018-05-09 12:25:03',
          ftime: '2018-05-09 12:25:03',
          context: '卖家发货',
          location: '',
        },
        {
          time: '2018-05-09 12:22:24',
          ftime: '2018-05-09 12:22:24',
          context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          location: '',
        },
        {
          time: '2018-05-08 21:36:04',
          ftime: '2018-05-08 21:36:04',
          context: '商品已经下单',
          location: '',
        },
      ],
      progressVisible: false,
    }
  },
  created() {
    this.getOrderlist()
  },
  methods: {
    async getOrderlist() {
      const { data: res } = await this.$http.get('orders', {
        params: this.pramas,
      })
      if (res.meta.status !== 200)
        return this.$message.error('获取订单信息失败')
      this.orderlist = res.data.goods
      this.total = res.data.total
      console.log(this.orderlist)
    },
    handleSizeChange(newsize) {
      this.pramas.pagesize = newsize
      this.getOrderlist()
    },
    handleCurrentChange(newnum) {
      this.pramas.pagenum = newnum
      this.getOrderlist()
    },
    handleChange() {},
    editdialog(row) {
      this.editdialogVisible = true
    },
    async getprogress() {
      // const { data: res } = await this.$http.get('/kuaidi/804909574412544580')
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取物流进度失败')
      // }
      // this.progressInfo = res.data
      this.progressVisible = true
      // console.log(this.progressInfo)
    },
  },
}
</script>
<style lang='less' scoped>
@import '../../plugins/timeline/timeline.css';
@import '../../plugins/timeline-item/timeline-item.css';
</style>