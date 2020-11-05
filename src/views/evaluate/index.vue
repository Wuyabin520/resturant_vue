<template>
    <div class="app-container">
        <h3>评价管理</h3>
        <el-table
      size="small"
      border
      :data="list"
      style="width: 100%;"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" prop="id"></el-table-column>
      <el-table-column prop="id" label="编号" align="center" width="180"></el-table-column>
      <el-table-column prop="content" align="center" label="评论" width="180"></el-table-column>
      <el-table-column prop="commentTime" align="center" label="评论时间" ></el-table-column>
      <el-table-column prop="orderId" align="center" label="订单号"></el-table-column>
      <el-table-column prop="status" align="center" label="状态"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEvaluateDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="loadEvaluate"
        />
       
    </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return {
            listLoading: false,
            
        }
    },
    components: {
    Pagination,
  },
    computed:{
        ...mapState('waiters',['list','total','listQuery','loading'])
    },
    created(){
        this.loadEvaluate()
    },
    methods:{
        ...mapActions('waiters',['loadEvaluate','handleEvaluateDelete','handleSelectionChange',"handleAdd"])
    }

}
</script>