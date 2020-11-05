<template>
  <div class="app-container">
    <h3>顾客管理</h3>
    <el-button type="primary" @click="handleAdd" style="marginBottom:15px">新增顾客</el-button>
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
      <el-table-column prop="username" align="center" label="姓名" width="180"></el-table-column>
      <el-table-column prop="gender" align="center" label="性别"></el-table-column>
      <el-table-column prop="telephone" align="center" label="电话"></el-table-column>
      <el-table-column prop="registerTime" align="center" label="注册时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="status" align="center" label="状态"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditTwo(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteFour(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框开始 -->
    <el-dialog title="保存顾客信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <!-- 表单开始 -->
      <el-form ref="form" :model="customer_info" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="customer_info.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="customer_info.telephone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleSureThree">确定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      listLoading: false,
    };
  },
  computed: {
    ...mapState("waiters", ["list", "customer_info", "dialogVisible","loading"]),
  },
  created() {
    this.loadCustomer();
  },
  methods: {
    ...mapActions("waiters", [
      "loadCustomer",
      "handleAdd",
      "handleDeleteFour",
      "handleSelectionChange",
      "handleClose",
      "handleEditTwo",
      "handleSureThree",
    ]),
     dateFormat(row, column) {
       var date = new Date(row.registerTime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() + '-'
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
       var D = date.getDate() + ' '
       var h = date.getHours() + ':'
       var m = date.getMinutes() + ':'
       var s = date.getSeconds()
       return Y+M+D+h+m+s
   }
  },
};
</script>