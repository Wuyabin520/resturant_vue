<template>
  <div class="app-container">
    <h3>栏目管理</h3>
    <el-button type="primary" @click="handleAdd" style="marginBottom:15px">添加</el-button>
    <el-button
      type="primary"
      @click="handCategoryleMulDelete"
      style="marginBottom:15px;margin-left:30px;"
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
      <el-table-column prop="id" label="编号" align="center" width="180"></el-table-column>
      <el-table-column prop="name" align="center" label="栏目名称" width="180"></el-table-column>
      <el-table-column label="ICON" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt width="100" height="100" />
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父栏目ID" align="center" width="180"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleCategoryEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleCategoryDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框开始 -->
    <el-dialog title="保存栏目信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <!-- 表单开始 -->
      <el-form ref="form" :model="category_info" label-width="80px">
        <el-form-item label="栏目">
          <el-input v-model="category_info.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleCategorySure">确定</el-button>
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
    ...mapState("waiters", [
      "list",
      "loading",
      "dialogVisible",
      "category_info",
    ]),
  },
  created() {
    this.loadCategory();
  },
  methods: {
    ...mapActions("waiters", [
      "loadCategory",
      "handleAdd",
      "handleClose",
      "handleCategorySure",
      "handCategoryleMulDelete",
      "handleSelectionChange",
      "handleCategoryDelete",
      "handleCategoryEdit",
    ]),
  },
};
</script>