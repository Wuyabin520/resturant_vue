<template>
  <div class="app-container">
    <h3>订单管理</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first"></el-tab-pane>
      <el-tab-pane label="待支付" name="second"></el-tab-pane>
      <el-tab-pane label="待派单" name="third"></el-tab-pane>
      <el-tab-pane label="待接单" name="fourth"></el-tab-pane>
      <el-tab-pane label="待服务" name="fivth"></el-tab-pane>
      <el-tab-pane label="待确认" name="sixth"></el-tab-pane>
      <el-tab-pane label="已完成" name="seventh"></el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      @click="handleMulDeleteThree"
      style="marginBottom:15px"
    >批量删除</el-button>
        <el-table
          size="small"
          border
          :data="list"
         style="width: 100%;"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" prop="id"></el-table-column>
          <el-table-column prop="id" label="订单编号" align="center" width="180"></el-table-column>
          <el-table-column prop="orderTime" align="center" label="下单时间" width="180" :formatter="dateFormat">
          </el-table-column>
          <el-table-column prop="total" align="center" label="总价" width="180"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" width="180"></el-table-column>
          <el-table-column prop="customerId" label="顾客Id" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
              <el-button icon="el-icon-search" circle></el-button>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="loadOrder"
        />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listLoading: false,
      activeName: "first",
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapState("waiters", [
      "list",
      "total",
      "listQuery",
      "loading",
      "order_info",
    ]),
  },
  created() {
    this.loadOrder();
  },
  methods: {
    ...mapActions("waiters", ["loadOrder", "handleSelectionChange","handleMulDeleteThree","handleDeleteById"]),
      handleClick(tab) {
        if(tab.name=="first"){
          this.loadOrder("")
        }else if(tab.name=="second"){
          this.loadOrder("待支付")
        }else if(tab.name=="third"){
          this.loadOrder("待派单")
        }else if(tab.name=="fourth"){
          this.loadOrder("待接单")
        }else if(tab.name=="fivth"){
          this.loadOrder("待服务")
        }else if(tab.name=="sixth"){
          this.loadOrder("待确认")
        }else if(tab.name=="seventh"){
          this.loadOrder("已完成")
        }
      },
      dateFormat(row, column) {
       var date = new Date(row.orderTime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() + '-'
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
       var D = date.getDate() + ' '
       var h = date.getHours() + ':'
       var m = date.getMinutes() + ':'
       var s = date.getSeconds()
       return Y+M+D+h+m+s
   },
   open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
  },
};
</script>