<template>
  <div>
    <!-- 按钮 -->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button> 
    <el-button type="danger" size="small">批量删除</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="comments">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="commentTime" label="评论时间"></el-table-column>
      <el-table-column prop="orderId" label="评论者"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <el-pagination layout="prev, pager, next" :total="50" @current-change="pageChangeHandler"></el-pagination> 
    <!-- /分页结束 -->
    <!-- 模态框 -->
    <el-dialog
      title="录入评论者信息"
      :visible.sync="visible"
      width="60%">
      <span>
        <el-form :model="form" label-width="80px">
            <el-form-item label="评论时间">
            <el-input v-model="form.commentTime">
            </el-input>
          </el-form-item>
             <el-form-item label="内容">
            <el-input v-model="form.content">
            </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框结束 -->
  </div>
</template>
<script>
import request from "@/utils/request"//@=src目录
import querystring from "querystring"//库：把js对象对象转换为字符串——序列化
export default {
  // 用于存放网页中需要调用的方法
  methods:{
    //连接数据
    loadData(){
//vue实例创建完毕执行操作
let url="http://localhost:6677/comment/findAll"
request.get(url).then((response)=>{
  //过滤后的结果
  this.comments = response.data  //把查询结果放置到comments中
})
    },
    //提交方法,通过request与后台进行交互，并且带参数
    submitHandler(){
    //页面数据的更新
    let url="http://localhost:6677/comment/saveOrUpdate"
    request({
      url,
      method:"post",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      data:querystring.stringify(this.form)
    }).then((response)=>{
      //关闭模态框
      this.closeModalHandler();
      //刷新
      this.loadData();
      //提示消息
      this.$message({
            type: 'success',
            message: response.message
          })
    })
    },
    //删除操作
    toDeleteHandler(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用后台，完成删除 
        let url="http://localhost:6677/comment/deleteById?id="+id;//传参地址方式
        request.get(url).then((response)=>{
          //刷新
          this.loadData();
          //提示结果
            this.$message({
        type:"success",
        message:response.message
      })
        })
        
      })     
    },
     pageChangeHandler(page){//分页方法
            //params的页数改变为插件中的当前页
            this.params.page = page-1;
            //加载
            this.loadData();
        },
    toUpdateHandler(row){//修改方法
    //在模态框显示当前行信息
      this.form=row;
      this.visible = true;
    },
    closeModalHandler(){//取消方法
      this.visible = false;
    },
    toAddHandler(){//添加方法
    this.form={
      type:"comment"
    }
      this.visible = true;
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      visible:false,
      comments:[],
      form:{
        type:"comment"
      },
      params:{
                page:0,
                pageSize:10
            }
    }
  },
  created(){
    this.loadData();
  }
}
</script>

<style scoped>

</style>
