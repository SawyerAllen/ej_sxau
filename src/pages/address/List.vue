<template>
<!-- 按钮 -->
    <div>
        <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
<!-- 按钮结束 -->
<!-- 表格 -->
        <el-table :data="addresses"> 
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="province" label="省"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="area" label="地区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="telephone" label="手机号"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="slot">
                 <a href="" @click.prevent="toUpdateHandler(slot.row)" class="el-icon-edit"></a>
                 <a href="" @click.prevent="toDeleteHandler(slot.row.id)" class="el-icon-delete"></a>
                </template>
            </el-table-column>
  
        </el-table>
<!-- 表格结束 -->
<!-- 分页开始 -->
      <!-- <el-pagination
       layout="prev, pager, next"
       :total="50">
      </el-pagination> -->
<!-- 分页结束 -->
<!-- 模态框 -->
<el-dialog
  :title="title"
  :visible.sync="visible"
  width="60%"
  
  >


    <el-form :modul="form" label-width="80px">
        <el-form-item label="省">
          <el-input v-model="form.province"></el-input>

        </el-form-item>
      </el-form>
      <el-form :modul="form" label-width="80px">
        <el-form-item label="城市">
          <el-input  v-model="form.city"></el-input>
        </el-form-item>
      </el-form>
    <el-form :modul="form" label-width="80px">
        <el-form-item label="地区">
          <el-input v-model="form.area"></el-input>
        </el-form-item>
      </el-form>
      <el-form :modul="form" label-width="80px">
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <el-form :modul="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
      </el-form>
     
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeModalHandler">取 消</el-button>
    <el-button type="primary" @click="submitHandler">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    // 用于存放网页中需要调用的方法
    methods:{
      loadData(){
         let url="http://localhost:6677/address/findAll"
         request.get(url).then((response)=>{
        // 保证箭头函数指向外部的vue实例
          this.addresses=response.data;
      })
      },
        submitHandler(){
          let url="http://localhost:6677/address/saveOrUpdate"
          request({
            url,
            method:"POST",
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            },
            data:querystring.stringify(this.form)
          }).then((response)=>{
            //请求结束
            this.closeModalHandler();
            this.loadData()
            this.$message({
              type:"success",
              message:response.message
        
            })
          })
        },
        toAddHandler(){
          this.title="添加员工信息";
          this.form={
            type:"customer"
          }
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
        toUpdateHandler(row){
          this.title="修改员工信息";
          //在模态框中显示出当前行信息
            this.form=row;
            this.visible=true;

        },
        toDeleteHandler(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
          let url="http://localhost:6677/address/deleteById?id="+id;
          request.get(url).then((response)=>{
            this.loadData()
             this.$message({
            type: 'success',
            message: response.message
          });
        })

          })
          
      }

    },
    //用于存放要想网页中显示的数据
    data(){
        return{
            visible:false,
            addresses:[],
            value:[],
            form:{ 
            }
   
        }
    },
    created(){
      // vue实例创建完毕文档加载完毕要做的事情
     this.loadData();
    }
}
</script>

<style  scoped>

</style>
