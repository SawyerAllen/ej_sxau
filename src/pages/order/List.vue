<template>
    <div>
        <!-- 表格开始 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
        <el-tab-pane label="所有订单" name=" " >
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待支付" name="待支付">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待派单" name="待派单">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待接单" name="待接单">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待服务" name="待服务">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="待确认">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="已完成">
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
                        <!-- 获取当前行的信息 -->
                        <a class="el-icon-delete" href="" @click.prevent = "toDeleteHandler(slot.row.id)"></a>
                        <a class="el-icon-edit-outline" href="" @click.prevent = "toUpdateHandler(slot.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
        <!-- 表格结束 -->
        <!-- 分页开始 -->
        <el-pagination
            layout="prev, pager, next" :total="orders.total" @current-change="pageChangeHandler">
        </el-pagination>
        <!-- 分页结束 -->
        <!-- 模态框开始 -->
         <el-dialog
            title="录入顾客信息"
            :visible.sync="visible"
            width="60%">
            <el-form :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realname"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.telephone"></el-input>
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
//@表示src目录
export default {    
    //用于存放网页中需要调用的方法
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
            console.log('---------------------------'+this.activeName);
            this.$set(this.params,'status',this.activeName)
            this.loadData();
        },
        
        
        pageChangeHandler(page){
            //params的页数改变为插件中的当前页
            this.params.page = page-1;
            //加载
            this.loadData();
        },
        loadData(){

            let url = "http://localhost:6677/order/queryPage"
            
        request({
            url,
            method:"post",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:querystring.stringify(this.params)
        }).then((response)=>{
            this.orders = response.data;
        })
        },
        submitHandler(){
            //this.form对象 ---字符串---> 后台
            //通过request与后台进行交互,并且携带参数
            let url = "http://localhost:6677/order/saveOrUpdate"
            request({
                url,
                method:"post",
                Headers:{
                    //告知后台传递参数的格式
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                //转换为对应格式
                data:querystring.stringify(this.form)
            }).then((response)=>{
                //模态框关闭
                this.closeModalHandler();
                //提示消息
                //更新数据
                this.loadData();
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        toDeleteHandler(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //调用后台接口完成删除操作
            let url = "http://localhost:6677/order/deleteById?id=" +id;
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
            //模态框的表单中显示当前行的信息
            this.form = row;
            this.visible = true;
        },
        closeModalHandler(){
        this.visible = false;
    },
    
    },
    //用于存放要向网页中显示的数据
    data(){
        //变量放在data中
        return {
            activeName:' ',
            visible:false,
            orders:{},
            form:{
                type:"order"
            },
            params:{
                page:0,
                pageSize:10,
                status:''
            },
        }
    },
    created(){
        //this为当前vue实例
        //vue实例创建完毕
        this.loadData();

    }
    
}
</script>

<style scoped>
    
</style>