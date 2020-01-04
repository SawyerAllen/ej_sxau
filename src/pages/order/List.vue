<template>
   <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
       <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column  label="操作">
                 <template v-slot="slot">
                        <a  href="" @click.prevent="functionname(slot.row.id)">详情</a>
                   </template>
             </el-table-column>
       </el-table>
   </el-tab-pane>
    <el-tab-pane label="待支付" name="second">
       <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待派送" name="third">
       <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column  label="操作">
                 <template v-slot="slot">
                        <a  href="" @click.prevent="functionname(slot.row.id)">详情</a>
                   </template>
             </el-table-column>
      </el-table>
    </el-tab-pane>
   <el-tab-pane label="待接单" name="fourth">
      <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column  label="操作">
                 <template v-slot="slot">
                        <a  href="" @click.prevent="functionname(slot.row.id)">详情</a>
                   </template>
             </el-table-column>
      </el-table>
   </el-tab-pane>
   <el-tab-pane label="待服务" name="fivth">
       <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column prop="waiterId" label="员工id"></el-table-column>
      </el-table>
   </el-tab-pane>
   <el-tab-pane label="待确认" name="sixth">
      <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column prop="waiterId" label="员工id"></el-table-column>
      </el-table>
   </el-tab-pane>
   <el-tab-pane label="已完成" name="seventh">
      <el-table :data="orders" >
             <el-table-column prop="id" label="订单编号"></el-table-column>
             <el-table-column prop="orderTime" label="下单时间"></el-table-column>
             <el-table-column prop="total" label="总价"></el-table-column>
             <el-table-column prop="status" label="状态"></el-table-column>
             <el-table-column prop="customerId" label="顾客id"></el-table-column>
             <el-table-column prop="waiterId" label="员工id"></el-table-column>
      </el-table>
   </el-tab-pane>
  </el-tabs>
   </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring' 
export default {
    data(){
        return{
            orders:[],
            // 设置默认页面为第一个页面
             activeName: 'first'
            
        }
    },
    created(){
      //在页面加载出来的时候加载数据
      this.loadData();
    },
   methods:{
      //默认页面设置的方法
       handleClick(tab, event) {
        console.log(tab, event);
      },
      loadData(){
        let url ="http://localhost:6677/order/findAll"
      request.get(url).then((response)=>{
        //将查询结果设置到customer中,this指向外部函数的this
         this.orders = response.data;
      })
      },


      
      
             

    }
}
</script>


<style scoped>

</style>