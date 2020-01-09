<template>
  <div>
 
    <!-- 选项卡 -->
    <el-tabs v-model="params.status" @tab-click="loadData">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="待派单" name="待派单"></el-tab-pane>
      <el-tab-pane label="待接单" name="待接单"></el-tab-pane>
      <el-tab-pane label="待服务" name="待服务"></el-tab-pane>
      <el-tab-pane label="待确认" name="待确认"></el-tab-pane>
      <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
    </el-tabs>
    <!-- /选项卡 -->
    <!-- 表格 -->
    <el-table :data="orders.list">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="total" label="总价"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="customerId" label="顾客ID"></el-table-column>
      <el-table-column prop="waiterId" label="员工ID"></el-table-column>
      <el-table-column prop="addressId" label="地址ID"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="slot">
          <a href="javascript:void(0)" >详情</a>
          <a href="" v-if="slot.row.status === '待派单'" @click.prevent="toSendOrderHandler(slot.row)">派单</a>
          
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <el-pagination 
        :hide-on-single-page="true"
        layout="prev, pager, next" 
        :total="orders.total" 
        @current-change="pageChageHandler">
    </el-pagination>
    <!-- /分页结束 -->
    <!-- 模态框 -->
    <el-dialog
      title="派单"
      :visible.sync="visible"
      width="60%">
      <div>
        <p> <strong>订单编号：</strong> {{form.id}} </p>
        <p> <strong>订单总价：</strong> {{form.total}} </p>
        <p> <strong>下单时间：</strong> {{form.orderTime}} </p>
        <p> 
          <strong>服务员工：</strong> 
           <el-radio-group v-model="waiterId">
            <el-radio 
              border
              size="small"
              v-for="e in employees" 
              :key="e.id"
              :label="e.id" >{{e.realname}}</el-radio>
          </el-radio-group>
          
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框 -->

  </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
  // 用于存放网页中需要调用的方法
  methods:{
    // 当分页中当前页改变的时候执行
    pageChageHandler(page){
        // 将params中当前页改为插件中的当前页
        this.params.page = page-1;
        // 加载
        this.loadData();
    },
    // 加载员工信息
    loadEmployees(){
      let url = "http://localhost:6677/waiter/findAll";
      request.get(url).then(response=>{
        this.employees = response.data;
      })
    },
    // 加载订单信息
    loadData(){
      let url = "http://localhost:6677/order/queryPage"
      if(this.params.status === "全部"){
        delete this.params.status;
      }
      request({
          url,
          method:"post",
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          data:querystring.stringify(this.params)
      }).then((response)=>{
          // orders为一个对象，其中包含了分页信息，以及列表信息
          this.orders = response.data;
      })
    },
    submitHandler(){
      let url = "http://localhost:6677/order/sendOrder";
      request({
        url,
        method:"GET",
        params:{
          orderId:this.form.id,
          waiterId:this.waiterId
        }
      }).then((response)=>{
        // 模态框关闭
        this.closeModalHandler();
        // 刷新
        this.loadData();
        // 提示消息
        this.$message({
          type:"success",
          message:response.message
        })
      })
    },
    // 去派单，将模态框打开，然后选择员工作为派单对象
    toSendOrderHandler(row){
      // 模态框显示当前订单信息
      this.form = row;
      this.visible = true;
    },
    closeModalHandler(){
      this.visible = false;
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      visible:false,
      orders:{},
      form:{},  // 当前订单
      params:{
          page:0,
          pageSize:10
      },
      employees:[],
      waiterId:null // 选中的员工
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData();
    // 加载员工信息
    this.loadEmployees();
  }
}
</script>

<style scoped>
 
</style>