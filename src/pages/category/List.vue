<template>
  <div>
      <!-- 按钮开始 -->
      <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
      <el-button type="danger" size="small">批量删除</el-button>
      <!-- 按钮结束 -->
      <!-- 表格开始 -->
      <el-table :data="category">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column prop="number" label="序号"></el-table-column>
          <el-table-column prop="parentId" label="父栏目"></el-table-column>
          <el-table-column label="操作">
              <template v-slot="slot">
                  <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.name)"></a>
                  <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
              </template>
          </el-table-column>
      </el-table>
      <!-- 表格结束 -->
      <!-- 模态框开始 -->
      <el-dialog
            :title="title"
            :visible.sync="visible"
            width="60%">
            测试：{{form}}
            <el-form :model="form" label-width="80">
                <el-form-item label="栏目名称">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="form.number"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeModalHandler">取 消</el-button>
                <!-- @click === onClick -->
                <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>
      <!-- 模态框结束 -->
  </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    methods:{
        submitHandler(){
            let url = "http://localhost:6677/category/saveOrUpdate";
            request({
                url,
                method:"post",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:querystring.stringify(this.form)
            }).then((Response)=>{
                this.closeModalHandler();
                this.loadData();
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        loadData(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
                this.category = response.data;
            })
        },
        toDeleteHandler(name){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除“' + name +"”的信息成功！"
          });
        })
        },
        toUpdateHandler(row){
            this.title = "修改栏目信息"
            this.visible = true;
        },
        closeModalHandler(){
            this.visible = false;
        },
        toAddHandler(){
            this.title = "添加栏目信息"
            this.visible = true;
        }

    },
    data(){
        return{
            title:"添加栏目信息",
            visible:false,
            category:[],
            form:{
            },
        }
    },
    created(){
        this.loadData();
    },
    
}
</script>

<style scoped>

</style>