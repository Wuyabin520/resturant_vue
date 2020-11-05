import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们的封装好的网络请求文件
import {get, post} from '@/utils/axios'

const waiters={
    //命名空间:我们的模块在使用数据或者方法时，可以使用子模块的名称去获取该方法或者数据
    namespaced: true,
    state:{
        list:null,//保存返回的数据
        total: 0,//总数量
        listQuery: {
            page: 1,//当前页码
            limit:  5,//一页显示几条
        },
        waiter_info:{},//当前编辑的员工数据
        category_info:{},//当前栏目信息
        product_info:{},//当前产品信息
        order_info:{},//当前订单信息
        customer_info:{},//当前顾客信息
        category_info:{},//当前栏目信息
        dialogVisible: false,
        styleButton:{
            borderBottom:'10px'
        },
        loading:true,
        multipleSelection:[],//保存多选数据数组
        imageUrl: '',
        
    },
    mutations:{
        //这里可以设置一些保存值的方法
        SETLIST(state,data){
            state.list=data;
        },
        dateParse(state,dataString){
            state.time=dataString
            if(dataString){
              let date = new Date(dataString);
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              let D = (date.getDate()< 10 ? '0'+date.getDate() : date.getDate())+' ';
              let h = (date.getHours()< 10 ? '0'+date.getHours() : date.getHours())+ ':';
              let m = (date.getMinutes()< 10 ? '0'+date.getMinutes() : date.getMinutes())+ ':';
              let s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
              return Y+M+D+h+m+s;  
            }else{
              return '';
            }
        }
    },
    actions:{
        //页面管理
        fetchData(context){
            // get('/waiter/findAll').then((res)=>{
            //     // context.state.list = res.data
            //     context.commit('SETLIST',res.data)
            // }).catch((err)=>{
            //     console.log(err)
            // })
            post('/waiter/query',{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((res)=>{
               context.state.total=res.data.total
               context.commit('SETLIST',res.data.list)
               context.state.loading=false
            }).catch((err)=>{
                console.log(err)
            })
        },
        // handleEdit(context,id){
        //     get('/waiter/findWaiterById?id='+id).then((res)=>{
        //         context.state.waiter_info=res.data;
        //         context.commit('SETLIST',res.data)
        //     }).catch((err)=>{
        //         console.log(err)
        //     })
        // },
        handleDelete(context,id){
            get('/waiter/deleteById?id='+id).then((res)=>{
                context.dispatch('fetchData')
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleEdit(context,id){
            get('/waiter/findWaiterById?id='+id).then((res)=>{
                context.state.waiter_info=res.data
                context.state.dialogVisible=true
            })
        },
        handleClose(context){
            context.state.dialogVisible = false
            context.state.imageUrl=''
        },
        handleSure(context){
            //点击保存时，把文件服务器返回的在线url保存在要提交的数据中
            context.state.waiter_info.imgPhoto=context.state.imageUrl;
            post('/waiter/saveOrUpdate',context.state.waiter_info).then((res)=>{
                context.dispatch('fetchData')
                context.state.dialogVisible=false
                context.state.imageUrl=''
            })
        },
        handleAdd(context){
            context.state.dialogVisible=true
            context.state.waiter_info={}
            context.state.product_info={}
            context.state.customer_info={}
            context.state.category_info={}
        },
        
        handleSelectionChange(context,val) {
            context.state.multipleSelection=[];
            val.forEach(function(item){
                 context.state.multipleSelection.push(item.id)
             })
            //  console.log(context.state.multipleSelection);
        },
        handleMulDelete(context){
            post('/waiter/batchDelete',{
                ids:context.state.multipleSelection.toString()
            }).then((res)=>{
                context.dispatch('fetchData')
            }).catch((err)=>{
                console.log(err)
            })
        },
        //上传文件的回调方法
        handleAvatarSuccess(context, res) {
            var imageUrl="http://121.199.29.84:8888/group1/"
            context.state.imageUrl+=imageUrl+res.data.id;
            // console.log(context.state.imageUrl)
        },
       


        //栏目管理
        loadCategory(context){
            get('/category/findAll').then((res)=>{
                // console.log(res.data)
                // context.state.list=res.data
                context.commit('SETLIST',res.data)
                context.state.loading=false
            }).catch((err)=>{
                console.log(err)
            })
        },
        //确定发送信息
        handleCategorySure(context,category_info){
            post('/category/saveOrUpdate',context.state.category_info).then((res)=>{
                context.dispatch('loadCategory')
                context.state.dialogVisible=false
            })
        },
        handCategoryleMulDelete(context,ids){
            post('/category/batchDelete',{
                ids:context.state.multipleSelection.toString()
            }).then((res)=>{
                context.dispatch('loadCategory')
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleCategoryDelete(context,id){
            post('/category/deleteById?id='+id).then((res)=>{
                context.dispatch('loadCategory')
            })
        },
        handleCategoryEdit(context,category_info){
            context.state.dialogVisible=true
            this.category_info=scope.row
        },


        //产品管理
        loadProduct(context){
            post('/product/query',{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((res)=>{
                // console.log(res)
                context.state.total=res.data.total
                context.commit('SETLIST',res.data.list)
                context.state.loading=false
            }).catch((err)=>{
                console.log(err)
            })
        },
        //删除产品信息
        productDelete(context,id){
            get('/product/deleteById?id='+id).then((res)=>{
                context.dispatch('loadProduct')
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleSureTwo(context){
            context.state.product_info.photo=context.state.imageUrl;
            post('/product/saveOrUpdate',context.state.product_info).then((res)=>{
                context.dispatch('loadProduct')
                context.state.dialogVisible=false
                context.state.imageUrl=''
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleEditTwo(context,id){
            get('/product/findById?id='+id).then((res)=>{
                context.state.product_info=res.data
                context.state.dialogVisible=true
            })
        },
        //批量删除
        handleMulDeleteTwo(context){
            post('/product/batchDelete',{
                ids:context.state.multipleSelection.toString()
            }).then((res)=>{
                context.dispatch('loadProduct')
            }).catch((err)=>{
                console.log(err)
            })
        },



        //订单管理
        loadOrder(context,text){
            post('/order/queryPage',{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
                status:text
            }).then((res)=>{
                context.state.total=res.data.total
                context.commit('SETLIST',res.data.list)
               context.state.loading=false
            }).catch((err)=>{
                console.log(err)
            })
        },
        //批量删除
        handleMulDeleteThree(context){
            post('/order/batchDelete',{
                ids:context.state.multipleSelection.toString()
            }).then((res)=>{
                context.dispatch('floadOrder')
            }).catch((err)=>{
                console.log(err)
            })
        },
        //通过id删除
        handleDeleteById(context,id){
            get('/order/deleteById?id='+id).then((res)=>{
                context.dispatch('loadOrder')
            }).catch((err)=>{
                console.log(err)
            })
        },



        //顾客管理
        loadCustomer(context){
            get('/customer/findAll').then((res)=>{
                context.state.list=res.data
                context.state.loading=false
            }).catch((err)=>{
                console.log(err)
            })
        },
        //删除信息
        handleDeleteFour(context,id){
            get('/customer/deleteById?id='+id).then((res)=>{
                context.dispatch('loadCustomer')
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleEditTwo(context,id){
            get('/customer/findCustomerById?id='+id).then((res)=>{
                context.state.customer_info=res.data
                context.state.dialogVisible=true
            })
        },
        handleSureThree(context){
            post('/customer/saveOrUpdate',context.state.customer_info).then((res)=>{
                context.dispatch('loadCustomer')
                context.state.dialogVisible=false
            }).catch((err)=>{
                console.log(err)
            })
        },




        //评论管理
        loadEvaluate(context){
            post('/comment/query',{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((res)=>{
                context.state.total=res.data.total
                context.commit('SETLIST',res.data.list)
                context.state.loading=false
            })
        },
        //删除评论信息
        handleEvaluateDelete(context,id){
            post('/comment/deleteById?id='+id).then((res)=>{
                context.dispatch('loadEvaluate')
            })
        },
        
    }
}
export default waiters

