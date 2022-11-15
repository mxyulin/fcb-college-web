<template>
  <basic-container>
    <!-- 查询模块 -->
    <Query :page="page" :search="search" @getGoodsData="getGoodsData" />
    <!-- 列表菜单 -->
    <el-row :gutter="0" type="flex" justify="space-between">
      <el-col :span="2">
        <el-button
          :size="option.size"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
          class="create-btn"
          >新增</el-button
        >
      </el-col>
      <el-col :span="19">
        <el-radio-group
          v-model="activeStatus"
          :size="option.size"
          fill="primary"
          class="sort-btn-group"
        >
          <el-radio-button :label="3">全部</el-radio-button>
          <el-radio-button :label="1">已上架</el-radio-button>
          <el-radio-button :label="2">已下架</el-radio-button>
          <el-radio-button :label="0">已隐藏</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
        <el-button
          :size="option.size"
          icon="el-icon-refresh"
          @click="getGoodsData"
          class="refresh-btn"
          circle
        ></el-button>
        <el-button
          :size="option.size"
          icon="el-icon-search"
          @click="search = !search"
          class="refresh-btn"
          circle
        ></el-button>
        <el-button
          :size="option.size"
          icon="el-icon-delete"
          circle=""
          disabled
        ></el-button>
      </el-col>
    </el-row>
    <!-- 列表模块 -->
    <Table
      ref="table"
      :goodsData="goodsData"
      @getGoodsData="getGoodsData"
      @handleEdit="handleEdit"
      @selectionChange="selectionChange"
      :loading="loading"
    />
    <!-- 底部模块 -->
    <el-row
      :gutter="0"
      type="flex"
      justify="space-between"
      style="margin-top: 20px"
    >
      <!-- 底部按钮组 -->
      <el-col :span="12">
        <el-button
          plain
          type="primary"
          :size="option.size"
          @click="slectedAction('up')"
          v-if="activeStatus != 1"
          >上架</el-button
        >
        <el-button
          plain
          type="warning"
          :size="option.size"
          @click="slectedAction('down')"
          v-if="activeStatus != 2"
          >下架</el-button
        >
        <el-button
          plain
          type="danger"
          :size="option.size"
          @click="selectionsDelete()"
          >删除</el-button
        >
      </el-col>
      <!-- 分页模块 -->
      <el-col :span="9">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 表单模块 -->
    <Form
      ref="form"
      :title="title"
      :box="box"
      :form="form"
      :view="view"
      @beforeClose="beforeClose"
      @handleSubmit="handleSubmit"
    />
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
  slectionsUpdate,
} from "@/api/product/product";
import option from "@/const/product/product";
import Query from "@/views/product/components/query";
import Table from "@/views/product/components/table";
import Form from "@/views/product/components/form";
import { mapGetters } from "vuex";

export default {
  components: {
    Query,
    Table,
    Form,
  },
  data() {
    return {
      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 上架状态(3是全部展示)
      activeStatus: 3,
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 是否展示筛选面板
      chooseType: false,
      // 商品源数据
      goodsData: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    // 获取所有选择行ID拼成的字符串
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  watch: {
    // 根据上架状态获取数据
    activeStatus() {
      this.getGoodsData();
    },
  },
  methods: {
    // 初始化
    init() {},
    // 提交表单
    handleSubmit(formName) {
      let that = this;
      that.$refs["form"].$refs[formName]
        .validate()
        .then(() => {
          if (!that.form.id) {
            add(that.form).then(() => {
              that.box = false;
              that.getGoodsData();
              that.$message({
                type: "success",
                message: "操作成功！",
              });
            });
          } else {
            update(that.form).then(() => {
              that.box = false;
              that.getGoodsData();
              that.$message({
                type: "success",
                message: "操作成功！",
              });
            });
          }
        })
        .catch(() => {
          that.$message({
            type: "error",
            message: "操作失败!",
          });
        });
    },
    // 增加商品
    handleAdd() {
      this.title = "新增商品";
      this.form = {};
      this.box = true;
    },
    // 编辑商品
    handleEdit(row) {
      this.title = "编辑商品";
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    // 查看商品详情
    handleView(row) {
      this.title = "查看商品";
      this.view = true;
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    // 关闭表单前的重置表单
    beforeClose(done) {
      this.form = {};
      this.view = false;
      this.box = false;
      done();
    },
    // 保存已选列表
    selectionChange(list) {
      this.selectionList = list;
    },
    // 清空列表已选
    selectionClear() {
      this.selectionList = [];
      // 父组件访问自组件的 refs, 通过 this.$refs.table.$refs 访问
      this.$refs.table.$refs.table.clearSelection();
    },
    // 分页器当前页
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getGoodsData();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getGoodsData();
    },
    // 获取商品数据
    getGoodsData(params = {}) {
      let that = this;
      let { activeStatus } = that;
      that.loading = true;
      getList(that.page.currentPage, that.page.pageSize, params).then((res) => {
        let data = res.data.data;
        that.page.total = data.total;
        // 全部
        if (activeStatus == 3) {
          that.goodsData = data.records;
        } else {
          // 非全部
          that.goodsData = data.records.filter((good) => {
            return good.status == activeStatus;
          });
        }
        that.loading = false;
        that.selectionClear();
      });
    },
    // 删除所有选中行
    selectionsDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.selectionClear();
          this.getGoodsData();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    // 选中行上架 or 下架
    async slectedAction(action) {
      let that = this;
      if (that.selectionList.length === 0) {
        that.$message.warning("请选择至少一条数据");
        return;
      }
      // 状态码
      let statusCode = action == "up" ? 1 : 2;
      let result = await slectionsUpdate(that.ids, statusCode);
      if (result.data.code == 200) {
        that.getGoodsData();
        return that.$message({
          type: "success",
          message: "操作成功！",
        });
      }
      return that.$message({
        type: "error",
        message: "操作失败！",
      });
    },
  },
  // 页面初始化
  mounted() {
    this.init();
    this.getGoodsData();
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product";
</style>
