<template>
    <div>
     
        <h1>产品管理</h1>
        <!--按钮 -->
       <el-button type="primary" size="small" @click="toAddHandler"> 添加</el-button>
         <el-button type="danger"  size="small">批量删除</el-button>
         <!-- 按钮结束 -->
         <!-- 表格 -->
         <el-table :data="products" >
             <el-table-column  type="selection" prop="id" label="编号"></el-table-column>
             <el-table-column prop="name" label="产品名称"></el-table-column>
             <el-table-column prop="price" label="价格"></el-table-column>
             <el-table-column prop="description" label="描述"></el-table-column>
             <el-table-column prop="categoryId" label="所属产品"></el-table-column>
               <el-table-column  label="操作">
                   <template v-slot="slot">
                        <a class="el-icon-delete" href="" @click.prevent="toDeleteHander(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                        <a  href="" @click.prevent="toDeleteHander(slot.row.id)">详情</a>
                   </template>
               </el-table-column>
             
         </el-table>
 <!-- 表格结束 -->
   <!--模态框-->
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="60%"
 >
 <el-form :model="form" lablel-width="80px" >
   <el-form-item label="产品名称">
     <el-input v-model="form.name">
     </el-input>
   </el-form-item>
   <el-form-item label="价格">
     <el-input  v-model="form.price">
     </el-input>
   </el-form-item>
   <el-form-item label="所属栏目">
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in categorys"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
   </el-form-item>
   <el-form-item label="介绍">
     <el-input  v-model="form.description">
     </el-input>
   </el-form-item>
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="closeModalHandler">取 消</el-button>
    <el-button size="small" type="primary" @click="submitHander">确 定</el-button>
  </span>
</el-dialog>
 <!--模态框jiesu-->
         
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring' 
export default {
    data(){
        return{
            value:"",
            categorys:[],
            title:"录入产品信息",
            visible:false,
            products:[],
            form:{
              
            }
        }
    },
    created(){
      //在页面加载出来的时候加载数据
      this.loadData();
      this.loadData1();
    },
   methods:{
     loadData1(){
        let url ="http://localhost:6677/category/findAll"
      request.get(url).then((response)=>{
        //将查询结果设置到customer中,this指向外部函数的this
         this.categorys = response.data;
      })
      },
      loadData(){
        let url ="http://localhost:6677/product/findAll"
      request.get(url).then((response)=>{
        //将查询结果设置到customer中,this指向外部函数的this
         this.products = response.data;
      })
      },

      submitHander(){
//调用request与后台进行交互，并且携带参数
//this.form对象---字符串-->后台
let url = "http://localhost:6677/product/saveOrUpdate"
request({
  url,
  method:"POSt",
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  },
  data:querystring.stringify(this.form)//querystring库  、form双向绑定，在添加用户的时候输入的信息就会保存在form中    冒号代表数据引用，@代表方法的指定
}).then((response)=>{
  //模态框关闭
  this.closeModalHandler();
  //刷新
  this.loadData()
  //提示消息
  this.$message({
    type:"success",
    message:response.message
  })
})

      },
      
        toDeleteHander(id){
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //调用后台接口完成删除操作
            let url = "http://localhost:6677/product/deleteById?id=" +id;
            request.get(url).then((response)=>{
                //刷新数据
                this.loadData();
                //提示结果
                this.$message({
                type: 'success',
                message: response.message
          });
            })
        })
       },
      
        toUpdateHandler(row){
          this.title = "修改产品信息";
            this.visible = true;
            this.form = row;
        },
        closeModalHandler(){
       this.visible = false;
        },

 
        toAddHandler(){
          this.title = "录入产品信息";
            this.visible = true;
            this.form = {
            }

        }

    }
}
</script>


<style scoped>

</style>