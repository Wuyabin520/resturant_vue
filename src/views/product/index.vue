<template>
  <div class="app-container">
    <h3>产品管理</h3>
    <el-button type="primary" @click="handleAdd" style="marginBottom:15px">新增产品</el-button>
    <el-button
      type="primary"
      @click="handleMulDeleteTwo"
      style="marginBottom:15px;margin-left:30px;"
    >批量删除</el-button>
    <el-table size="small" border :data="list" style="width: 100%;" v-loading="loading"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" prop="id"></el-table-column>
      <el-table-column prop="id" label="编号" align="center" width="180"></el-table-column>
      <el-table-column prop="name" align="center" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="price" align="center" label="价格" width="180"></el-table-column>
      <el-table-column prop="description" align="center" label="描述" width="180"></el-table-column>
      <el-table-column label="产品样图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.photo" width="50" height="50" alt />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditTwo(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="productDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      style="width:500px;position:absolute;left:50%;margin-left:-300px"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="loadProduct"
    />
    <!-- 模态框开始 -->
    <el-dialog title="保存产品信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <!-- 表单开始 -->
      <el-form ref="form" :model="product_info" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="product_info.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="product_info.price"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="product_info.description"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="http://121.199.29.84:8001/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleSureTwo">确定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      listLoading: false,
      input:""
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapState("waiters", [
      "list",
      "loading",
      "total",
      "listQuery",
      "dialogVisible",
      "product_info",
      "imageUrl",
      "multipleSelection"
    ]),
  },
  created() {
    this.loadProduct();
  },
  methods: {
    ...mapActions("waiters", [
      "loadProduct",
      "productDelete",
      "handleAdd",
      "handleClose",
      "handleSureTwo",
      "handleEditTwo",
      "handleAvatarSuccess",
      "handleSelectionChange",
      "handleMulDeleteTwo"
    ]),
    //判断图片大小是否符合条件
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>