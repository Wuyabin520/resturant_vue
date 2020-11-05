<template>
  <div class="app-container">
    <h3>员工管理</h3>
    <el-button type="primary" @click="handleAdd" style="marginBottom:15px">添加员工信息</el-button>
    <el-button
      type="primary"
      @click="handleMulDelete"
      style="marginBottom:15px;margin-left:30px"
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
      <el-table-column prop="username" align="center" label="用户名" width="180"></el-table-column>
      <el-table-column prop="gender" align="center" label="性别"></el-table-column>
      <el-table-column prop="province" align="center" label="省份"></el-table-column>
      <el-table-column prop="city" align="center" label="城市"></el-table-column>
      <el-table-column prop="status" align="center" label="状态"></el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgPhoto" alt width="30" height="30" />
        </template>
      </el-table-column>
      <el-table-column prop="money" align="center" label="余额"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      style="width:500px;position:absolute;left:50%;margin-left:-250px"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <!-- 模态框开始 -->
    <el-dialog title="保存员工信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <!-- 表单开始 -->
      <el-form ref="form" :model="waiter_info" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="waiter_info.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="waiter_info.gender"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="waiter_info.province"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="waiter_info.city"></el-input>
        </el-form-item>
        <el-form-item v-if="waiter_info.status=='启动'" label="状态">
          <el-radio v-model="waiter_info.status" value="启用" label="启用"></el-radio>
          <el-radio v-model="waiter_info.status" value="禁用" label="禁用"></el-radio>
        </el-form-item>
        <el-form-item v-else label="状态">
          <el-radio v-model="waiter_info.status" value="启用" label="启用">启用</el-radio>
          <el-radio v-model="waiter_info.status" value="禁用" label="禁用">禁用</el-radio>
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
        <el-button size="small" type="primary" @click="handleSure">确定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapActions, mapState } from "vuex";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      listLoading: false,
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
      "dialogVisible",
      "waiter_info",
      "styleButton",
      "loading",
      "multipleSelection",
      "imageUrl",
    ]),
  },

  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("waiters", [
      "fetchData",
      "handleDelete",
      "handleEdit",
      "handleSure",
      "handleAdd",
      "handleClose",
      "handleSelectionChange",
      "handleMulDelete",
      "handleAvatarSuccess",
    ]),
    //判断图片大小是否符合条件
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
    border-color: #409EFF;
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


