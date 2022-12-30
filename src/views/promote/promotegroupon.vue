<template>
  <basic-container>
    <div class="avue-crud">
      <el-row :hidden="!search" style="padding:5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query">
          <template>
            <el-form-item label="字段">
              <el-input v-model="query.expiretime" placeholder="请输入过期时间"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.finishtime" placeholder="请输入成团时间"></el-input>
            </el-form-item>
          </template>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchChange">搜索</el-button>
            <el-button icon="el-icon-delete" @click="searchReset()">清空</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button :size="option.size" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
            <el-button :size="option.size" type="danger" icon="el-icon-delete" @click="handleDelete" plain>删除
            </el-button>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button :size="option.size" icon="el-icon-refresh" @click="searchChange" circle></el-button>
            <el-button :size="option.size" icon="el-icon-search" @click="searchHide" circle></el-button>
          </div>
        </div>
      </el-row>
      <el-row>
        <!-- 列表模块 -->
        <el-table ref="table" v-loading="loading" :size="option.size" @selection-change="selectionChange" :data="data"
                  style="width: 100%"
                  :border="option.border">
          <el-table-column type="selection" v-if="option.selection" width="55" align="center"></el-table-column>
          <el-table-column type="expand" v-if="option.expand" align="center"></el-table-column>
          <el-table-column v-if="option.index" label="#" type="index" width="50" align="center">
          </el-table-column>
          <template v-for="(item,index) in option.column">
            <!-- table字段 -->
            <el-table-column v-if="item.hide!==true"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width"
                             :key="index">
            </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column prop="menu" label="操作" :width="180" align="center">
            <template slot-scope="{row}">
              <el-button :size="option.size" type="text" icon="el-icon-view" @click="handleView(row)">查看</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-delete" @click="rowDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- 分页模块 -->
        <el-pagination
          align="right" background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </el-row>
      <!-- 表单模块 -->
      <el-dialog :title="title" :visible.sync="box" width="50%" :before-close="beforeClose" append-to-body>
        <el-form :disabled="view" :size="option.size" ref="form" :model="form" label-width="80px">
          <!-- 表单字段 -->
          <el-form-item label="团长" prop="userId">
            <el-input v-model="form.userId" placeholder="请输入团长"/>
          </el-form-item>
          <el-form-item label="商品" prop="goodsId">
            <el-input v-model="form.goodsId" placeholder="请输入商品"/>
          </el-form-item>
          <el-form-item label="活动" prop="activityId">
            <el-input v-model="form.activityId" placeholder="请输入活动"/>
          </el-form-item>
          <el-form-item label="成团人数" prop="num">
            <el-input v-model="form.num" placeholder="请输入成团人数"/>
          </el-form-item>
          <el-form-item label="当前人数" prop="currentNum">
            <el-input v-model="form.currentNum" placeholder="请输入当前人数"/>
          </el-form-item>
          <el-form-item label="过期时间" prop="expiretime">
            <el-input v-model="form.expiretime" placeholder="请输入过期时间"/>
          </el-form-item>
          <el-form-item label="成团时间" prop="finishtime">
            <el-input v-model="form.finishtime" placeholder="请输入成团时间"/>
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交</el-button>
          <el-button icon="el-icon-circle-close" :size="option.size" @click="box = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/promote/promotegroupon";
  import option from "@/const/promote/promotegroupon";
  import {mapGetters} from "vuex"; 

export default {
  data() {
    return {
      // 弹框标题
      title: '',
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    }
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    init() {
    },
    searchHide() {
      this.search = !this.search;
    },
    searchChange() {
      const that = this;
      this.onLoad(this.page);
    },
    searchReset() {
      const that = this;
      that.query = {};
      that.page.currentPage = 1;
      that.onLoad(this.page);
    },
    handleSubmit() {
      const that = this;
      if (!that.form.id) {
        add(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
      } else {
        update(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        })
      }
    },
    handleAdd() {
      const that = this;
      that.title = '新增'
      that.form = {}
      that.box = true
    },
    handleEdit(row) {
      const that = this;
      that.title = '编辑'
      that.box = true
      getDetail(row.id).then(res => {
        that.form = res.data.data;
      });
    },
    handleView(row) {
      const that = this;
      that.title = '查看'
      that.view = true;
      that.box = true;
      getDetail(row.id).then(res => {
        that.form = res.data.data;
      });
    },
    handleDelete() {
      const that = this;
      if (that.selectionList.length === 0) {
        that.$message.warning("请选择至少一条数据");
        return;
      }
      that.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(that.ids);
        })
        .then(() => {
          that.selectionClear();
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    rowDel(row) {
      const that = this;
      that.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    beforeClose(done) {
      const that = this;
      done()
      that.form = {};
      that.view = false;
    },
    selectionChange(list) {
      const that = this;
      that.selectionList = list;
    },
    selectionClear() {
      const that = this;
      that.selectionList = [];
      that.$refs.table.clearSelection();
    },
    currentChange(currentPage) {
      const that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    sizeChange(pageSize) {
      const that = this;
      that.page.pageSize = pageSize;
      that.onLoad(that.page);
    },
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        const data = res.data.data;
        that.page.total = data.total;
        that.data = data.records;
        that.loading = false;
        that.selectionClear();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
